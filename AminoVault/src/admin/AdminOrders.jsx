import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminProducts.css";
import "./AdminOrders.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const STATUS_COLORS = {
  pending: { bg: "#fff8e1", color: "#b8860b" },
  confirmed: { bg: "#e7f8f1", color: "#1a936f" },
  processing: { bg: "#e7f0ff", color: "#3b5bdb" },
  shipped: { bg: "#f3e8ff", color: "#845ef7" },
  delivered: { bg: "#e6f9ed", color: "#16a34a" },
  cancelled: { bg: "#feeef0", color: "#e5383b" },
  refunded: { bg: "#f1f3f5", color: "#666" },
};

const PAYMENT_LABELS = {
  zelle: "Zelle",
  chime: "Chime",
  apple_pay: "Apple Pay",
  cash_app: "Cash App",
  e_transfer: "E-Transfer",
  venmo: "Venmo",
  crypto: "Crypto",
};

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async (q = "", status = "") => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ search: q, ordering: "-created_at" });
      if (status) params.set("status", status);
      const res = await fetch(`${API}/api/orders/admin/?${params.toString()}`, {
        headers: authHeaders(),
      });
      if (res.status === 401 || res.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const data = await res.json();
      setOrders(data.results ?? data);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders(search, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    const id = setTimeout(() => fetchOrders(search, statusFilter), 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <AdminLayout>
      <div className="avp-header">
        <div>
          <h2 className="avp-title">Orders</h2>
          <p className="avp-count">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="avo-toolbar">
        <div className="avp-search-wrap">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by order #, name, or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="avp-search"
          />
        </div>

        <select
          className="avo-status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {error && <div className="avp-error">{error}</div>}

      {loading ? (
        <div className="avp-loading">
          <div className="avp-spinner" />
          Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="avp-empty">No orders found.</div>
      ) : (
        <div className="avp-table-wrap">
          <table className="avp-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                return (
                  <tr key={o.id}>
                    <td><code className="avp-sku">{o.order_number}</code></td>
                    <td>
                      <div className="avp-product-name">{o.customer_first_name} {o.customer_last_name}</div>
                      <div className="avp-product-variant">{o.customer_email}</div>
                    </td>
                    <td>{PAYMENT_LABELS[o.payment_method] || o.payment_method}</td>
                    <td className="avp-price">${parseFloat(o.total).toFixed(2)}</td>
                    <td>
                      <span className="avp-badge" style={{ background: sc.bg, color: sc.color }}>
                        {STATUS_LABELS[o.status] || o.status}
                      </span>
                    </td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="avp-actions">
                        <button
                          className="avp-action-btn avp-edit"
                          onClick={() => navigate(`/admin/orders/${o.id}`)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
