import React from "react";
import Promo from "../pages/PromotionSection.jsx";
import Hero from "../pages/HeroSection.jsx";
import About from "../pages/AminoDetailsPage.jsx";
import Benefits from "../pages/ResearchBenefits.jsx";
const HomePage = () => {
  return (
    <>
      <Hero />
      <Promo />
      <About />
      <Benefits />
    </>
  );
};

export default HomePage;
