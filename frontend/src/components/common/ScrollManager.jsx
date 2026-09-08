import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSectionId } from "../../utils/hashScroll";

/*
 * THE single navigation + hash-scroll system.
 *
 * - Navbar navigates to / with the selected hash and
 *   performs NO scrolling itself (except re-clicking the
 *   already-active hash, which emits no location change).
 * - This component owns every location-driven scroll.
 * - It polls until the target section exists, because
 *   HomePage renders sections only after async profile
 *   data arrives. A single delayed attempt is not enough.
 */

const POLL_INTERVAL_MS = 100;
const MAX_WAIT_MS = 10000;

/*
 * Re-assert the position after images/fonts settle and
 * shift the layout. Uses instant scrolling so the page
 * does not visibly glide a second time.
 */
const SETTLE_DELAYS_MS = [500, 1500];

function ScrollManager() {
  const { pathname, hash } = useLocation();

  /*
   * Stop the browser's native hash jump from competing
   * with the offset scroll below.
   */
  useEffect(() => {
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      // Non-critical — keep default behavior.
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    const timers = [];

    const later = (fn, ms) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) {
          fn();
        }
      }, ms);

      timers.push(timer);
    };

    const cleanup = () => {
      cancelled = true;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      timers.forEach((timer) => window.clearTimeout(timer));
    };

    /*
     * Non-home routes have no home sections.
     * Plain route changes go back to the top.
     * (A non-home location WITH a hash is left alone —
     * there is nothing to scroll to there.)
     */
    if (pathname !== "/") {
      if (!hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }

      return cleanup;
    }

    /*
     * Home without a hash (logo click, direct / visit,
     * or navigate("/") from another page) goes to top.
     */
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      return cleanup;
    }

    const sectionId = decodeURIComponent(hash.slice(1));

    const start = performance.now();

    const attempt = () => {
      if (cancelled) {
        return;
      }

      const found = scrollToSectionId(sectionId);

      if (found) {
        /*
         * Section rendered — lock the final position
         * once late-loading content settles.
         */
        SETTLE_DELAYS_MS.forEach((delay) => {
          later(() => {
            scrollToSectionId(sectionId, "auto");
          }, delay);
        });

        return;
      }

      if (performance.now() - start >= MAX_WAIT_MS) {
        return;
      }

      const timer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        rafId = requestAnimationFrame(attempt);
      }, POLL_INTERVAL_MS);

      timers.push(timer);
    };

    /*
     * Wait a frame so the destination route commits
     * before the first lookup.
     */
    rafId = requestAnimationFrame(attempt);

    return cleanup;
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;
