import { useEffect } from "react";
import "./css/PageScrollAnimation.css";

const SECTION_SELECTOR = "main section";
const MAX_STAGGER_ITEMS = 8;
const STAGGER_STEP_MS = 70;

function collectStaggerItems(section) {
  const direct = Array.from(section.children).filter(
    (el) => el instanceof HTMLElement
  );

  let candidates = direct;

  if (direct.length === 1) {
    const nested = Array.from(
      direct[0].children
    ).filter(
      (el) => el instanceof HTMLElement
    );

    if (nested.length > 1) {
      candidates = nested;
    }
  }

  return candidates.slice(0, MAX_STAGGER_ITEMS);
}

function enhanceSection(section) {
  if (section.dataset.psaEnhanced === "true") {
    return;
  }

  section.dataset.psaEnhanced = "true";
  section.classList.add("psa-reveal");

  collectStaggerItems(section).forEach(
    (item, index) => {
      item.classList.add("psa-item");

      item.style.transitionDelay =
        `${index * STAGGER_STEP_MS}ms`;
    }
  );
}

export default function PageScrollAnimation() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined"
    ) {
      return;
    }

    /*
     * Respect reduced motion.
     */
    if (
      window
        .matchMedia(
          "(prefers-reduced-motion: reduce)"
        )
        .matches
    ) {
      return;
    }

    let observer = null;

    /*
     * Reveal sections.
     *
     * IMPORTANT:
     * This component NEVER scrolls the page.
     * It only adds/removes animation classes.
     */
    if (
      typeof IntersectionObserver !==
      "undefined"
    ) {
      observer =
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const section =
                entry.target;

              if (
                entry.isIntersecting
              ) {
                section.classList.add(
                  "psa-inview"
                );
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin:
              "0px 0px -5% 0px",
          }
        );
    }

    const observeSections = () => {
      const sections =
        document.querySelectorAll(
          SECTION_SELECTOR
        );

      sections.forEach((section) => {
        enhanceSection(section);

        if (observer) {
          observer.observe(section);
        } else {
          section.classList.add(
            "psa-inview"
          );
        }
      });
    };

    /*
     * Initial sections.
     */
    observeSections();

    /*
     * Watch for sections created after
     * async API rendering or route changes.
     */
    const mutations =
      new MutationObserver(() => {
        observeSections();
      });

    mutations.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutations.disconnect();

      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
}