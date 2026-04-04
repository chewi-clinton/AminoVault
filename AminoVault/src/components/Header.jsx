import React from "react";
import "../styles/Header.css";
import logo from "../assets/amino_logo.webp";

const Header = () => {
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
          <span className="shield-icon">🛡️</span>
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
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/shop">Shop</a>
          <a href="/resources">Resources</a>
          <a href="/wholesale">Wholesale</a>
          <a href="/contact" className="contact-btn">
            Contact Us
          </a>
        </nav>

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
    </header>
  );
};

export default Header;
