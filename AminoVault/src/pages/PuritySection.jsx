import React from "react";
import "../styles/PuritySection.css";
import purityBg from "../assets/backgroud_home_img.webp";

const PuritySection = () => {
  return (
    <section
      className="purity-section"
      style={{ backgroundImage: `url(${purityBg})` }}
    >
      <div className="purity-container">
        <h2 className="purity-title">
          High-purity, precision-engineered peptides
        </h2>
        <h4 className="purity-subtitle">
          Precision engineered, COA-verified peptides. Tested twice for
          confident, reproducible research.
        </h4>
        <a href="https://aminovault.com/shop/" className="purity-btn">
          SHOP WITH CONFIDENCE
        </a>
      </div>
    </section>
  );
};

export default PuritySection;
