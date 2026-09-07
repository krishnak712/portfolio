import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/ResumePage.css";


function ResumePage() {
  const [copied, setCopied] = useState(false);

  const resumeText = `KRISHNA KUMAR R
Java Full Stack Developer

Sivakasi, Tamil Nadu, India
pandiraman131@gmail.com

github.com/krishnak712
linkedin.com/in/krishna-kumar712

SUMMARY

Java Full Stack Developer focused on building secure, scalable and user-focused applications. Experienced in Java, Spring Boot, REST APIs, SQL, React.js and React Native, with hands-on experience in backend services, API integration, database-driven applications and microservice-based systems.

TECHNICAL SKILLS

Languages & Core:
Java, Python, JavaScript, SQL

Frontend:
HTML5, CSS3, React.js, React Native

Backend & APIs:
Spring, Spring Boot, FastAPI, REST APIs, Microservices

Database & Persistence:
PostgreSQL, Redis, Hibernate, JDBC

Security:
Spring Security, JWT, Role-Based Access Control

Tools & Practices:
Docker, Manual Testing, Automation Testing

PROFESSIONAL EXPERIENCE

Software Engineer | IKRGY Infotech Pvt Ltd
Hyderabad, India
April 2026 — Present

- Contributing to software development and backend engineering.
- Developing applications using Java and Spring Boot.
- Building and integrating REST APIs.
- Working with Spring Security, JWT and role-based access control.
- Working with PostgreSQL and database-driven application development.
- Contributing to microservice-based application development.

PROJECTS

1. Smart Blood Search, Donation & Tracking Management System
Mode: Personal
Status: In Progress

An enterprise-level hospital-centered blood donation platform designed to connect verified hospitals with eligible blood donors and reduce the time required to find compatible donors during emergencies.

Technology:
Java, Spring Boot, Spring Data JPA, Hibernate, REST APIs, Microservices, Spring Security, JWT, RabbitMQ, PostgreSQL, Redis, React.js, React Native, Python, PaddleOCR

Key Features:
- Mobile OTP and email verification
- Live selfie and liveness verification
- Role-Based Access Control
- Hospital-centered blood request workflow
- Intelligent donor matching
- Real-time notifications
- Voluntary live location tracking
- Hospital geofencing
- Six-digit donation PIN verification
- Audit logging and accountability

Roles:
Super Admin
Platform Admin
Donor
Main Hospital Admin
Branch Hospital Admin
Hospital Staff

2. Integrated College / University Management System
Mode: Professional
Status: In Progress
Role: Backend Developer

An enterprise-grade college and university management system designed to support academic, administrative and institutional operations through a secure and scalable backend architecture.

Backend Contribution:
- Developing REST APIs using Python and FastAPI
- Implementing backend business logic
- Developing data-access functionality
- Implementing validation
- Working with authorization and access control
- Integrating PostgreSQL-backed services
- Contributing to Redis-supported backend services
- Supporting asynchronous background processing
- Contributing to microservice-based backend architecture

Technology:
Python, FastAPI, SQLAlchemy, Alembic, Pydantic, PostgreSQL, Redis, Celery, Casbin, JWT, OIDC, MFA, Microservices

EDUCATION

B.Sc Chemistry
Government Arts and Science College
2021 — 2024
Sivakasi, Tamil Nadu, India

CERTIFICATION

Java Full Stack Developer Certificate
Besant Technologies, Chennai`;


  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch (error) {
      console.error(
        "Unable to copy resume:",
        error
      );
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
      console.error(
        "Unable to share resume:",
        error
      );
    }
  };


  return (
    <main className="resume-page">

      <div className="resume-shell">

        {/* =========================================
            TOP CONTROL DECK
        ========================================= */}

        <div className="resume-topbar">

          <div className="resume-breadcrumb">

            <Link
              to="/"
              className="resume-root-link"
            >
              <span className="resume-terminal-icon">
                ⌘
              </span>

              <span>
                SYSTEM_ROOT
              </span>
            </Link>

            <span className="resume-slash">
              /
            </span>

            <span className="resume-dossier">
              DOSSIER
            </span>

            <span className="resume-slash">
              /
            </span>

            <span className="resume-current">
              CURRICULUM_VITAE.pdf
            </span>

            <span className="resume-sync">
              LATEST_SYNC // 2026
            </span>

          </div>


          <div className="resume-actions">

            <a
              href="/resume.pdf"
              download
              className="resume-action resume-action-primary"
            >
              <span>↓</span>
              <span>
                Export ATS / PDF
              </span>
            </a>


            <button
              type="button"
              className="resume-action"
              onClick={() => window.print()}
            >
              <span>▣</span>

              <span className="resume-action-print-text">
                Print Document
              </span>
            </button>


            <button
              type="button"
              className="resume-action"
              onClick={copyResume}
            >
              <span>□</span>

              <span>
                {copied
                  ? "Copied!"
                  : "Copy Raw Text"}
              </span>
            </button>


            <button
              type="button"
              className="resume-action"
              onClick={shareResume}
            >
              <span>↗</span>

              <span className="resume-action-share-text">
                Share
              </span>
            </button>


            <Link
              to="/projects/smart-blood-search"
              className="resume-action resume-action-project"
            >
              <span>◇</span>

              <span className="resume-action-project-text">
                Live Architecture
              </span>
            </Link>

          </div>

        </div>


        {/* =========================================
            MAIN DOSSIER
        ========================================= */}

        <div className="resume-document">

          {/* =======================================
              IDENTITY HEADER
          ======================================= */}

          <header className="resume-identity">

            <div className="resume-identity-main">

              <div className="resume-name-row">

                <h1>
                  KRISHNA KUMAR. R
                </h1>

                <span className="resume-status">
                  <span className="resume-status-dot" />
                  Software Engineer
                </span>

              </div>


              <p className="resume-primary-role">
                Java Full Stack Developer
              </p>


              <p className="resume-intro">
                Java Full Stack Developer focused on
                building secure, scalable and
                user-focused applications with modern
                backend, frontend and database
                technologies.
              </p>


              <div className="resume-availability">

                <span className="resume-availability-dot" />

                Open to Software Engineering
                Opportunities

              </div>

            </div>


            {/* CONTACT MATRIX */}

            <div className="resume-contact-card">

              <div className="resume-contact-title">
                COORDINATES &amp; CHANNELS
              </div>


              <div className="resume-contact-row">

                <span>
                  ⌖ Location
                </span>

                <strong>
                  Sivakasi, Tamil Nadu
                </strong>

              </div>


              <div className="resume-contact-row">

                <span>
                  ✉ Dispatch
                </span>

                <a href="mailto:pandiraman131@gmail.com">
                  pandiraman131@gmail.com
                </a>

              </div>


              <div className="resume-contact-row">

                <span>
                  ◈ GitHub
                </span>

                <a
                  href="https://github.com/krishnak712"
                  target="_blank"
                  rel="noreferrer"
                >
                  krishnak712
                </a>

              </div>


              <div className="resume-contact-row">

                <span>
                  in LinkedIn
                </span>

                <a
                  href="https://www.linkedin.com/in/krishna-kumar712"
                  target="_blank"
                  rel="noreferrer"
                >
                  /in/krishna-kumar712
                </a>

              </div>


              <div className="resume-contact-footer">

                <span>
                  JAVA / SPRING BOOT
                </span>

                <span>
                  FULL STACK
                </span>

              </div>

            </div>

          </header>


          {/* =======================================
              01 SUMMARY
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="01"
              title="Executive Summary"
              label="ENGINEERING PROFILE"
            />


            <div className="resume-summary-grid">

              <div className="resume-panel resume-summary-main">

                <span className="resume-panel-label">
                  PROFESSIONAL PROFILE
                </span>

                <p>
                  Java Full Stack Developer focused
                  on building reliable backend systems
                  and modern web applications.
                </p>

                <p>
                  Experienced in Java, Spring Boot,
                  REST APIs, SQL, React.js and React
                  Native, with practical experience in
                  secure backend services, API
                  integration, database-driven solutions
                  and microservice-based applications.
                </p>

              </div>


              <div className="resume-panel resume-focus-panel">

                <span className="resume-panel-label">
                  PRIMARY ENGINEERING FOCUS
                </span>


                <div className="resume-focus-list">

                  <div>
                    <strong>01</strong>
                    <span>
                      Backend Engineering
                    </span>
                  </div>

                  <div>
                    <strong>02</strong>
                    <span>
                      REST API Development
                    </span>
                  </div>

                  <div>
                    <strong>03</strong>
                    <span>
                      Secure Applications
                    </span>
                  </div>

                  <div>
                    <strong>04</strong>
                    <span>
                      Full Stack Development
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =======================================
              02 SKILLS
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="02"
              title="Core Competencies & Matrix"
              label="HARDENED STACK CLASSIFICATION"
            />


            <div className="resume-skills-grid">

              <SkillCard
                number="01"
                title="Languages & Core"
                description="Primary programming languages and application development fundamentals."
                skills={[
                  "Java",
                  "Python",
                  "JavaScript",
                  "SQL",
                ]}
              />


              <SkillCard
                number="02"
                title="Frontend"
                description="Modern web and mobile interfaces for user-focused applications."
                skills={[
                  "React.js",
                  "React Native",
                  "HTML5",
                  "CSS3",
                ]}
              />


              <SkillCard
                number="03"
                title="Backend & APIs"
                description="Backend services, APIs and service-oriented application architecture."
                skills={[
                  "Spring",
                  "Spring Boot",
                  "FastAPI",
                  "REST APIs",
                  "Microservices",
                ]}
              />


              <SkillCard
                number="04"
                title="Database & Security"
                description="Persistence, authentication and authorization technologies."
                skills={[
                  "PostgreSQL",
                  "Redis",
                  "Hibernate",
                  "JDBC",
                  "Spring Security",
                  "JWT",
                  "RBAC",
                ]}
              />

            </div>

          </section>


          {/* =======================================
              03 EXPERIENCE
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="03"
              title="Professional Experience"
              label="CHRONOLOGICAL PRODUCTION LOG"
            />


            <article className="resume-experience-card">

              <div className="resume-experience-header">

                <div>

                  <div className="resume-experience-title-row">

                    <h3>
                      Software Engineer
                    </h3>

                    <span>
                      @ IKRGY Infotech Pvt Ltd
                    </span>

                  </div>

                  <p>
                    Hyderabad, India
                  </p>

                </div>


                <div className="resume-date-badge">
                  APR 2026 — PRESENT
                </div>

              </div>


              <ul className="resume-bullets">

                <li>
                  <span>→</span>

                  <p>
                    Contributing to software
                    development and backend engineering
                    for reliable and maintainable
                    applications.
                  </p>
                </li>

                <li>
                  <span>→</span>

                  <p>
                    Developing backend services and
                    REST APIs using Java and Spring Boot.
                  </p>
                </li>

                <li>
                  <span>→</span>

                  <p>
                    Working with Spring Security, JWT
                    and role-based access control to
                    support secure application
                    workflows.
                  </p>
                </li>

                <li>
                  <span>→</span>

                  <p>
                    Working with PostgreSQL and
                    database-driven application
                    development.
                  </p>
                </li>

                <li>
                  <span>→</span>

                  <p>
                    Contributing to microservice-based
                    application development and API
                    integration.
                  </p>
                </li>

              </ul>


              <div className="resume-tech-row">

                {[
                  "Java",
                  "Spring Boot",
                  "REST APIs",
                  "Spring Security",
                  "JWT",
                  "PostgreSQL",
                  "Microservices",
                ].map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>

            </article>

          </section>


          {/* =======================================
              04 PROJECTS
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="04"
              title="Selected Projects"
              label="PERSONAL & PROFESSIONAL SYSTEMS"
            />


            {/* =====================================
                PERSONAL PROJECT
            ====================================== */}

            <article className="resume-project-card">

              <div className="resume-project-header">

                <div>

                  <span className="resume-project-code">
                    PERSONAL // SMART-BLOOD-SEARCH
                  </span>

                  <h3>
                    Smart Blood Search, Donation
                    &amp; Tracking Management System
                  </h3>

                  <p>
                    Enterprise Web &amp; Mobile Application
                  </p>

                </div>


                <div>

                  <span className="resume-project-mode">
                    PERSONAL
                  </span>

                  <span className="resume-project-status">
                    IN PROGRESS
                  </span>

                </div>

              </div>


              <div className="resume-project-body">

                <div>

                  <span className="resume-panel-label">
                    OVERVIEW
                  </span>

                  <p>
                    An enterprise-level hospital-centered
                    blood donation platform designed to
                    connect verified hospitals with eligible
                    blood donors and reduce the time required
                    to find compatible donors during
                    emergencies.
                  </p>

                  <p>
                    The platform focuses on authenticity,
                    security, transparency and accountability
                    through hospital verification, intelligent
                    donor matching, real-time coordination,
                    live tracking and verified donation
                    workflows.
                  </p>

                </div>


                <div className="resume-project-features">

                  <span className="resume-panel-label">
                    CORE WORKFLOWS
                  </span>

                  <div className="resume-feature-grid">

                    <span>
                      Hospital Verification
                    </span>

                    <span>
                      RBAC
                    </span>

                    <span>
                      Smart Donor Matching
                    </span>

                    <span>
                      Real-Time Notifications
                    </span>

                    <span>
                      Live Location
                    </span>

                    <span>
                      Hospital Geofence
                    </span>

                    <span>
                      Donation PIN
                    </span>

                    <span>
                      Audit Logging
                    </span>

                  </div>

                </div>

              </div>


              <div className="resume-project-tech">

                {[
                  "Java",
                  "Spring Boot",
                  "Spring Data JPA",
                  "Hibernate",
                  "REST APIs",
                  "Microservices",
                  "Spring Security",
                  "JWT",
                  "RabbitMQ",
                  "PostgreSQL",
                  "Redis",
                  "React.js",
                  "React Native",
                  "Python",
                  "PaddleOCR",
                ].map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>


              <div className="resume-role-grid">

                <div>
                  <span>ROLE</span>

                  <strong>
                    Java Full Stack Developer
                  </strong>
                </div>


                <div>
                  <span>PROJECT MODE</span>

                  <strong>
                    Personal
                  </strong>
                </div>


                <div>
                  <span>ARCHITECTURE</span>

                  <strong>
                    Hospital-Centered /
                    Microservices
                  </strong>
                </div>

              </div>

            </article>


            {/* =====================================
                PROFESSIONAL PROJECT
            ====================================== */}

            <article className="resume-project-card resume-project-card-professional">

              <div className="resume-project-header">

                <div>

                  <span className="resume-project-code">
                    PROFESSIONAL // ICMS
                  </span>

                  <h3>
                    Integrated College / University
                    Management System
                  </h3>

                  <p>
                    Enterprise Management Platform
                  </p>

                </div>


                <div>

                  <span className="resume-project-mode">
                    PROFESSIONAL
                  </span>

                  <span className="resume-project-status">
                    IN PROGRESS
                  </span>

                </div>

              </div>


              <div className="resume-project-body">

                <div>

                  <span className="resume-panel-label">
                    OVERVIEW
                  </span>

                  <p>
                    An enterprise-grade Integrated
                    College / University Management
                    System designed to support academic,
                    administrative and institutional
                    operations through a secure and
                    scalable backend architecture.
                  </p>

                  <p>
                    I contribute as a Backend Developer,
                    developing APIs, backend services,
                    business logic, data access,
                    validation and authorization within
                    the system architecture.
                  </p>

                </div>


                <div className="resume-project-features">

                  <span className="resume-panel-label">
                    BACKEND CONTRIBUTION
                  </span>

                  <div className="resume-feature-grid">

                    <span>
                      REST API Development
                    </span>

                    <span>
                      Business Logic
                    </span>

                    <span>
                      Data Access
                    </span>

                    <span>
                      Validation
                    </span>

                    <span>
                      Authorization
                    </span>

                    <span>
                      PostgreSQL Integration
                    </span>

                    <span>
                      Redis Services
                    </span>

                    <span>
                      Async Processing
                    </span>

                  </div>

                </div>

              </div>


              <div className="resume-project-tech">

                {[
                  "Python",
                  "FastAPI",
                  "SQLAlchemy",
                  "Alembic",
                  "Pydantic",
                  "PostgreSQL",
                  "Redis",
                  "Celery",
                  "Casbin",
                  "JWT",
                  "OIDC",
                  "MFA",
                  "Microservices",
                ].map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>


              <div className="resume-role-grid">

                <div>
                  <span>ROLE</span>

                  <strong>
                    Backend Developer
                  </strong>
                </div>


                <div>
                  <span>PROJECT MODE</span>

                  <strong>
                    Professional
                  </strong>
                </div>


                <div>
                  <span>ARCHITECTURE</span>

                  <strong>
                    Microservices / FastAPI
                  </strong>
                </div>

              </div>

            </article>

          </section>


          {/* =======================================
              05 ROLES
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="05"
              title="System Roles"
              label="ROLE-BASED ACCESS CONTROL"
            />


            <div className="resume-roles-grid">

              {[
                "Super Admin",
                "Platform Admin",
                "Donor",
                "Main Hospital Admin",
                "Branch Hospital Admin",
                "Hospital Staff",
              ].map((role, index) => (

                <div
                  className="resume-role-card"
                  key={role}
                >

                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {role}
                  </strong>

                </div>

              ))}

            </div>

          </section>


          {/* =======================================
              06 EDUCATION
          ======================================= */}

          <section className="resume-section">

            <ResumeSectionTitle
              number="06"
              title="Credentials & Education"
              label="ACADEMIC & PROFESSIONAL RECORD"
            />


            <div className="resume-credentials-grid">

              <div className="resume-credential-card">

                <div className="resume-credential-top">

                  <span>
                    UNIVERSITY DEGREE
                  </span>

                  <strong>
                    2021 — 2024
                  </strong>

                </div>

                <h3>
                  B.Sc Chemistry
                </h3>

                <p>
                  Government Arts and Science College
                </p>

                <small>
                  Sivakasi, Tamil Nadu, India
                </small>

              </div>


              <div className="resume-credential-card">

                <div className="resume-credential-top">

                  <span>
                    PROFESSIONAL CERTIFICATION
                  </span>

                  <strong>
                    VERIFIED
                  </strong>

                </div>

                <h3>
                  Java Full Stack Developer Certificate
                </h3>

                <p>
                  Besant Technologies
                </p>

                <small>
                  Chennai
                </small>

              </div>

            </div>

          </section>


          {/* =======================================
              FOOTER
          ======================================= */}

          <footer className="resume-document-footer">

            <div>

              <span className="resume-footer-dot" />

              <span>
                DOCUMENT STATUS: CURRENT
              </span>

            </div>


            <div>

              <span>
                DOCUMENT FORMAT: ATS-STANDARD
              </span>

            </div>

          </footer>

        </div>

      </div>

    </main>
  );
}


/* =========================================
   SMALL COMPONENTS
========================================= */

function ResumeSectionTitle({
  number,
  title,
  label,
}) {
  return (
    <div className="resume-section-title">

      <div className="resume-section-title-main">

        <span>
          {number} //
        </span>

        <h2>
          {title}
        </h2>

      </div>

      <span className="resume-section-label">
        {label}
      </span>

    </div>
  );
}


function SkillCard({
  number,
  title,
  description,
  skills,
}) {
  return (
    <article className="resume-skill-card">

      <div className="resume-card-heading">

        <span className="resume-card-number">
          {number}
        </span>

        <h3>
          {title}
        </h3>

      </div>


      <p>
        {description}
      </p>


      <div className="resume-skill-tags">

        {skills.map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}

      </div>

    </article>
  );
}


export default ResumePage;