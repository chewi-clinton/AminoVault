import React from "react";
import { Link } from "react-router-dom";
import "../styles/LabResultPage.css";
import coaData from "../data/coaData";

function FilePdfIcon(props) {
  return (
    <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" />
    </svg>
  );
}

const LabResultPage = () => {
  return (
    <div className="lab-results-page">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">
            Lab Tests | Proof First, Peptides Next. Verify Then Buy.
          </h1>
          <p className="contact-hero-description">
            At AminoVault, we merge cutting-edge science with uncompromising
            purity, delivering research peptides you can trust for precision,
            consistency, and breakthrough results.
          </p>
          <Link to="/shop" className="lab-btn">
            Shop Certified Peptides
          </Link>
        </div>
      </section>

      <section className="lab-intro-section">
        <h2>
          Trust is the product. Peptides are the category. Standards are the
          difference.
        </h2>
        <p>
          When you see <strong>&ldquo;ISO 17025&ndash;accredited lab tested&rdquo;</strong> on
          AminoVault, it signals that our third-party laboratory partner
          operates under the{" "}
          <strong>
            international standard for testing and calibration laboratories
          </strong>
          . In plain English: methods are validated, instruments are
          calibrated, records are traceable, and results are reproducible.
          That&rsquo;s why every AminoVault{" "}
          <strong>Certificate of Analysis (COA)</strong> is more than a
          PDF&mdash;it&rsquo;s <strong>evidence</strong> you can trust. At
          AminoVault, every research peptide is backed by transparent,
          batch-specific{" "}
          <strong>Laboratory Tests and Certificates of Analysis (COAs)</strong>
          . Each COA provides verified data on purity, identity, and
          composition, ensuring that every compound meets the highest
          research-grade standards. Our COAs are performed by accredited
          third-party laboratories, using advanced analytical methods such as
          HPLC and Mass Spectrometry. This commitment to transparency sets
          AminoVault apart, providing individuals with both the{" "}
          <strong>scientific assurance</strong> and the{" "}
          <strong>documentation</strong> needed to validate each peptide for
          purity.
        </p>
      </section>

      <section className="lab-coa-section">
        <h3 className="lab-coa-title">
          AminoVault Research Peptide Lab Tests and COA&apos;s
        </h3>
        <Link to="/shop" className="lab-btn">
          Visit Our Shop
        </Link>

        <div className="lab-coa-grid">
          {coaData.map((item) => (
            <a
              key={item.file}
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-coa-item"
            >
              <FilePdfIcon className="lab-coa-icon" />
              <span className="lab-coa-label">{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="lab-info-section">
        <div className="lab-info-col">
          <h3>How ISO 17025 Supports Reliable COAs</h3>
          <p>
            <strong>Can COAs be faked?</strong> <strong>YES&mdash;unfortunately</strong>.
            Look for missing batch numbers, no lab identity, or screenshots
            with no methods/dates. AminoVault rejects those practices and
            publishes live, traceable documents for every batch.
          </p>
          <p>
            <strong>Accredation Proof</strong>
            <br />
            Ask for the ISO/IEC 17025 certificate <em>and</em> the{" "}
            <strong>scope</strong> from the accrediting body (PJLA, A2LA,
            ANAB, IAS). Don&rsquo;t accept a logo alone.
          </p>
          <p>
            <strong>Method validity</strong>
            <br />
            ISO/IEC 17025 requires labs to validate methods and maintain
            system suitability&mdash;so results for peptides like{" "}
            <strong>
              GLP-1 (S), GLP-2 (T), GLP-3 (R), BPC-157, TB-500, Ipamorelin,
              Sermorelin, Tesamorelin, GHK-Cu, NAD+, KPV
            </strong>{" "}
            are generated with fit-for-purpose techniques (e.g.,{" "}
            <strong>RP-HPLC</strong> and <strong>LC-MS/MS</strong>).
          </p>
          <p>
            <strong>Traceability &amp; calibration</strong>
            <br />
            Instruments and reference standards are controlled and
            calibrated, creating a traceable path from raw data to your COA.
          </p>
          <p>
            <strong>Competence &amp; quality system</strong>
            <br />
            From analyst training to recordkeeping and audits, the standard
            centers on competence&mdash;so your data stands up to scrutiny.
          </p>
        </div>

        <div className="lab-info-col">
          <h3>Double Check Other Labs Reputations Online</h3>
          <p>
            The research peptide space is noisy. Some labs are praised,
            others are debated in forums and reviews. We recommend a{" "}
            <strong>neutral, evidence-first</strong> approach&mdash;verify
            accreditation, check the lab&rsquo;s own portal, and read
            community feedback with caution.
          </p>
          <p>
            &bull;{" "}
            <strong>Janoshik Analytical (Jano/Janoshik)</strong> &ndash;
            Frequently referenced in the niche. They provide a public{" "}
            <strong>verification page</strong>; community reviews are mixed
            at best across platforms. Trustpilot currently shows an
            &ldquo;Average&rdquo; rating with some negative comments. Do your
            own validation via their portal and confirm methods/scope match
            your needs.
          </p>
          <p>
            &bull; <strong>MZ Biolabs</strong> &ndash; Prominent in vendor
            pages. Review their COA testing info and request accreditation
            proof/scope relevant to your assay; confirm identity + purity
            methods are disclosed.
          </p>
          <p>
            &bull; <strong>TrustPointe Analytics</strong> &ndash; Professional
            presentation; ensure you obtain formal accreditation
            documentation. No public ISO-17025 cert found on-site.
          </p>
          <p>
            &bull; <strong>Freedom Diagnostics Testing</strong> &ndash;
            Marketed widely for peptide COAs; request proof of ISO 17025
            accreditation and an official scope before relying on results.
            Could not verify an ISO-17025 certificate or accreditation
            directory listing on-site.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LabResultPage;
