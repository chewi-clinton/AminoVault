import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../styles/ProductPage.css";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, openCart } = useCart();

  const chemicalProfile = [
    { label: "Product Name", value: "Semax 10mg" },
    { label: "Compound Name", value: "Semax" },
    { label: "Also Known As", value: "ACTH(4–7), Pro-Gly-Pro" },
    { label: "Peptide Sequence", value: "Met-Glu-His-Phe-Pro-Gly-Pro" },
    { label: "Molecular Formula", value: "C37H51N9O10S" },
    { label: "Molecular Weight", value: "813.9 g/mol" },
    { label: "CAS Number", value: "80714-61-0" },
    { label: "PubChem CID", value: "9811102" },
    { label: "Form", value: "Lyophilized powder" },
    {
      label: "Storage",
      value:
        "Store according to laboratory handling protocols and supplier documentation",
    },
  ];

  const faqs = [
    {
      question: "What makes AminoVault different from other peptide suppliers?",
      answer:
        "At AminoVault, our commitment is to scientific integrity and unmatched product quality. We provide research-exclusive peptides and specialty compounds formulated with the highest-purity ingredients, sourced from GMP-certified facilities. Every batch undergoes rigorous third-party testing to ensure precision, consistency, and compliance. No exaggerated claims—just elite-grade materials trusted by researchers who demand the best.",
    },
    {
      question: "Are your products safe?",
      answer:
        "At AminoVault, safety begins with strict adherence to quality standards. All of our compounds are produced in GMP-certified facilities and undergo comprehensive third-party testing to verify identity, purity, and consistency. While our products are not intended for human consumption, they meet the highest benchmarks for laboratory and research use. We are committed to full transparency and provide detailed documentation, including Certificates of Analysis (COAs), with every batch.",
    },
    {
      question: "How do you ensure the consistency of each peptide batch?",
      answer:
        "Every batch of AminoVault peptides is subject to a multi-point quality control process, including High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) testing. This ensures batch-to-batch consistency, accurate amino acid sequencing, and the absence of contaminants or solvents. Results are documented in detailed COAs, available for customer review.",
    },
    {
      question: "What sets your quality apart from other vendors?",
      answer:
        'While many suppliers claim "high purity," AminoVault proves it—with verified ≥99% purity on every peptide (unless specified), third-party certification, and direct traceability to GMP-certified manufacturing partners. We never cut corners with fillers or low-cost synthesis shortcuts. Our peptides are trusted by leading academic and biotech labs for their reliability and reproducibility.',
    },
    {
      question: "Are AminoVault peptides competitively priced?",
      answer:
        "Yes. While we refuse to compromise on quality, our streamlined supply chain and bulk manufacturing efficiencies allow us to offer exceptional pricing without sacrificing performance. Our goal is to make world-class peptides accessible for every level of researcher—from university labs to independent investigators.",
    },
    {
      question: "Do your products contain any hidden additives or fillers?",
      answer:
        "Absolutely not. AminoVault peptides are lyophilized to pure powder form, free of fillers, dyes, preservatives, or binding agents. What you see is what you get: pure, unadulterated compounds designed for clean research outcomes.",
    },
    {
      question: "How quickly do you ship orders?",
      answer:
        "At AminoVault, we prioritize fast and secure delivery. Most in-stock items are processed and shipped within 1–3 business days. All orders are carefully packaged with temperature-control insulation to maintain compound stability during transit, ensuring your peptides arrive research-ready and uncompromised.",
    },
    {
      question: "Do you offer support if I have questions about a compound?",
      answer:
        "Yes. Our scientific support team is available to assist with technical product inquiries, documentation, and ordering guidance. Whether you're a seasoned researcher or new to peptide science, we're here to ensure your project starts on solid ground.",
    },
    {
      question: "What kind of documentation is provided with each order?",
      answer:
        "Every AminoVault order includes active links to a Certificate of Analysis (COA) that provides a comprehensive breakdown of the current product's purity level, molecular identity, and batch traceability. Each COA is linked to our lab testing verification URL, where customers can independently access and confirm test results using a unique batch number. This ensures full transparency and confidence in the authenticity and quality of every peptide we supply.",
    },
    {
      question:
        "Why should I choose AminoVault over other research peptide suppliers?",
      answer:
        "AminoVault isn't just a vendor—we're a trusted partner in scientific progress. Our peptides are backed by GMP-certified manufacturing, third-party lab testing, transparent documentation, and an unwavering commitment to purity, performance, and professionalism. With fast shipping, responsive support, and competitive pricing, we deliver not only elite research compounds but also the confidence and consistency your work demands. When precision matters, AminoVault is the name researchers trust.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  function handleAddToCart() {
    const product = {
      id: "semax-10mg-static", // Using a static ID for this example product
      name: "Semax 10mg",
      price: "62.90",
      oldPrice: "74.00",
      img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SEMAX10mg.webp",
      variant: "10 MG",
      sku: "AV-SEMAX-10",
    };
    addToCart(product, quantity);
    openCart();
  }

  return (
    <>
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img
              src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SEMAX10mg.webp"
              alt="Semax Peptide 10 MG at AminoVault"
              className="main-image"
            />
            <button
              className="zoom-btn"
              aria-label="View full-screen image gallery"
            >
              🔍
            </button>
          </div>
          <div className="thumbnail-list">
            <img
              src="https://aminovault.com/wp-content/uploads/2025/07/SEMAX10mg-100x100.webp"
              alt="Semax Thumbnail 1"
              className="thumbnail active"
            />
            <img
              src="https://aminovault.com/wp-content/uploads/2025/07/semax10-1-100x100.webp"
              alt="Semax Thumbnail 2"
              className="thumbnail"
            />
          </div>
        </div>

        <div className="product-details">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a> /{" "}
            <a href="#">Neurological Signaling & Cognitive Pathways Research</a>{" "}
            / <span className="current">Semax 10mg</span>
          </nav>

          <h1 className="product-title">Semax 10mg</h1>

          <div className="product-price">
            <del>$74.00</del>
            <ins>$62.90</ins>
          </div>

          <p className="stock-status">28 in stock</p>

          <div className="add-to-cart-wrapper">
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              max="28"
            />
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>

          <div className="bulk-savings-widget">
            <div className="bulk-header">
              <div className="bulk-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  width="16"
                  height="16"
                >
                  <path
                    d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.2L12 16.9 6.4 19.5l1.1-6.2L3 8.9 9 8l3-6z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  ></path>
                </svg>
                Bulk savings
              </div>
              <span className="bulk-tiers-text">
                15% off, 18% for 6+, 20% for 8+.
              </span>
            </div>

            <div className="bulk-live-msg">
              Great, you have 15% off. Add 4 more to get 18% off.
            </div>

            <div className="bulk-progress-container">
              <div className="bulk-progress-bar">
                <div
                  className="bulk-progress-fill"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <div className="bulk-progress-meta">
                <span>Good momentum</span>
                <span>Goal: 8+</span>
              </div>
            </div>

            <details className="bulk-dropdown">
              <summary>
                <span>See discount tiers</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  width="16"
                  height="16"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </summary>
              <table className="bulk-table">
                <tbody>
                  <tr>
                    <td>All orders</td>
                    <td>
                      <span className="tier-badge">15% off</span>
                    </td>
                  </tr>
                  <tr>
                    <td>6+ bottles</td>
                    <td>
                      <span className="tier-badge">18% off</span>
                    </td>
                  </tr>
                  <tr>
                    <td>8+ bottles</td>
                    <td>
                      <span className="tier-badge">20% off</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>
          </div>

          <div className="product-rating">
            <div className="stars">★★★★★</div>
            <span className="rating-text">
              5 Star Rating by 1000+ Customers
            </span>
          </div>

          <div className="product-description">
            <h5>(10 MG)</h5>
            <p>
              Semax 10mg is a synthetic ACTH-derived research peptide studied
              for its role in neuropeptide signaling, neurotrophic factor
              expression, oxidative stress models, inflammatory response
              pathways, and central nervous system research. This compound is
              intended strictly for laboratory research use only and is not for
              human or veterinary use.
            </p>
          </div>

          <div className="purity-banner">
            <h4 className="purity-title">
              LOCKED IN PURITY WITH THIRD PARTY TESTING
            </h4>
            <p className="purity-text">
              <strong>
                Dual Tested • ISO/IEC 17025 Accredited Lab Results
              </strong>
              <br />
              Independently analyzed by an{" "}
              <strong>ISO/IEC 17025:2017 accredited</strong> lab. Each batch
              includes a <strong>verifiable COA</strong> showing identity
              (LC-MS/MS/HPLC), purity %, and full batch traceability.
            </p>
            <a
              href="https://aminovault.com/wp-content/uploads/2025/07/COA261921-QC261831-Semax.pdf"
              target="_blank"
              rel="noreferrer"
              className="lab-results-link"
            >
              <svg
                aria-hidden="true"
                className="pdf-icon"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"
                  fill="currentColor"
                ></path>
              </svg>
              View Lab Results Here
            </a>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <svg
                className="feature-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="1.5"></circle>
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  d="M8 14s1.5 2 4 2 4-2 4-2"
                ></path>
                <line
                  x1="9"
                  y1="9"
                  x2="9.01"
                  y2="9"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
                <line
                  x1="15"
                  y1="9"
                  x2="15.01"
                  y2="9"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
              </svg>
              <span>Satisfaction Guaranteed</span>
            </div>
            <div className="feature-item">
              <svg
                className="feature-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span>Secure Ordering</span>
            </div>
            <div className="feature-item">
              <svg
                className="feature-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                ></path>
              </svg>
              <span>Third-Party Tested</span>
            </div>
            <div className="feature-item">
              <svg
                className="feature-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                ></path>
              </svg>
              <span>Fast, Reliable Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ext-bottom-section">
        <div className="ext-left-col">
          <div className="ext-tabs-wrapper">
            <ul className="ext-tabs-nav" role="tablist">
              <li>
                <button
                  className={`ext-tab-btn ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                  role="tab"
                  aria-selected={activeTab === "description"}
                >
                  Description
                </button>
              </li>
              <li>
                <button
                  className={`ext-tab-btn ${activeTab === "additional" ? "active" : ""}`}
                  onClick={() => setActiveTab("additional")}
                  role="tab"
                  aria-selected={activeTab === "additional"}
                >
                  Additional information
                </button>
              </li>
            </ul>

            <div
              className={`ext-tab-panel ${activeTab === "description" ? "active" : ""}`}
              role="tabpanel"
            >
              <h2>Description</h2>

              <h3>Semax 10mg — Research Peptide</h3>
              <p>
                Semax is a synthetic heptapeptide analog of adrenocorticotropic
                hormone fragment ACTH(4-10). In published research, Semax is
                commonly referenced by the sequence Met-Glu-His-Phe-Pro-Gly-Pro
                and has been studied for its interaction with neuropeptide
                signaling pathways, neurotrophic factor expression, oxidative
                stress models, inflammatory response pathways, and cellular
                response mechanisms.
              </p>
              <p>
                AminoVault offers Semax 10mg strictly as a laboratory research
                compound. This material is intended for qualified research
                professionals and institutions only and is not intended for
                human or veterinary use.
              </p>

              <h3>What Is Semax?</h3>
              <p>
                Semax is a synthetic peptide derived from the ACTH(4-10)
                fragment with an added Pro-Gly-Pro sequence. This structural
                modification has made Semax a subject of interest in laboratory
                studies involving peptide stability, central nervous system
                signaling, and neurobiological research models.
              </p>
              <p>
                Research involving Semax has explored its relationship to
                neuropeptide activity, gene expression, neurotrophic signaling,
                inflammatory pathways, and oxidative stress response. These
                studies are intended to better understand peptide-receptor
                interactions and related biological mechanisms in controlled
                research environments.
              </p>

              <h3>Chemical Profile</h3>
              <ul className="ext-chem-list">
                {chemicalProfile.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>

              <h3>Key Areas of Research</h3>
              <div className="ext-research-grid">
                <div className="ext-research-card">
                  <h4>Neuropeptide Signaling Research</h4>
                  <p>
                    Semax has been studied as a synthetic ACTH fragment analog
                    in research involving neuropeptide signaling pathways.
                    Investigators have examined how ACTH-derived peptides may
                    interact with biological systems related to cellular
                    communication, stress-response pathways, and central nervous
                    system research models.
                  </p>
                </div>
                <div className="ext-research-card">
                  <h4>Neurotrophic Factor Expression</h4>
                  <p>
                    A major area of Semax research involves neurotrophic
                    signaling, including studies related to brain-derived
                    neurotrophic factor, nerve growth factor, and other
                    molecular markers associated with cellular adaptation and
                    neuronal research models. These investigations are
                    exploratory and intended for laboratory research only.
                  </p>
                </div>
                <div className="ext-research-card">
                  <h4>Oxidative Stress Models</h4>
                  <p>
                    Semax has appeared in research involving oxidative stress
                    response and cellular protection models. These studies
                    evaluate biochemical markers and pathway-level responses in
                    controlled experimental settings.
                  </p>
                </div>
                <div className="ext-research-card">
                  <h4>Inflammatory Pathway Research</h4>
                  <p>
                    Research has also explored Semax in relation to inflammatory
                    signaling pathways. This includes examination of
                    cytokine-related activity, cellular stress response, and
                    peptide-mediated signaling mechanisms in preclinical models.
                  </p>
                </div>
                <div className="ext-research-card">
                  <h4>Cognitive and Behavioral Research Models</h4>
                  <p>
                    Semax is frequently referenced in studies involving
                    learning, memory, behavioral response, and central nervous
                    system models. These research areas focus on
                    mechanism-of-action exploration and do not indicate that
                    this product is intended for cognitive enhancement, medical
                    use, or consumer use.
                  </p>
                </div>
              </div>

              <h3>Research Applications</h3>
              <p>
                Semax 10mg may be used in qualified laboratory research
                involving:
              </p>
              <p>
                Neuropeptide signaling
                <br />
                ACTH fragment analog studies
                <br />
                Neurotrophic factor pathway research
                <br />
                Oxidative stress response models
                <br />
                Inflammatory signaling research
                <br />
                Cellular response studies
                <br />
                Peptide stability and structure-activity research
                <br />
                Central nervous system research models
              </p>

              <h3>Product Use Statement</h3>
              <p>
                Semax 10mg from AminoVault is{" "}
                <strong>supplied strictly for research purposes</strong>. This
                product is not a drug, dietary supplement, cosmetic, food
                ingredient, or consumer product. It is not intended to diagnose,
                treat, cure, prevent, or mitigate any disease or medical
                condition.
              </p>
              <p>
                This material should only be handled by qualified professionals
                in appropriate laboratory settings. Any human or animal use is
                strictly prohibited.
              </p>
            </div>

            <div
              className={`ext-tab-panel ${activeTab === "additional" ? "active" : ""}`}
              role="tabpanel"
            >
              <h2>Additional information</h2>
              <table className="ext-info-table">
                <tbody>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>0.1 lbs</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>10 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="ext-right-col">
          <div className="ext-faq-section">
            <h3 className="ext-faq-section-title">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="ext-faq-stack">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="ext-faq-item">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="ext-faq-trigger"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="ext-faq-panel">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: faq.answer.replace(
                              /(AminoVault|research-exclusive peptides and specialty compounds|highest-purity ingredients|GMP-certified facilities|rigorous third-party testing|elite-grade materials|strict adherence to quality standards|comprehensive third-party testing|not intended for human consumption|laboratory and research use|Certificates of Analysis \(COAs\)|multi-point quality control process|High-Performance Liquid Chromatography \(HPLC\)|Mass Spectrometry \(MS\)|batch-to-batch consistency|verified ≥99% purity|GMP-certified manufacturing partners|leading academic and biotech labs|reliability and reproducibility|streamlined supply chain and bulk manufacturing efficiencies|exceptional pricing|world-class peptides|lyophilized to pure powder form|pure, unadulterated compounds|processed and shipped within 1–3 business days|temperature-control insulation|research-ready and uncompromised|scientific support team|technical product inquiries, documentation, and ordering guidance|Certificate of Analysis \(COA\)|purity level, molecular identity, and batch traceability|lab testing verification URL|independently access and confirm test results|authenticity and quality|trusted partner in scientific progress|GMP-certified manufacturing, third-party lab testing, transparent documentation|purity, performance, and professionalism|fast shipping, responsive support|AminoVault is the name researchers trust)/g,
                              "<strong>$1</strong>",
                            ),
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ext-cert-section">
            <h3 className="ext-cert-title">Product Certifications</h3>
            <div className="ext-cert-grid">
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/08/GMP-removebg-preview-e1755357338318.webp"
                alt="GMP Certified - Good Manufacturing Practice"
                className="ext-cert-badge"
              />
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/08/Made-in-USA.png"
                alt="Made in USA"
                className="ext-cert-badge"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ext-gallery-section">
        <h3 className="ext-gallery-title">Product Gallery</h3>
        <div className="ext-gallery-grid">
          <div
            className="ext-gallery-item"
            style={{
              backgroundImage: `url("https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_11_05_41_PM.webp")`,
            }}
            onClick={() =>
              window.open(
                "https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_11_05_41_PM.webp",
                "_blank",
              )
            }
            role="img"
            aria-label="Semax product image 1"
          />
          <div
            className="ext-gallery-item"
            style={{
              backgroundImage: `url("https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_10_51_20_PM.webp")`,
            }}
            onClick={() =>
              window.open(
                "https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_10_51_20_PM.webp",
                "_blank",
              )
            }
            role="img"
            aria-label="Semax product image 2"
          />
          <div
            className="ext-gallery-item"
            style={{
              backgroundImage: `url("https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_11_08_23_PM.webp")`,
            }}
            onClick={() =>
              window.open(
                "https://aminovault.com/wp-content/uploads/2025/08/ChatGPT_Image_Aug_17_2025_11_08_23_PM.webp",
                "_blank",
              )
            }
            role="img"
            aria-label="Semax product image 3"
          />
        </div>
      </div>

      <div className="ext-related-section">
        <h3 className="ext-related-title">Explore Related Research Peptides</h3>
        <div className="ext-related-grid">
          <div className="ext-product-card">
            <a href="https://aminovault.com/product/selank/">
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SELANK10mg.webp"
                alt="Selank 10mg"
                className="ext-product-card-img"
              />
            </a>
            <div className="ext-product-card-body">
              <h5 className="ext-product-card-title">
                <a href="https://aminovault.com/product/selank/">Selank 10mg</a>
              </h5>
              <div className="ext-product-card-footer">
                <p className="ext-product-card-price">
                  <del>$89.00</del> <ins>$75.65</ins>
                </p>
                <a
                  href="/product/semax/?add-to-cart=1424"
                  className="ext-product-card-btn"
                  role="button"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <div className="ext-product-card">
            <a href="https://aminovault.com/product/selank-semax/">
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SELANK-SEMAX-10.webp"
                alt="Selank Semax Blend 20mg"
                className="ext-product-card-img"
              />
            </a>
            <div className="ext-product-card-body">
              <h5 className="ext-product-card-title">
                <a href="https://aminovault.com/product/selank-semax/">
                  Selank Semax Blend 20mg
                </a>
              </h5>
              <div className="ext-product-card-footer">
                <p className="ext-product-card-price">
                  <del>$170.00</del> <ins>$144.50</ins>
                </p>
                <a
                  href="https://aminovault.com/product/selank-semax/"
                  className="ext-product-card-btn out-of-stock"
                  role="button"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>

          <div className="ext-product-card">
            <a href="https://aminovault.com/product/nad/">
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/NAD1000MGnew1.webp"
                alt="NAD+ 1000mg"
                className="ext-product-card-img"
              />
            </a>
            <div className="ext-product-card-body">
              <h5 className="ext-product-card-title">
                <a href="https://aminovault.com/product/nad/">NAD+ 1000mg</a>
              </h5>
              <div className="ext-product-card-footer">
                <p className="ext-product-card-price">
                  <del>$207.00</del> <ins>$175.95</ins>
                </p>
                <a
                  href="/product/semax/?add-to-cart=1359"
                  className="ext-product-card-btn"
                  role="button"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <div className="ext-product-card">
            <a href="https://aminovault.com/product/l-glutathione/">
              <img
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/LGLUTSHADOW_AV.webp"
                alt="L-Glutathione 1500mg"
                className="ext-product-card-img"
              />
            </a>
            <div className="ext-product-card-body">
              <h5 className="ext-product-card-title">
                <a href="https://aminovault.com/product/l-glutathione/">
                  L-Glutathione 1500mg
                </a>
              </h5>
              <div className="ext-product-card-footer">
                <p className="ext-product-card-price">
                  <del>$85.50</del> <ins>$72.68</ins>
                </p>
                <a
                  href="/product/semax/?add-to-cart=1356"
                  className="ext-product-card-btn"
                  role="button"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
