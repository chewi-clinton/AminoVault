import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import logo from "../assets/Footer_logo.webp";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

  useEffect(() => {
    if (!admin?.is_staff) {
      // The line below is commented out to allow access without login.
      // navigate("/admin/login", { replace: true });
    }
  }, [admin?.is_staff, navigate]);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefresh");
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="av-admin-shell">
      <aside className="av-admin-sidebar">
        <div className="av-admin-logo">
          <img src={logo} alt="AminoVault" className="av-admin-logo-img" />
        </div>

        <nav className="av-admin-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              "av-admin-nav-link" + (isActive ? " active" : "")
            }
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12h6v10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              "av-admin-nav-link" + (isActive ? " active" : "")
            }
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
            </svg>
            Products
          </NavLink>
        </nav>

        <button className="av-admin-logout" onClick={handleLogout}>
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </aside>

      <main className="av-admin-main">
        <header className="av-admin-topbar">
          <span className="av-admin-topbar-greeting">
            Welcome, <strong>{admin?.username || "Admin"}</strong>
          </span>
        </header>
        <div className="av-admin-content">{children}</div>
      </main>
    </div>
  );
}
