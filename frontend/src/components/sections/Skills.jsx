import { useEffect, useState } from "react";
import { getSkills } from "../../services/contentServices";
import "./css/Skills.css";

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    description: "Core programming and database languages.",
    categories: ["Languages"],
  },
  {
    number: "02",
    title: "Backend",
    description: "Building secure and scalable backend systems.",
    categories: ["Backend"],
    includeSkills: ["Java"],
  },
  {
    number: "03",
    title: "Frontend",
    description: "Creating responsive full-stack interfaces.",
    categories: ["Frontend"],
  },
  {
    number: "04",
    title: "Databases",
    description: "Working with relational and in-memory data stores.",
    categories: ["Database"],
  },
  {
    number: "05",
    title: "Security",
    description: "Authentication and authorization for applications.",
    categories: ["Security"],
  },
  {
    number: "06",
    title: "Tools & DevOps",
    description: "Development, testing and deployment tooling.",
    categories: ["Tools", "DevOps"],
  },
];

function getAccentClass(index) {
  const accents = ["cyan", "blue", "teal", "slate"];
  return accents[index % accents.length];
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    getSkills()
      .then((data) => {
        console.log("SKILLS FROM FASTAPI:", data);

        if (!mounted) {
          return;
        }

        setSkills(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load skills:", err);

        if (!mounted) {
          return;
        }

        setError(err.message || "Unable to load skills.");
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const getGroupSkills = (group) => {
    let groupSkills = skills.filter((skill) =>
      group.categories.includes(skill.category)
    );

    if (group.includeSkills) {
      const additionalSkills = skills.filter((skill) =>
        group.includeSkills.includes(skill.name)
      );

      groupSkills = [
        ...groupSkills,
        ...additionalSkills.filter(
          (skill) =>
            !groupSkills.some(
              (existingSkill) => existingSkill.id === skill.id
            )
        ),
      ];
    }

    return [...groupSkills].sort(
      (a, b) => (a.display_order || 0) - (b.display_order || 0)
    );
  };

  const totalSkills = skills.length;

  return (
    <section className="skills-section psa-reveal" id="skills">
      <div className="skills-container">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="skills-section-header">

          <div className="skills-section-header-main psa-item">
            <div className="skills-kicker-row">
              <span
                className="skills-status-dot"
                aria-hidden="true"
              />

              <span className="skills-kicker">
                02 / SKILLS | SYSTEM STACK
              </span>
            </div>

            <h2 className="skills-title">
              Engineered with modern
              <span>
                frameworks &amp; resilient tools.
              </span>
            </h2>

            <div
              className="skills-title-line"
              aria-hidden="true"
            >
              <span />
              <i />
              <i />
              <i />
              <em />
            </div>

            <p className="skills-intro">
              A practical technology stack focused on backend engineering,
              secure APIs, databases, and modern frontend development.
            </p>
          </div>

          <div className="skills-header-telemetry psa-item">
            <span>
              SYS.STACK // RUNTIME ARCHITECTURE
            </span>

            <span
              className="skills-telemetry-dots"
              aria-hidden="true"
            >
              •••
            </span>

            <span className="skills-telemetry-badge">
              API CONNECTED
            </span>
          </div>
        </div>

        {/* =====================================================
            SKILLS GRID
        ===================================================== */}
        <div className="skills-grid">

          {loading &&
            skillGroups.map((group) => (
              <article
                className="skill-card skill-card-loading psa-item"
                key={group.number}
              >
                <div className="skill-card-loader" />

                <div className="skill-loading-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ))}

          {!loading &&
            error && (
              <div className="skills-state psa-item">
                <span>SKILLS / ERROR</span>

                <p>
                  Unable to load skills.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            skillGroups.map((group, index) => {
              const groupSkills = getGroupSkills(group);

              return (
                <article
                  className={`skill-card skill-card-${getAccentClass(
                    index
                    )} psa-item`}
                  key={group.number}
                >
                  {/* Top accent */}
                  <div
                    className="skill-card-accent"
                    aria-hidden="true"
                  />

                  {/* Technical corners */}
                  <div
                    className="skill-card-corner skill-card-corner-top"
                    aria-hidden="true"
                  />

                  <div
                    className="skill-card-corner skill-card-corner-bottom"
                    aria-hidden="true"
                  />

                  <div className="skill-card-content">

                    {/* Card header */}
                    <div className="skill-card-top psa-item">

                      <span className="skill-number">
                        {group.number}
                      </span>

                      <span className="skill-card-label">
                        <span
                          className="skill-label-dot"
                          aria-hidden="true"
                        />

                        {groupSkills.length}{" "}
                        {groupSkills.length === 1
                          ? "SKILL"
                          : "SKILLS"}
                      </span>
                    </div>

                    {/* Category */}
                    <h3 className="skill-card-title psa-item">
                      {group.title}
                    </h3>

                    {/* Description */}
                    <p className="skill-card-description psa-item">
                      {group.description}
                    </p>
                  </div>

                  {/* Skill tags */}
                  <div className="skill-pills psa-item">
                    {groupSkills.length > 0 ? (
                      groupSkills.map((skill) => (
                        <span
                          className="skill-pill"
                          key={skill.id}
                        >
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="skill-pill">
                        No skills available
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
        </div>

        {/* =====================================================
            BOTTOM TECHNICAL STRIP
        ===================================================== */}
        <div className="skills-bottom">

          <div className="skills-bottom-item psa-item">
            <span>STACK GROUPS</span>

            <strong>
              {skillGroups.length}
            </strong>
          </div>

          <div className="skills-bottom-item psa-item">
            <span>SKILL ENTRIES</span>

            <strong>
              {totalSkills}
            </strong>
          </div>

          

          <div className="skills-bottom-item psa-item">
            <span>STATUS</span>

            <strong>
              {loading
                ? "LOADING"
                : error
                ? "UNAVAILABLE"
                : "ACTIVE"}
            </strong>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Skills;