import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/contentServices";
import "./css/FeaturedCase.css";

function FeaturedCase() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeaturedProject = async () => {
      try {
        setLoading(true);

        const projects = await getProjects();

        const featuredProject = projects
          .filter((item) => item.featured)
          .sort(
            (a, b) =>
              (a.display_order ?? 0) -
              (b.display_order ?? 0)
          )[0];

        setProject(featuredProject || null);
      } catch (err) {
        console.error("Failed to load featured project:", err);
        setError("Unable to load featured project.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProject();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="featured-case-section">
        <div className="featured-case-container">
          <div className="featured-case-loading">
            Loading featured project...
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="featured-case-section">
        <div className="featured-case-container">
          <div className="featured-case-error">
            {error}
          </div>
        </div>
      </section>
    );
  }

  // No featured project
  if (!project) {
    return null;
  }

  return (
    <section
      id="featured-project"
      className="featured-case-section"
    >
      <div className="featured-case-container">

        {/* Header */}
        <div className="featured-case-header">
          <div>
            <span className="featured-case-eyebrow">
              FEATURED PROJECT
            </span>

            <h2>
              Selected Case Study
            </h2>
          </div>

          <span className="featured-case-status">
            {project.status}
          </span>
        </div>

        {/* Main Card */}
        <div className="featured-case-card">

          {/* Content */}
          <div className="featured-case-content">

            {/* Project Meta */}
            <div className="featured-case-meta">
              <span>
                {project.project_type}
              </span>

              {project.role && (
                <>
                  <span className="featured-case-dot">
                    •
                  </span>

                  <span>
                    {project.role}
                  </span>
                </>
              )}
            </div>

            {/* Project Title */}
            <h3>
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="featured-case-description">
              {project.short_description ||
                project.description}
            </p>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="featured-case-tech">
                {[...(project.technologies || [])]
                  .sort(
                    (a, b) =>
                      (a.display_order ?? 0) -
                      (b.display_order ?? 0)
                  )
                  .slice(0, 8)
                  .map((tech) => (
                    <span key={tech.id}>
                      {tech.technology}
                    </span>
                  ))}
              </div>
            )}

            {/* Actions */}
            <div className="featured-case-actions">

              <Link
                to={`/projects/${project.slug}`}
                className="featured-case-button"
              >
                View Case Study
              </Link>

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-case-secondary"
                >
                  GitHub
                </a>
              )}

            </div>

          </div>

          {/* Visual */}
          <div className="featured-case-visual">

            <div className="featured-case-number" data-parallax="0.1">
              01
            </div>

            <div className="featured-case-visual-line" />

            <div className="featured-case-visual-text">
              <span>
                JAVA FULL STACK
              </span>

              <strong>
                ENTERPRISE SYSTEM
              </strong>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedCase;