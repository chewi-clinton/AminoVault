import React from "react";
import "../../src/styles/ShippingAndReturnPolicyPage.css";

const ShippingAndReturnPolicyPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Shipping & Returns Policy</h1>
          <p className="contact-hero-description">
            At AminoVault, we value transparency and customer trust. Here’s
            everything you need to know about our shipping process, delivery
            times, and return guidelines, so you can shop with confidence.
          </p>
        </div>
      </section>

      {/* Shipping & Returns Content */}
      <div className="shipping-container">
        <h2>Shipping Policy</h2>
        <p>
          We take pride in delivering your orders securely, discreetly, and on
          time.
        </p>

        <ul>
          <li>
            <strong>Processing Time:</strong> Orders are processed within 1–2
            business days (excluding weekends and holidays).
          </li>
          <li>
            <strong>Shipping Methods:</strong> All orders are shipped via USPS.
            Shipping costs depend on your order weight and delivery location.
          </li>
          <li>
            <strong>Delivery Time:</strong> Standard shipping takes
            approximately 1–5 business days within the U.S. and Canada.
          </li>
          <li>
            <strong>Tracking:</strong> Once shipped, you’ll receive an email
            with tracking information. Please allow 24–48 hours for tracking
            updates.
          </li>
          <li>
            <strong>PO Boxes:</strong> Orders to PO Box addresses are shipped
            via USPS only.
          </li>
        </ul>

        <p>
          <strong>Holiday Delays:</strong> Carriers do not ship on U.S. federal
          holidays, which may affect delivery times.
        </p>

        <h2>Returns &amp; Refunds</h2>
        <p>
          Due to the sensitive nature of our research-only products and strict
          quality control standards:
        </p>

        <ul>
          <li>
            <strong>All Sales Are Final:</strong> No returns, exchanges, or
            refunds are accepted once an order has been shipped.
          </li>
          <li>
            <strong>Order Cancellations:</strong> Orders can be canceled within
            30 minutes of payment confirmation. After processing begins,
            cancellation is not guaranteed.
          </li>
          <li>
            <strong>Damaged, Missing, or Incorrect Items:</strong> Contact our
            support team within 48 hours of delivery if you receive damaged,
            missing, or incorrect items. We will promptly work to resolve the
            issue.
          </li>
        </ul>

        <h2>Additional Notes</h2>
        <ul>
          <li>
            <strong>Lost or Stolen Packages:</strong> Once a package is handed
            to the carrier, AminoVault is not responsible for loss, theft, or
            delays. USPS insures shipments up to $100. For higher-value orders,
            we recommend purchasing additional shipping insurance.
          </li>
          <li>
            <strong>Customer Support:</strong> For shipping or return inquiries,
            email{" "}
            <a style={{ color: "#ca33d2" }} href="mailto:info@amino-vault.com">
              info@amino-vault.com
            </a>
          </li>
        </ul>

        <h2>Legal Disclaimer &amp; Compliance</h2>
        <p>
          All AminoVault products are intended for{" "}
          <strong>research use only</strong> and are{" "}
          <strong>not for human consumption</strong>. They are not dietary
          supplements, drugs, or cosmetics. No statements on this site have been
          evaluated by the U.S. Food &amp; Drug Administration (FDA). Our
          products are not intended to diagnose, treat, cure, or prevent any
          disease.
        </p>
        <p>
          By placing an order, you confirm you are a qualified researcher or
          institution purchasing for laboratory use, and you agree to our full{" "}
          <strong>Terms of Service</strong>.
        </p>
      </div>
    </>
  );
};

export default ShippingAndReturnPolicyPage;
