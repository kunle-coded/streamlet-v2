import React, { useEffect, useState } from "react";
import "./slider.css";
import Slide from "./Slide";

function Slider({
  slides,
  showButtons = false,
  watchlist,
  onWatchlist,
  isWatchlist,
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
      {showButtons && (
        <button className="arrow left" onClick={prevSlide}>
          <svg
            width="10"
            height="17"
            viewBox="0 0 10 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 1L1 8.5L8.5 16"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div className="slide-container" style={{ transform: transformX }}>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            watchlist={watchlist}
            movie={slide}
            index={index}
            currentSlide={currentSlide}
            onWatchlist={onWatchlist}
          />
        ))}
      </div>
      {showButtons && (
        <button className="arrow left" onClick={nextSlide}>
          <svg
            width="10"
            height="17"
            viewBox="0 0 10 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L8.5 8.5L1 16"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Slider;
