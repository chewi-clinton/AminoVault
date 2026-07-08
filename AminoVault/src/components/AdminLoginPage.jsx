import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Amino_logo.webp";
import "../../styles/AdminLoginPage.css";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // In a real app, you'd have an API call here to authenticate the user.
    // For this example, we'll just simulate a successful login.
    console.log("Logging in with:", { email, password });
    setError("");
    // Redirect to admin dashboard on successful login
    navigate("/admin/products");
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <img src={logo} alt="AminoVault Logo" className="admin-login-logo" />
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aminovault.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="admin-login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
