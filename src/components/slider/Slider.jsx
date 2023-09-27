import React from "react";
import "./slider.css";
import image from "../../assets/img/star-wars.jpeg";

function Slider({ movies }) {
  console.log(movies);
  const sliderStyle = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
  };

  return (
    <div className="slider" style={sliderStyle}>
      <div className="slider-overlay"></div>
      <div className="slider-text-area"></div>
    </div>
  );
}
export default Slider;
