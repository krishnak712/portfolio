import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/contentServices";
import "./css/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        const sortedProjects = [...data].sort(
          (a, b) =>
            (a.display_order ?? 0) -
            (b.display_order ?? 0)
        );

        setProjects(sortedProjects);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  /*
   * Filter projects using project_mode
   * received from the backend.
   */
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") {
      return true;
    }

    return project.project_mode === activeFilter;
  });

  /*
   * Loading State
   */
  if (loading) {
    return (
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-state">
            <span>PROJECTS / LOADING</span>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * Error State
   */
  if (error) {
    return (
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-state">
            <span>PROJECTS / ERROR</span>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* =========================
            Heading
        ========================== */}
        <div className="projects-heading">

          <div>
            <span className="projects-kicker">
              05 / PROJECTS
            </span>

            <h2>
              Selected work &
              <span> engineering projects.</span>
            </h2>

            <p>
              A collection of systems and applications
              I've worked on, with a focus on backend
              engineering, APIs, security and full-stack
              development.
            </p>
          </div>

          <span className="projects-count">
            {String(filteredProjects.length).padStart(2, "0")}{" "}
            PROJECTS
          </span>

        </div>

        {/* =========================
            Project Filters
        ========================== */}
        <div
          className="projects-filters"
          role="group"
          aria-label="Filter projects"
        >

          <button
            type="button"
            className={`projects-filter ${
              activeFilter === "All" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("All")}
          >
            All
          </button>

          <button
            type="button"
            className={`projects-filter ${
              activeFilter === "Personal" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("Personal")}
          >
            Personal
          </button>

          <button
            type="button"
            className={`projects-filter ${
              activeFilter === "Professional" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFilter("Professional")
            }
          >
            Professional
          </button>

        </div>

        {/* =========================
            Empty State
        ========================== */}
        {filteredProjects.length === 0 ? (
          <div className="projects-state">

            <span>
              PROJECTS / EMPTY
            </span>

            <p>
              {activeFilter === "Personal"
                ? "No personal projects are currently available."
                : activeFilter === "Professional"
                ? "No professional projects are currently available."
                : "No projects are currently available."}
            </p>

          </div>
        ) : (

          /* =========================
             Projects Grid
          ========================== */
          <div className="projects-grid">

            {filteredProjects.map((project, index) => {

              const technologies = [
                ...(project.technologies || []),
              ]
                .sort(
                  (a, b) =>
                    (a.display_order ?? 0) -
                    (b.display_order ?? 0)
                )
                .slice(0, 6);

              return (
                <article
                  className="project-card"
                  key={project.id}
                >

                  {/* =========================
                      Card Header
                  ========================== */}
                  <div className="project-card-header">

                    <span className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="project-status">
                      {project.status || "PROJECT"}
                    </span>

                  </div>

                  {/* =========================
                      Project Visual
                  ========================== */}
                  <div
                    className="project-visual"
                    data-parallax="0.05"
                  >
                    <div className="project-code-window">

                      <div className="project-code-top">

                        <span />
                        <span />
                        <span />

                        <small>
                          {project.slug ||
                            "project.system"}
                        </small>

                      </div>

                      <div className="project-code-body">

                        <span className="code-line">
                          <i>01</i>
                          <b>system</b>
                          <em>:</em>
                          application
                        </span>

                        <span className="code-line">
                          <i>02</i>
                          <b>architecture</b>
                          <em>:</em>
                          scalable
                        </span>

                        <span className="code-line">
                          <i>03</i>
                          <b>security</b>
                          <em>:</em>
                          enabled
                        </span>

                        <span className="code-line">
                          <i>04</i>
                          <b>api</b>
                          <em>:</em>
                          REST
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* =========================
                      Card Content
                  ========================== */}
                  <div className="project-card-content">

                    {/* Project Mode */}
                    {project.project_mode && (
                      <span className="project-type">
                        {project.project_mode}
                      </span>
                    )}

                    {/* Project Title */}
                    <h3>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p>
                      {project.short_description ||
                        project.description}
                    </p>

                    {/* Technologies */}
                    {technologies.length > 0 && (
                      <div className="project-tech">

                        {technologies.map((tech) => (
                          <span key={tech.id}>
                            {tech.technology}
                          </span>
                        ))}

                      </div>
                    )}

                    {/* View Project */}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-link"
                    >
                      <span>
                        View Project
                      </span>

                      <span>
                        →
                      </span>
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

        {/* =========================
            Footer
        ========================== */}
        <div className="projects-footer">

          <span>
            MORE PROJECTS WILL BE ADDED AS THEY ARE
            COMPLETED.
          </span>

          <Link to="/#contact">
            Discuss a Project →
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Projects;