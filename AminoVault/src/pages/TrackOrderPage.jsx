import React, { useState } from "react";
import "../../src/styles/TrackOrderPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const TrackOrderPage = () => {
  const [form, setForm] = useState({ order_number: "", billing_email: "" });
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`${API}/api/orders/track/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Order not found. Please check your details.");
        return;
      }
      setOrder(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const statusLabel = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const statusColor = {
    pending: "#f59e0b",
    processing: "#3b82f6",
    shipped: "#8b5cf6",
    delivered: "#16a34a",
    cancelled: "#dc2626",
  };

  return (
    <div className="track-order-wrapper">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Track Your Order</h1>
          <p className="contact-hero-description">
            Enter your Order ID and the email address used at checkout to see
            the latest updates on your order.
          </p>
        </div>
      </section>

      <section className="track-order-content-section">
        <div className="e-con-inner">
          <div className="elementor-widget-container">
            <div className="woocommerce">
              <form className="woocommerce-form track_order" onSubmit={handleSubmit}>
                <p>
                  To track your order please enter your Order ID in the box
                  below and press the "Track" button. This was given to you on
                  your receipt and in the confirmation email you should have
                  received.
                </p>

                {error && (
                  <p style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "10px 14px", borderRadius: "4px", fontSize: "14px", marginBottom: "16px" }}>
                    {error}
                  </p>
                )}

                <p className="form-row form-row-first">
                  <label htmlFor="orderid">Order ID</label>
                  <input
                    className="input-text"
                    type="text"
                    name="order_number"
                    id="orderid"
                    value={form.order_number}
                    onChange={(e) => setForm((f) => ({ ...f, order_number: e.target.value }))}
                    placeholder="Found in your order confirmation email."
                    required
                  />
                </p>

                <p className="form-row form-row-last">
                  <label htmlFor="order_email">Billing email</label>
                  <input
                    className="input-text"
                    type="email"
                    name="billing_email"
                    id="order_email"
                    value={form.billing_email}
                    onChange={(e) => setForm((f) => ({ ...f, billing_email: e.target.value }))}
                    placeholder="Email you used during checkout."
                    required
                  />
                </p>

                <div className="clear"></div>

                <p className="form-row">
                  <button type="submit" className="button" disabled={loading}>
                    {loading ? "Tracking…" : "Track"}
                  </button>
                </p>
              </form>

              {order && (
                <div className="track-order-result">
                  <div className="track-order-header">
                    <div>
                      <h3 className="track-order-number">Order #{order.order_number}</h3>
                      <p className="track-order-date">
                        Placed on {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <span
                      className="track-order-status"
                      style={{ background: statusColor[order.status] || "#888" }}
                    >
                      {statusLabel[order.status] || order.status}
                    </span>
                  </div>

                  {order.tracking_number && (
                    <div className="track-order-tracking">
                      <strong>Tracking Number:</strong> {order.tracking_number}
                    </div>
                  )}

                  <div className="track-order-items">
                    <h4>Items Ordered</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="track-item-row">
                        <span>{item.quantity}× {item.product_name}</span>
                        <span>${parseFloat(item.line_total).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="track-order-totals">
                    <div className="track-total-row"><span>Subtotal</span><span>${parseFloat(order.subtotal).toFixed(2)}</span></div>
                    {order.discount_amount > 0 && (
                      <div className="track-total-row"><span>Discount</span><span>-${parseFloat(order.discount_amount).toFixed(2)}</span></div>
                    )}
                    {order.shipping_protection && (
                      <div className="track-total-row"><span>Shipping Protection</span><span>$4.50</span></div>
                    )}
                    <div className="track-total-row"><span>Shipping</span><span>FREE</span></div>
                    <div className="track-total-row track-grand-total"><span>Total</span><span>${parseFloat(order.total).toFixed(2)}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackOrderPage;
