import React, { useState } from "react";
import "../../src/styles/FAQPage.css";
import faqData from "../data/faqData";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

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
