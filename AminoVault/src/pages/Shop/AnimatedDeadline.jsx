import React from "react";
import "../../styles/AnimatedDeadline.css";

const AnimatedDeadline = () => {
  return (
    <div className="headline-container">
      <h3 className="elementor-headline">
        <span className="elementor-headline-dynamic-wrapper">
          <span className="elementor-headline-dynamic-text">
            15% OFF APPLIED AT CHECKOUT!
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9" />
          </svg>
        </span>
        <span className="elementor-headline-plain-text">
          Add 6+ Products & SAVE MORE!
        </span>
      </h3>
    </div>
  );
};

export default AnimatedDeadline;
