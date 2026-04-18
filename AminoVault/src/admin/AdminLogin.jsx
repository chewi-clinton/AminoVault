import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import logo from "../assets/Footer_logo.webp";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.non_field_errors?.[0] || data.detail || "Login failed.";
        setError(msg);
        return;
      }

      if (!data.user?.is_staff) {
        setError("Access denied. Admin accounts only.");
        return;
      }

      localStorage.setItem("adminToken", data.access);
      localStorage.setItem("adminRefresh", data.refresh);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/admin/products", { replace: true });
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="av-login-page">
      <div className="av-login-card">
        <div className="av-login-brand">
          <img src={logo} alt="AminoVault" className="av-login-logo-img" />
          <p className="av-login-subtitle">Admin Panel — Sign in to manage your store</p>
        </div>

        <form className="av-login-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="av-login-error">{error}</div>}

          <div className="av-login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="admin@aminovault.com"
            />
          </div>

          <div className="av-login-field">
            <label htmlFor="password">Password</label>
            <div className="av-login-pw-wrap">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="av-login-eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label="Toggle password"
              >
                {showPass ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="av-login-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
