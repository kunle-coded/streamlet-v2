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
  movie,
  index,
  slide = false,
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

  let count = 0;
  for (let i = 0; i <= index; i++) {
    count++;
  }

  return (
    <div
      className={`card ${
        index === count ? "half-visible" : slide ? "slide-card" : ""
      }`}
      style={cardStyle}
    >
      {showNumber && (
        <div className="card-number">
          <h1>{index + 1}</h1>
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
          <Genre movie={movie} label={true} />
        </div>
        <div className="card-rating-label">
          <RatingLabel>
            <Rating>{rating}</Rating>
            <Genre movie={movie} divider={true} genre={false} />
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}

export default Card;
