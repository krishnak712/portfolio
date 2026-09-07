import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./css/Navbar.css";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";


  /* =========================================================
     ACTIVE SECTION
  ========================================================= */

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 160;

      let currentSection = "home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (!section) {
          return;
        }

        if (scrollPosition >= section.offsetTop) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, [isHomePage]);


  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  /* =========================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  /* =========================================================
     GO TO HOMEPAGE SECTION
  ========================================================= */

 const goToSection = (id) => {
  setMenuOpen(false);

  // Already on homepage
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
      top: Math.max(0, elementTop),
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

  // Coming from Resume / Projects / Case Study
  if (id === "home") {
    navigate("/");
    return;
  }

  navigate(`/#${id}`);
};


  /* =========================================================
     HOME
  ========================================================= */

  const goHome = () => {
  setMenuOpen(false);

  if (isHomePage) {
    window.history.replaceState(null, "", "/");

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    return;
  }

  navigate("/");
};


  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="site-navbar">

        <div className="navbar-container">

          {/* Logo */}

          <button
            type="button"
            className="navbar-logo"
            onClick={goHome}  
            aria-label="Go to home"
          >
            <span className="logo-mark">
              KK
            </span>

            <span className="logo-text">
              KRISHNA KUMAR
            </span>
          </button>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >

            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={
                  activeSection === item.id
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() =>
                  goToSection(item.id)
                }
              >
                {item.label}
              </button>
            ))}

          </nav>


          {/* =================================================
              RESUME
          ================================================= */}

          <Link
            to="/resume"
            className={
              location.pathname === "/resume"
                ? "navbar-resume active"
                : "navbar-resume"
            }
          >
            Resume
          </Link>


          {/* =================================================
              HIRE ME
          ================================================= */}

          <button
            type="button"
            className="navbar-hire"
            onClick={() =>
              goToSection("contact")
            }
          >
            Hire Me
            <span>→</span>
          </button>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            className={
              menuOpen
                ? "mobile-menu-button open"
                : "mobile-menu-button"
            }
            onClick={() =>
              setMenuOpen(
                (previous) => !previous
              )
            }
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>

        </div>
      </header>


      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      <div
        className={
          menuOpen
            ? "mobile-backdrop visible"
            : "mobile-backdrop"
        }
        onClick={() =>
          setMenuOpen(false)
        }
        aria-hidden="true"
      />


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <aside
        className={
          menuOpen
            ? "mobile-sidebar open"
            : "mobile-sidebar"
        }
        aria-label="Mobile navigation"
      >

        <div className="mobile-sidebar-header">

          <span>
            NAVIGATION
          </span>

          <button
            type="button"
            onClick={() =>
              setMenuOpen(false)
            }
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <nav className="mobile-nav">

          {navItems.map((item, index) => (
            <div
              key={item.id}
              className="mobile-nav-row"
            >

              <span className="mobile-nav-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <button
                type="button"
                className={
                  activeSection === item.id
                    ? "mobile-nav-link active"
                    : "mobile-nav-link"
                }
                onClick={() =>
                  goToSection(item.id)
                }
              >
                {item.label}
              </button>

            </div>
          ))}


          {/* Resume */}

          <div className="mobile-nav-row">

            <span className="mobile-nav-number">
              08
            </span>

            <Link
              to="/resume"
              className={
                location.pathname === "/resume"
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Resume
            </Link>

          </div>

        </nav>


        {/* =================================================
            MOBILE FOOTER
        ================================================= */}

        <div className="mobile-sidebar-footer">

          <a
            href="https://github.com/krishnak712"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://linkedin.com/in/krishna-kumar712"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>

        </div>

      </aside>
    </>
  );
}