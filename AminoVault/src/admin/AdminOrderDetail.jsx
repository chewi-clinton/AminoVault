import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminProducts.css";
import "./AdminOrderDetail.css";

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

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(`${API}/api/orders/admin/${id}/`, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setOrder(data);
      setStatus(data.status);
      setTrackingNumber(data.tracking_number || "");
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/orders/admin/${id}/`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status, tracking_number: trackingNumber }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrder(data);
      showToast("Order updated.");
    } catch {
      showToast("Failed to update order.");
    } finally {
      setSaving(false);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="avp-loading">
          <div className="avp-spinner" />
          Loading order…
        </div>
      </AdminLayout>
    );
  }

  if (notFound || !order) {
    return (
      <AdminLayout>
        <div className="avp-empty">
          Order not found.
          <div style={{ marginTop: 16 }}>
            <Link to="/admin/orders">Back to Orders</Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;

  return (
    <AdminLayout>
      <div className="avp-header">
        <div>
          <Link to="/admin/orders" className="avod-back-link">← Back to Orders</Link>
          <h2 className="avp-title" style={{ marginTop: 8 }}>Order #{order.order_number}</h2>
          <p className="avp-count">Placed {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <span className="avp-badge" style={{ background: sc.bg, color: sc.color, fontSize: 13, padding: "6px 16px" }}>
          {STATUS_LABELS[order.status] || order.status}
        </span>
      </div>

      <div className="avod-grid">
        <div className="avod-main">
          <div className="avod-card">
            <h3 className="avod-card-title">Customer</h3>
            <p><strong>{order.customer_first_name} {order.customer_last_name}</strong></p>
            <p><a href={`mailto:${order.customer_email}`}>{order.customer_email}</a></p>
            {order.customer_phone && <p>{order.customer_phone}</p>}
          </div>

          <div className="avod-card">
            <h3 className="avod-card-title">Shipping Address</h3>
            <p>{order.shipping_address_line1}</p>
            {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
            <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
            <p>{order.shipping_country}</p>
          </div>

          <div className="avod-card avod-payment-card">
            <h3 className="avod-card-title">Payment Method Requested</h3>
            <p className="avod-payment-method">{PAYMENT_LABELS[order.payment_method] || order.payment_method}</p>
            <p className="avod-payment-hint">
              Reach out to the customer at <a href={`mailto:${order.customer_email}`}>{order.customer_email}</a> with
              {" "}{PAYMENT_LABELS[order.payment_method] || order.payment_method} payment instructions to proceed.
            </p>
          </div>

          <div className="avod-card">
            <h3 className="avod-card-title">Items</h3>
            <table className="avp-table avod-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="avp-product-name">{item.product_name}</div>
                      {item.variant && <div className="avp-product-variant">{item.variant}</div>}
                    </td>
                    <td><code className="avp-sku">{item.product_sku}</code></td>
                    <td>{item.quantity}</td>
                    <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                    <td>${parseFloat(item.line_total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="avod-totals">
              <div className="avod-total-row"><span>Subtotal</span><span>${parseFloat(order.subtotal).toFixed(2)}</span></div>
              {order.discount_amount > 0 && (
                <div className="avod-total-row"><span>Discount {order.coupon_code_used && `(${order.coupon_code_used})`}</span><span>-${parseFloat(order.discount_amount).toFixed(2)}</span></div>
              )}
              {order.shipping_protection && (
                <div className="avod-total-row"><span>Shipping Protection</span><span>${parseFloat(order.shipping_protection_cost).toFixed(2)}</span></div>
              )}
              <div className="avod-total-row"><span>Shipping</span><span>FREE</span></div>
              <div className="avod-total-row avod-grand-total"><span>Total</span><span>${parseFloat(order.total).toFixed(2)}</span></div>
            </div>
          </div>

          {order.notes && (
            <div className="avod-card">
              <h3 className="avod-card-title">Customer Notes</h3>
              <p>{order.notes}</p>
            </div>
          )}
        </div>

        <div className="avod-side">
          <div className="avod-card">
            <h3 className="avod-card-title">Update Order</h3>
            <label className="avod-label">Status</label>
            <select className="avo-status-select avod-full-width" value={status} onChange={(e) => setStatus(e.target.value)}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <label className="avod-label" style={{ marginTop: 16 }}>Tracking Number</label>
            <input
              type="text"
              className="avp-search avod-full-width"
              style={{ paddingLeft: 16 }}
              placeholder="e.g. 1Z999AA10123456784"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />

            <button className="avp-add-btn-gradient avod-save-btn" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {toast && <div className="avp-toast">{toast}</div>}
    </AdminLayout>
  );
}
