import React, { useRef } from "react";
import "./card.css";
import Genre from "../genres/Genre";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";

function Card({
  height = "140px",
  width = "250px",
  borderRadius = "12px",
  orientation = false,
  showLabel = true,
  active = false,
  movie,
  index,
  slide = false,
}) {
  const cardStyle = {
    display: "flex",
    flexDirection: orientation ? "column" : "",
    height: height,
    // width: width,
  };

  const pg = movie.adult ? "18+" : "PG-13";

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
      <div className="card-number">
        <h1>{index + 1}</h1>
      </div>
      <div className="card-image">
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt="movie poster"
          style={{ borderRadius: borderRadius }}
        />
      </div>
      <div className="card-text">
        <div className="card-pg-label">{pg}</div>
        <div className="card-title">
          <h4>{movie.title}</h4>
        </div>
        <div className="card-genre-label">
          <Genre label={true}>
            <p>{movie.genres[0]}</p>
            <p>{movie.genres[1]}</p>
          </Genre>
        </div>
        <div className="card-rating-label">
          <RatingLabel>
            <Rating>{movie.vote_average}</Rating>
            <Genre>
              <p>Movie</p>
            </Genre>
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}

export default Card;
