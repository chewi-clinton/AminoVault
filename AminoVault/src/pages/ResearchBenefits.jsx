import React from "react";
import "../styles/ResearchBenefits.css";

const ResearchBenefits = () => {
  const benefits = [
    {
      title: "Pathway Activation For Peak Performance Studies",
      description:
        "Explore biological processes tied to recovery, endurance, energy metabolism, and cellular resilience.",
      boldText:
        "recovery, endurance, energy metabolism, and cellular resilience",
    },
    {
      title: "Short Half-Life For Safer Modeling",
      description:
        "Naturally metabolized quickly, enabling short-term response studies without lasting effects.",
      boldText: "short-term response studies",
    },
    {
      title: "Molecular Flexibility",
      description:
        "Customizable peptide structures for different lengths, binding affinities, and delivery methods, enabling innovation in research.",
      boldText: "lengths, binding affinities, and delivery methods",
    },
    {
      title: "Precision Targeting For Clean Experiments",
      description:
        "Receptor-selective peptides support accurate testing and performance-driven experimental design.",
      boldText: "accurate testing",
    },
    {
      title: "Adaptable For Recovery & Stress Models",
      description:
        "Ideal for studies on post-exertion recovery, inflammation control, and stress resilience.",
      boldText:
        "post-exertion recovery, inflammation control, and stress resilience",
    },
    {
      title: "Optimized For Experimental Protocols",
      description:
        "Frequently used in research on cellular adaptation, hormone signaling, and physiological stress modeling.",
      boldText:
        "cellular adaptation, hormone signaling, and physiological stress modeling",
    },
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-header">
        <h2 className="benefits-main-title">Research Peptide Benefits</h2>
        <p className="benefits-subtitle">
          Unlock the potential of{" "}
          <strong>99%+ pure, USA-manufactured research peptides</strong>
          —independently COA-verified and batch-traced for unmatched accuracy.
          Designed for precise, controlled laboratory work, these compounds help
          accelerate discoveries in pharmacology, cellular biology, and
          performance science.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div className="benefit-card" key={index}>
            <h4 className="benefit-card-title">{benefit.title}</h4>
            <p className="benefit-card-text">
              {benefit.description.split(benefit.boldText)[0]}
              <strong>{benefit.boldText}</strong>
              {benefit.description.split(benefit.boldText)[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchBenefits;
