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
  backgroundImage = "",
  arrowTop = "0",
  arrowRight = "0",
  arrowLeft = "0",
  btnTop = "30%",
  useBackground = false,
  slide = false,
  isSlide = false,
  onSlideRight,
  onSlideLeft,
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
    padding: `20px ${padding}`,
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

      <div
        className={`section-content ${slide ? "sliding-card" : ""}`}
        style={sectionContentStyle}
      >
        {slide && isSlide && (
          <LeftArrow
            slide={true}
            btnTop={btnTop}
            left={arrowLeft}
            onClick={onSlideLeft}
          />
        )}
        {children}
        {slide && (
          <RightArrow
            top={arrowTop}
            btnTop={btnTop}
            right={arrowRight}
            slide={true}
            onClick={onSlideRight}
          />
        )}
      </div>
    </section>
  );
}

export default Section;
