import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../src/styles/MyAccountPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const MyAccountPage = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Register state
  const [regForm, setRegForm] = useState({ username: "", email: "", password: "" });
  const [regErrors, setRegErrors] = useState({});
  const [regSuccess, setRegSuccess] = useState("");
  const [registering, setRegistering] = useState(false);

  // Logged-in user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userProfile") || "null");
    } catch {
      return null;
    }
  });

  async function handleLogin(e) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    setLoginSuccess("");
    try {
      const res = await fetch(`${API}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.non_field_errors?.[0] || data.detail || "Login failed.");
        return;
      }
      localStorage.setItem("userToken", data.access);
      localStorage.setItem("userRefresh", data.refresh);
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      setUser(data.user);
      setLoginSuccess("Logged in successfully!");
    } catch {
      setLoginError("Unable to connect. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegistering(true);
    setRegErrors({});
    setRegSuccess("");
    try {
      const res = await fetch(`${API}/api/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegErrors(typeof data === "object" ? data : { non_field_errors: [String(data)] });
        return;
      }
      setRegSuccess("Account created! You can now log in.");
      setRegForm({ username: "", email: "", password: "" });
    } catch {
      setRegErrors({ non_field_errors: ["Network error. Please try again."] });
    } finally {
      setRegistering(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRefresh");
    localStorage.removeItem("userProfile");
    setUser(null);
  }

  return (
    <>
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

      <div className="account-container">
        {user ? (
          // Logged-in view
          <div className="account-forms" style={{ justifyContent: "flex-start" }}>
            <div className="form-box">
              <h2>Welcome, {user.username || user.email}</h2>
              <p style={{ marginBottom: "20px", color: "#555" }}>
                You are logged in as <strong>{user.email}</strong>.
              </p>
              <a href="/track-order" style={{ display: "block", marginBottom: "12px", color: "#ca33d2", textDecoration: "none", fontWeight: 500 }}>
                Track an Order
              </a>
              <button className="submit-btn" onClick={handleLogout} style={{ marginTop: "20px" }}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="account-forms">
            {/* Login Form */}
            <div className="form-box">
              <h2>Login</h2>
              {loginError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "10px 14px", borderRadius: "4px", fontSize: "14px", marginBottom: "16px" }}>
                  {loginError}
                </div>
              )}
              {loginSuccess && (
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", padding: "10px 14px", borderRadius: "4px", fontSize: "14px", marginBottom: "16px" }}>
                  {loginSuccess}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email address <span className="required">*</span></label>
                  <input
                    type="email"
                    className="input-field"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password <span className="required">*</span></label>
                  <div className="password-wrapper">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="input-field"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                      required
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                      {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="login-options">
                  <button type="submit" className="submit-btn" disabled={loggingIn}>
                    {loggingIn ? "Logging In…" : "Log In"}
                  </button>
                </div>
              </form>
            </div>

            {/* Register Form */}
            <div className="form-box">
              <h2>Register</h2>
              {regErrors.non_field_errors && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "10px 14px", borderRadius: "4px", fontSize: "14px", marginBottom: "16px" }}>
                  {regErrors.non_field_errors[0]}
                </div>
              )}
              {regSuccess && (
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", padding: "10px 14px", borderRadius: "4px", fontSize: "14px", marginBottom: "16px" }}>
                  {regSuccess}
                </div>
              )}
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Username <span className="required">*</span></label>
                  <input
                    type="text"
                    className="input-field"
                    value={regForm.username}
                    onChange={(e) => setRegForm((f) => ({ ...f, username: e.target.value }))}
                    required
                  />
                  {regErrors.username && <span style={{ color: "#dc2626", fontSize: "12px" }}>{regErrors.username[0]}</span>}
                </div>
                <div className="form-group">
                  <label>Email address <span className="required">*</span></label>
                  <input
                    type="email"
                    className="input-field"
                    value={regForm.email}
                    onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                  {regErrors.email && <span style={{ color: "#dc2626", fontSize: "12px" }}>{regErrors.email[0]}</span>}
                </div>
                <div className="form-group">
                  <label>Password <span className="required">*</span></label>
                  <div className="password-wrapper">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      className="input-field"
                      value={regForm.password}
                      onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
                      required
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                      {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {regErrors.password && <span style={{ color: "#dc2626", fontSize: "12px" }}>{regErrors.password[0]}</span>}
                </div>
                <p className="register-notice">
                  Your personal data will be used to support your experience throughout
                  this website, to manage access to your account, and for other purposes
                  described in our{" "}
                  <a href="/privacy-policy" style={{ color: "#ca33d2", textDecoration: "none" }}>
                    privacy policy
                  </a>.
                </p>
                <button type="submit" className="submit-btn" disabled={registering}>
                  {registering ? "Registering…" : "Register"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccountPage;
