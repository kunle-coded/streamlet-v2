import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import Slide from "./Slide";
import LeftArrow from "../left_arrow/LeftArrow";
import { RightArrow } from "..";

function Slider({
  slides,
  showButtons = false,
  watchlist,
  onWatchlist,
  onMovieClick,
  onVideo,
  onDropdownGlobal,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ref = useRef();

  const transformX = `translateX(-${currentSlide * 100}%)`;

  let totalSlides = slides.length;

  //   Next slide
  function nextSlide() {
    setCurrentSlide((prevSlide) => (prevSlide === 9 ? 0 : prevSlide + 1));
  }

  // Previuos slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  // Loop through the bullets to set style

  useEffect(() => {
    const listNodes = ref.current.childNodes;

    listNodes.forEach((node, index) => {
      if (currentSlide === index) {
        node.classList.add("active-bullet");
      } else {
        node.classList.remove("active-bullet");
      }
    });
  });

  function slideTo(e) {
    const listNodes = ref.current.childNodes;

    listNodes.forEach((node, index) => {
      if (node === e.target) {
        setCurrentSlide(index);
      }
    });
  }

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
    <div className="slider" onClick={onDropdownGlobal}>
      {showButtons && <LeftArrow />}
      <div className="slide-container" style={{ transform: transformX }}>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            watchlist={watchlist}
            movie={slide}
            type={slide.title ? "Movie" : "Series"}
            index={index}
            currentSlide={currentSlide}
            onWatchlist={onWatchlist}
            onClick={onMovieClick}
            onVideo={onVideo}
          />
        ))}
      </div>
      {showButtons && <RightArrow />}
      <div className="slide-progress-bullets">
        <ul ref={ref} onClick={slideTo}>
          <li className="slide-bullet"></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
          <li className="slide-bullet "></li>
        </ul>
      </div>
    </div>
  );
}

export default Slider;
