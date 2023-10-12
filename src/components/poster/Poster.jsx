import React, { useEffect, useRef, useState } from "react";
import "./poster.css";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";

function Poster({ movie, index, border = false, length }) {
  const voteAverage = movie.vote_average;
  let rating;

  // Check if voteAverage is defined and is a valid number
  if (typeof voteAverage === "number" && !isNaN(voteAverage)) {
    rating = parseFloat(voteAverage.toFixed(1));
    // Now, 'rating' is calculated safely
  } else {
    rating = movie.vote_average;
  }

  return (
    <div
      className={`movie-poster ${
        border && index === 0
          ? "active-poster"
          : index === length
          ? "half-visible_right"
          : index === 0
          ? "first-element"
          : ""
      }`}
    >
      <div className="poster-overlay"></div>
      <div className="poster-image">
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt=""
        />
      </div>
      <div className="poster-info">
        <div className="poster-title">{movie.title}</div>
        <div className="poster-label">
          <RatingLabel>
            <Rating>{rating}</Rating>
            <Genre movie={movie} divider={true} />
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}
export default Poster;
