import React from "react";
import "./section.css";
import { LeftArrow, RightArrow } from "..";

function Section({
  title,
  gap = "15px",
  height = "auto",
  padding = "0",
  marginTop = "0",
  display = "",
  border = false,
  showBorder = false,
  borderBottom = "1px solid #28262d",
  marginBottomTitle = "30px",
  alignItems = "",
  backgroundImage = "",
  arrowTop = "0",
  arrowRight = "0",
  arrowLeft = "0",
  btnTop = "30%",
  useBackground = false,
  slide = false,
  isSlide = false,
  isSlideCard = false,
  isSlideMovies = false,
  isSlideSeries = false,
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
    borderBottom: showBorder ? borderBottom : "",
    marginTop: marginTop,
    marginLeft: useBackground || border ? "-70px" : "",
    marginRight: useBackground || border ? "-70px" : "",
    width: useBackground || border ? "calc(100% + 140px)" : "",
    background: useBackground
      ? `linear-gradient(to left, rgba(13, 12, 15, 1), transparent), linear-gradient(to right, rgba(13, 12, 15, 0.85), transparent), linear-gradient(0deg, #0d0c0f, transparent 50%, #0d0c0f), url(https://image.tmdb.org/t/p/w1280/${backgroundImage})`
      : "none",
  };

  return (
    <section
      className={`section ${slide ? " arrow_btn" : ""}`}
      style={sectionStyle}
    >
      <div
        className="section-title"
        style={{ marginBottom: marginBottomTitle }}
      >
        <h2>{title}</h2>
      </div>

      <div
        className={`section-content ${slide ? "sliding-card" : ""}`}
        style={sectionContentStyle}
      >
        {slide &&
          (isSlide || isSlideCard || isSlideMovies || isSlideSeries) && (
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
