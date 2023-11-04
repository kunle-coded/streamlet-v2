import React, { useRef } from "react";
import "./card.css";
import Genre from "../genres/Genre";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";

function Card({
  height = "140px",
  width = "400px",
  borderRadius = "12px",
  whiteSpace = "normal",
  orientation = false,
  showLabel = true,
  showNumber = true,
  active = false,
  live,
  movie,
  index,
  length,
  slide = false,
  onMovieClick,
}) {
  const cardStyle = {
    display: "flex",
    flexDirection: orientation ? "column" : "",
    height: height,
    width: width,
  };
  const titleStyle = {
    whiteSpace: whiteSpace,
  };

  const pg = movie.adult ? "18+" : "PG-13";
  const rating = parseFloat(movie.vote_average.toFixed(1));
  const type = movie.title ? "Movie" : "Series";

  const cardCounter = movie.counter;
  let number;

  // Check if counter is defined and is a valid number
  if (typeof cardCounter === "number" && !isNaN(cardCounter)) {
    number = movie.counter + 1;
  } else {
    number = index + 1;
  }

  return (
    <div
      className={`card ${
        index === length
          ? "half-visible_right"
          : index === 0
          ? "first-element"
          : ""
      }`}
      style={cardStyle}
      onClick={() => onMovieClick(movie)}
    >
      {showNumber && (
        <div className="card-number">
          <h1>{number}</h1>
        </div>
      )}
      <div className="card-image">
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt="movie poster"
          style={{ borderRadius: borderRadius }}
        />
      </div>
      <div className="card-text">
        <div className="card-pg-label">{pg}</div>
        <div className="card-title" style={titleStyle}>
          <h4>{movie.title}</h4>
        </div>
        <div className="card-genre-label">
          <Genre movie={movie} label={true} live={live} />
        </div>
        <div className="card-rating-label">
          <RatingLabel>
            <Rating>{rating}</Rating>
            <span className="card-movie-type"> | {type}</span>
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}

export default Card;
