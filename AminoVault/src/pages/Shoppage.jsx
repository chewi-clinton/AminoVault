import React from "react";
import Hero from "./Home/HeroSection.jsx";
import Headline from "./Shop/AnimatedHeadline.jsx";
import Products from "./Shop/ProductPart.jsx";
import Deadline from "./Shop/AnimatedDeadline.jsx";

const Shoppage = () => {
  return (
    <>
      <Hero />
      <Headline />
      <Products />
      <Deadline />
    </>
  );
};

export default Shoppage;
