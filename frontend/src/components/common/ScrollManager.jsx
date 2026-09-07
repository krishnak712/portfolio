import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let timer;
    let lastHeight = -1;
    let stableCount = 0;

    const scrollToTarget = () => {
      if (cancelled) {
        return;
      }

      /* =========================================
         NORMAL ROUTE
         /resume
         /projects
         /projects/smart-blood-search
      ========================================= */

      if (!location.hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        return;
      }

      /* =========================================
         HASH ROUTE
         /#about
         /#skills
         /#projects
         /#experience
         /#achievements
         /#contact
      ========================================= */

      const sectionId = decodeURIComponent(
        location.hash.substring(1)
      );

      const element =
        document.getElementById(sectionId);

      /* Section is not rendered yet, or sections above it
         are still expanding as their data arrives (page height
         still changing) — wait until the layout settles so the
         computed scroll position is final. */
      const height =
        document.documentElement.scrollHeight;

      if (!element || height !== lastHeight) {
        lastHeight = height;
        stableCount = 0;
        attempts += 1;

        if (attempts < 300) {
          requestAnimationFrame(
            scrollToTarget
          );
        }

        return;
      }

      stableCount += 1;

      if (stableCount < 10) {
        attempts += 1;

        if (attempts < 300) {
          requestAnimationFrame(
            scrollToTarget
          );
        }

        return;
      }

      /* =========================================
         WAIT FOR FINAL LAYOUT
      ========================================= */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) {
            return;
          }

          const navbarHeight = 90;

          const top =
            element.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

          window.scrollTo({
            top: Math.max(0, top),
            left: 0,
            behavior: "smooth",
          });
        });
      });
    };

    timer = window.setTimeout(
      scrollToTarget,
      150
    );

    return () => {
      cancelled = true;

      clearTimeout(timer);
    };
  }, [
    location.pathname,
    location.hash,
  ]);

  return null;
}

export default ScrollManager;