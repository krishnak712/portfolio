/* =========================================================
   SINGLE hash-scroll implementation.

   All navbar section navigation funnels through
   ScrollManager, which uses these helpers. Navbar calls
   them directly ONLY when navigating to the hash that is
   already active (react-router emits no location change
   in that case, so ScrollManager would not re-fire).
   No other component should scroll to home sections.
   ========================================================= */

export const NAVBAR_OFFSET = 90;

function preferredBehavior(requested = "smooth") {
  try {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return "auto";
    }
  } catch {
    // matchMedia unavailable — fall through.
  }

  return requested;
}

/*
 * Scroll to a home-page section id with room for the
 * fixed navbar. Returns true when the element existed
 * and a scroll was issued.
 */
export function scrollToSectionId(id, behavior = "smooth") {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (!id) {
    return false;
  }

  // "home" is the top of the home page.
  if (id === "home") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: preferredBehavior(behavior),
    });

    return true;
  }

  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: preferredBehavior(behavior),
  });

  return true;
}

export function scrollToTop(behavior = "smooth") {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: preferredBehavior(behavior),
  });
}
