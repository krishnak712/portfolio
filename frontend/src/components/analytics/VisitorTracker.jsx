import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { env } from "../../config/env";

import {
  initializeVisitor,
  recordPageVisit,
  updatePageVisitDuration,
} from "../../services/visitorService";

const SESSION_KEY = "portfolio_session_id";

function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

export default function VisitorTracker() {
  const location = useLocation();

  const visitorIdRef = useRef(null);
  const initializationPromiseRef = useRef(null);

  const currentPageVisitIdRef = useRef(null);
  const pageStartTimeRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function trackPageVisit() {
      try {
        /*
         * 1. Get/create visitor
         */
        if (!visitorIdRef.current) {
          if (!initializationPromiseRef.current) {
            initializationPromiseRef.current =
              initializeVisitor();
          }

          const visitorId =
            await initializationPromiseRef.current;

          if (cancelled) return;

          visitorIdRef.current = visitorId;
        }

        /*
         * 2. Finish previous page visit
         */
        if (
          currentPageVisitIdRef.current &&
          pageStartTimeRef.current
        ) {
          const durationSeconds =
            (Date.now() - pageStartTimeRef.current) / 1000;

          await updatePageVisitDuration(
            currentPageVisitIdRef.current,
            durationSeconds
          );
        }

        /*
         * 3. Build current page path
         */
        const pagePath =
          location.pathname +
          location.search +
          location.hash;

        console.log("TRACKING PAGE:", pagePath);

        /*
         * 4. Get browser session ID
         */
        const sessionId = getSessionId();

        /*
         * 5. Create new page visit
         */
        const pageVisit = await recordPageVisit(
          visitorIdRef.current,
          pagePath,
          sessionId
        );

        if (cancelled) return;

        /*
         * 6. Remember current visit
         */
        currentPageVisitIdRef.current = pageVisit.id;
        pageStartTimeRef.current = Date.now();

        console.log(
          "Page visit recorded:",
          pageVisit
        );
      } catch (error) {
        console.error(
          "Visitor tracking failed:",
          error
        );
      }
    }

    trackPageVisit();

    return () => {
      cancelled = true;
    };
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  /*
   * Update duration when visitor closes/leaves page
   */
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (
        !currentPageVisitIdRef.current ||
        !pageStartTimeRef.current
      ) {
        return;
      }

      const durationSeconds =
        (Date.now() - pageStartTimeRef.current) / 1000;

      /*
       * Normal fetch may be cancelled during unload,
       * so use sendBeacon where possible.
       */
      const apiBaseUrl =
        env.apiBaseUrl;

      const url =
        `${apiBaseUrl}/page-visits/` +
        currentPageVisitIdRef.current;

      const payload = JSON.stringify({
        duration_seconds: Math.max(
          0,
          Math.round(durationSeconds)
        ),
      });

      if (navigator.sendBeacon) {
        const blob = new Blob(
          [payload],
          {
            type: "application/json",
          }
        );

        navigator.sendBeacon(url, blob);
      }
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, []);

  return null;
}