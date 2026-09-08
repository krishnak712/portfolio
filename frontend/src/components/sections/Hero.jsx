import "./css/Hero.css";
import Hero3D from "./Hero3D";

function Hero({ profile }) {
  if (!profile) {
    return (
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" />
                <span>Loading...</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <span>Krishna Kumar</span>
              </h1>

              <p className="hero-description">
                Loading profile...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="home">
      {/* Ambient background glow */}
      <div className="hero-ambient-glow" />

      <div className="hero-container">
        <div className="hero-grid">

          {/* LEFT — CONTENT */}
          <div className="hero-content">

            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>{profile.role}</span>
            </div>

            <div className="hero-environment">
              <span className="hero-dot" />
              <span>INIT_ENV:</span>
              <span className="hero-env-value">DEVELOPMENT</span>
              <span className="hero-slash">/</span>
              <span>stack:</span>
              <span className="hero-env-value">JAVA</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span>{profile.name}</span>
            </h1>

            <h2 className="hero-role">
              {profile.role}
            </h2>

            <p className="hero-description">
              {profile.short_bio}
            </p>

            {/* Buttons */}
            <div className="hero-actions">

              <a
                href="#contact"
                className="hero-btn hero-btn-primary"
              >
                <span>Hire Me for Projects</span>
                <span className="hero-btn-arrow">↗</span>
              </a>

              <a
                href="#projects"
                className="hero-btn hero-btn-secondary"
              >
                <span>View My Work</span>
                <span className="hero-btn-arrow">→</span>
              </a>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-btn hero-btn-resume"
                >
                  <span>Download Resume</span>
                  <span className="hero-btn-arrow">↓</span>
                </a>
              )}

            </div>

            {/* Social links */}
            <div className="hero-socials">

              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="hero-social"
                >
                  <span className="social-icon">⌘</span>
                  <span>GitHub</span>
                </a>
              )}

              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hero-social"
                >
                  <span className="social-icon">in</span>
                  <span>LinkedIn</span>
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="hero-social"
                >
                  <span className="social-icon">@</span>
                  <span>Email</span>
                </a>
              )}

            </div>

            {/* Location */}
            {profile.location && (
              <div className="hero-location">
                <span className="location-icon">⌖</span>
                <span>{profile.location}</span>
              </div>
            )}

          </div>

          {/* RIGHT — PROFILE */}
          <div className="hero-profile-section">

            <div className="hero-profile-wrapper">

              <div className="hero-profile-glow" />

              <div className="hero-profile-ring">

                <div className="hero-profile-inner">

                  <img
                    src={profile.profile_image || "/images/profile.jpeg"}
                    alt={profile.name}
                    className="hero-profile-image"
                  />

                </div>

              </div>

              {/* Top status badge */}
              <div className="hero-status-badge">
                <span className="status-indicator" />

                <div>
                  <span className="status-label">
                    CURRENT FOCUS
                  </span>

                  <strong>
                    Java & Spring Boot
                  </strong>
                </div>
              </div>

              {/* Bottom technology badge */}
              <div className="hero-tech-badge">

                <div className="tech-badge-icon">
                  &lt;/&gt;
                </div>

                <div>
                  <span className="tech-badge-label">
                    BUILDING SCALABLE SYSTEMS
                  </span>

                  <strong>
                    REST APIs&nbsp; • &nbsp;Microservices
                  </strong>
                </div>

              </div>
              <Hero3D />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;