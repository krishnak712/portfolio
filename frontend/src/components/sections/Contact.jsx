import { useState } from "react";
import apiClient from "../../services/apiClient";
import "./css/Contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!subject) {
      newErrors.subject = "Subject is required.";
    }

    if (!message) {
      newErrors.message = "Message is required.";
    } else if (message.length < 10) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    } else if (message.length > 2000) {
      newErrors.message =
        "Message cannot exceed 2000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("loading");

    try {
      await apiClient.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setForm(initialForm);
      setErrors({});
      setStatus("success");
      setShowSuccess(true);
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setStatus("idle");
  };

  return (
    <>
      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section
        className="contact-section"
        id="contact"
      >
        <div className="contact-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="contact-header">

            <span className="contact-eyebrow">
              08 — CONTACT
            </span>

            <h2>
              Let's build something
              <span> meaningful.</span>
            </h2>

            <p>
              Have a project idea, opportunity, or simply want to
              connect? Send me a message and I'll get back to you.
            </p>

          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="contact-grid">

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <aside className="contact-info">

              <div className="contact-info-block">

                <span className="contact-info-label">
                  EMAIL
                </span>

                <a href="mailto:pandiraman131@gmail.com">
                  pandiraman131@gmail.com
                </a>

              </div>

              <div className="contact-info-block">

                <span className="contact-info-label">
                  LOCATION
                </span>

                <p>
                  Sivakasi, India
                </p>

              </div>

              <div className="contact-info-block">

                <span className="contact-info-label">
                  SOCIAL
                </span>

                <div className="contact-socials">

                  <a
                    href="https://github.com/krishnak712"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href="https://linkedin.com/in/krishna-kumar712"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn ↗
                  </a>

                </div>

              </div>

              <div className="contact-availability">

                <span className="availability-dot" />

                <div>

                  <strong>
                    Available for opportunities
                  </strong>

                  <p>
                    Open to relevant software development
                    opportunities and technical collaborations.
                  </p>

                </div>

              </div>

            </aside>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="contact-form-wrapper">

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >

                {/* ---------------------------------------------
                    NAME + EMAIL
                --------------------------------------------- */}

                <div className="form-row">

                  <div className="form-field">

                    <label htmlFor="contact-name">
                      NAME
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className={
                        errors.name
                          ? "has-error"
                          : ""
                      }
                    />

                    {errors.name && (
                      <span className="field-error">
                        {errors.name}
                      </span>
                    )}

                  </div>

                  <div className="form-field">

                    <label htmlFor="contact-email">
                      EMAIL
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={
                        errors.email
                          ? "has-error"
                          : ""
                      }
                    />

                    {errors.email && (
                      <span className="field-error">
                        {errors.email}
                      </span>
                    )}

                  </div>

                </div>

                {/* ---------------------------------------------
                    SUBJECT
                --------------------------------------------- */}

                <div className="form-field">

                  <label htmlFor="contact-subject">
                    SUBJECT / PROJECT SCOPE
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to build?"
                    className={
                      errors.subject
                        ? "has-error"
                        : ""
                    }
                  />

                  {errors.subject && (
                    <span className="field-error">
                      {errors.subject}
                    </span>
                  )}

                </div>

                {/* ---------------------------------------------
                    MESSAGE
                --------------------------------------------- */}

                <div className="form-field">

                  <div className="message-label-row">

                    <label htmlFor="contact-message">
                      MESSAGE / PROJECT SPECIFICATIONS
                    </label>

                    <span>
                      {form.message.length}/2000
                    </span>

                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, requirements, timeline, or anything else that would be useful..."
                    rows={7}
                    maxLength={2000}
                    className={
                      errors.message
                        ? "has-error"
                        : ""
                    }
                  />

                  {errors.message && (
                    <span className="field-error">
                      {errors.message}
                    </span>
                  )}

                </div>

                {/* ---------------------------------------------
                    API ERROR
                --------------------------------------------- */}

                {status === "error" && (
                  <div
                    className="form-status form-status-error"
                    role="alert"
                  >
                    <strong>
                      Message could not be sent.
                    </strong>

                    <span>
                      Please check your connection and try again.
                    </span>
                  </div>
                )}

                {/* ---------------------------------------------
                    SUBMIT
                --------------------------------------------- */}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === "loading"}
                >

                  {status === "loading" ? (
                    <>
                      <span className="submit-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span>→</span>
                    </>
                  )}

                </button>

              </form>

              <p className="contact-form-note">
                Your information is only used to respond to your
                message.
              </p>

            </div>

          </div>

          {/* =================================================
              FOOTER LINE
          ================================================= */}

          <div className="contact-bottom">

            <span>
              KKR.DEV
            </span>

            <p>
              Java Full Stack Developer · Building with purpose.
            </p>

            <span>
              2026
            </span>

          </div>

        </div>
      </section>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      {showSuccess && (
        <div
          className="success-modal-backdrop"
          role="presentation"
          onClick={closeSuccessModal}
        >

          <div
            className="success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              MESSAGE RECEIVED
            </span>

            <h3 id="success-modal-title">
              Message Sent Successfully
            </h3>

            <p>
              Thanks for reaching out. Your message has been
              received. I'll get back to you soon.
            </p>

            <button
              type="button"
              onClick={closeSuccessModal}
              className="success-done-button"
            >
              Done
            </button>

          </div>

        </div>
      )}
    </>
  );
}