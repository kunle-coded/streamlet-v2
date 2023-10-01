import React from "react";
import "./section.css";
import { LeftArrow, RightArrow } from "..";

function Section({
  title,
  gap = "15px",
  height = "auto",
  padding = "0",
  display = "",
  alignItems = "",
  useBackground = false,
  backgroundImage = "",
  slide = false,
  sliding = false,
  onSlide,
  children,
}) {
  const sectionContentStyle = {
    gap: gap,
  };

  const sectionStyle = {
    display: display,
    alignItems: alignItems,
    height: height,
    left: useBackground ? 0 : "",
    right: useBackground ? 0 : "",
    padding: padding,
    marginLeft: useBackground ? "-70px" : "",
    marginRight: useBackground ? "-70px" : "",
    width: useBackground ? "calc(100% + 140px)" : "",
    background: useBackground
      ? `linear-gradient(to right, rgba(13, 12, 15, 0.85), transparent), linear-gradient(0deg, #0d0c0f, transparent 50%, #0d0c0f), url(https://image.tmdb.org/t/p/w1280/${backgroundImage})`
      : "none",
  };

  return (
    <section
      className={`section ${slide ? " arrow_btn" : ""}`}
      style={sectionStyle}
    >
      <div className="section-title">
        <h2>{title}</h2>
      </div>

      {slide && sliding && <LeftArrow slide={false} />}
      <div
        className={`section-content ${slide ? "sliding-card" : ""}`}
        style={sectionContentStyle}
      >
        {children}
      </div>
      {slide && <RightArrow top="30%" slide={true} onClick={() => onSlide} />}
    </section>
  );
}

export default Section;
