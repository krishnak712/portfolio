import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProjectBySlug } from "../services/contentServices";
import "./css/ProjectDetail.css";


function ProjectDetail() {
  const { projectSlug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   window.scrollTo(0, 0);
  }, []);

  // Selected workflow card
  const [activeWorkflowId, setActiveWorkflowId] = useState(null);


  /* =====================================================
     FETCH PROJECT
  ====================================================== */

  useEffect(() => {
    if (!projectSlug) {
      setError("Project not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getProjectBySlug(projectSlug)
      .then((data) => {
        console.log(
          "PROJECT DETAIL FROM FASTAPI:",
          data
        );

        setProject(data);
      })
      .catch((err) => {
        console.error(
          "Failed to load project:",
          err
        );

        if (err.response?.status === 404) {
          setError("Project not found");
        } else {
          setError("Unable to load project.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectSlug]);


  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <section className="project-not-found">
        <div>

          <span>
            PROJECT / LOADING
          </span>

          <h1>
            Loading project...
          </h1>

          <p>
            Fetching project details from
            the portfolio API.
          </p>

        </div>
      </section>
    );
  }


  /* =====================================================
     ERROR / 404
  ====================================================== */

  if (error || !project) {
    return (
      <section className="project-not-found">
        <div>

          <span>
            PROJECT / 404
          </span>

          <h1>
            Project not found.
          </h1>

          <p>
            The requested project could not
            be loaded.
          </p>

          <Link to="/projects">
            ← Back to projects
          </Link>

        </div>
      </section>
    );
  }


  /* =====================================================
     SORT PROJECT DATA
  ====================================================== */

  const technologies = [
    ...(project.technologies || [])
  ].sort(
    (a, b) =>
      (a.display_order ?? 0) -
      (b.display_order ?? 0)
  );


  const sections = [
    ...(project.sections || [])
  ].sort(
    (a, b) =>
      (a.display_order ?? 0) -
      (b.display_order ?? 0)
  );


  const detail = project.detail;


  /* =====================================================
     FIND RBAC SECTION
  ====================================================== */

  const rbacSection = sections.find(
    (section) =>
      section.section_type === "role-grid"
  );


  /* =====================================================
     FIND STATUS SECTION
  ====================================================== */

  const statusSection = sections.find(
    (section) =>
      section.section_type === "status"
  );


  /* =====================================================
     FEATURE SECTIONS
  ====================================================== */

  const featureSections = sections
    .filter(
      (section) =>
        section.section_type === "feature-grid"
    )
    .sort(
      (a, b) =>
        (a.display_order ?? 0) -
        (b.display_order ?? 0)
    );


  /* =====================================================
     ALL 8 SYSTEM DESIGN WORKFLOWS
     
     01 Authentication & Verification
     02 Role-Based Access Control
     03 Hospital-Centered Workflow
     04 Smart Donor Matching
     05 Real-Time Coordination
     06 Live Tracking & Geofence
     07 Donation PIN Verification
     08 Audit & Accountability
  ====================================================== */

  const systemDesignSections = [
    ...featureSections,
    ...(rbacSection ? [rbacSection] : [])
  ].sort(
    (a, b) =>
      (a.display_order ?? 0) -
      (b.display_order ?? 0)
  );


  /* =====================================================
     SECURITY SECTIONS
  ====================================================== */

  const authenticationSection =
    systemDesignSections.find(
      (section) =>
        section.title ===
        "Authentication & Verification"
    );


  const trackingSection =
    systemDesignSections.find(
      (section) =>
        section.title ===
        "Live Tracking & Geofence"
    );


  const auditSection =
    systemDesignSections.find(
      (section) =>
        section.title ===
        "Audit & Accountability"
    );


  /* =====================================================
     ACTIVE WORKFLOW
  ====================================================== */

  const activeWorkflow =
    systemDesignSections.find(
      (section) =>
        section.id === activeWorkflowId
    );


  const activeWorkflowIndex =
    systemDesignSections.findIndex(
      (section) =>
        section.id === activeWorkflowId
    );


  /* =====================================================
     TOGGLE WORKFLOW
  ====================================================== */

  const handleWorkflowClick = (section) => {
    setActiveWorkflowId(
      activeWorkflowId === section.id
        ? null
        : section.id
    );
  };


  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="project-detail-page">


      {/* =====================================================
          PROJECT HERO
      ====================================================== */}

      <section className="project-detail-hero">

        <div className="project-detail-container">

          <Link
            to="/#projects"
            className="project-back-link"
          >
            ← Back to projects
          </Link>


          {/* Project Meta */}

          <div className="project-detail-meta">

            <span>
              {String(
                project.display_order ?? 1
              ).padStart(2, "0")}
            </span>


            <span className="project-status">
              {project.status || "PROJECT"}
            </span>


            <span>
              {project.project_type ||
                "ENGINEERING PROJECT"}
            </span>

          </div>


          {/* Project Heading */}

          <div className="project-detail-heading">

            <div>

              <span className="project-eyebrow">
                FEATURED ENGINEERING PROJECT
              </span>


              <h1>
                {project.title}
                <span>.</span>
              </h1>


              <h2>
                {project.role ||
                  "Software Engineering Project"}
              </h2>

            </div>


            <p>
              {project.description ||
                project.short_description}
            </p>

          </div>


          {/* Technologies */}

          <div className="project-technologies">

            <span className="technology-label">
              TECHNOLOGIES
            </span>


            <div className="technology-list">

              {technologies.map(
                (technology) => (

                  <span
                    key={technology.id}
                  >
                    {technology.technology}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section className="project-overview">

        <div className="project-detail-container">

          <div className="project-section-heading">

            <span>
              01 — OVERVIEW
            </span>


            <h2>
              A workflow built around
              <strong>
                {" "}trust and verification.
              </strong>
            </h2>

          </div>


          <div className="project-overview-grid">


            {/* Overview Content */}

            <div className="project-overview-copy">

              <p>
                {detail?.overview ||
                  project.description ||
                  project.short_description}
              </p>


              {detail?.problem_statement && (

                <p>
                  {detail.problem_statement}
                </p>

              )}


              {detail?.solution && (

                <p>
                  {detail.solution}
                </p>

              )}

            </div>


            {/* Core Workflow */}

            <div className="project-flow">

              <span className="flow-label">
                CORE WORKFLOW
              </span>


              <div className="flow-list">

                {systemDesignSections.map(
                  (section, index) => (

                    <button
                      type="button"
                      key={section.id}
                      onClick={() =>
                        handleWorkflowClick(
                          section
                        )
                      }
                    >

                      <span>
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>


                      {section.title}

                    </button>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          SYSTEM DESIGN — 8 WORKFLOW GRID
      ====================================================== */}

      <section className="project-architecture">

        <div className="project-detail-container">


          {/* Heading */}

          <div className="project-section-heading">

            <span>
              02 — SYSTEM DESIGN
            </span>


            <h2>
              Engineering the
              <strong>
                {" "}workflow.
              </strong>
            </h2>


            <p>
              Explore each workflow area to
              understand how the platform operates
              from verification through completed
              donation.
            </p>

          </div>


          {/* =================================================
              8 GRID CARDS
          ================================================== */}

          <div className="architecture-grid">

            {systemDesignSections.map(
              (section, index) => {

                const isActive =
                  activeWorkflowId === section.id;


                return (

                  <button
                    type="button"
                    key={section.id}
                    className={`architecture-card ${
                      isActive
                        ? "architecture-card-active"
                        : ""
                    }`}
                    onClick={() =>
                      handleWorkflowClick(
                        section
                      )
                    }
                  >

                    {/* Number */}

                    <span className="architecture-number">

                      {String(
                        index + 1
                      ).padStart(2, "0")}

                    </span>


                    {/* Title */}

                    <h3>
                      {section.title}
                    </h3>


                    {/* Explanation */}

                    <p>
                      {section.description ||
                        "This section describes an important part of the platform workflow."}
                    </p>


                    {/* Action */}

                    <span className="architecture-card-action">

                      {isActive
                        ? "CLOSE DETAILS ↑"
                        : "VIEW DETAILS →"}

                    </span>

                  </button>

                );

              }
            )}

          </div>



          {/* =================================================
              SELECTED WORKFLOW DETAILS
          ================================================== */}

          {activeWorkflow && (

            <div className="workflow-detail-panel">


              {/* Header */}

              <div className="workflow-detail-header">

                <div>

                  <span>
                    WORKFLOW /{" "}
                    {String(
                      activeWorkflowIndex + 1
                    ).padStart(2, "0")}
                  </span>


                  <h3>
                    {activeWorkflow.title}
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setActiveWorkflowId(null)
                  }
                >
                  CLOSE ×
                </button>

              </div>


              {/* Main Explanation */}

              <p className="workflow-detail-description">

                {activeWorkflow.description ||
                  "This workflow is an important part of the platform architecture."}

              </p>


              {/* =================================================
                  WORKFLOW ITEMS
              ================================================== */}

              {activeWorkflow.items?.length > 0 ? (

                <div className="workflow-detail-items">

                  {[
                    ...(activeWorkflow.items || [])
                  ]
                    .sort(
                      (a, b) =>
                        (a.display_order ?? 0) -
                        (b.display_order ?? 0)
                    )
                    .map(
                      (item, itemIndex) => (

                        <div
                          className="workflow-detail-item"
                          key={item.id}
                        >

                          <span className="workflow-detail-item-number">

                            {item.item_number ||
                              String(
                                itemIndex + 1
                              ).padStart(2, "0")}

                          </span>


                          <div>

                            <h4>
                              {item.title}
                            </h4>


                            {item.description && (

                              <p>
                                {item.description}
                              </p>

                            )}

                          </div>

                        </div>

                      )
                    )}

                </div>

              ) : (

                <div className="workflow-detail-empty">

                  <p>
                    Detailed workflow information
                    is not available for this section.
                  </p>

                </div>

              )}

            </div>

          )}

        </div>

      </section>



      {/* =====================================================
          SECURITY
      ====================================================== */}

      <section className="project-security">

        <div className="project-detail-container">

          <div className="security-panel">


            <div className="security-header">

              <span>
                SECURITY
              </span>


              <strong>
                SECURITY / ENABLED
              </strong>

            </div>


            <h2>
              Security is part of
              <span>
                {" "}the workflow.
              </span>
            </h2>


            <div className="security-grid">


              {/* Authentication */}

              <div>

                <strong>
                  AUTHENTICATION
                </strong>


                <p>
                  {authenticationSection?.description ||
                    "Secure authentication and identity verification protect access to the platform."}
                </p>

              </div>


              {/* Authorization */}

              <div>

                <strong>
                  AUTHORIZATION
                </strong>


                <p>
                  {rbacSection?.description ||
                    "Role-Based Access Control separates permissions between platform roles."}
                </p>

              </div>


              {/* Privacy */}

              <div>

                <strong>
                  PRIVACY
                </strong>


                <p>
                  {trackingSection?.description ||
                    "Location sharing is controlled by user permission and active workflow state."}
                </p>

              </div>


              {/* Accountability */}

              <div>

                <strong>
                  ACCOUNTABILITY
                </strong>


                <p>
                  {auditSection?.description ||
                    "Important platform activities are recorded through audit logging."}
                </p>

              </div>


            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          PROJECT STATUS
      ====================================================== */}

      <section className="project-detail-bottom">

        <div className="project-detail-container">

          <Link
            to="/#projects"
            className="project-back-link"
          >
            ← Back to all projects
          </Link>


          <div className="project-next">

            <span>
              {statusSection?.eyebrow ||
                "PROJECT STATUS"}
            </span>


            <h2>
              {statusSection?.title ||
                project.status ||
                "Currently in development."}
            </h2>


            <p>
              {statusSection?.description ||
                project.description}
            </p>

          </div>

        </div>

      </section>


    </div>
  );
}


export default ProjectDetail;