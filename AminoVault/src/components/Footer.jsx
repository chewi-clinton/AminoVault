import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// Importing images as modules
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
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/about">About AminoVault LLC</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/shipping-and-returns">Shipping & Returns Policy</Link>
            </li>
            {/* Blog and Affiliate - add these routes later when pages are ready */}
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/affiliate">Affiliate Registration</Link>
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

        {/* Far Right: Seen On Wreath */}
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
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i> TikTok
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
