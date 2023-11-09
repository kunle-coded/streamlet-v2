/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import Slide from "./Slide";
import LeftArrow from "../left_arrow/LeftArrow";
import { RightArrow } from "..";
import { useMovies } from "../../contexts/MoviesContext";

function Slider({ showButtons = false }) {
  const { slideMovies } = useMovies();
  const [currentSlide, setCurrentSlide] = useState(0);

  const ref = useRef();

  const transformX = `translateX(-${currentSlide * 100}%)`;
  let totalSlides = slideMovies.length;

  //   Next slide
  //Automatically advance to next slide
  useEffect(() => {
    function nextSlide() {
      setCurrentSlide((prevSlide) => (prevSlide === 9 ? 0 : prevSlide + 1));
    }

    const intervalId = setInterval(nextSlide, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  return (
    <div className="slider">
      {showButtons && <LeftArrow />}
      <div className="slide-container" style={{ transform: transformX }}>
        {slideMovies.map((slide, index) => (
          <Slide
            key={slide.id}
            movie={slide}
            type={slide.title ? "Movie" : "Series"}
            index={index}
            currentSlide={currentSlide}
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
