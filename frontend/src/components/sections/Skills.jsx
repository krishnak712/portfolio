import { useEffect, useState } from "react";
import { getSkills } from "../../services/contentServices";
import "./css/Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSkills()
      .then((data) => {
        console.log("SKILLS FROM FASTAPI:", data);
        setSkills(data);
      })
      .catch((err) => {
        console.error("Failed to load skills:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Group database skills according to their category
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

  if (loading) {
    return (
      <section className="skills-section" id="skills">
        <div className="skills-container">
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="skills-section" id="skills">
        <div className="skills-container">
          <p>Unable to load skills.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">

        <div className="skills-heading">
          <span className="skills-kicker">
            02 / TECH STACK
          </span>

          <h2>
            Tools I use to
            <span> build & ship.</span>
          </h2>

          <p>
            A practical stack focused on backend engineering, secure APIs,
            databases and modern frontend development.
          </p>
        </div>

        <div className="skills-grid">

         {skillGroups.map((group) => {
  let groupSkills = skills.filter((skill) =>
    group.categories.includes(skill.category)
  );

  // Add shared skills such as Java to Backend
  if (group.includeSkills) {
    const additionalSkills = skills.filter((skill) =>
      group.includeSkills.includes(skill.name)
    );

    groupSkills = [
      ...groupSkills,
      ...additionalSkills.filter(
        (skill) => !groupSkills.some((existing) => existing.id === skill.id)
      ),
    ];
  }

  return (
    <article className="skill-card" key={group.number}>
      <div className="skill-card-top">
        <span className="skill-number">{group.number}</span>

        <span className="skill-symbol">
          &lt;/&gt;
        </span>
      </div>

      <h3>{group.title}</h3>

      <p>{group.description}</p>

      <div className="skill-pills">
        {groupSkills.map((skill) => (
          <span className="skill-pill" key={skill.id}>
            {skill.name}
          </span>
        ))}
      </div>
    </article>
  );
})}
        </div>

        <div className="skills-bottom">

          <span className="skills-bottom-label">
            CURRENT ENGINEERING FOCUS
          </span>

          <span className="skills-bottom-value">
            Java • Spring Boot • REST APIs • Microservices • PostgreSQL
          </span>

        </div>

      </div>
    </section>
  );
}

export default Skills;