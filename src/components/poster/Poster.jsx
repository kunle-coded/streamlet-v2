import React from "react";
import "./poster.css";
import fastX from "../../assets/img/fast-x.jpeg";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";

function Poster({ movie }) {
  return (
    <div className="movie-poster">
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
            <Rating>{movie.vote_average}</Rating>
            <Genre>
              <p>{movie.genres[0]}</p>
              <p>{movie.genres[1]}</p>
            </Genre>
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}
export default Poster;
