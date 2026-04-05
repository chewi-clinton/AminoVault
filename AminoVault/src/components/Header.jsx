import React, { useState } from "react";
import "../styles/Header.css";
import logo from "../assets/Amino_logo.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="top-announcement">
        <div className="announcement-item">
          <img
            src="https://flagcdn.com/w20/us.png"
            alt="US"
            style={{ width: "18px" }}
          />
          <span>Certified GMP - Produced In The USA!</span>
        </div>
        <div className="announcement-item">
          <i aria-hidden="true" className="icofont icofont-shield-alt"></i>
          <span>
            The Trusted U.S. Source For Peak Performance Research Peptides
          </span>
        </div>
      </div>

      <div className="main-header">
        <div className="logo-container">
          <img src={logo} alt="AminoVault" />
        </div>

        <nav className="nav-menu">
          <a
            href="/"
            className={activeLink === "/" ? "active" : ""}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </a>
          <a
            href="/about"
            className={activeLink === "/about" ? "active" : ""}
            onClick={() => handleLinkClick("/about")}
          >
            About Us
          </a>

          <div className="nav-item">
            <span
              className={`dropdown-toggle ${activeLink.startsWith("/shop") ? "active" : ""}`}
            >
              Shop
            </span>
            <div className="dropdown-menu">
              <a href="/shop">Shop All Peptides</a>
              <a href="/shop/cellular">Cellular Structure & Matrix Research</a>
              <a href="/shop/neurological">
                Neurological Signaling & Cognitive Research
              </a>
              <a href="/shop/immune">
                Immune Modulation & Regenerative Processes
              </a>
              <a href="/shop/musculoskeletal">
                Musculoskeletal Function & Protein Synthesis Research
              </a>
              <a href="/shop/metabolic">
                Metabolic Regulation & Energy Pathway Research
              </a>
            </div>
          </div>

          <div className="nav-item">
            <span
              className={`dropdown-toggle ${activeLink.startsWith("/resources") ? "active" : ""}`}
            >
              Resources
            </span>
            <div className="dropdown-menu">
              <a href="/resources/faqs">FAQs</a>
              <a href="/resources/lab-results">Lab Results</a>
              <a href="/resources/blog">Blog</a>
              <a href="/resources/order-tracking">Order Tracking</a>
            </div>
          </div>

          <a
            href="/wholesale"
            className={activeLink === "/wholesale" ? "active" : ""}
            onClick={() => handleLinkClick("/wholesale")}
          >
            Wholesale
          </a>
          <a
            href="/contact"
            className={activeLink === "/contact" ? "active" : ""}
            onClick={() => handleLinkClick("/contact")}
          >
            Contact Us
          </a>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="header-actions">
          <div className="cart-wrapper">
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="badge">0</span>
          </div>
          <div className="user-wrapper">
            <svg
              className="user-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="/" onClick={() => handleLinkClick("/")}>
          Home
        </a>
        <a href="/about" onClick={() => handleLinkClick("/about")}>
          About Us
        </a>
        <a href="/shop" onClick={() => handleLinkClick("/shop")}>
          Shop
        </a>
        <a href="/resources" onClick={() => handleLinkClick("/resources")}>
          Resources
        </a>
        <a href="/wholesale" onClick={() => handleLinkClick("/wholesale")}>
          Wholesale
        </a>
        <a href="/contact" onClick={() => handleLinkClick("/contact")}>
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default Header;
