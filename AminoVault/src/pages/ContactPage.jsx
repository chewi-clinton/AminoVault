import React from "react";
import "../../src/styles/ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-page-wrapper">
      {/* Hero Section */}
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

      {/* Form Section */}
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
          <p className="required-fields">
            "<span>*</span>" indicates required fields
          </p>

          <form className="amino-vault-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  Name <span>*</span>
                </label>
                <div className="name-inputs">
                  <div className="sub-group">
                    <input type="text" placeholder="" />
                    <small>First</small>
                  </div>
                  <div className="sub-group">
                    <input type="text" placeholder="" />
                    <small>Last</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row split">
              <div className="form-group">
                <label>
                  Phone <span>*</span>
                </label>
                <input type="tel" />
              </div>
              <div className="form-group">
                <label>
                  Email <span>*</span>
                </label>
                <input type="email" />
              </div>
            </div>

            <div className="form-group">
              <label>
                Message <span>*</span>
              </label>
              <textarea rows="6"></textarea>
            </div>

            <div className="form-checkbox">
              <input type="checkbox" id="sms-opt-in" />
              <label htmlFor="sms-opt-in">
                I want to receive transactional messages from Amino Vault at my
                phone number provided. Message frequency may vary. Message and
                data charges may apply. Reply HELP or STOP to opt out.
              </label>
            </div>

            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
