import React, { useEffect, useState } from "react";
import "./poster.css";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";

function Poster({ movie, index, border = false, onActive }) {
  const [currentPoster, setCurrentPoster] = useState(0);

  useEffect(() => {
    if (index === currentPoster) {
      onActive(movie);
    }
  }, []);

  return (
    <div
      className={`movie-poster ${border && index === 0 ? "active-poster" : ""}`}
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
            <Rating>{movie.vote_average}</Rating>
            <Genre movie={movie} divider={true} />
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}
export default Poster;
