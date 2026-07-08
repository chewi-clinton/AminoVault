import React from "react";
import "../../src/styles/TermsOfServicePage.css";

const TermsOfServicePage = () => {
  return (
    <>
      {/* Hero Section - Unchanged */}
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Terms of Service</h1>
          <p className="contact-hero-description">
            Clear guidelines to ensure a safe, compliant, and professional
            research experience. Please review these terms before purchasing
            AminoVault’s research-only products.
          </p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <div className="terms-container">
        <p className="terms-last-updated">
          <strong>Last Updated:</strong> August 15, 2025
        </p>

        <p>
          Welcome to <strong>AminoVault</strong>. By accessing or purchasing
          from our website, you agree to comply with and be bound by the
          following Terms of Service. These terms protect our valued research
          clients and maintain the integrity of our operations. Please read
          carefully before placing an order.
        </p>

        <h2>1. Research-Only Use</h2>
        <p>
          All products offered by AminoVault are sold strictly for{" "}
          <strong>laboratory research purposes only</strong>. They are not
          intended for human consumption, medical treatment, or diagnostic use.
          By purchasing from us, you confirm that you are a qualified researcher
          or affiliated with a certified research facility.
        </p>
        <p>
          <strong>Disclaimer:</strong> All products are for research use only
          and not for human consumption under any circumstances.
        </p>

        <h2>2. Compliance &amp; Responsibility</h2>
        <p>
          You are solely responsible for ensuring your use of our products
          complies with all applicable laws, regulations, and ethical standards
          in your jurisdiction. AminoVault assumes no liability for misuse or
          improper handling of research materials.
        </p>

        <h2>3. Quality &amp; Authenticity</h2>
        <p>
          Scientific integrity is at the core of AminoVault. Every batch of
          peptides undergoes <strong>rigorous testing</strong> and is
          manufactured under <strong>strict quality control</strong> to ensure
          research-grade purity and consistency.
        </p>

        <h2>4. Orders &amp; Payments</h2>
        <p>
          Orders are processed in the order they are received. Payments must be
          made using the approved methods listed on our website. AminoVault
          reserves the right to decline or cancel orders that do not meet
          compliance requirements.
        </p>

        <h2>5. Shipping &amp; Delivery</h2>
        <p>
          We provide <strong>prompt, secure, and documented</strong> shipping to
          research institutions and qualified buyers. Delivery times may vary
          depending on location and product availability. All shipments include
          proper handling instructions.
        </p>

        <h2>6. Returns &amp; Refunds</h2>
        <p>
          Due to the sensitive nature of our products, returns are only accepted
          in the event of a confirmed quality issue. Refunds, if applicable,
          will be issued at our discretion following a full investigation.
        </p>

        <h2>7. Limitation Of Liability</h2>
        <p>
          AminoVault shall not be held liable for any direct, indirect,
          incidental, or consequential damages resulting from the use or misuse
          of our products.
        </p>

        <h2>8. Updates To Terms</h2>
        <p>
          We may update these Terms of Service at any time to reflect changes in
          regulations, best practices, or company policy. Your continued use of
          our website signifies acceptance of any updates.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about these Terms of Service, please email us at{" "}
          <a style={{ color: "#ca33d2" }} href="mailto:info@amino-vault.com">
            info@amino-vault.com
          </a>
        </p>
      </div>
    </>
  );
};

export default TermsOfServicePage;
