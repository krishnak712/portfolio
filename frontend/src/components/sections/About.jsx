import "./css/About.css";

function About({ name, about }) {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Section heading */}
        <div className="about-heading">
          <span className="about-kicker">01 / ABOUT</span>

          <h2>
            Building systems with
            <span> purpose & precision.</span>
          </h2>

          <div className="about-heading-line" />
        </div>


        <div className="about-grid">

          {/* Main introduction */}
          <div className="about-main">

            <p className="about-lead">
              I'm <strong>{name.toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}</strong>, {about}
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


          {/* Highlight cards */}
          <div className="about-highlights">

            <article className="about-card">
              <div className="about-card-number">01</div>

              <div>
                <h3>Backend Engineering</h3>

                <p>
                  Java, Spring Boot, REST APIs, Microservices and
                  PostgreSQL for robust backend systems.
                </p>
              </div>
            </article>


            <article className="about-card">
              <div className="about-card-number">02</div>

              <div>
                <h3>Security & APIs</h3>

                <p>
                  Secure authentication and authorization using
                  Spring Security and JWT.
                </p>
              </div>
            </article>


            <article className="about-card">
              <div className="about-card-number">03</div>

              <div>
                <h3>Full Stack Development</h3>

                <p>
                  Connecting scalable backend services with
                  modern React.js interfaces.
                </p>
              </div>
            </article>

          </div>

        </div>


        {/* Bottom information strip */}
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
            <strong>Backend & Full Stack Systems</strong>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;