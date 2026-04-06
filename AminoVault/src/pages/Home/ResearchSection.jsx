import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../../styles/ResearchSection.css";

import researchImg1 from "../../assets/Research_img1.webp";
import researchImg2 from "../../assets/Research_img2.webp";
import researchImg3 from "../../assets/Research_img3.webp";
import researchImg4 from "../../assets/Research_img4.webp";

const ResearchSection = () => {
  const researchData = [
    {
      id: 1,
      image: researchImg1,
      text: "In preclinical studies, BPC-157 demonstrated measurable anti-inflammatory activity, significantly reducing edema and tissue irritation following induced injury. These findings suggest the peptide may play a regulatory role in inflammatory response pathways, indicating its potential utility in experimental models of injury recovery and chronic inflammation management",
    },
    {
      id: 2,
      image: researchImg2,
      text: "In controlled preclinical models, supplementation with NAD+ precursors has been shown to elevate intracellular NAD+ levels, supporting mitochondrial function and cellular energy metabolism. Research trials suggest NAD+ may play a critical role in modulating oxidative stress, DNA repair, and metabolic regulation—making it a valuable compound in studies focused on aging, neuroprotection, and metabolic resilience.					",
    },
    {
      id: 3,
      image: researchImg3,
      text: " In early-phase clinical trials, Retatrutide, a novel triple agonist targeting GLP-1, GIP, and glucagon receptors, demonstrated substantial metabolic effects, including reductions in body weight and improved insulin sensitivity. By activating multiple incretin pathways, Retatrutide appears to enhance energy expenditure and glycemic control, making it a promising compound for ongoing research into obesity, type 2 diabetes, and metabolic dysfunction. ",
    },
    {
      id: 4,
      image: researchImg4,
      text: "Tesamorelin, a stabilized analog of growth hormone–releasing hormone (GHRH), has shown clinical efficacy in stimulating endogenous growth hormone secretion. In controlled trials, it has been observed to reduce visceral adipose tissue while maintaining lean mass, particularly in populations with altered metabolic profiles. Its mechanism of action and metabolic selectivity make it a valuable candidate in research exploring lipolysis regulation, growth hormone pathways, and age-related fat redistribution.",
    },
    {
      id: 5,
      image: researchImg1,
      text: "In preclinical studies, BPC-157 demonstrated measurable anti-inflammatory activity, significantly reducing edema and tissue irritation following induced injury. These findings suggest the peptide may play a regulatory role in inflammatory response pathways, indicating its potential utility in experimental models of injury recovery and chronic inflammation management.",
    },
    {
      id: 6,
      image: researchImg2,
      text: "In controlled preclinical models, supplementation with NAD+ precursors has been shown to elevate intracellular NAD+ levels, supporting mitochondrial function and cellular energy metabolism. Research trials suggest NAD+ may play a critical role in modulating oxidative stress, DNA repair, and metabolic regulation—making it a valuable compound in studies focused on aging, neuroprotection, and metabolic resilience.",
    },
  ];

  return (
    <section className="research-section">
      <div className="research-container">
        <div className="bg-watermark">CLINICAL TRIALS</div>

        <h2 className="section-title">Research Suggests</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="research-swiper"
        >
          {researchData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="research-card">
                <div className="card-icon">
                  <img src={item.image} alt="Research Icon" loading="lazy" />
                </div>
                <p className="card-text">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ResearchSection;
