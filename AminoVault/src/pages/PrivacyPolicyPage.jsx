import React from "react";
import "../../src/styles/PrivacyPolicyPage.css";

const PrivacyPolicyPage = () => {
  return (
    <>
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Privacy Policy</h1>
          <p className="contact-hero-description">
            Empowering your journey with reliable solutions, expert guidance,
            and exceptional service, we help you achieve success with quality
            you can trust, every step of the way.
          </p>
        </div>
      </section>

      <div className="privacy-policy-container">
        <p className="privacy-last-updated">
          <strong>Last Updated:</strong> August 15, 2025
        </p>

        <p>
          At <strong>AminoVault LLC</strong>, your privacy is extremely
          important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you visit our website or use our
          services. By using our site, you agree to the practices described
          here.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Your name, email address,
            phone number, shipping address, and payment details (processed
            securely through our payment partners).
          </li>
          <li>
            <strong>Non-Personal Information:</strong> Browser type, device
            information, IP address, and pages you visit on our site.
          </li>
          <li>
            <strong>Voluntary Information:</strong> Any details you choose to
            share with us via contact forms, chat, or email.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and fulfill your orders or service requests.</li>
          <li>
            Communicate with you about your purchases, inquiries, or support
            requests.
          </li>
          <li>Improve our website, services, and user experience.</li>
          <li>
            Send you updates, offers, or newsletters (only if you have opted
            in).
          </li>
          <li>Comply with legal requirements.</li>
        </ul>

        <h2>3. Sharing And Disclosure</h2>
        <p>
          We will never sell, rent, or trade your personal information. We may
          share your data only with:
        </p>
        <ul>
          <li>
            <strong>Trusted Service Providers:</strong> Such as payment
            processors, delivery companies, or technical support partners, but
            only to the extent necessary to perform their services.
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required by law, legal
            process, or government request.
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We take reasonable and appropriate measures to protect your personal
          information from loss, theft, unauthorized access, or misuse. However,
          no online data transmission is 100% secure, so we cannot guarantee
          absolute security.
        </p>

        <h2>5. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Withdraw consent for certain types of processing.</li>
          <li>Opt out of marketing communications at any time.</li>
        </ul>
        <p>
          You can exercise these rights by contacting us using the details
          below.
        </p>

        <h2>6. Cookies And Tracking Technologies</h2>
        <p>We may use cookies and similar technologies to:</p>
        <ul>
          <li>Keep our website functioning properly.</li>
          <li>Understand how visitors use our site.</li>
          <li>Personalize your experience.</li>
        </ul>
        <p>
          You can adjust your browser settings to block cookies, but some
          features of our site may not work correctly without them.
        </p>

        <h2>7. Changes To This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Any updates will be posted on
          this page with the updated date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your
          information, don’t hesitate to get in touch with us:
        </p>
        <p>
          <strong>Email Address:</strong>{" "}
          <a style={{ color: "#ca33d2" }} href="mailto:info@amino-vault.com">
            info@aminovault.com
          </a>
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
