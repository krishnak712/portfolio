import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/contentServices";
import "./css/ProjectDetail.css";

function ProjectDetail() {
  const { projectSlug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeWorkflowId, setActiveWorkflowId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [projectSlug]);

  useEffect(() => {
    let mounted = true;

    if (!projectSlug) {
      setProject(null);
      setError("Project not found");
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    setLoading(true);
    setError(null);
    setProject(null);
    setActiveWorkflowId(null);

    getProjectBySlug(projectSlug)
      .then((data) => {
        if (!mounted) return;

        console.log("PROJECT DETAIL FROM FASTAPI:", data);
        setProject(data);
      })
      .catch((err) => {
        console.error("Failed to load project:", err);

        if (!mounted) return;

        setProject(null);
        setError(
          err.response?.status === 404
            ? "Project not found"
            : "Unable to load project."
        );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [projectSlug]);

  const technologies = useMemo(() => {
    return [...(project?.technologies || [])].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    );
  }, [project]);

  const sections = useMemo(() => {
    return [...(project?.sections || [])].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    );
  }, [project]);

  const detail = project?.detail;

  const rbacSection = sections.find(
    (section) => section.section_type === "role-grid"
  );

  const statusSection = sections.find(
    (section) => section.section_type === "status"
  );

  const featureSections = sections.filter(
    (section) => section.section_type === "feature-grid"
  );

  const systemDesignSections = useMemo(() => {
    return [...featureSections, ...(rbacSection ? [rbacSection] : [])].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    );
  }, [featureSections, rbacSection]);

  const authenticationSection = systemDesignSections.find(
    (section) => section.title === "Authentication & Verification"
  );

  const trackingSection = systemDesignSections.find(
    (section) => section.title === "Live Tracking & Geofence"
  );

  const auditSection = systemDesignSections.find(
    (section) => section.title === "Audit & Accountability"
  );

  const activeWorkflow = systemDesignSections.find(
    (section) => section.id === activeWorkflowId
  );

  const activeWorkflowIndex = systemDesignSections.findIndex(
    (section) => section.id === activeWorkflowId
  );

  const projectNumber = String(project?.display_order ?? 1).padStart(2, "0");

  const handleWorkflowClick = (section) => {
  const isClosing = activeWorkflowId === section.id;

  if (isClosing) {
    setActiveWorkflowId(null);
    return;
  }

  setActiveWorkflowId(section.id);

  window.setTimeout(() => {
    const panel = document.getElementById("workflow-detail-panel");

    if (!panel) return;

    const navbarOffset = 116;

    const targetTop =
      panel.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: "smooth",
    });
  }, 180);
};

  const closeWorkflowPanel = () => {
    setActiveWorkflowId(null);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <main className="project-detail-page">
        <section className="project-state project-state-loading">
          <div className="project-state-card project-state-loading-card">
            <div className="project-state-shimmer" aria-hidden="true" />

            <div className="project-state-label">
              <span className="project-state-dot project-state-dot-cyan" />
              PROJECT / LOADING
            </div>

            <h1>Loading project...</h1>
            <p>
              Fetching project details from the portfolio API and project
              registry.
            </p>

            <div className="project-skeleton" aria-hidden="true">
              <span className="skeleton skeleton-lg" />
              <span className="skeleton skeleton-md" />
              <div className="skeleton-grid">
                <span className="skeleton skeleton-card" />
                <span className="skeleton skeleton-card" />
                <span className="skeleton skeleton-card" />
              </div>
            </div>

            <div className="project-state-foot">
              <span>ENDPOINT: getProjectBySlug(slug)</span>
              <span>ASYNC REQUEST IN PROGRESS</span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-detail-page">
        <section className="project-state project-state-error">
          <div className="project-state-card project-state-error-card">
            <div className="project-state-label project-state-label-error">
              <span className="project-state-dot project-state-dot-error" />
              PROJECT / 404
            </div>

            <h1>Project not found.</h1>
            <p>
              The requested project could not be loaded from the portfolio
              project registry.
            </p>

            <Link to="/projects" className="project-state-action">
              <span aria-hidden="true">←</span>
              Back to projects
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="project-detail-page">
      <div className="project-detail-shell">
        {/* HERO */}
        <section className="project-hero project-reveal">
          <div className="project-hero-top">
            <Link to="/#projects" className="project-back-link psa-item">
              <span aria-hidden="true">←</span>
              Back to projects
            </Link>

            <div className="project-hero-meta psa-item">
              <span className="project-index">{projectNumber}</span>
              <span className="project-meta-divider">/</span>

              <span className="project-live-badge">
                <span className="project-live-dot" />
                {project.status || "PROJECT"}
              </span>

              <span className="project-meta-divider">/</span>

              <span className="project-type">
                {project.project_type || project.project_mode || "ENGINEERING PROJECT"}
              </span>
            </div>
          </div>

          <div className="project-hero-grid">
            <div className="project-hero-copy">
              <span className="project-eyebrow psa-item">
                FEATURED ENGINEERING PROJECT
              </span>

              <h1 className="project-hero-title psa-item">
                {project.title}
                <span>.</span>
              </h1>

              <div className="project-role-row psa-item">
                <span className="project-role-badge">
                  {project.role || "Software Engineering Project"}
                </span>
              </div>

              <p className="project-hero-description psa-item">
                {project.description || project.short_description}
              </p>
            </div>

            <aside className="project-hero-side psa-item" aria-label="Project summary">
              <div className="project-hero-side-label">PROJECT OVERVIEW</div>

              <div className="project-hero-side-line">
                <span>TYPE</span>
                <strong>{project.project_type || project.project_mode || "Engineering"}</strong>
              </div>

              <div className="project-hero-side-line">
                <span>STATUS</span>
                <strong>{project.status || "Active"}</strong>
              </div>

              <div className="project-hero-side-line">
                <span>WORKFLOW MODULES</span>
                <strong>{systemDesignSections.length}</strong>
              </div>
            </aside>
          </div>

          <div className="project-technologies psa-item">
            <div className="project-technologies-heading">
              <span className="project-section-dot" />
              <span>CORE TECHNOLOGIES</span>
            </div>

            <div className="project-tech-list">
              {technologies.length > 0 ? (
                technologies.map((technology) => (
                  <span className="project-tech-pill" key={technology.id}>
                    <span className="project-tech-pill-dot" />
                    {technology.technology}
                  </span>
                ))
              ) : (
                <span className="project-empty-inline">
                  No technologies listed.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section id="overview" className="project-section project-reveal">
          <SectionMarker label="01 — OVERVIEW" />

          <div className="project-section-intro psa-item">
            <h2>A workflow built around trust and verification.</h2>
          </div>

          <div className="project-overview-grid">
            <div className="project-overview-copy">
              <article className="project-context-card psa-item">
                <div className="project-card-kicker">PROJECT CONTEXT</div>
                <h3>System architectural context</h3>
                <p>
                  {detail?.overview ||
                    project.description ||
                    project.short_description}
                </p>
              </article>

              {(detail?.problem_statement || detail?.solution) && (
                <div className="project-overview-mini-grid">
                  {detail?.problem_statement && (
                    <article className="project-mini-card project-mini-problem psa-item">
                      <div className="project-card-kicker">PROBLEM STATEMENT</div>
                      <p>{detail.problem_statement}</p>
                    </article>
                  )}

                  {detail?.solution && (
                    <article className="project-mini-card project-mini-solution psa-item">
                      <div className="project-card-kicker">ENGINEERED SOLUTION</div>
                      <p>{detail.solution}</p>
                    </article>
                  )}
                </div>
              )}
            </div>

            <aside className="project-core-workflow psa-item">
              <div className="project-core-workflow-head">
                <div className="project-card-kicker project-card-kicker-bright">
                  <span className="project-icon-dot" aria-hidden="true">
                    ✦
                  </span>
                  CORE WORKFLOW
                </div>
                <span className="project-inspect-label">SELECT TO INSPECT</span>
              </div>

              <div className="project-flow-list">
                {systemDesignSections.length > 0 ? (
                  systemDesignSections.map((section, index) => {
                    const isActive = activeWorkflowId === section.id;

                    return (
                      <button
                        type="button"
                        key={section.id}
                        className={`project-flow-item ${
                          isActive ? "is-active" : ""
                        }`}
                        onClick={() => handleWorkflowClick(section)}
                        aria-expanded={isActive}
                        aria-controls="workflow-detail-panel"
                      >
                        <span className="project-flow-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="project-flow-title">
                          {section.title}
                        </span>

                        <span className="project-flow-arrow" aria-hidden="true">
                          {isActive ? "↑" : "→"}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="project-empty-block">
                    Workflow details are not available for this project.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* SYSTEM DESIGN */}
        <section
          id="system-design"
          className="project-section project-system-section project-reveal"
        >
          <SectionMarker label="02 — SYSTEM DESIGN" />

          <div className="project-system-heading psa-item">
            <div>
              <h2>Engineering the workflow.</h2>
              <p>
                Explore each system-design area to understand how the project
                operates through its major workflow modules.
              </p>
            </div>

            <div className="project-system-hint">
              <span className="project-system-hint-dot" />
              CLICK CARDS TO INSPECT DETAILS
            </div>
          </div>

          <div className="project-architecture-grid">
            {systemDesignSections.length > 0 ? (
              systemDesignSections.map((section, index) => {
                const isActive = activeWorkflowId === section.id;

                return (
                  <button
                    type="button"
                    key={section.id}
                    className={`project-architecture-card psa-item ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => handleWorkflowClick(section)}
                    aria-expanded={isActive}
                    aria-controls="workflow-detail-panel"
                  >
                    <div className="project-architecture-top">
                      <span className="project-architecture-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="project-architecture-card-spacer" aria-hidden="true" />
                    </div>

                    <div className="project-architecture-body">
                      <h3>{section.title}</h3>
                      <p>
                        {section.description ||
                          "This section describes an important part of the project workflow."}
                      </p>
                    </div>

                    <div className="project-architecture-footer">
                      <span>
                        {isActive ? "CLOSE DETAILS ↑" : "VIEW DETAILS →"}
                      </span>

                      <span>
                        MODULE {String.fromCharCode(65 + Math.min(index, 25))}-
                        {index + 1}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="project-empty-block project-empty-span">
                System design details are not available for this project.
              </div>
            )}
          </div>

          {activeWorkflow && (
            <div
              id="workflow-detail-panel"
              className="project-workflow-panel project-reveal"
            >
              <div className="project-workflow-panel-inner">
                <div className="project-workflow-panel-header">
                  <div>
                    <div className="project-workflow-panel-kicker">
                      <span>
                        WORKFLOW / {String(activeWorkflowIndex + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>ACTIVE INSPECTION STATE</span>
                    </div>

                    <h3>{activeWorkflow.title}</h3>
                  </div>

                  <button
                    type="button"
                    className="project-close-button"
                    onClick={closeWorkflowPanel}
                    aria-label="Close workflow details"
                  >
                    CLOSE ×
                  </button>
                </div>

                <p className="project-workflow-description">
                  {activeWorkflow.description ||
                    "This workflow is an important part of the project architecture."}
                </p>

                <div className="project-workflow-items-heading">
                  <span className="project-section-dot" />
                  EXECUTION PHASES &amp; VERIFICATION CHECKPOINTS
                </div>

                {activeWorkflow.items?.length > 0 ? (
                  <div className="project-workflow-items">
                    {[...activeWorkflow.items]
                      .sort(
                        (a, b) =>
                          (a.display_order ?? 0) - (b.display_order ?? 0)
                      )
                      .map((item, index) => (
                        <article
                          className="project-workflow-item psa-item"
                          key={item.id}
                        >
                          <div className="project-workflow-item-number">
                            {item.item_number || String(index + 1).padStart(2, "0")}
                          </div>

                          <div>
                            <h4>{item.title}</h4>
                            {item.description && <p>{item.description}</p>}
                          </div>
                        </article>
                      ))}
                  </div>
                ) : (
                  <div className="project-empty-block">
                    Detailed workflow information is not available for this
                    section.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* SECURITY */}
        <section
          id="security"
          className="project-section project-security-section project-reveal"
        >
          <SectionMarker label="03 — SECURITY" />

          <div className="project-security-heading psa-item">
            <div>
              <div className="project-security-status">
                <span className="project-security-status-dot" />
                SECURITY / ENABLED
              </div>

              <h2>Security is part of the workflow.</h2>
            </div>

            <span className="project-security-note">
              ROLE-BASED ENGINEERING
            </span>
          </div>

          <div className="project-security-grid">
            <SecurityCard
              className="psa-item"
              label="AUTHENTICATION"
              title={authenticationSection?.title || "Authentication"}
              description={
                authenticationSection?.description ||
                "Secure authentication and identity verification protect access to the platform."
              }
            />

            <SecurityCard
              className="psa-item"
              label="AUTHORIZATION"
              title={rbacSection?.title || "Role-Based Access Control"}
              description={
                rbacSection?.description ||
                "Role-Based Access Control separates permissions between platform roles."
              }
            />

            <SecurityCard
              className="psa-item"
              label="PRIVACY"
              title={trackingSection?.title || "Controlled Data Access"}
              description={
                trackingSection?.description ||
                "Sensitive information is handled through controlled application workflows."
              }
            />

            <SecurityCard
              className="psa-item"
              label="ACCOUNTABILITY"
              title={auditSection?.title || "Audit & Accountability"}
              description={
                auditSection?.description ||
                "Important platform activities can be recorded through audit and accountability workflows."
              }
            />
          </div>
        </section>

        {/* PROJECT STATUS */}
        <section className="project-status-section project-reveal">
          <div className="project-status-panel psa-item">
            <div className="project-status-content">
              <div className="project-status-kicker">
                <span className="project-security-status-dot" />
                {statusSection?.eyebrow || "PROJECT STATUS"}
              </div>

              <h2>
                {statusSection?.title ||
                  project.status ||
                  "Currently in development."}
              </h2>

              <p>
                {statusSection?.description ||
                  project.description ||
                  project.short_description}
              </p>

              <div className="project-status-actions">
                <Link to="/#projects" className="project-primary-action">
                  <span aria-hidden="true">←</span>
                  Back to all projects
                </Link>

                <button
                  type="button"
                  className="project-secondary-action"
                  onClick={handleBackToTop}
                >
                  Back to top ↑
                </button>
              </div>
            </div>

            <div className="project-status-watermark" aria-hidden="true">
              {projectNumber}/
              {String(systemDesignSections.length || 1).padStart(2, "0")}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionMarker({ label }) {
  return (
    <div className="project-section-marker psa-item">
      <span>{label}</span>
      <div className="project-section-marker-line" />
    </div>
  );
}

function SecurityCard({ label, title, description, className = "" }) {
  return (
    <article className={`project-security-card ${className}`}>
      <div className="project-security-icon" aria-hidden="true">
        ✦
      </div>

      <div className="project-card-kicker">{label}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default ProjectDetail;
