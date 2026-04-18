import React, { useState } from "react";
import "../../src/styles/ContactPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ContactPage = () => {
  const [form, setForm] = useState({
    first_name: "", last_name: "", phone: "", email: "", message: "", sms_opt_in: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Submission failed. Please try again.");
        return;
      }
      setSuccess(data.detail || "Your message has been sent!");
      setForm({ first_name: "", last_name: "", phone: "", email: "", message: "", sms_opt_in: false });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="contact-page-wrapper">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us Today</h1>
          <p className="contact-hero-description">
            Have questions about our 99%+ pure, COA-verified peptides? The
            AminoVault team is here to assist, ensuring your research starts
            with precision, trust, and expert guidance from our USA-based
            specialists.
          </p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-header">
          <h2 className="form-main-title">
            Contact AminoVault – Precision Starts Here
          </h2>
          <p className="form-subtitle">
            Whether you need details on our COA-verified peptides or guidance
            for your next study, our team is ready to help. Reach out today and
            get expert answers, fast.
          </p>
        </div>

        <div className="form-container">
          <p className="required-fields">"<span>*</span>" indicates required fields</p>

          {success && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", padding: "12px 16px", borderRadius: "6px", marginBottom: "20px", fontFamily: "DM Sans, sans-serif", fontSize: "14px" }}>
              {success}
            </div>
          )}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "12px 16px", borderRadius: "6px", marginBottom: "20px", fontFamily: "DM Sans, sans-serif", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <form className="amino-vault-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name <span>*</span></label>
                <div className="name-inputs">
                  <div className="sub-group">
                    <input type="text" name="first_name" value={form.first_name} onChange={onChange} required placeholder="" />
                    <small>First</small>
                  </div>
                  <div className="sub-group">
                    <input type="text" name="last_name" value={form.last_name} onChange={onChange} required placeholder="" />
                    <small>Last</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row split">
              <div className="form-group">
                <label>Phone <span>*</span></label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label>Email <span>*</span></label>
                <input type="email" name="email" value={form.email} onChange={onChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Message <span>*</span></label>
              <textarea name="message" rows="6" value={form.message} onChange={onChange} required></textarea>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="sms-opt-in"
                name="sms_opt_in"
                checked={form.sms_opt_in}
                onChange={onChange}
              />
              <label htmlFor="sms-opt-in">
                I want to receive transactional messages from Amino Vault at my
                phone number provided. Message frequency may vary. Message and
                data charges may apply. Reply HELP or STOP to opt out.
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? "SENDING…" : "SUBMIT"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
