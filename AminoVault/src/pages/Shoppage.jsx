import React from "react";
import Products from "./Shop/ProductPart.jsx";
import Hero from "./Home/HeroSection.jsx";
import Headline from "./Shop/AnimatedHeadline.jsx";

const Shoppage = () => {
  return (
    <>
      <Hero />
      <Headline />
      <Products />
    </>
  );
};

export default Shoppage;
