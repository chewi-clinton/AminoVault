import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/Amino_logo.webp";

const Header = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (submenu) =>
    setOpenMobileSubmenu(openMobileSubmenu === submenu ? null : submenu);

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

          {/* Shop Dropdown */}
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

          {/* Resources Dropdown */}
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
          <div
            className="cart-wrapper"
            onClick={onCartClick}
            style={{ cursor: "pointer" }}
          >
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
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
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

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About Us
        </NavLink>

        <div className="mobile-menu-item">
          <div
            className="mobile-menu-toggle"
            onClick={() => toggleMobileSubmenu("shop")}
          >
            <span>Shop</span>
            <span className="submenu-indicator">
              {openMobileSubmenu === "shop" ? "−" : "+"}
            </span>
          </div>
          {openMobileSubmenu === "shop" && (
            <div className="mobile-submenu">
              <NavLink to="/shop" onClick={closeMenu}>
                Shop All Peptides
              </NavLink>
              <NavLink to="/shop/cellular" onClick={closeMenu}>
                Cellular Structure & Matrix Research
              </NavLink>
              <NavLink to="/shop/neurological" onClick={closeMenu}>
                Neurological Signaling & Cognitive Research
              </NavLink>
              <NavLink to="/shop/immune" onClick={closeMenu}>
                Immune Modulation & Regenerative Processes
              </NavLink>
              <NavLink to="/shop/musculoskeletal" onClick={closeMenu}>
                Musculoskeletal Function & Protein Synthesis Research
              </NavLink>
              <NavLink to="/shop/metabolic" onClick={closeMenu}>
                Metabolic Regulation & Energy Pathway Research
              </NavLink>
            </div>
          )}
        </div>

        <div className="mobile-menu-item">
          <div
            className="mobile-menu-toggle"
            onClick={() => toggleMobileSubmenu("resources")}
          >
            <span>Resources</span>
            <span className="submenu-indicator">
              {openMobileSubmenu === "resources" ? "−" : "+"}
            </span>
          </div>
          {openMobileSubmenu === "resources" && (
            <div className="mobile-submenu">
              <NavLink to="/faqs" onClick={closeMenu}>
                FAQs
              </NavLink>
              <NavLink to="/lab-results" onClick={closeMenu}>
                Lab Results
              </NavLink>
              <NavLink to="/blog" onClick={closeMenu}>
                Blog
              </NavLink>
              <NavLink to="/track-order" onClick={closeMenu}>
                Order Tracking
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/wholesale" onClick={closeMenu}>
          Wholesale
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact Us
        </NavLink>

        <Link to="/my-account" onClick={closeMenu}>
          My Account
        </Link>
      </div>
    </header>
  );
};

export default Header;
