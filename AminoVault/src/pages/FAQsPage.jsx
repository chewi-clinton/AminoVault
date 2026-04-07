import React, { useState } from "react";
import "../../src/styles/FAQPage.css";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const faqData = [
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
        "While many suppliers claim “high purity,” AminoVault proves it—with verified ≥99% purity on every peptide (unless specified), third-party certification, and direct traceability to GMP-certified manufacturing partners. We never cut corners with fillers or low-cost synthesis shortcuts. Our peptides are trusted by leading academic and biotech labs for their reliability and reproducibility.",
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
        "Yes. Our scientific support team is available to assist with technical product inquiries, documentation, and ordering guidance. Whether you’re a seasoned researcher or new to peptide science, we’re here to ensure your project starts on solid ground.",
    },
    {
      question: "What kind of documentation is provided with each order?",
      answer:
        "Every AminoVault order includes active links to a Certificate of Analysis (COA) that provides a comprehensive breakdown of the current product’s purity level, molecular identity, and batch traceability. Each COA is linked to our lab testing verification URL, where customers can independently access and confirm test results using a unique batch number. This ensures full transparency and confidence in the authenticity and quality of every peptide we supply.",
    },
    {
      question:
        "Why should I choose AminoVault over other research peptide suppliers?",
      answer:
        "AminoVault isn’t just a vendor—we’re a trusted partner in scientific progress. Our peptides are backed by GMP-certified manufacturing, third-party lab testing, transparent documentation, and an unwavering commitment to purity, performance, and professionalism. With fast shipping, responsive support, and competitive pricing, we deliver not only elite research compounds but also the confidence and consistency your work demands.",
    },
  ];

  return (
    <div className="faq-wrapper">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Frequently Asked Questions</h1>
          <p className="contact-hero-description">
            Find clear, accurate answers about our peptides, ordering process,
            and research use. At AminoVault, transparency is as essential as
            purity, helping you make informed decisions for your laboratory’s
            success.
          </p>
        </div>
      </section>

      <section className="faq-accordion-section">
        <div className="faq-accordion-container">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-title ${activeTab === index ? "active" : ""}`}
                onClick={() => toggleTab(index)}
              >
                <span className="faq-icon">
                  {activeTab === index ? "−" : "+"}
                </span>
                {item.question}
              </div>
              <div
                className={`faq-content ${activeTab === index ? "show" : ""}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
