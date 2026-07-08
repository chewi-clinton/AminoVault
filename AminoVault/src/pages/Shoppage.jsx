import React from "react";
import { useParams } from "react-router-dom";
import Hero from "./Home/HeroSection.jsx";
import Headline from "./Shop/AnimatedHeadline.jsx";
import Products from "./Shop/ProductPart.jsx";
import Deadline from "./Shop/AnimatedDeadline.jsx";

const Shoppage = () => {
  const { categorySlug } = useParams();
  return (
    <>
      <Hero />
      <Headline />
      <Products categorySlug={categorySlug} />
      <Deadline />
    </>
  );
};

export default Shoppage;
