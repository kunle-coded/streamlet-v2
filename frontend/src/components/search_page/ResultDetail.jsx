/* eslint-disable react/prop-types */
import React from "react";
import Rating from "../rating/Rating";

function ResultDetail({ movie }) {
  const datePreText = movie.first_air_date
    ? "First air date:"
    : "Release date:";
  const date = movie ? movie.first_air_date || movie.release_date : "";
  const updatedDate = date && date.split("-")[0];
  const firstLetter =
    movie.media_type && movie.media_type.slice(0, 1).charAt(0).toUpperCase();
  const secondLetter = movie.media_type && movie.media_type.slice(1);
  const movieType = firstLetter + secondLetter;
  const rating =
    movie.vote_average && parseFloat(movie.vote_average.toFixed(1));

  return (
    <div className="result-details">
      <div className="result-details-type">{movieType}</div>
      <div className="result-details-title">
        <h4>{movie.title || movie.name}</h4>
      </div>
      <div className="result-details-date">
        <p>
          {datePreText} {updatedDate}
        </p>
      </div>
      <div className="result-details-genres">
        <ul>
          {movie.genres &&
            movie.genres.map((genre, index) => <li key={index}>{genre}</li>)}
        </ul>
      </div>
      <div className="result-details-rating">
        <Rating>{rating}</Rating>
      </div>
    </div>
  );
}

export default ResultDetail;
