import { useEffect, useState } from "react";
import { getAchievements } from "../../services/contentServices";
import "./css/Achievements.css";

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAchievements();

        console.log("ACHIEVEMENTS FROM FASTAPI:", data);

        if (mounted) {
          setAchievements(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);

        if (mounted) {
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Unable to load achievements."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Loading
  if (loading) {
    return (
      <section
        className="achievements-section"
        id="achievements"
      >
        <div className="achievements-container">
          <div className="achievements-state">
            <span className="achievements-state-label">
              07 — ACHIEVEMENTS
            </span>

            <p>Loading achievements...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section
        className="achievements-section"
        id="achievements"
      >
        <div className="achievements-container">
          <div className="achievements-state achievements-state-error">
            <span className="achievements-state-label">
              07 — ACHIEVEMENTS
            </span>

            <h3>Unable to load achievements.</h3>

            <p>Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty
  if (achievements.length === 0) {
    return (
      <section
        className="achievements-section"
        id="achievements"
      >
        <div className="achievements-container">
          <div className="achievements-header">
            <div>
              <span className="achievements-eyebrow">
                07 — ACHIEVEMENTS
              </span>

              <h2>
                Learning, building,
                <br />
                <span>and improving.</span>
              </h2>
            </div>

            <p>
              A combination of professional learning, academic
              background, and hands-on software engineering
              experience.
            </p>
          </div>

          <div className="achievements-state achievements-state-empty">
            <h3>No achievements added yet.</h3>

            <p>
              Achievements and certifications will appear here
              once they are added.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Main
  return (
    <section
      className="achievements-section"
      id="achievements"
    >
      <div className="achievements-container">

        {/* Header */}
        <div className="achievements-header">
          <div>
            <span className="achievements-eyebrow">
              07 — ACHIEVEMENTS
            </span>

            <h2>
              Learning, building,
              <br />
              <span>and improving.</span>
            </h2>
          </div>

          <p>
            A combination of professional learning, academic
            background, and hands-on software engineering
            experience.
          </p>
        </div>

        {/* Achievement List */}
        <div className="achievement-list">
          {achievements.map((achievement, index) => (
            <article
              className="achievement-card"
              key={
                achievement.id ??
                `${achievement.title}-${index}`
              }
            >
              <div className="achievement-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="achievement-content">
                <span className="achievement-subtitle">
                  {achievement.icon || "ACHIEVEMENT"}
                </span>

                <h3>{achievement.title}</h3>

                {achievement.description && (
                  <p>{achievement.description}</p>
                )}

                {achievement.date && (
                  <span className="achievement-meta">
                    {formatDate(achievement.date)}
                  </span>
                )}
              </div>

              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="achievement-arrow"
                  aria-label={`View ${achievement.title}`}
                >
                  →
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="achievements-bottom">
          <span className="bottom-mark">
            01
          </span>

          <div>
            <strong>
              Always learning.
            </strong>

            <p>
              Currently deepening my skills in backend
              architecture, microservices, security, and
              full-stack development.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}