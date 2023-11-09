/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./poster.css";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";
import { Link } from "react-router-dom";
import { useMovies } from "../../contexts/MoviesContext";

function Poster({ movie, index, border = false, length }) {
  const { handleMovieClick } = useMovies();

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
      onClick={() => handleMovieClick(movie)}
    >
      <Link
        to={`/movie/${movie.id}&${decodeURIComponent(movie.title).replace(
          / /g,
          "-"
        )}`}
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
              <Genre movie={movie} divider={true} live={true} />
            </RatingLabel>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default Poster;
