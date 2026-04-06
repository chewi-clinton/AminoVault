import React from "react";
import Promo from "./Home/PromotionSection.jsx";
import Hero from "./Home/HeroSection.jsx";
import About from "./Home/AminoDetailsPage.jsx";
import Benefits from "./Home/ResearchBenefits.jsx";

import TrustedSection from "./Home/TrustedSection.jsx";
import ResearchSection from "./Home/ResearchSection.jsx";
import PuritySection from "./Home/PuritySection.jsx";
const HomePage = () => {
  return (
    <>
      <Hero />
      <Promo />
      <About />
      <Benefits />
      <TrustedSection />
      <ResearchSection />
      <PuritySection />
    </>
  );
};

export default HomePage;
