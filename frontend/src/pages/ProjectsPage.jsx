import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/contentServices";
import "./css/ProjectsPage.css";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        if (!mounted) {
          return;
        }

        const sorted = [...data].sort(
          (a, b) =>
            (a.display_order ?? 0) -
            (b.display_order ?? 0)
        );

        setProjects(sorted);
      } catch (err) {
        console.error(
          "Failed to load projects:",
          err
        );

        if (mounted) {
          setError("Unable to load projects.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="projects-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="projects-page-hero">

        <div className="projects-page-container">

          <div className="projects-page-navigation">

            <Link
              to="/"
              className="projects-page-back"
            >
              ← Back to portfolio
            </Link>

            <Link
              to="/resume"
              className="projects-page-resume"
            >
              Resume →
            </Link>

          </div>

          <span className="projects-page-kicker">
            PROJECTS / SELECTED WORK
          </span>

          <h1>
            Engineering
            <span> projects.</span>
          </h1>

          <p>
            A collection of software systems and
            applications focused on backend engineering,
            APIs, security and full-stack development.
          </p>

        </div>

      </section>


      {/* =====================================================
          PROJECT LIST
      ===================================================== */}

      <section className="projects-page-list">

        <div className="projects-page-container">

          {/* Loading */}

          {loading && (
            <div className="projects-page-state">
              Loading projects...
            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="projects-page-state">
              {error}
            </div>
          )}


          {/* Empty */}

          {!loading &&
            !error &&
            projects.length === 0 && (
              <div className="projects-page-state">
                No projects available.
              </div>
            )}


          {/* Projects */}

          {!loading &&
            !error &&
            projects.length > 0 &&
            projects.map((project, index) => (

              <article
                className="projects-page-card"
                key={project.id}
              >

                {/* Number */}

                <div className="projects-page-number">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* Main */}

                <div className="projects-page-main">

                  {/* Meta */}

                  <div className="projects-page-meta">

                    <span>
                      {project.project_type ||
                        "ENGINEERING PROJECT"}
                    </span>

                    {project.status && (
                      <span>
                        {project.status}
                      </span>
                    )}

                  </div>


                  {/* Title */}

                  <h2>
                    {project.title}
                  </h2>


                  {/* Description */}

                  <p>
                    {project.short_description ||
                      project.description}
                  </p>


                  {/* Technologies */}

                  {project.technologies?.length > 0 && (
                    <div className="projects-page-tech">

                      {[...project.technologies]
                        .sort(
                          (a, b) =>
                            (a.display_order ?? 0) -
                            (b.display_order ?? 0)
                        )
                        .map((tech) => (
                          <span key={tech.id}>
                            {tech.technology}
                          </span>
                        ))}

                    </div>
                  )}


                  {/* Case Study */}

                  <Link
                    to={`/projects/${project.slug}`}
                    className="projects-page-link"
                  >
                    View Case Study →
                  </Link>

                </div>

              </article>

            ))}

        </div>

      </section>

    </main>
  );
}

export default ProjectsPage;