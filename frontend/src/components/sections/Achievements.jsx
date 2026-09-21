import { useEffect, useMemo, useState } from "react";
import { getAchievements } from "../../services/contentServices";
import "./css/Achievements.css";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getAchievementType(achievement) {
  return (
    achievement.icon ||
    achievement.type ||
    achievement.category ||
    "ACHIEVEMENT"
  );
}

function getAchievementLink(achievement) {
  return achievement.link || achievement.url || achievement.credential_url || "";
}

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadAchievements = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAchievements();

        if (!mounted) return;

        setAchievements(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load achievements:", err);

        if (!mounted) return;

        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to load achievements."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAchievements();

    return () => {
      mounted = false;
    };
  }, []);

  const orderedAchievements = useMemo(() => {
    return [...achievements].sort((a, b) => {
      const orderDifference =
        (a.display_order ?? 0) - (b.display_order ?? 0);

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return String(a.date || "").localeCompare(String(b.date || ""));
    });
  }, [achievements]);

  return (
    <section className="achievements-section psa-reveal" id="achievements">
      <div className="achievements-bg-grid" aria-hidden="true" />
      <div className="achievements-bg-glow" aria-hidden="true" />

      <div className="achievements-container">
        <div className="achievements-registry psa-item">
          <div className="achievements-registry-left">
            <span className="achievements-registry-mark">
              ┌[LEARNING_INDEX]
            </span>

            <span className="achievements-registry-separator">•</span>

            <span className="achievements-registry-text">
              ACHIEVEMENT REGISTER // DEVELOPMENT_RECORD
            </span>
          </div>

          <div className="achievements-live">
            <span className="achievements-live-dot" />
            <span>LEARNING LOG ACTIVE</span>
          </div>
        </div>

        <header className="achievements-header psa-item">
          <div className="achievements-heading">
            <div className="achievements-eyebrow">
              <span>07 // ACHIEVEMENTS</span>
              <i />
              <span>QUALIFICATION_LOG</span>
            </div>

            <h2>
              Learning, building,{" "}
              <span>and improving.</span>
            </h2>

            <p>
              A combination of professional learning, academic background,
              and hands-on software engineering experience.
            </p>
          </div>

          <div className="achievements-counter" aria-label="Achievement count">
            <div className="achievements-counter-top">
              <span>RECORDS</span>
              <strong>{loading ? ".." : error ? "--" : "INDEXED"}</strong>
            </div>

            <div className="achievements-counter-main">
              <span className="achievements-count">
                {String(orderedAchievements.length).padStart(2, "0")}
              </span>

              <div className="achievements-counter-status">
                <span>ARCHIVE_ONLINE</span>
                <small>
                  {loading
                    ? "SYNC: PENDING"
                    : error
                      ? "SYNC: FAILED"
                      : "SYNC: ACTIVE"}
                </small>
              </div>
            </div>
          </div>
        </header>

        <div className="achievements-content">
          {loading && (
            <div className="achievements-list" aria-label="Loading achievements">
              {[0, 1, 2].map((index) => (
                <article
                  className="achievement-card achievement-card-skeleton psa-item"
                  key={index}
                  aria-hidden="true"
                >
                  <div className="achievement-skeleton-number" />
                  <div className="achievement-skeleton-body">
                    <span className="achievement-skeleton-small" />
                    <span className="achievement-skeleton-title" />
                    <span className="achievement-skeleton-meta" />
                    <span className="achievement-skeleton-description" />
                  </div>
                  <div className="achievement-skeleton-action" />
                </article>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="achievements-state achievements-state-error psa-item">
              <span className="achievements-state-code">ACHIEVEMENTS // SYSTEM_FAULT</span>
              <h3>Unable to load achievements.</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && orderedAchievements.length === 0 && (
            <div className="achievements-state achievements-state-empty psa-item">
              <span className="achievements-state-code">ACHIEVEMENTS // EMPTY</span>
              <h3>NO ACHIEVEMENTS AVAILABLE</h3>
              <p>
                Achievements and certifications will appear here once they are
                added into the portfolio record.
              </p>
            </div>
          )}

          {!loading && !error && orderedAchievements.length > 0 && (
            <div className="achievements-list">
              {orderedAchievements.map((achievement, index) => {
                const link = getAchievementLink(achievement);

                return (
                  <article
                    className="achievement-card psa-item"
                    key={achievement.id ?? `${achievement.title}-${index}`}
                  >
                    <div className="achievement-accent" aria-hidden="true" />

                    <div className="achievement-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="achievement-main">
                      <div className="achievement-topline">
                        <span className="achievement-type">
                          {getAchievementType(achievement)}
                        </span>

                        {achievement.id != null && (
                          <span className="achievement-id">
                            RECORD_{String(achievement.id).padStart(2, "0")}
                          </span>
                        )}
                      </div>

                      <h3>{achievement.title || "Untitled achievement"}</h3>

                      {(achievement.organization ||
                        achievement.issuer ||
                        achievement.company) && (
                        <div className="achievement-source">
                          <span aria-hidden="true">◆</span>
                          <span>
                            {achievement.organization ||
                              achievement.issuer ||
                              achievement.company}
                          </span>
                        </div>
                      )}

                      {achievement.description && (
                        <p>{achievement.description}</p>
                      )}
                    </div>

                    <div className="achievement-side">
                      {achievement.date && (
                        <span className="achievement-date">
                          {formatDate(achievement.date)}
                        </span>
                      )}

                      {link && (
                        <a
                          className="achievement-action"
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>VIEW RECORD</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="achievements-bottom psa-item">
          <div className="achievements-bottom-left">
            <div className="achievements-bottom-node">
              <strong>01</strong>
              <span>NODE</span>
            </div>

            <div className="achievements-bottom-copy">
              <div className="achievements-bottom-title">
                <h3>ALWAYS LEARNING.</h3>
                <span />
              </div>

              <p>
                Currently deepening my skills in backend architecture,
                microservices, security, and full-stack development.
              </p>
            </div>
          </div>

          <div className="achievements-bottom-status">
            <div>
              <span>LEARNING STATUS:</span>
              <strong>CONTINUOUS // ACTIVE_CYCLE</strong>
            </div>

            <span className="achievements-bottom-note">
              DEVELOPMENT_DOSSIER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
