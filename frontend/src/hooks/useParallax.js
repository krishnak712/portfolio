import { useEffect } from "react";

/* =========================================================
   useParallax — subtle scroll parallax for decorative
   elements only.
   ---------------------------------------------------------
   - One passive scroll listener + one rAF, shared by every
     [data-parallax] element (no per-element listeners).
   - GPU-friendly translate3d; speed comes from the
     data-parallax attribute (e.g. "0.1" = 10% drift).
   - Text, buttons, and cards are never targeted — only
     decorative glows/shapes/visuals.
   - Skipped entirely under prefers-reduced-motion.
   - Cleans up listener + pending frame on unmount.
   ========================================================= */

export function useParallax(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    if (
      typeof window === "undefined" ||
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return undefined;
    }

    let frameId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;

      const viewportHeight = window.innerHeight || 1;

      document
        .querySelectorAll("[data-parallax]")
        .forEach((element) => {
          const speed =
            parseFloat(
              element.getAttribute("data-parallax")
            ) || 0;

          if (!speed) {
            return;
          }

          const rect = element.getBoundingClientRect();

          if (
            rect.bottom < -200 ||
            rect.top > viewportHeight + 200
          ) {
            return;
          }

          const distanceFromCenter =
            rect.top +
            rect.height / 2 -
            viewportHeight / 2;

          // Clamp to a subtle 10–30px drift band so decorative
          // elements never travel far or cause overflow.
          const offset = Math.max(
            -24,
            Math.min(
              24,
              -distanceFromCenter * speed
            )
          );

          element.style.transform =
            `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        frameId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [enabled]);
}
