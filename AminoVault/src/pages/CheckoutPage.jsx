import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CheckoutPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const EMPTY_FORM = {
  customer_first_name: "",
  customer_last_name: "",
  customer_email: "",
  customer_phone: "",
  shipping_address_line1: "",
  shipping_address_line2: "",
  shipping_city: "",
  shipping_state: "",
  shipping_zip: "",
  shipping_country: "US",
  notes: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    shippingProtection,
    setShippingProtection,
    couponCode,
    clearCart,
  } = useCart();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const shippingCost = 0;
  const protectionCost = shippingProtection ? 4.5 : 0;
  const total = subtotal + shippingCost + protectionCost;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => { const n = { ...er }; delete n[name]; return n; });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setErrors({});

    const body = {
      ...form,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_protection: shippingProtection,
      coupon_code: couponCode || "",
    };

    try {
      const res = await fetch(`${API}/api/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(typeof data === "object" ? data : { non_field_errors: [String(data)] });
        return;
      }

      clearCart();
      setOrderSuccess(data);
    } catch {
      setErrors({ non_field_errors: ["Network error. Please try again."] });
    } finally {
      setSubmitting(false);
    }
  }

  if (orderSuccess) {
    return (
      <div className="co-success-wrapper">
        <div className="co-success-card">
          <div className="co-success-icon">
            <svg width="48" height="48" fill="none" stroke="#ca33d2" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="co-success-title">Order Placed Successfully!</h2>
          <p className="co-success-sub">
            Your order <strong>#{orderSuccess.order_number}</strong> has been received.
            A confirmation email has been sent to <strong>{orderSuccess.customer_email}</strong>.
          </p>
          <p className="co-success-note">
            Our team will process your order and reach out with shipping details.
          </p>
          <div className="co-success-summary">
            <div className="co-success-row"><span>Order total</span><span>${parseFloat(orderSuccess.total).toFixed(2)}</span></div>
            <div className="co-success-row"><span>Shipping</span><span>FREE</span></div>
          </div>
          <button className="co-success-btn" onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="co-empty-wrapper">
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <button className="co-back-btn" onClick={() => navigate("/shop")}>
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Checkout</h1>
          <p className="contact-hero-description">
            Complete your order below. No payment required — our team will contact
            you to finalise your order.
          </p>
        </div>
      </section>

      <div className="co-wrapper">
        <form className="co-form-col" onSubmit={handleSubmit} noValidate>
          {errors.non_field_errors && (
            <div className="co-error-banner">{errors.non_field_errors[0]}</div>
          )}

          {/* Contact Info */}
          <div className="co-section">
            <h3 className="co-section-title">Contact Information</h3>
            <div className="co-row-2">
              <CoField label="First Name *" error={errors.customer_first_name}>
                <input name="customer_first_name" value={form.customer_first_name} onChange={onChange} required placeholder="John" />
              </CoField>
              <CoField label="Last Name *" error={errors.customer_last_name}>
                <input name="customer_last_name" value={form.customer_last_name} onChange={onChange} required placeholder="Doe" />
              </CoField>
            </div>
            <CoField label="Email Address *" error={errors.customer_email}>
              <input name="customer_email" value={form.customer_email} onChange={onChange} type="email" required placeholder="john@example.com" />
            </CoField>
            <CoField label="Phone Number" error={errors.customer_phone}>
              <input name="customer_phone" value={form.customer_phone} onChange={onChange} type="tel" placeholder="+1 (555) 000-0000" />
            </CoField>
          </div>

          {/* Shipping Address */}
          <div className="co-section">
            <h3 className="co-section-title">Shipping Address</h3>
            <CoField label="Address Line 1 *" error={errors.shipping_address_line1}>
              <input name="shipping_address_line1" value={form.shipping_address_line1} onChange={onChange} required placeholder="123 Research Ave" />
            </CoField>
            <CoField label="Address Line 2" error={errors.shipping_address_line2}>
              <input name="shipping_address_line2" value={form.shipping_address_line2} onChange={onChange} placeholder="Apt, suite, etc. (optional)" />
            </CoField>
            <div className="co-row-3">
              <CoField label="City *" error={errors.shipping_city}>
                <input name="shipping_city" value={form.shipping_city} onChange={onChange} required placeholder="New York" />
              </CoField>
              <CoField label="State *" error={errors.shipping_state}>
                <input name="shipping_state" value={form.shipping_state} onChange={onChange} required placeholder="NY" />
              </CoField>
              <CoField label="ZIP Code *" error={errors.shipping_zip}>
                <input name="shipping_zip" value={form.shipping_zip} onChange={onChange} required placeholder="10001" />
              </CoField>
            </div>
            <CoField label="Country" error={errors.shipping_country}>
              <select name="shipping_country" value={form.shipping_country} onChange={onChange}>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="OTHER">Other</option>
              </select>
            </CoField>
          </div>

          {/* Order Notes */}
          <div className="co-section">
            <h3 className="co-section-title">Additional Notes</h3>
            <CoField label="Notes (optional)" error={errors.notes}>
              <textarea name="notes" value={form.notes} onChange={onChange} rows={3} placeholder="Any special instructions for your order…" />
            </CoField>
          </div>

          <button type="submit" className="co-submit-btn" disabled={submitting}>
            {submitting ? "Placing Order…" : "Place Order"}
          </button>

          <p className="co-disclaimer">
            By placing your order you agree to our{" "}
            <a href="/terms-of-service">Terms of Service</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>. All products are for
            laboratory and research use only.
          </p>
        </form>

        {/* Order Summary */}
        <aside className="co-summary-col">
          <div className="co-summary-card">
            <h3 className="co-summary-title">Order Summary</h3>

            <div className="co-items">
              {cartItems.map((item) => (
                <div key={item.id} className="co-item">
                  <div className="co-item-img-wrap">
                    <img src={item.img} alt={item.name} />
                    <span className="co-item-qty">{item.quantity}</span>
                  </div>
                  <div className="co-item-info">
                    <p className="co-item-name">{item.name}</p>
                    {item.variant && <p className="co-item-variant">{item.variant}</p>}
                  </div>
                  <p className="co-item-price">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="co-divider" />

            <div className="co-shipping-prot">
              <div className="co-prot-row">
                <div>
                  <p className="co-prot-label">Shipping Protection</p>
                  <p className="co-prot-desc">Guard against damage or theft</p>
                </div>
                <label className="co-toggle">
                  <input
                    type="checkbox"
                    checked={shippingProtection}
                    onChange={(e) => setShippingProtection(e.target.checked)}
                  />
                  <span className="co-toggle-slider" />
                </label>
              </div>
            </div>

            <div className="co-divider" />

            <div className="co-totals">
              <div className="co-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {shippingProtection && (
                <div className="co-total-row">
                  <span>Shipping Protection</span>
                  <span>$4.50</span>
                </div>
              )}
              <div className="co-total-row">
                <span>Shipping</span>
                <span className="co-free">FREE</span>
              </div>
              {couponCode && (
                <div className="co-total-row co-coupon-row">
                  <span>Coupon ({couponCode})</span>
                  <span>Applied at checkout</span>
                </div>
              )}
            </div>

            <div className="co-divider" />

            <div className="co-grand-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <p className="co-summary-note">
              No payment required. Our team will confirm your order and provide
              payment instructions via email.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function CoField({ label, children, error }) {
  return (
    <div className="co-field">
      <label className="co-label">{label}</label>
      {children}
      {error && <span className="co-field-error">{Array.isArray(error) ? error[0] : error}</span>}
    </div>
  );
}
