import "./css/Hero.css";
import Hero3D from "./Hero3D";

function Hero({ profile }) {
  if (!profile) {
    return (
      <section className="hero" id="home">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="hero-container">
          <div className="hero-grid hero-grid-loading">
            <div className="hero-content">
              <div className="hero-eyebrow hero-loading-line">
                <span className="hero-eyebrow-line" />
                <span>Loading...</span>
              </div>
              <h1 className="hero-title">
                Hi, I&apos;m <span>Krishna Kumar</span>
              </h1>
              <p className="hero-description">Loading profile...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const profileImage = profile.profile_image || "/images/profile.jpeg";

  return (
    <section className="hero" id="home">
      <div className="hero-grid-overlay" aria-hidden="true" />
      <div className="hero-glow hero-glow-top" aria-hidden="true" />
      <div className="hero-glow hero-glow-bottom" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-meta-row">
              <div className="hero-eyebrow">
                <span className="hero-live-dot" aria-hidden="true" />
                <span>{profile.role}</span>
              </div>

              <div className="hero-environment">
                <span className="hero-env-dot" aria-hidden="true" />
                <span>INIT_ENV:</span>
                <span className="hero-env-value">DEVELOPMENT</span>
                <span className="hero-slash">/</span>
                <span>STACK:</span>
                <span className="hero-env-value">JAVA</span>
              </div>
            </div>

            <div className="hero-heading-block">
              <span className="hero-greeting">Hi, I&apos;m</span>
              <h1 className="hero-title">{profile.name}</h1>
              <h2 className="hero-role">{profile.role}</h2>
            </div>

            <p className="hero-description">
              {profile.short_bio}
            </p>

            <div className="hero-actions">
              <a href="#contact" className="hero-btn hero-btn-primary">
                <span>Hire Me for Projects</span>
                <span className="hero-btn-arrow" aria-hidden="true">↗</span>
              </a>

              <a href="#projects" className="hero-btn hero-btn-secondary">
                <span>View My Work</span>
                <span className="hero-btn-arrow" aria-hidden="true">→</span>
              </a>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-btn hero-btn-resume"
                >
                  <span>Download Resume</span>
                  <span className="hero-btn-arrow" aria-hidden="true">↓</span>
                </a>
              )}
            </div>

            <div className="hero-socials">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="hero-social"
                >
                  <span className="social-icon social-icon-github" aria-hidden="true">⌘</span>
                  <span>GitHub ↗</span>
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
                  <span className="social-icon" aria-hidden="true">in</span>
                  <span>LinkedIn ↗</span>
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="hero-social"
                >
                  <span className="social-icon" aria-hidden="true">@</span>
                  <span>Email ↗</span>
                </a>
              )}
            </div>

            {profile.location && (
              <div className="hero-location">
                <span className="location-icon" aria-hidden="true">⌖</span>
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          <div className="hero-profile-section">
            <div className="hero-profile-wrapper">
              <div className="hero-corner-cross hero-cross-top-left" aria-hidden="true">+</div>
              <div className="hero-corner-cross hero-cross-top-right" aria-hidden="true">+</div>
              <div className="hero-corner-cross hero-cross-bottom-left" aria-hidden="true">+</div>
              <div className="hero-corner-cross hero-cross-bottom-right" aria-hidden="true">+</div>

              <div className="hero-visual-substrate" aria-hidden="true">
                <div className="hero-orbit hero-orbit-outer" />
                <div className="hero-orbit hero-orbit-inner">
                  <span className="hero-orbit-node hero-orbit-node-top" />
                  <span className="hero-orbit-node hero-orbit-node-bottom" />
                </div>
                <div className="hero-hex" />
                <div className="hero-core-glow" />
              </div>

              <div className="hero-profile-frame">
                <div className="hero-profile-bracket" aria-hidden="true" />
                <div className="hero-profile-ring">
                  <div className="hero-profile-inner">
                    <img
                      src={profileImage}
                      alt={profile.name}
                      className="hero-profile-image"
                    />
                    <div className="hero-scanlines" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="hero-status-badge hero-status-focus">
                <div className="hero-status-heading">
                  <span className="hero-status-dot" aria-hidden="true" />
                  <span>CURRENT FOCUS</span>
                </div>
                <strong>Java &amp; Spring Boot</strong>
                <small>JVM_RUNTIME // v21_LTS</small>
              </div>

              <div className="hero-status-badge hero-status-system">
                <div className="hero-system-icon" aria-hidden="true">⌘</div>
                <div className="hero-system-copy">
                  <span>SCALABLE SYSTEMS</span>
                  <strong>REST APIs • Microservices</strong>
                  <small>DISTRIBUTED ARCHITECTURE</small>
                </div>
              </div>

              <div className="hero-3d-layer" aria-hidden="true">
                <Hero3D />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
