import "./css/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <button
            type="button"
            className="footer-logo"
            onClick={scrollToTop}
            aria-label="Back to home"
          >
            KK
          </button>

          <div className="footer-brand-text">
            <strong>Krishna Kumar</strong>
            <span>Java Full Stack Developer</span>
          </div>
        </div>

        {/* Social links */}
        <div className="footer-links">
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

          <a href="mailto:pandiraman131@gmail.com">
            Email ↗
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <span>© 2026 Krishna Kumar</span>

          <button
            type="button"
            onClick={scrollToTop}
          >
            Back to top ↑
          </button>
        </div>

      </div>
    </footer>
  );
}