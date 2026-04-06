import React from "react";
import "../../styles/HeroSection.css";

const HeroSection = () => {
  const features = [
    "Certified GMP - High Purity Guaranteed",
    "ISO/IEC 17025 Accredited COA's - Independently Tested Twice",
    "Made in the USA - Direct From Trusted Labs",
    "15% OFF & FREE USPS Priority Shipping on ALL ORDERS",
  ];

  return (
    <section className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <h4 className="hero-subtitle">
            Precision Compounds. Proven Results.
          </h4>

          <h1 className="hero-title">
            Peak Performance Research Peptides Made in the USA - Verifiable COAs
            with ≥99% Purity Guarantee
          </h1>

          <ul className="hero-features">
            {features.map((text, index) => (
              <li key={index} className="feature-item">
                <span className="feature-icon">
                  <i className="icofont icofont-molecule"></i>
                </span>
                <span className="feature-text">{text}</span>
              </li>
            ))}
          </ul>

          <a href="/shop" className="btn-shop-now">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
