import "./css/About.css";

function formatName(name = "") {
  return name
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function About({ name, about }) {
  const highlights = [
    {
      number: "01",
      title: "Backend Engineering",
      description:
        "Java, Spring Boot, REST APIs, Microservices and PostgreSQL for robust backend systems.",
    },
    {
      number: "02",
      title: "Security & APIs",
      description:
        "Secure authentication and authorization using Spring Security and JWT.",
    },
    {
      number: "03",
      title: "Full Stack Development",
      description:
        "Connecting scalable backend services with modern React.js interfaces.",
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-section-header">
          <div className="about-section-index">
            <span className="about-index-dot" aria-hidden="true" />
            <span className="about-kicker">01 / ABOUT</span>
          </div>

          <div className="about-header-line" aria-hidden="true" />
        </div>

        <div className="about-editorial-grid">
          <div className="about-editorial-main">
            <div className="about-heading">
              <h2>
                Building systems with
                <span> purpose &amp; precision.</span>
              </h2>
            </div>

            <div className="about-divider" aria-hidden="true">
              <span />
              <i />
              <i />
            </div>

            <div className="about-copy">
              <p className="about-lead">
                I&apos;m{" "}
                <strong>{formatName(name)}</strong>
                {about ? `, ${about}` : "."}
              </p>

              <p>
                My core backend stack is built around Java and Spring Boot,
                where I work with REST APIs, Spring Security, JWT
                authentication, microservices and PostgreSQL.
              </p>

              <p>
                I also work with React.js to build responsive frontend
                experiences and connect them with reliable backend services.
                My approach is centered around clean architecture, security,
                API design and writing software that is easy to maintain.
              </p>

              <p>
                I am currently working as a Software Developer, continuously
                strengthening my full-stack engineering skills while building
                real-world systems.
              </p>
            </div>
          </div>

          <div className="about-highlights" aria-label="About highlights">
            {highlights.map((highlight) => (
              <article className="about-highlight" key={highlight.number}>
                <div className="about-highlight-number">
                  {highlight.number}
                </div>

                <div className="about-highlight-content">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>

                <span className="about-highlight-mark" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="about-meta">
          <div className="about-meta-item">
            <span>ROLE</span>
            <strong>Java Full Stack Developer</strong>
          </div>

          <div className="about-meta-item">
            <span>LOCATION</span>
            <strong>Sivakasi, India</strong>
          </div>

          <div className="about-meta-item">
            <span>FOCUS</span>
            <strong>Backend &amp; Full Stack Systems</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
