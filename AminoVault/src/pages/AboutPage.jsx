import React from "react";
import "../../src/styles/AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">
            Pioneering Research Peptide Excellence
          </h1>
          <p className="contact-hero-description">
            At AminoVault, we merge cutting-edge science with uncompromising
            purity, delivering research peptides laboratories can trust for
            precision, consistency, and breakthrough results.
          </p>
        </div>
      </section>

      <section className="about-aminovault">
        <div className="left-content">
          <h2>About AminoVault</h2>

          <p>
            AminoVault is a U.S.-based supplier of high-purity research
            peptides, founded with one mission: to support scientific discovery
            and performance-based research with consistent, laboratory-grade
            compounds. We serve academic institutions, independent researchers,
            and R&D teams across the country who demand uncompromising quality
            and control.
          </p>

          <p>
            With a foundation in molecular science, our work is driven by
            precision, transparency, and integrity. Every compound we offer is
            sourced, tested, and fulfilled within the United States.
          </p>

          <a href="/contact" className="get-in-touch-btn">
            Get In Touch
          </a>
        </div>

        <div className="right-image">
          <img
            src="../../src/assets/about_us_img1.webp"
            alt="AminoVault Research Peptides"
          />
        </div>
      </section>

      <section className="what-we-offer">
        <div className="left-image">
          <img
            src="../../src/assets/about_us_img2.webp"
            alt="What We Offer - AminoVault"
          />
        </div>

        <div className="right-content">
          <h2>What We Offer</h2>

          <p>
            At AminoVault, we provide high-purity peptides exclusively for
            laboratory research. Our products are utilized in diverse studies,
            including:
          </p>

          <ul>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Cellular stress and inflammation modeling
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Energy metabolism and mitochondrial function
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Tissue response and post-strain recovery analysis
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Hormone signaling and neurochemical pathway exploration
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Experimental performance optimization
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Receptor–ligand interaction mapping
            </li>
          </ul>

          <p className="disclaimer">
            We make no therapeutic claims and do not endorse human use. All
            peptides are intended strictly for research purposes only.
          </p>

          <a href="/shop" className="get-in-touch-btn">
            VISIT SHOP PAGE
          </a>
        </div>
      </section>

      <section className="research-use-only">
        <div className="left-content">
          <h2>For Research Use Only</h2>

          <p>
            At AminoVault, our mission is to deliver research-grade peptides and
            compounds rooted in scientific integrity. We are dedicated to
            supporting performance-driven research in fields like metabolic
            science, recovery modeling, and nutritional signaling—empowering
            laboratories with materials they can trust.
          </p>

          <ul>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Double-Tested Purity – Verified through independent lab analysis
              for quality and consistency
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Clean Molecular Profiles – No fillers, binders, or unnecessary
              additives—just high-integrity compounds
            </li>
            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              >
                <path
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  fill="#c026d3"
                />
              </svg>
              Trusted in Research Circles – Utilized in academic, performance
              science, and industrial testing environments
            </li>
          </ul>
        </div>

        <div className="right-boxes">
          <div className="purple-box">
            <div className="icon-circle">
              <svg
                aria-hidden="true"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z" />
              </svg>
            </div>
            <h3>Precision Compounds For Modern Research</h3>
            <p>
              We are dedicated to supporting performance-driven research in
              areas such as metabolism, cellular recovery, hormone signaling,
              and nutrient modulation. Whether you're modeling athletic stress,
              exploring neurological response, or mapping endocrine markers,
              AminoVault provides compounds that meet the exacting standards of
              modern research.
            </p>
          </div>

          <div className="red-box">
            <div className="icon-circle">
              <svg
                aria-hidden="true"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
              </svg>
            </div>
            <h3>Made In The USA. Backed By Data. Shipped With Confidence.</h3>
            <p>
              All sourcing, formulation, and fulfillment happens within the
              United States. That means faster shipping, verified traceability,
              and full access to batch-level documentation, including
              Certificates of Analysis (COAs). We're committed to operational
              transparency and always prioritize quality and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* Final Section - Why Leading Researchers Choose AminoVault */}
      <section className="why-choose">
        <h2 className="section-title">
          Why Leading Researchers Choose AminoVault
        </h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
                  fill="#ca33d2"
                />
              </svg>
            </div>
            <div className="stat-value">99%</div>
            <p className="stat-description">
              Purity Guaranteed With Research Peptides You Can Rely On.
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 80v352c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80zm592 0v80H320V80h272zm-272 128h272v80H320v-80zm272 208H320v-80h272v80zm-320-80H48v-80h252v80zm0-128H48V80h252v128z"
                  fill="#ca33d2"
                />
              </svg>
            </div>
            <div className="stat-value">100%</div>
            <p className="stat-description">
              All Sourcing, Synthesis, Testing, And Shipping Are Handled Within
              The United States.
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M362.146 191.976c-13.71-21.649-38.761-34.016-65.006-30.341V74c0-40.804-32.811-74-73.141-74-40.33 0-73.14 33.196-73.14 74L160 168l-18.679-78.85C126.578 50.843 83.85 32.11 46.209 47.208 8.735 62.238-9.571 104.963 5.008 142.85l55.757 144.927c-30.557 24.956-43.994 57.809-24.733 92.218l54.853 97.999C102.625 498.97 124.73 512 148.575 512h205.702c30.744 0 57.558-21.44 64.555-51.797l27.427-118.999a67.801 67.801 0 0 0 1.729-15.203L448 256c0-44.956-43.263-77.343-85.854-64.024zM399.987 326c0 1.488-.169 2.977-.502 4.423l-27.427 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H148.575c-6.486 0-12.542-3.621-15.805-9.449l-54.854-98c-4.557-8.141-2.619-18.668 4.508-24.488l26.647-21.764a16 16 0 0 0 4.812-18.139l-64.09-166.549C37.226 92.956 84.37 74.837 96.51 106.389l59.784 155.357A16 16 0 0 0 171.227 272h11.632c8.837 0 16-7.163 16-16V74c0-34.375 50.281-34.43 50.281 0v182c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16v-28c0-25.122 36.567-25.159 36.567 0v28c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16 0-25.12 36.567-25.16 36.567 0v70z"
                  fill="#ca33d2"
                />
              </svg>
            </div>
            <div className="stat-value">100% COA's</div>
            <p className="stat-description">
              Each Batch TESTED TWICE. Pre And Post Lyophilization For Accuracy
              And Consistency.
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                  fill="#ca33d2"
                />
              </svg>
            </div>
            <div className="stat-value">48 Hours</div>
            <p className="stat-description">
              Shipping Is FAST! Secure Fulfillment From U.S. Facilities With
              Full Tracking And Batch IDs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
