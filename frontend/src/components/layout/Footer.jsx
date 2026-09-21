import "./css/Footer.css";

export default function Footer({ profile }) {
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
           <strong>
            {profile?.name || "Portfolio"}
           </strong>

           <span>
            {profile?.role || "Developer"}
           </span>
          </div>
        </div>

        {/* Social links */}
        <div className="footer-links">
         {profile?.github_url && (
          <a
           href={profile.github_url}
           target="_blank"
           rel="noopener noreferrer"
          >
           GitHub ↗
          </a>
         )}

         {profile?.linkedin_url && (
          <a
           href={profile.linkedin_url}
           target="_blank"
           rel="noopener noreferrer"
          >
           LinkedIn ↗
          </a>
         )}

         {profile?.email && (
          <a href={`mailto:${profile.email}`}>
            Email ↗
          </a>
         )}
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <span>
           © {new Date().getFullYear()}{" "}
           {profile?.name || "Portfolio"}
          </span>

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