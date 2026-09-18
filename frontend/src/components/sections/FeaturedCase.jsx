import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/contentServices";
import "./css/FeaturedCase.css";

function FeaturedCase() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadFeaturedProject = async () => {
      try {
        setLoading(true);
        setError("");

        const projects = await getProjects();

        if (!mounted) return;

        const featuredProject = (Array.isArray(projects) ? projects : [])
          .filter((item) => item?.featured)
          .sort(
            (a, b) =>
              (a?.display_order ?? 0) -
              (b?.display_order ?? 0)
          )[0];

        setProject(featuredProject || null);
      } catch (err) {
        console.error("Failed to load featured project:", err);

        if (!mounted) return;

        setError("Unable to load featured project.");
        setProject(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedProject();

    return () => {
      mounted = false;
    };
  }, []);

  const technologies = useMemo(() => {
    return [...(project?.technologies || [])]
      .sort(
        (a, b) =>
          (a?.display_order ?? 0) -
          (b?.display_order ?? 0)
      )
      .slice(0, 8);
  }, [project]);

  const visualTechnologies = useMemo(
    () => technologies.slice(0, 4),
    [technologies]
  );

  if (loading) {
    return (
      <section
        id="featured-project"
        className="featured-case-section psa-reveal"
        aria-label="Featured project"
      >
        <div className="featured-case-container">
          <div className="featured-case-loading psa-item">
            <div className="featured-case-loading-line featured-case-loading-line-small" />
            <div className="featured-case-loading-line featured-case-loading-line-title" />
            <div className="featured-case-loading-card">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="featured-project"
        className="featured-case-section psa-reveal"
        aria-label="Featured project"
      >
        <div className="featured-case-container">
          <div className="featured-case-state psa-item">
            <span className="featured-case-state-label">
              FEATURED PROJECT / ERROR
            </span>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section
      id="featured-project"
      className="featured-case-section psa-reveal"
      aria-labelledby="featured-case-title"
    >
      <div className="featured-case-grid-pattern" aria-hidden="true" />

      <div className="featured-case-container">
        <header className="featured-case-header">
          <div className="featured-case-header-main psa-item">
            <div className="featured-case-kicker-row">
              <span className="featured-case-status-dot" aria-hidden="true" />
              <span className="featured-case-kicker">
                03 // FEATURED CASE STUDY
              </span>
            </div>

            <h2 id="featured-case-title" className="featured-case-title">
              Selected <span>Case Study</span>
            </h2>
          </div>

          <div className="featured-case-header-status psa-item">
            <span className="featured-case-live-dot" aria-hidden="true" />
            <span className="featured-case-status-label">STATUS:</span>
            <strong>{project.status || "AVAILABLE"}</strong>
          </div>
        </header>

        <article className="featured-case-card psa-item">
          <div className="featured-case-card-strip">
            <div className="featured-case-card-strip-left">
              <span>PROJECT DOSSIER</span>
              <span>//</span>
              <span>
                {project.project_type || "FULL STACK PROJECT"}
              </span>
            </div>

            <span className="featured-case-build-label">FEATURED</span>
          </div>

          <div className="featured-case-card-body">
            <div className="featured-case-content">
              <div className="featured-case-meta">
                <span>{project.project_type || "PROJECT"}</span>

                {project.role && (
                  <>
                    <span className="featured-case-meta-separator">•</span>
                    <span>{project.role}</span>
                  </>
                )}
              </div>

              <span className="featured-case-project-code">
                FEATURED_PROJECT // CASE_STUDY
              </span>

              <h3 className="featured-case-project-title">
                {project.title}
              </h3>

              <p className="featured-case-description">
                {project.short_description ||
                  project.description ||
                  "Project details and implementation overview."}
              </p>

              {technologies.length > 0 && (
                <div
                  className="featured-case-tech"
                  aria-label="Technologies used"
                >
                  {technologies.map((tech) => (
                    <span
                      key={tech.id ?? tech.technology}
                      className="featured-case-tech-pill"
                    >
                      {tech.technology}
                    </span>
                  ))}
                </div>
              )}

              <div className="featured-case-actions">
                <Link
                  to={`/projects/${project.slug}`}
                  className="featured-case-primary-button"
                >
                  <span>VIEW CASE STUDY</span>
                  <span className="featured-case-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-case-secondary-button"
                  >
                    <span aria-hidden="true">&lt;/&gt;</span>
                    <span>GIT REPO</span>
                  </a>
                )}
              </div>
            </div>

            <div className="featured-case-visual">
              <div className="featured-case-visual-index" aria-hidden="true">
                01
              </div>

              <div className="featured-case-visual-header">
                <span>PROJECT ARCHITECTURE</span>
                <span className="featured-case-visual-live">
                  <i aria-hidden="true" />
                  ACTIVE VIEW
                </span>
              </div>

              <div className="featured-case-blueprint">
                <div className="featured-case-blueprint-line featured-case-blueprint-line-top" />
                <div className="featured-case-blueprint-line featured-case-blueprint-line-mid" />
                <div className="featured-case-blueprint-line featured-case-blueprint-line-bottom" />

                <div className="featured-case-node featured-case-node-main">
                  <span className="featured-case-node-marker" />
                  <div>
                    <small>PROJECT</small>
                    <strong>FEATURED SYSTEM</strong>
                  </div>
                </div>

                <div className="featured-case-blueprint-connector">
                  <span />
                </div>

                <div className="featured-case-node-row">
                  {visualTechnologies.length > 0 ? (
                    visualTechnologies.map((tech, index) => (
                      <div
                        className="featured-case-node"
                        key={tech.id ?? `${tech.technology}-${index}`}
                      >
                        <span className="featured-case-node-marker" />
                        <div>
                          <small>
                            {index === 0
                              ? "CORE"
                              : index === 1
                                ? "SERVICE"
                                : index === 2
                                  ? "UI"
                                  : "DATA"}
                          </small>
                          <strong>{tech.technology}</strong>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="featured-case-node">
                        <span className="featured-case-node-marker" />
                        <div>
                          <small>CORE</small>
                          <strong>APPLICATION</strong>
                        </div>
                      </div>
                      <div className="featured-case-node">
                        <span className="featured-case-node-marker" />
                        <div>
                          <small>SYSTEM</small>
                          <strong>MODULES</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="featured-case-blueprint-footer">
                  <span>STACK TRACE</span>
                  <span className="featured-case-blueprint-footer-line" />
                  <span>{technologies.length} TECH ITEMS</span>
                </div>
              </div>

              <div className="featured-case-visual-footer">
                <span>JAVA FULL STACK</span>
                <strong>ENGINEERING DOSSIER</strong>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default FeaturedCase;
