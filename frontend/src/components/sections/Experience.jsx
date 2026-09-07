import { useEffect, useState } from "react";
import { getExperience } from "../../services/contentServices";
import "./css/Experience.css";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExperience()
      .then((data) => {
        console.log("EXPERIENCE FROM FASTAPI:", data);
        setExperiences(data);
      })
      .catch((err) => {
        console.error("Failed to load experience:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="experience-section" id="experience">
        <div className="experience-container">
          <p>Loading experience...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="experience-section" id="experience">
        <div className="experience-container">
          <p>Unable to load experience.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">

        {/* Header */}
        <div className="experience-header">
          <div>
            <span className="experience-eyebrow">
              06 — EXPERIENCE
            </span>

            <h2>
              Growing through{" "}
              <span>real-world engineering.</span>
            </h2>
          </div>

          <p>
            Building practical experience across backend development,
            secure APIs, databases, microservices, and full-stack
            application development.
          </p>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">

          {experiences.map((experience, index) => {

            const startDate = new Date(experience.start_date);

            const formattedStartDate = startDate.toLocaleDateString(
              "en-US",
              {
                month: "long",
                year: "numeric",
              }
            );

            const formattedEndDate = experience.end_date
              ? new Date(experience.end_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )
              : "Present";

            const isCurrent = !experience.end_date;

            return (
              <article
                className="experience-item"
                key={experience.id}
              >

                {/* Timeline */}
                <div className="experience-marker">
                  <span className="experience-dot" />

                  {index !== experiences.length - 1 && (
                    <span className="experience-line" />
                  )}
                </div>

                {/* Date */}
                <div className="experience-period">

                  <span>
                    {formattedStartDate} — {formattedEndDate}
                  </span>

                  {isCurrent && (
                    <span className="current-badge">
                      CURRENT
                    </span>
                  )}

                </div>

                {/* Content */}
                <div className="experience-card">

                  <div className="experience-card-top">

                    <div>

                      <h3>
                        {experience.position}
                      </h3>

                      <div className="experience-company">

                        <span>
                          {experience.company}
                        </span>

                        <span className="company-separator">
                          •
                        </span>

                        <span>
                          {experience.location}
                        </span>

                      </div>

                    </div>

                    <div className="experience-status">

                      <span />

                      {isCurrent ? "Active" : "Completed"}

                    </div>

                  </div>

                  <p className="experience-description">
                    {experience.description}
                  </p>

                </div>

              </article>
            );
          })}

        </div>

        {/* Bottom strip */}
        <div className="experience-footer">

          <div className="experience-footer-icon">
            &gt;_
          </div>

          <div>

            <strong>Current focus</strong>

            <p>
              Building secure, maintainable backend systems while
              strengthening full-stack development skills.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}