import React, { useEffect, useState } from "react";
import "./slider.css";
import Slide from "./Slide";
import LeftArrow from "../left_arrow/LeftArrow";
import { RightArrow } from "..";

function Slider({
  slides,
  showButtons = false,
  watchlist,
  onWatchlist,
  isWatchlist,
  onWatchlistMark,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const transformX = `translateX(-${currentSlide * 100}%)`;
  const totalSlides = slides.length;

  //   Next slide
  function nextSlide() {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  }

  // Previuos slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  //Automatically advance to next slide
  function autoAdvance() {
    nextSlide();
  }

  useEffect(() => {
    const intervalId = setInterval(autoAdvance, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="slider">
      {showButtons && <LeftArrow />}
      <div className="slide-container" style={{ transform: transformX }}>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            watchlist={watchlist}
            movie={slide}
            index={index}
            currentSlide={currentSlide}
            onWatchlist={onWatchlist}
            isWatchlist={isWatchlist}
            onWatchlistMark={onWatchlistMark}
          />
        ))}
      </div>
      {showButtons && <RightArrow />}
    </div>
  );
}

export default Slider;
