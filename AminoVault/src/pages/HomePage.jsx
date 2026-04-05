import React from "react";
import Promo from "../pages/PromotionSection.jsx";
import Hero from "../pages/HeroSection.jsx";
import About from "../pages/AminoDetailsPage.jsx";
import Benefits from "../pages/ResearchBenefits.jsx";

import TrustedSection from "../pages/TrustedSection.jsx";
import ResearchSection from "../pages/ResearchSection.jsx";
import PuritySection from "../pages/PuritySection.jsx";
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
