import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/contentServices";
import "./css/Projects.css";

const FILTERS = ["All", "Personal", "Professional"];

const modeKey = (value) => String(value || "").trim().toLowerCase();
const projectNumber = (index) => String(index + 1).padStart(2, "0");

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();
        if (!mounted) return;

        const list = Array.isArray(data) ? data : [];
        setProjects(
          [...list].sort(
            (a, b) => (a?.display_order ?? 0) - (b?.display_order ?? 0)
          )
        );
      } catch (err) {
        console.error("Failed to load projects:", err);
        if (!mounted) return;
        setError("Unable to load projects.");
        setProjects([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const counts = useMemo(
    () => ({
      All: projects.length,
      Personal: projects.filter((p) => modeKey(p.project_mode) === "personal").length,
      Professional: projects.filter((p) => modeKey(p.project_mode) === "professional").length,
    }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (project) => modeKey(project.project_mode) === modeKey(activeFilter)
    );
  }, [projects, activeFilter]);

  if (loading) {
    return (
      <section id="projects" className="projects-section psa-reveal">
        <div className="projects-grid-pattern" aria-hidden="true" />
        <div className="projects-container">
          <RegistryBar loading />
          <ProjectsHeading count="--" loading />
          <div className="projects-loading-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <article className="project-card project-skeleton psa-item" key={index}>
                <div className="skeleton-head"><span /><span /></div>
                <span className="skeleton-title" />
                <div className="skeleton-copy"><span /><span /><span /></div>
                <span className="skeleton-visual" />
                <div className="skeleton-pills"><span /><span /><span /><span /></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects-section psa-reveal">
        <div className="projects-grid-pattern" aria-hidden="true" />
        <div className="projects-container">
          <RegistryBar />
          <div className="projects-error-state psa-item">
            <div className="projects-error-icon">!</div>
            <div>
              <span className="projects-state-kicker">PROJECTS / ERROR</span>
              <h3>Unable to load projects.</h3>
              <p>The project registry could not be loaded at this time.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section psa-reveal" aria-labelledby="projects-title">
      <div className="projects-grid-pattern" aria-hidden="true" />

      <div className="projects-container">
        <RegistryBar />
        <ProjectsHeading count={filteredProjects.length} />

        <div className="projects-filter-rail psa-item">
          <div className="projects-filter-left">
            <span className="projects-filter-label">[ FILTER ]</span>
            <div className="projects-filters" role="group" aria-label="Filter projects">
              {FILTERS.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    className={`projects-filter ${active ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={active}
                  >
                    <span className="projects-filter-dot" aria-hidden="true" />
                    <span>[ {filter.toUpperCase()} ]</span>
                    <span className="projects-filter-count">
                      ({String(counts[filter]).padStart(2, "0")})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="projects-filter-readout">
            VIEW: <strong>{activeFilter.toUpperCase()}</strong>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="projects-empty-state psa-item">
            <span className="projects-empty-mark">[ 0x00 ]</span>
            <span className="projects-state-kicker">PROJECT REGISTRY / EMPTY</span>
            <h3>NO {activeFilter.toUpperCase()} PROJECTS AVAILABLE</h3>
            <p>No project records match the active registry filter.</p>
            {activeFilter !== "All" && (
              <button
                type="button"
                className="projects-reset-button"
                onClick={() => setActiveFilter("All")}
              >
                RESET FILTER
              </button>
            )}
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => {
              const technologies = [...(project?.technologies || [])]
                .sort((a, b) => (a?.display_order ?? 0) - (b?.display_order ?? 0))
                .slice(0, 6);

              const tech1 = technologies[0]?.technology || "APPLICATION";
              const tech2 = technologies[1]?.technology || "SYSTEM";
              const tech3 = technologies[2]?.technology || "MODULE";

              return (
                <article className="project-card psa-item" key={project.id}>
                  <span className="card-corner tl">┌</span>
                  <span className="card-corner tr">┐</span>
                  <span className="card-corner bl">└</span>
                  <span className="card-corner br">┘</span>

                  <div className="project-card-inner">
                    <div className="project-card-header">
                      <div className="project-index-group">
                        <span className="project-number">{projectNumber(index)}</span>
                        <span className="project-type">{project.project_mode || "PROJECT"}</span>
                      </div>
                      <div className="project-status">
                        <span className="project-status-dot" />
                        <span>{project.status || "AVAILABLE"}</span>
                      </div>
                    </div>

                    <div className="project-title-block">
                      <span className="project-code-label">PROJECT_RECORD // {projectNumber(index)}</span>
                      <h3>{project.title}</h3>
                      <p>
                        {project.short_description ||
                          project.description ||
                          "Project details are available in the case study."}
                      </p>
                    </div>

                    <div className="project-visual" aria-hidden="true">
                      <div className="project-visual-topline">
                        <span>// PROJECT BLUEPRINT</span>
                        <span>{(project.project_mode || "PROJECT").toUpperCase()}</span>
                      </div>
                      <div className="project-blueprint">
                        <span className="blueprint-line top" />
                        <span className="blueprint-line bottom" />
                        <span className="blueprint-line vertical" />

                        <BlueprintNode label="PROJECT" value="APPLICATION" main />
                        <div className="blueprint-connector"><span /></div>

                        <div className="blueprint-node-row">
                          <BlueprintNode label="STACK" value={tech1} />
                          <BlueprintNode label="SYSTEM" value={tech2} />
                          <BlueprintNode label="MODULE" value={tech3} wide />
                        </div>

                        <div className="blueprint-footer">
                          <span>STACK TRACE</span>
                          <span className="blueprint-footer-line" />
                          <span>{String(technologies.length).padStart(2, "0")} ITEMS</span>
                        </div>
                      </div>
                    </div>

                    {technologies.length > 0 && (
                      <div className="project-tech" aria-label="Technologies used">
                        {technologies.map((tech) => (
                          <span className="project-tech-pill" key={tech.id ?? tech.technology}>
                            {tech.technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="project-card-footer">
                      <span className="project-footer-label">PROJECT RECORD</span>
                      <Link to={`/projects/${project.slug}`} className="project-link">
                        <span>VIEW PROJECT</span>
                        <span className="project-link-arrow">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="projects-footer psa-item">
          <div className="projects-footer-left">
            <span>TOTAL PROJECTS: <strong>{String(projects.length).padStart(2, "0")}</strong></span>
            <span className="footer-divider">|</span>
            <span>ACTIVE FILTER: <strong>{activeFilter.toUpperCase()}</strong></span>
            <span className="footer-divider">|</span>
            <span className="registry-status"><i /> REGISTRY STATUS: <strong>ONLINE</strong></span>
          </div>
          <Link to="/#contact" className="projects-discuss-link">DISCUSS A PROJECT →</Link>
        </div>
      </div>
    </section>
  );
}

function RegistryBar({ loading = false }) {
  return (
    <div className="projects-registry-bar psa-item">
      <div className="projects-registry-left">
        <span className="registry-accent">┌[REGISTRY_INDEX]</span>
        <span>NODE: ARCHIVE</span>
        <span>•</span>
        <span>PROJECT CATALOG</span>
      </div>
      <div className="projects-registry-live">
        <span className="projects-pulse-dot" />
        <span>{loading ? "LOADING REGISTRY" : "FEED: PROJECT REGISTRY"}</span>
      </div>
    </div>
  );
}

function ProjectsHeading({ count, loading = false }) {
  return (
    <div className="projects-heading">
      <div className="projects-heading-main psa-item">
        <div className="projects-kicker">
          <span className="projects-kicker-terminal">&gt;_</span>
          <span>05 // PROJECTS | ENGINEERING ARCHIVE</span>
        </div>
        <h2 id="projects-title">
          Selected work &amp;
          <span> engineering projects.</span>
        </h2>
        <p>
          A curated collection of systems and applications focused on backend engineering,
          APIs, security, databases and full-stack development.
        </p>
      </div>
      <div className="projects-count-card psa-item">
        <span className="projects-count-value">
          {typeof count === "number" ? String(count).padStart(2, "0") : count}
        </span>
        <span className="projects-count-label">PROJECTS</span>
      </div>
    </div>
  );
}

function BlueprintNode({ label, value, main = false, wide = false }) {
  return (
    <div
      className={`blueprint-node ${main ? "main" : ""} ${wide ? "wide" : ""}`}
    >
      <span className="blueprint-marker" />
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default Projects;
