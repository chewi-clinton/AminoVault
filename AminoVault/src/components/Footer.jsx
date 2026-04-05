import React from "react";
import "../styles/Footer.css";

// Importing images as modules so the build tool processes them
import footerLogo from "../assets/Footer_logo.webp";
import wreathGraphic from "../assets/About_img1.webp";
import paymentIcons from "../assets/Master.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top-grid">
        {/* Left Column: Branding */}
        <div className="footer-branding">
          <img src={footerLogo} alt="AminoVault Logo" className="footer-logo" />
          <p className="branding-text">
            AminoVault delivers premium, USA-made research peptides with 99%+
            purity. Trusted by researchers nationwide for quality and
            consistency. We combine uncompromising quality with precision
            delivery, because science deserves nothing less.
          </p>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/shop">Shop Page</a>
            </li>
            <li>
              <a href="/account">My Account</a>
            </li>
            <li>
              <a href="/blog">Blog Page</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faqs">FAQs</a>
            </li>
            <li>
              <a href="/about">
                About <span className="highlight">AminoVault LLC</span>
              </a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/shipping">Shipping & Returns Policy</a>
            </li>
            <li>
              <a href="/affiliate">Affiliate Registration</a>
            </li>
          </ul>
        </div>

        {/* Right Column: Categories */}
        <div className="footer-links">
          <h4>Peptide Categories</h4>
          <ul>
            <li>Cellular Structure & Matrix Research</li>
            <li>Neurological & Cognitive Pathways</li>
            <li>Immune Modulation & Regenerative</li>
            <li>Musculoskeletal Function & Protein</li>
            <li>Metabolic Regulation & Energy</li>
          </ul>
        </div>

        {/* Far Right: Seen On Wreath Placeholder */}
        <div className="footer-wreath-col">
          <img
            src={wreathGraphic}
            alt="As Seen On News"
            className="wreath-img"
          />
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="footer-disclaimer">
        <p>
          All products sold by AminoVault are strictly intended for laboratory
          research use only. These materials are not for human consumption and
          are not intended for medical, veterinary, diagnostic, or household use
          of any kind. AminoVault operates solely as a research chemical
          supplier. We are not a compounding pharmacy and do not operate as a
          compounding facility as defined under Section 503A of the Federal
          Food, Drug, and Cosmetic Act.
        </p>
      </div>

      {/* Bottom Row: Copyright & Socials */}
      <div className="footer-bottom">
        <div className="bottom-left">
          <span>Copyright © 2026 AminoVault, LLC | All Rights Reserved.</span>
        </div>

        <div className="bottom-center">
          <img
            src={paymentIcons}
            alt="Visa Mastercard"
            className="payment-img"
          />
        </div>

        <div className="bottom-right social-links">
          <a href="#">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="#">
            <i className="fab fa-tiktok"></i> TikTok
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
