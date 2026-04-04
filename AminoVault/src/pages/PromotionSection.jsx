import React from "react";
import "../styles/PromotionSection.css";

const PromotionSection = () => {
  const newsText =
    "AminoVault Launches U.S. Research Peptide Site And Expansion Into Pharmacy Grade Compounds";

  const StarburstPercentIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.4 5.6L18.6 4.8L18.2 9L22 11.4L18.2 13.8L18.6 18L14.4 17.2L12 20.8L9.6 17.2L5.4 18L5.8 13.8L2 11.4L5.8 9L5.4 4.8L9.6 5.6L12 2Z"
        fill="#ca33d2"
      />
      <path
        d="M9.5 14.5L14.5 9.5M10 10H10.01M14 14H14.01"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="entire-page-wrapper">
      {/* 1. Breaking News Section */}
      <div className="full-width-ticker-row">
        <div className="ticker-container">
          <div className="ticker-label">BREAKING NEWS</div>
          <div className="ticker-content">
            <div className="ticker-text-wrapper">
              <span>{newsText}</span>
              <span>{newsText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Line Divider */}
      <div className="black-line"></div>

      {/* 3. Main Content Section */}
      <section className="main-promo-content">
        <h2 className="title-text">Buy More, Save More</h2>

        <ul className="deals-list">
          <li>
            <StarburstPercentIcon /> 15% OFF ALL ORDERS
          </li>
          <li>
            <StarburstPercentIcon /> BUY 6+ Vials, SAVE 18%
          </li>
          <li>
            <StarburstPercentIcon /> BUY 8+ Vials, SAVE 20%
          </li>
        </ul>

        <p className="description-text">
          Stock up and save more with AminoVault’s bulk pricing built for
          serious buyers. Every order automatically gets{" "}
          <strong>15% off</strong>, and the savings increase as you buy more:
          <strong> 18% off when you purchase 6+ vials</strong> and{" "}
          <strong>20% off at 8+ vials</strong>. No codes, no hassle—just
          straightforward volume discounts that make it easy to stay stocked.
          Plus, we include{" "}
          <strong>FREE USPS Priority Shipping on every order</strong>, always.
          We deliver faster without adding to your total.
        </p>

        <div className="button-row">
          <a href="/shop" className="action-button">
            SHOP OUR PEPTIDES
          </a>
        </div>
      </section>

      {/* 4. Bottom Line Divider */}
      <div className="black-line"></div>
    </div>
  );
};

export default PromotionSection;
