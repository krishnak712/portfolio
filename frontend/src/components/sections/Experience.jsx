import { useEffect, useMemo, useState } from "react";
import { getExperience } from "../../services/contentServices";
import "./css/Experience.css";

function formatMonthYear(dateValue) {
  if (!dateValue) return "";

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getDuration(startDate, endDate) {
  if (!startDate) return "";

  const start = new Date(`${startDate}T00:00:00`);
  const end = endDate
    ? new Date(`${endDate}T00:00:00`)
    : new Date();

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return "";
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() >= start.getDate()) {
    months += 1;
  }

  if (months <= 0) {
    return "LESS THAN 1 MONTH";
  }

  if (months < 12) {
    return `${months} ${months === 1 ? "MONTH" : "MONTHS"}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "YEAR" : "YEARS"}`;
  }

  return `${years}Y ${remainingMonths}M`;
}

function sortExperiences(items) {
  return [...items].sort((a, b) => {
    const orderA = a?.display_order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b?.display_order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return (
      new Date(`${b?.start_date || "1900-01-01"}T00:00:00`) -
      new Date(`${a?.start_date || "1900-01-01"}T00:00:00`)
    );
  });
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadExperience = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getExperience();

        if (!mounted) return;

        const safeData = Array.isArray(data) ? data : [];
        setExperiences(sortExperiences(safeData));
      } catch (err) {
        console.error("Failed to load experience:", err);

        if (!mounted) return;

        setError("Unable to load experience.");
        setExperiences([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadExperience();

    return () => {
      mounted = false;
    };
  }, []);

  const currentExperience = useMemo(
    () => experiences.find((experience) => !experience?.end_date) || null,
    [experiences]
  );

  if (loading) {
    return (
      <section
        id="experience"
        className="experience-section psa-reveal"
        aria-labelledby="experience-title"
      >
        <div className="experience-grid-pattern" aria-hidden="true" />

        <div className="experience-container">
          <div className="experience-registry-bar psa-item">
            <div className="experience-registry-left">
              <span className="experience-registry-accent">
                ┌[CAREER_INDEX]
              </span>
              <span>ENGINEERING TIMELINE</span>
              <span className="experience-registry-separator">•</span>
              <span>EXPERIENCE_RECORD</span>
            </div>

            <div className="experience-registry-live">
              <span className="experience-pulse-dot" />
              <span>LOADING EXPERIENCE LOG</span>
            </div>
          </div>

          <div className="experience-header">
            <div className="experience-header-main psa-item">
              <span className="experience-eyebrow">
                06 // EXPERIENCE
              </span>

              <h2 id="experience-title">
                Growing through{" "}
                <span>real-world engineering.</span>
              </h2>

              <p>
                Building practical experience across backend development,
                secure APIs, databases, microservices, and full-stack
                application development.
              </p>
            </div>
          </div>

          <div className="experience-loading-list">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                className="experience-loading-item psa-item"
                key={index}
              >
                <div className="experience-loading-date">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="experience-loading-spine">
                  <span />
                </div>

                <div className="experience-loading-card">
                  <div className="experience-loading-card-top">
                    <span />
                    <span />
                  </div>

                  <span className="experience-loading-company" />
                  <span className="experience-loading-line" />
                  <span className="experience-loading-line short" />

                  <div className="experience-loading-tags">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="experience"
        className="experience-section psa-reveal"
        aria-labelledby="experience-title"
      >
        <div className="experience-grid-pattern" aria-hidden="true" />

        <div className="experience-container">
          <div className="experience-registry-bar psa-item">
            <div className="experience-registry-left">
              <span className="experience-registry-accent">
                ┌[CAREER_INDEX]
              </span>
              <span>ENGINEERING TIMELINE</span>
              <span className="experience-registry-separator">•</span>
              <span>EXPERIENCE_RECORD</span>
            </div>
          </div>

          <div className="experience-error-state psa-item">
            <div className="experience-error-icon">!</div>

            <div>
              <span>EXPERIENCE / ERROR</span>
              <h3>Unable to load experience.</h3>
              <p>
                The experience registry could not be loaded at this time.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="experience-section psa-reveal"
      aria-labelledby="experience-title"
    >
      <div className="experience-grid-pattern" aria-hidden="true" />

      <div className="experience-container">
        {/* Registry bar */}
        <div className="experience-registry-bar psa-item">
          <div className="experience-registry-left">
            <span className="experience-registry-accent">
              ┌[CAREER_INDEX]
            </span>
            <span>ENGINEERING TIMELINE</span>
            <span className="experience-registry-separator">•</span>
            <span>EXPERIENCE_RECORD</span>
          </div>

          <div className="experience-registry-live">
            <span className="experience-pulse-dot" />
            <span>EXPERIENCE LOG ACTIVE</span>
          </div>
        </div>

        {/* Header */}
        <div className="experience-header">
          <div className="experience-header-main psa-item">
            <span className="experience-eyebrow">
              06 // EXPERIENCE
            </span>

            <h2 id="experience-title">
              Growing through{" "}
              <span>real-world engineering.</span>
            </h2>

            <p>
              Building practical experience across backend development,
              secure APIs, databases, microservices, and full-stack
              application development.
            </p>
          </div>

          <div className="experience-header-count psa-item">
            <strong>
              {String(experiences.length).padStart(2, "0")}
            </strong>
            <span>EXPERIENCE RECORDS</span>
          </div>
        </div>

        {/* Timeline */}
        {experiences.length === 0 ? (
          <div className="experience-empty-state psa-item">
            <div className="experience-empty-mark">[ 0x00 ]</div>
            <span>EXPERIENCE / EMPTY</span>
            <h3>NO EXPERIENCE RECORDS AVAILABLE</h3>
            <p>
              No verified experience records are currently available.
            </p>
          </div>
        ) : (
          <div className="experience-timeline">
            {experiences.map((experience, index) => {
              const isCurrent = !experience?.end_date;
              const startLabel = formatMonthYear(experience?.start_date);
              const endLabel = isCurrent
                ? "Present"
                : formatMonthYear(experience?.end_date);
              const duration = getDuration(
                experience?.start_date,
                experience?.end_date
              );

              return (
                <article
                  className={`experience-item ${
                    isCurrent ? "experience-item-current" : ""
                  } psa-item`}
                  key={experience.id}
                >
                  {/* Date / metadata column */}
                  <div className="experience-period">
                    {isCurrent && (
                      <span className="current-badge">
                        [ CURRENT ]
                      </span>
                    )}

                    <time>
                      {startLabel}
                      {startLabel && " — "}
                      {endLabel}
                    </time>

                    {experience.location && (
                      <span className="experience-location">
                        LOC: {experience.location}
                      </span>
                    )}

                    {duration && (
                      <span className="experience-duration">
                        RUN_TIME: {duration}
                      </span>
                    )}
                  </div>

                  {/* Timeline spine */}
                  <div className="experience-marker" aria-hidden="true">
                    <span className="experience-spine" />

                    <span className="experience-dot">
                      {isCurrent && <span />}
                    </span>

                    <span className="experience-connector" />
                  </div>

                  {/* Experience card */}
                  <div className="experience-card">
                    <div className="experience-card-top">
                      <div className="experience-card-heading">
                        <span className="experience-role-index">
                          ROLE_RECORD // {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>{experience.position}</h3>

                        <div className="experience-company">
                          <strong>{experience.company}</strong>

                          {experience.location && (
                            <>
                              <span>•</span>
                              <span>{experience.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        className={`experience-status ${
                          isCurrent
                            ? "experience-status-active"
                            : ""
                        }`}
                      >
                        <span />
                        {isCurrent ? "ACTIVE" : "COMPLETED"}
                      </div>
                    </div>

                    {experience.description && (
                      <p className="experience-description">
                        {experience.description}
                      </p>
                    )}

                    <div className="experience-card-footer">
                      <span>
                        EXPERIENCE_RECORD // ROLE_TRACK
                      </span>

                      <strong>
                        {isCurrent
                          ? "CURRENT ROLE"
                          : "COMPLETED ROLE"}
                      </strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom career summary */}
        <div className="experience-footer psa-item">
          <div className="experience-footer-metrics">
            <div className="experience-footer-metric">
              <span>CAREER TRACK</span>
              <strong>FULL STACK ENGINEERING</strong>
            </div>

            <div className="experience-footer-metric">
              <span>PRIMARY FOCUS</span>
              <strong>BACKEND SYSTEMS</strong>
            </div>

            <div className="experience-footer-metric">
              <span>CURRENT DIRECTION</span>
              <strong>SECURE &amp; SCALABLE APPLICATIONS</strong>
            </div>
          </div>

          <div className="experience-footer-statement">
            <div>
              <span>// STATEMENT_OF_INTENT</span>
              <p>
                Building secure, maintainable backend systems while
                strengthening full-stack development skills.
              </p>
            </div>

            {currentExperience && (
              <div className="experience-current-readout">
                <span>ACTIVE ROLE</span>
                <strong>{currentExperience.position}</strong>
                <small>{currentExperience.company}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
