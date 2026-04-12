import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // ← Import from Lucide
import "../../src/styles/MyAccountPage.css";

const MyAccountPage = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">My Account</h1>
          <p className="contact-hero-description">
            Access your orders, track shipments, and manage account details with
            confidence. At AminoVault, precision extends beyond our peptides, we
            ensure your experience is secure, seamless, and tailored to your
            research needs.
          </p>
        </div>
      </section>

      {/* Login & Register Forms */}
      <div className="account-container">
        <div className="account-forms">
          {/* Login Form */}
          <div className="form-box">
            <h2>Login</h2>

            <div className="form-group">
              <label>
                Username or email address <span className="required">*</span>
              </label>
              <input type="text" className="input-field" placeholder="" />
            </div>

            <div className="form-group">
              <label>
                Password <span className="required">*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  className="input-field"
                  placeholder=""
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <button className="submit-btn">Log In</button>
            </div>
          </div>

          <div className="form-box">
            <h2>Register</h2>

            <div className="form-group">
              <label>
                Username <span className="required">*</span>
              </label>
              <input type="text" className="input-field" placeholder="" />
            </div>

            <div className="form-group">
              <label>
                Email address <span className="required">*</span>
              </label>
              <input type="email" className="input-field" placeholder="" />
            </div>

            <div className="form-group">
              <label>
                Password <span className="required">*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  className="input-field"
                  placeholder=""
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showRegisterPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <p className="register-notice">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <a
                style={{ color: "#ca33d2", textDecoration: "none" }}
                href="/privacy-policy"
              >
                privacy policy
              </a>
              .
            </p>

            <button className="submit-btn">Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
