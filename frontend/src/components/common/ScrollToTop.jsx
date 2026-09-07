const goToSection = (id) => {
  setMenuOpen(false);

  if (isHomePage) {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const navbarOffset = 90;

    const elementTop =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: elementTop,
      left: 0,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `/#${id}`
    );

    return;
  }

  window.location.href = `/#${id}`;
};