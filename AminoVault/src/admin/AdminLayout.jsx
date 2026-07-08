import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import logo from "../assets/Footer_logo.webp";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser") || "null");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminToken") || !admin?.is_staff) {
      navigate("/admin/login", { replace: true });
    }
  }, [admin?.is_staff, navigate]);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefresh");
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="av-admin-shell">
      <div
        className={`av-admin-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`av-admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="av-admin-logo">
          <img src={logo} alt="AminoVault" className="av-admin-logo-img" />
        </div>

        <nav className="av-admin-nav">
          <NavLink
            to="/admin/dashboard"
            onClick={closeSidebar}
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
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={closeSidebar}
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
            <span>Products</span>
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
          <span>Logout</span>
        </button>
      </aside>

      <main className="av-admin-main">
        <header className="av-admin-topbar">
          <button
            type="button"
            className="av-admin-menu-toggle"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="av-admin-topbar-greeting">
            Welcome, <strong>{admin?.username || "Admin"}</strong>
          </span>
        </header>
        <div className="av-admin-content">{children}</div>
      </main>
    </div>
  );
}
