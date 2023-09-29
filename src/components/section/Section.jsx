import React from "react";
import "./section.css";
import { RightArrow } from "..";

function Section({
  title,
  gap = "15px",
  className = "",
  slide = false,
  onSlide,
  children,
}) {
  const sectionStyle = {
    gap: gap,
  };
  return (
    <section className={`section ${slide ? " arrow_btn" : ""}`}>
      <div className="section-title">
        <h2>{title}</h2>
      </div>

      <div
        className={`section-content ${slide ? "sliding-card" : ""}`}
        style={sectionStyle}
      >
        {children}
      </div>
      {slide && <RightArrow slide={true} onClick={() => onSlide} />}
    </section>
  );
}

export default Section;
