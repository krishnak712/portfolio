import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/ResumePage.css";

function ResumePage() {
  const [copied, setCopied] = useState(false);

  const resumeText = `KRISHNA KUMAR R
Java Full Stack Developer

pandiraman131@gmail.com
+91-9345380842
Sivakasi, India
linkedin.com/in/krishna-kumar712
github.com/krishnak712
https://krishnakumar-rd.vercel.app

SUMMARY

Java Full Stack Developer with professional experience developing backend services and RESTful APIs using Java, Spring Boot, Spring Security, and PostgreSQL. Experienced in building secure role-based applications with JWT-based authentication and RBAC, along with microservice-based backend components. Skilled in integrating React.js and React Native applications with backend services and implementing business logic, request validation, exception handling, database operations, and asynchronous communication using RabbitMQ.

TECHNICAL SKILLS

Languages — Java, Python, JavaScript, SQL
Backend — Spring, Spring Boot, FastAPI, REST APIs, Microservices
Security — Spring Security, JWT, Role-Based Access Control (RBAC)
Frontend — React.js, React Native, HTML5, CSS
Database & Caching — PostgreSQL, Redis
ORM & Data Access — Hibernate, JDBC, SQLAlchemy
Messaging, Background Processing — RabbitMQ, Kafka
Tools — Docker
Testing — Manual Testing, Automation Testing

WORK EXPERIENCE

Software Developer
IKRGY Infotech Pvt. Ltd
04/2026 – Present
Hyderabad, Telangana

• Develop and integrate RESTful backend services using Java and Spring Boot to support application workflows and frontend operations.
• Implement authentication and authorization using Spring Security, JWT, and role-based access control (RBAC).
• Develop and maintain microservice-based backend components with PostgreSQL for persistent data management.
• Implement business logic, request validation, exception handling, and structured service layer components to build maintainable backend systems.

Software Developer - Intern
Besant Technologies
08/2025 – 01/2026
Chennai, Tamil Nadu

• Developed full-stack web applications using Java, Spring Boot, React.js, and PostgreSQL as part of a structured full-stack development program.
• Designed and integrated RESTful APIs to establish communication between frontend applications and backend services.
• Implemented business logic, database operations, input validation, exception handling, and authentication flows.
• Debugged application issues and applied structured development practices across implementation, testing, and API integration.

EDUCATION

B.Sc. Chemistry
Government Arts and Science College
2021 – 2024
Sivakasi

CERTIFICATIONS

Java Full Stack Developer Certificate
Besant Technologies

PROJECTS

Integrated College / University Management System
Scalable Academic & Administrative Management System

Tech Stack:
Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, Celery, Pydantic, Casbin, JWT, Microservices

05/2026

• Developed RESTful backend APIs using Python and FastAPI to support academic and administrative management workflows.
• Implemented modular service-layer business logic, request processing, validation, and database operations using SQLAlchemy and PostgreSQL.
• Implemented role-based and attribute-based access control using Casbin to enforce permissions across different application operations.
• Implemented JWT-based authentication and authorization for securing protected API endpoints.
• Used Redis for application-level caching and Celery for background task processing to support asynchronous application operations.
• Structured backend components using a microservice-oriented architecture to separate application responsibilities and improve maintainability.

Smart Blood Search, Donation & Tracking Management System
In Progress

Tech Stack:
Java, Spring Boot, Spring Security, JWT, RabbitMQ, PostgreSQL, React.js, React Native, Microservices

09/2026

• Developing a role-based blood donation and hospital management platform supporting Super Admin, Platform Admin, Main Hospital Admin, Branch Hospital Admin, and Hospital Staff with hierarchical access control.
• Implementing secure authentication and authorization using Spring Security, JWT, password hashing, mobile OTP verification, and RBAC to control access across platform and hospital workflows.
• Developing Spring Boot microservices and RESTful APIs for core business workflows, with PostgreSQL for persistent data management and structured service-layer architecture.
• Implementing request validation, centralized exception handling, and business-rule processing to improve API reliability and maintainability.
• Using RabbitMQ for asynchronous communication between authentication and notification services, decoupling notification processing from core business operations.
• Building React.js web interfaces for administrative and hospital workflows and a React Native mobile application for donor and hospital staff operations.`;

  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch (error) {
      console.error("Unable to copy resume:", error);
    }
  };

  const shareResume = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "KRISHNA KUMAR — Resume",
          text: "Java Full Stack Developer Resume",
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch (error) {
      console.error("Unable to share resume:", error);
    }
  };

  return (
    <main className="resume-page">

      {/* =========================================
          TOP ACTION BAR
      ========================================= */}

      <div className="resume-toolbar">

        <Link
          to="/"
          className="resume-back-link"
        >
          ← Back to Portfolio
        </Link>

        <div className="resume-toolbar-actions">

          <a
            href="/resume.pdf"
            download
            className="resume-button resume-button-primary"
          >
            ↓ Download PDF
          </a>

          <button
            type="button"
            className="resume-button"
            onClick={() => window.print()}
          >
            Print
          </button>

          <button
            type="button"
            className="resume-button"
            onClick={copyResume}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            type="button"
            className="resume-button"
            onClick={shareResume}
          >
            Share
          </button>

        </div>

      </div>


      {/* =========================================
          RESUME DOCUMENT
      ========================================= */}

      <div className="resume-document">

        {/* =======================================
            HEADER
        ======================================= */}

        <header className="resume-header">

          <h1>
            KRISHNA KUMAR R
          </h1>

          <h2>
            Java Full Stack Developer
          </h2>

          <div className="resume-contact">

            <a href="mailto:pandiraman131@gmail.com">
              pandiraman131@gmail.com
            </a>

            <span>|</span>

            <a href="tel:+919345380842">
              +91-9345380842
            </a>

            <span>|</span>

            <span>
              Sivakasi, India
            </span>

            <span>|</span>

            <a
              href="https://www.linkedin.com/in/krishna-kumar712"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/krishna-kumar712
            </a>

            <span>|</span>

            <a
              href="https://github.com/krishnak712"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/krishnak712
            </a>

            <span>|</span>

            <a
              href="https://krishnakumar-rd.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              krishnakumar-rd.vercel.app
            </a>

          </div>

        </header>


        {/* =======================================
            SUMMARY
        ======================================= */}

        <ResumeSection title="SUMMARY">

          <p className="resume-paragraph">
            Java Full Stack Developer with professional
            experience developing backend services and
            RESTful APIs using Java, Spring Boot,
            Spring Security, and PostgreSQL. Experienced
            in building secure role-based applications
            with JWT-based authentication and RBAC,
            along with microservice-based backend
            components. Skilled in integrating React.js
            and React Native applications with backend
            services and implementing business logic,
            request validation, exception handling,
            database operations, and asynchronous
            communication using RabbitMQ.
          </p>

        </ResumeSection>


        {/* =======================================
            TECHNICAL SKILLS
        ======================================= */}

        <ResumeSection title="TECHNICAL SKILLS">

          <div className="resume-skills">

            <SkillLine
              title="Languages"
              value="Java, Python, JavaScript, SQL"
            />

            <SkillLine
              title="Backend"
              value="Spring, Spring Boot, FastAPI, REST APIs, Microservices"
            />

            <SkillLine
              title="Security"
              value="Spring Security, JWT, Role-Based Access Control (RBAC)"
            />

            <SkillLine
              title="Frontend"
              value="React.js, React Native, HTML5, CSS"
            />

            <SkillLine
              title="Database & Caching"
              value="PostgreSQL, Redis"
            />

            <SkillLine
              title="ORM & Data Access"
              value="Hibernate, JDBC, SQLAlchemy"
            />

            <SkillLine
              title="Messaging, Background Processing"
              value="RabbitMQ, Kafka"
            />

            <SkillLine
              title="Tools"
              value="Docker"
            />

            <SkillLine
              title="Testing"
              value="Manual Testing, Automation Testing"
            />

          </div>

        </ResumeSection>


        {/* =======================================
            WORK EXPERIENCE
        ======================================= */}

        <ResumeSection title="WORK EXPERIENCE">

          <ExperienceItem
            title="Software Developer"
            company="IKRGY Infotech Pvt. Ltd"
            date="04/2026 – Present"
            location="Hyderabad, Telangana"
            bullets={[
              "Develop and integrate RESTful backend services using Java and Spring Boot to support application workflows and frontend operations.",
              "Implement authentication and authorization using Spring Security, JWT, and role-based access control (RBAC).",
              "Develop and maintain microservice-based backend components with PostgreSQL for persistent data management.",
              "Implement business logic, request validation, exception handling, and structured service layer components to build maintainable backend systems.",
            ]}
          />

          <ExperienceItem
            title="Software Developer - Intern"
            company="Besant Technologies"
            date="08/2025 – 01/2026"
            location="Chennai, Tamil Nadu"
            bullets={[
              "Developed full-stack web applications using Java, Spring Boot, React.js, and PostgreSQL as part of a structured full-stack development program.",
              "Designed and integrated RESTful APIs to establish communication between frontend applications and backend services.",
              "Implemented business logic, database operations, input validation, exception handling, and authentication flows.",
              "Debugged application issues and applied structured development practices across implementation, testing, and API integration.",
            ]}
          />

        </ResumeSection>


        {/* =======================================
            EDUCATION
        ======================================= */}

        <ResumeSection title="EDUCATION">

          <div className="resume-simple-row">

            <div>
              <strong>
                B.Sc. Chemistry
              </strong>

              <span>
                Government Arts and Science College
              </span>

              <span>
                Sivakasi
              </span>
            </div>

            <strong>
              2021 – 2024
            </strong>

          </div>

        </ResumeSection>


        {/* =======================================
            CERTIFICATIONS
        ======================================= */}

        <ResumeSection title="CERTIFICATIONS">

          <div className="resume-certification">

            <strong>
              Java Full Stack Developer Certificate
            </strong>

            <span>
              — Besant Technologies
            </span>

          </div>

        </ResumeSection>


        {/* =======================================
            PROJECTS
            New page-like section on desktop
        ======================================= */}

        <div className="resume-projects-page">

          <ResumeSection title="PROJECTS">

            {/* ICMS */}

            <ProjectItem
              title="Integrated College / University Management System"
              subtitle="Scalable Academic & Administrative Management System"
              date="05/2026"
              tech="Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, Celery, Pydantic, Casbin, JWT, Microservices"
              bullets={[
                "Developed RESTful backend APIs using Python and FastAPI to support academic and administrative management workflows.",
                "Implemented modular service-layer business logic, request processing, validation, and database operations using SQLAlchemy and PostgreSQL.",
                "Implemented role-based and attribute-based access control using Casbin to enforce permissions across different application operations.",
                "Implemented JWT-based authentication and authorization for securing protected API endpoints.",
                "Used Redis for application-level caching and Celery for background task processing to support asynchronous application operations.",
                "Structured backend components using a microservice-oriented architecture to separate application responsibilities and improve maintainability.",
              ]}
            />


            {/* Smart Blood Search */}

            <ProjectItem
              title="Smart Blood Search, Donation & Tracking Management System"
              subtitle="In Progress"
              date="09/2026"
              tech="Java, Spring Boot, Spring Security, JWT, RabbitMQ, PostgreSQL, React.js, React Native, Microservices"
              bullets={[
                "Developing a role-based blood donation and hospital management platform supporting Super Admin, Platform Admin, Main Hospital Admin, Branch Hospital Admin, and Hospital Staff with hierarchical access control.",
                "Implementing secure authentication and authorization using Spring Security, JWT, password hashing, mobile OTP verification, and RBAC to control access across platform and hospital workflows.",
                "Developing Spring Boot microservices and RESTful APIs for core business workflows, with PostgreSQL for persistent data management and structured service-layer architecture.",
                "Implementing request validation, centralized exception handling, and business-rule processing to improve API reliability and maintainability.",
                "Using RabbitMQ for asynchronous communication between authentication and notification services, decoupling notification processing from core business operations.",
                "Building React.js web interfaces for administrative and hospital workflows and a React Native mobile application for donor and hospital staff operations.",
              ]}
            />

          </ResumeSection>

        </div>


        {/* =======================================
            DOCUMENT FOOTER
        ======================================= */}

        <footer className="resume-footer">

          <span>
            KRISHNA KUMAR R
          </span>

          <span>
            Java Full Stack Developer
          </span>

        </footer>

      </div>

    </main>
  );
}


/* =========================================
   SECTION
========================================= */

function ResumeSection({
  title,
  children,
}) {
  return (
    <section className="resume-section">

      <div className="resume-section-heading">

        <h3>
          {title}
        </h3>

      </div>

      {children}

    </section>
  );
}


/* =========================================
   SKILL LINE
========================================= */

function SkillLine({
  title,
  value,
}) {
  return (
    <div className="resume-skill-line">

      <strong>
        {title}
        {" — "}
      </strong>

      <span>
        {value}
      </span>

    </div>
  );
}


/* =========================================
   EXPERIENCE ITEM
========================================= */

function ExperienceItem({
  title,
  company,
  date,
  location,
  bullets,
}) {
  return (
    <article className="resume-experience">

      <div className="resume-experience-header">

        <div>

          <h4>
            {title},{" "}
            <em>{company}</em>
          </h4>

        </div>

        <div className="resume-experience-meta">

          <strong>
            {date}
          </strong>

          <span>
            {location}
          </span>

        </div>

      </div>

      <ul>

        {bullets.map((bullet, index) => (
          <li key={index}>
            {bullet}
          </li>
        ))}

      </ul>

    </article>
  );
}


/* =========================================
   PROJECT ITEM
========================================= */

function ProjectItem({
  title,
  subtitle,
  date,
  tech,
  bullets,
}) {
  return (
    <article className="resume-project">

      <div className="resume-project-header">

        <div>

          <h4>
            {title}
          </h4>

          <p className="resume-project-subtitle">
            {subtitle}
          </p>

        </div>

        <strong className="resume-project-date">
          {date}
        </strong>

      </div>

      <p className="resume-project-tech-line">
        <strong>
          Tech Stack:
        </strong>{" "}
        {tech}
      </p>

      <ul>

        {bullets.map((bullet, index) => (
          <li key={index}>
            {bullet}
          </li>
        ))}

      </ul>

    </article>
  );
}


export default ResumePage;