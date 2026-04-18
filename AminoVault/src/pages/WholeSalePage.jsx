import React, { useState } from "react";
import "../../src/styles/WholeSalePage.css";
import wholesaleImage from "../../src/assets/wholesale_img.webp";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const WholesalePage = () => {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    company_name: "", website: "", inquiry_details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "inquiry_details") setCharCount(value.length);
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API}/api/contact/wholesale/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Submission failed. Please try again.");
        return;
      }
      setSuccess(data.detail || "Your inquiry has been received!");
      setForm({ first_name: "", last_name: "", email: "", phone: "", company_name: "", website: "", inquiry_details: "" });
      setCharCount(0);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Wholesale Peptides</h1>
          <p className="contact-hero-description">
            Partner with AminoVault for bulk pricing, consistent supply, clean
            documentation, and fast fulfillment of wholesale/bulk orders for
            peptides in the USA
          </p>
        </div>
      </section>

      <section className="wholesale-why-section">
        <div className="wholesale-why-container">
          <h2 className="wholesale-main-title">
            Why Wholesale Buyers Choose AminoVault
          </h2>
          <div className="wholesale-content-row">
            <div className="wholesale-why-text">
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">Built For Repeat Purchasing</h3>
                <p className="wholesale-feature-desc">
                  We make it easy to re-order, track shipments, and keep your
                  inventory consistent with clear product labeling and organized
                  documentation.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">Clear Documentation & Verification</h3>
                <p className="wholesale-feature-desc">
                  We provide batch-level documentation and supporting materials
                  where available, so you can confidently manage receiving,
                  inventory, and internal quality checks.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">Faster Fulfillment, Fewer Surprises</h3>
                <p className="wholesale-feature-desc">
                  Wholesale accounts receive priority processing, order
                  visibility, and dedicated support for time-sensitive inventory
                  needs.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">Packaging That Scales With You</h3>
                <p className="wholesale-feature-desc">
                  From standard wholesale packaging to private label and custom
                  kitting (where available), we help you ship products the way
                  your customers expect.
                </p>
              </div>
            </div>
            <div className="wholesale-why-image">
              <img src={wholesaleImage} alt="Warehouse" className="wholesale-side-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="inquiry-section">
        <div className="inquiry-container">
          <h2 className="inquiry-title">Start Your Inquiry Below</h2>
          <div className="inquiry-description">
            <p>
              If you're a clinic, retailer, research supplier, or wellness brand
              looking for a reliable wholesale partner, AminoVault offers
              streamlined bulk ordering with responsive support and packaging
              options that fit your business.
            </p>
            <p>
              Contact us below for questions about bulk pricing, tiered
              discounts, and priority fulfillment.
            </p>
          </div>

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

          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name <span className="required">(Required)</span></label>
                <input type="text" name="first_name" value={form.first_name} onChange={onChange} required />
                <span className="sub-label">First</span>
              </div>
              <div className="form-group">
                <label style={{ visibility: "hidden" }}>Last Name</label>
                <input type="text" name="last_name" value={form.last_name} onChange={onChange} required />
                <span className="sub-label">Last</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email <span className="required">(Required)</span></label>
                <input type="email" name="email" value={form.email} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label>Phone <span className="required">(Required)</span></label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Company Name <span className="required">(Required)</span></label>
                <input type="text" name="company_name" value={form.company_name} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input type="url" name="website" value={form.website} onChange={onChange} placeholder="https://" />
              </div>
            </div>

            <div className="form-group" style={{ width: "100%", marginBottom: "20px" }}>
              <label>
                Provide additional details about your Wholesale/Bulk Inquiry{" "}
                <span className="required">(Required)</span>
              </label>
              <textarea name="inquiry_details" value={form.inquiry_details} onChange={onChange} required maxLength={600}></textarea>
              <div className="char-count">{charCount} of 600 max characters</div>
            </div>

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? "SUBMITTING…" : "SUBMIT"}
            </button>
          </form>

          <div className="disclaimer-text">
            <h3 className="disclaimer-title">
              Reliable bulk Peptide supply for qualified research buyers.
            </h3>
            <p>
              AminoVault supports verified wholesale customers with consistent
              inventory, batch-level documentation (when available), and fast
              fulfillment designed for repeat ordering.
            </p>
            <p>
              <span>
                All products are intended for laboratory and research use only
                and are not for human or veterinary use.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WholesalePage;
