import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/Amino_logo.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      {/* Top Announcement Bar */}
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
          <Link to="/">
            <img src={logo} alt="AminoVault" />
          </Link>
        </div>

        <nav className="nav-menu">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            About Us
          </NavLink>

          {/* ==================== SHOP DROPDOWN ==================== */}
          <div className="nav-item">
            <span className="dropdown-toggle">Shop</span>
            <div className="dropdown-menu">
              <Link to="/shop" onClick={closeMenu}>
                Shop All Peptides
              </Link>
              <Link to="/shop/cellular" onClick={closeMenu}>
                Cellular Structure & Matrix Research
              </Link>
              <Link to="/shop/neurological" onClick={closeMenu}>
                Neurological Signaling & Cognitive Research
              </Link>
              <Link to="/shop/immune" onClick={closeMenu}>
                Immune Modulation & Regenerative Processes
              </Link>
              <Link to="/shop/musculoskeletal" onClick={closeMenu}>
                Musculoskeletal Function & Protein Synthesis Research
              </Link>
              <Link to="/shop/metabolic" onClick={closeMenu}>
                Metabolic Regulation & Energy Pathway Research
              </Link>
            </div>
          </div>

          {/* ==================== RESOURCES DROPDOWN ==================== */}
          <div className="nav-item">
            <span className="dropdown-toggle">Resources</span>
            <div className="dropdown-menu">
              <Link to="/faqs" onClick={closeMenu}>
                FAQs
              </Link>
              <Link to="/lab-results" onClick={closeMenu}>
                Lab Results
              </Link>
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
              <Link to="/track-order" onClick={closeMenu}>
                Order Tracking
              </Link>
            </div>
          </div>

          <NavLink
            to="/wholesale"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Wholesale
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Contact Us
          </NavLink>
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

          <Link to="/my-account" className="user-wrapper" onClick={closeMenu}>
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
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About Us
        </Link>
        <Link to="/shop" onClick={closeMenu}>
          Shop All Peptides
        </Link>
        <Link to="/faqs" onClick={closeMenu}>
          FAQs
        </Link>
        <Link to="/lab-results" onClick={closeMenu}>
          Lab Results
        </Link>
        <Link to="/track-order" onClick={closeMenu}>
          Order Tracking
        </Link>
        <Link to="/wholesale" onClick={closeMenu}>
          Wholesale
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact Us
        </Link>
        <Link to="/my-account" onClick={closeMenu}>
          My Account
        </Link>
      </div>
    </header>
  );
};

export default Header;
