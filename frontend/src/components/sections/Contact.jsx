import { useEffect, useState } from "react";
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
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!subject) {
      newErrors.subject = "Subject is required.";
    }

    if (!message) {
      newErrors.message = "Message is required.";
    } else if (message.length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    } else if (message.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
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

  useEffect(() => {
    if (!showSuccess) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSuccessModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showSuccess]);

  return (
    <>
      <section className="contact-section psa-reveal" id="contact">
        <div className="contact-grid-background" aria-hidden="true" />
        <div className="contact-glow contact-glow-one" aria-hidden="true" />
        <div className="contact-glow contact-glow-two" aria-hidden="true" />

        <div className="contact-container">
          {/* TOP REGISTRY RAIL */}
          <div className="contact-registry psa-item">
            <div className="contact-registry-left">
              <span className="contact-registry-index">
                ┌[CONTACT_INDEX]
              </span>
              <span className="contact-registry-separator">▪</span>
              <span className="contact-registry-text">
                INQUIRY REGISTER // COMMUNICATION_RECORD
              </span>
            </div>

            <div className="contact-channel-status">
              <span className="contact-channel-dot" />
              <span>CONTACT CHANNEL ACTIVE</span>
            </div>
          </div>

          {/* EDITORIAL HEADER */}
          <header className="contact-header psa-item">
            <div className="contact-header-copy">
              <div className="contact-eyebrow">
                <span>08 // CONTACT</span>
                <i />
                <span>INQUIRY DISPATCH / COMMUNICATION_CHANNEL</span>
              </div>

              <h2>
                Let&apos;s build something{" "}
                <span>meaningful.</span>
              </h2>

              <p>
                Have a project idea, opportunity, or simply want to connect?
                Send me a message and I&apos;ll get back to you.
              </p>
            </div>

            <div className="contact-route-badge">
              <div className="contact-route-title">
                <span aria-hidden="true">◉</span>
                <span>DIRECT ROUTE</span>
              </div>

              <strong>
                CONTACT
                <br />
                CHANNEL
                <br />
                <span>ACTIVE</span>
              </strong>
            </div>
          </header>

          {/* MAIN CONTACT GRID */}
          <div className="contact-main-grid">
            {/* LEFT: CONTACT DOSSIER */}
            <aside className="contact-dossier psa-item">
              <div className="contact-corner contact-corner-tl" />
              <div className="contact-corner contact-corner-tr" />
              <div className="contact-corner contact-corner-bl" />
              <div className="contact-corner contact-corner-br" />

              <div className="contact-dossier-header">
                <span>// DOSSIER_RECORDS :: DIRECT_ACCESS</span>
                <span aria-hidden="true">◆</span>
              </div>

              <div className="contact-dossier-records">
                <div className="contact-record">
                  <div className="contact-record-heading">
                    <span>[ 01 ] EMAIL</span>
                    <small>PRIORITY_CHANNEL</small>
                  </div>

                  <a
                    className="contact-email-link"
                    href="mailto:pandiraman131@gmail.com"
                  >
                    <span>pandiraman131@gmail.com</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="contact-record">
                  <div className="contact-record-heading">
                    <span>[ 02 ] LOCATION</span>
                    <small>REGION // INDIA</small>
                  </div>

                  <p className="contact-location">
                    <span aria-hidden="true">◆</span>
                    <span>Sivakasi, India</span>
                  </p>
                </div>

                <div className="contact-record">
                  <div className="contact-record-heading">
                    <span>[ 03 ] SOCIAL_CHANNELS</span>
                    <small>VERIFIED_IDS</small>
                  </div>

                  <div className="contact-socials">
                    <a
                      href="https://github.com/krishnak712"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                      <span aria-hidden="true">↗</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/krishna-kumar712"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>LinkedIn</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>

                <div className="contact-record contact-record-availability">
                  <div className="contact-record-heading">
                    <span>[ 04 ] AVAILABILITY</span>
                  </div>

                  <div className="contact-availability-row">
                    <span className="contact-availability-dot" />
                    <strong>Available for opportunities</strong>
                  </div>

                  <p>
                    Open to relevant software development opportunities and
                    technical collaborations.
                  </p>
                </div>
              </div>
            </aside>

            {/* RIGHT: CONTACT FORM */}
            <div className="contact-form-panel psa-item">
              <div className="contact-corner contact-corner-tl" />
              <div className="contact-corner contact-corner-tr" />
              <div className="contact-corner contact-corner-bl" />
              <div className="contact-corner contact-corner-br" />

              <div className="contact-form-header">
                <div>
                  <span className="contact-form-title">
                    <span aria-hidden="true">→</span>
                    MESSAGE DISPATCH
                  </span>
                  <p>SUBMIT PROJECT / OPPORTUNITY INQUIRY</p>
                </div>
              </div>

              {status === "error" && (
                <div className="contact-error-panel" role="alert">
                  <span className="contact-error-icon" aria-hidden="true">
                    !
                  </span>

                  <div>
                    <strong>[ SYSTEM_ALERT ] DISPATCH_FAILURE</strong>
                    <p>
                      MESSAGE COULD NOT BE SENT. Please check your connection
                      and try again.
                    </p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      <span>01 // SENDER_NAME *</span>
                      <small>REQ</small>
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={errors.name ? "has-error" : ""}
                    />

                    {errors.name && (
                      <span
                        id="contact-name-error"
                        className="contact-field-error"
                        role="alert"
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      <span>02 // RETURN_ADDRESS *</span>
                      <small>REQ</small>
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={errors.email ? "has-error" : ""}
                    />

                    {errors.email && (
                      <span
                        id="contact-email-error"
                        className="contact-field-error"
                        role="alert"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">
                    <span>03 // INQUIRY_SCOPE *</span>
                    <small>REQ</small>
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to build?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    className={errors.subject ? "has-error" : ""}
                  />

                  {errors.subject && (
                    <span
                      id="contact-subject-error"
                      className="contact-field-error"
                      role="alert"
                    >
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <div className="contact-message-label">
                    <label htmlFor="contact-message">
                      04 // SPECIFICATIONS_PAYLOAD *
                    </label>

                    <span>{form.message.length}/2000</span>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, requirements, timeline, or anything else that would be useful..."
                    rows={6}
                    maxLength={2000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className={errors.message ? "has-error" : ""}
                  />

                  {errors.message && (
                    <span
                      id="contact-message-error"
                      className="contact-field-error"
                      role="alert"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="contact-privacy">
                  <span aria-hidden="true">◆</span>
                  <span>
                    Your information is only used to respond to your message.
                  </span>
                </div>

                <div className="contact-submit-row">
                  <span className="contact-validation">
                    INPUT_VALIDATION: <strong>ACTIVE</strong>
                  </span>

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="contact-spinner" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* BOTTOM TECHNICAL STRIP */}
          <div className="contact-bottom psa-item">
            <div>
              <span className="contact-bottom-brand">KKR.DEV</span>
            </div>

            <p>Java Full Stack Developer · Building with purpose.</p>

            <span className="contact-bottom-year">// 2026</span>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div
          className="contact-success-backdrop"
          role="presentation"
          onClick={closeSuccessModal}
        >
          <div
            className="contact-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-corner contact-corner-tl" />
            <div className="contact-corner contact-corner-tr" />
            <div className="contact-corner contact-corner-bl" />
            <div className="contact-corner contact-corner-br" />

            <button
              type="button"
              className="contact-success-close"
              onClick={closeSuccessModal}
              aria-label="Close dialog"
            >
              ×
            </button>

            <div className="contact-success-header">
              <span>✓ [ DISPATCH_CONFIRMED ] // ACK: 200 OK</span>
            </div>

            <div className="contact-success-body">
              <div className="contact-success-icon" aria-hidden="true">
                ✓
              </div>

              <span className="contact-success-label">MESSAGE RECEIVED</span>

              <h3 id="contact-success-title">
                Message Sent Successfully
              </h3>

              <p>
                Thanks for reaching out. Your message has been received.
                I&apos;ll get back to you soon.
              </p>
            </div>

            <div className="contact-success-footer">
              <button type="button" onClick={closeSuccessModal}>
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
