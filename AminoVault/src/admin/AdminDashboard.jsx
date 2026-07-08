import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

  return (
    <AdminLayout>
      <div className="avd-header">
        <h2 className="avd-title">Dashboard</h2>
        <p className="avd-greeting">
          Welcome back, <strong>{admin?.username || "Admin"}</strong>!
        </p>
      </div>

      <div className="avd-grid">
        {/* Placeholder for stats cards */}
        <div className="avd-card">
          <h3 className="avd-card-title">Total Products</h3>
          <p className="avd-card-value">--</p>
          <p className="avd-card-desc">Number of products in the store</p>
        </div>
        <div className="avd-card">
          <h3 className="avd-card-title">Total Orders</h3>
          <p className="avd-card-value">--</p>
          <p className="avd-card-desc">Number of completed orders</p>
        </div>
        <div className="avd-card">
          <h3 className="avd-card-title">Revenue</h3>
          <p className="avd-card-value">$ --</p>
          <p className="avd-card-desc">Total sales revenue</p>
        </div>
        <div className="avd-card">
          <h3 className="avd-card-title">New Customers</h3>
          <p className="avd-card-value">--</p>
          <p className="avd-card-desc">This month</p>
        </div>
      </div>

      <div className="avd-quick-actions">
        <h3 className="avd-section-title">Quick Actions</h3>
        <div className="avd-actions-grid">
          <button className="avd-action-btn" onClick={() => navigate("/admin/products/add")}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            <span>Add New Product</span>
          </button>
          <button className="avd-action-btn" onClick={() => navigate("/admin/products")}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
            </svg>
            <span>Manage Products</span>
          </button>
          {/* Add more quick actions as needed */}
        </div>
      </div>
    </AdminLayout>
  );
}