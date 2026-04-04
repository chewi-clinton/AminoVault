import React from "react";
import "../styles/AminoDetailsPage.css";

import seenOnImg from "../assets/About_img1.webp";
import productLineupImg from "../assets/About_img2.webp";

const AminoDetailsPage = () => {
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
    <div>
      <div className="about-grid-wrapper">
        <div className="about-left">
          <h2 className="about-title">About AminoVault</h2>
          <div className="about-body">
            <h3>Made In The USA</h3>
            <p>
              At AminoVault, we deliver the best research peptides in the USA
              with uncompromising purity and consistency. Backed by science and
              produced in certified U.S. facilities, every batch is
              double-tested for quality you can trust. Serving academic,
              independent, and performance-focused individuals nationwide, we
              combine precision, transparency, and integrity—empowering your
              studies with compounds that meet the highest laboratory standards.
            </p>

            <h3>ISO/IEC 17025 Lab Testing</h3>
            <p>
              The research peptide <strong>Gray Market</strong> is crowded and
              confusing. Alongside reputable suppliers, there are vendors with
              uneven quality, inconsistent paperwork, and practices that make it
              hard to know what you’re really getting. When you see{" "}
              <strong>“ISO 17025 Accredited Lab Tested”</strong> on AminoVault,
              it signals that our third-party laboratory partners operate under
              the international standard for testing and calibration
              laboratories. In plain English:{" "}
              <strong>
                methods are validated, instruments are calibrated, records are
                traceable, and results are reproducible.
              </strong>{" "}
              That’s why every AminoVault Certificate of Analysis (COA) is more
              than a PDF, it's evidence you can trust.
            </p>

            <h3>The Problem We Solve</h3>
            <ul className="problem-list">
              <li>
                <strong>Inconsistent purity:</strong> What’s advertised isn’t
                always what’s in the vial. Some products include incomplete or
                unrelated peptide fragments.
              </li>
              <li>
                <strong>Mislabeling risks:</strong> In some cases, the peptide
                delivered isn’t the peptide ordered.
              </li>
              <li>
                <strong>Shaky documentation:</strong> Generic or outdated
                certificates don’t reflect the actual batch being used.
              </li>
            </ul>
          </div>
          <div className="btn-row-left">
            <a href="/lab-tests" className="btn-gradient">
              VERIFIED COA'S
            </a>
          </div>
        </div>

        <div className="about-right">
          <img src={seenOnImg} alt="As seen on news" className="img-seen-on" />
          <img
            src={productLineupImg}
            alt="Product lineup"
            className="img-products"
          />
        </div>
      </div>

      {/* Main CTA button below the grid, centered */}
      <div className="bottom-cta-container">
        <a href="/shop" className="btn-gradient big-cta">
          SHOP OUR PEPTIDES
        </a>
      </div>

      <div className="black-line bottom-buffer"></div>
    </div>
  );
};

export default AminoDetailsPage;
