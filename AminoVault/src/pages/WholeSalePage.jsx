import React from "react";
import "../../src/styles/WholeSalePage.css";
import wholesaleImage from "../../src/assets/wholesale_img.webp";

const WholesalePage = () => {
  return (
    <>
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Wholesale Peptides</h1>
          <p className="contact-hero-description">
            Partner with AminoVault for bulk pricing, consistent supply, clean
            documentation, and fast fulfillment of wholesale/bulk orders for
            peptides in the USA
          </p>
        </div>
      </section>

      <section className="wholesale-why-section">
        <div className="wholesale-why-container">
          <h2 className="wholesale-main-title">
            Why Wholesale Buyers Choose AminoVault
          </h2>
          <div className="wholesale-content-row">
            <div className="wholesale-why-text">
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">
                  Built For Repeat Purchasing
                </h3>
                <p className="wholesale-feature-desc">
                  We make it easy to re-order, track shipments, and keep your
                  inventory consistent with clear product labeling and organized
                  documentation.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">
                  Clear Documentation & Verification
                </h3>
                <p className="wholesale-feature-desc">
                  We provide batch-level documentation and supporting materials
                  where available, so you can confidently manage receiving,
                  inventory, and internal quality checks.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">
                  Faster Fulfillment, Fewer Surprises
                </h3>
                <p className="wholesale-feature-desc">
                  Wholesale accounts receive priority processing, order
                  visibility, and dedicated support for time-sensitive inventory
                  needs.
                </p>
              </div>
              <div className="wholesale-feature">
                <h3 className="wholesale-feature-title">
                  Packaging That Scales With You
                </h3>
                <p className="wholesale-feature-desc">
                  From standard wholesale packaging to private label and custom
                  kitting (where available), we help you ship products the way
                  your customers expect.
                </p>
              </div>
            </div>
            <div className="wholesale-why-image">
              <img
                src={wholesaleImage}
                alt="Warehouse"
                className="wholesale-side-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="inquiry-section">
        <div className="inquiry-container">
          <h2 className="inquiry-title">Start Your Inquiry Below</h2>
          <div className="inquiry-description">
            <p>
              If you’re a clinic, retailer, research supplier, or wellness brand
              looking for a reliable wholesale partner, AminoVault offers
              streamlined bulk ordering with responsive support and packaging
              options that fit your business.
            </p>
            <p>
              Contact us below for questions about bulk pricing, tiered
              discounts, and priority fulfillment.
            </p>
          </div>

          <form className="inquiry-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  Name <span className="required">(Required)</span>
                </label>
                <input type="text" />
                <span className="sub-label">First</span>
              </div>
              <div className="form-group">
                <label style={{ visibility: "hidden" }}>Last Name</label>
                <input type="text" />
                <span className="sub-label">Last</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Email <span className="required">(Required)</span>
                </label>
                <input type="email" />
              </div>
              <div className="form-group">
                <label>
                  Phone <span className="required">(Required)</span>
                </label>
                <input type="tel" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Company Name <span className="required">(Required)</span>
                </label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input type="url" placeholder="https://" />
              </div>
            </div>

            <div
              className="form-group"
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <label>
                Provide additional details about your Wholesale/Bulk Inquiry{" "}
                <span className="required">(Required)</span>
              </label>
              <textarea></textarea>
              <div className="char-count">0 of 600 max characters</div>
            </div>

            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </form>

          <div className="disclaimer-text">
            {/* Exact style applied to this title */}
            <h3 className="disclaimer-title">
              Reliable bulk Peptide supply for qualified research buyers.
            </h3>
            <p>
              AminoVault supports verified wholesale customers with consistent
              inventory, batch-level documentation (when available), and fast
              fulfillment designed for repeat ordering.
            </p>
            <p>
              <span>
                All products are intended for laboratory and research use only
                and are not for human or veterinary use.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WholesalePage;
