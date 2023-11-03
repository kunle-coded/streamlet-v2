import React from "react";
import "./movie_info.css";
import Genre from "../genres/Genre";

function MovieInfo({ movie, children }) {
  return (
    <div className="slide-movie-info">
      <span>2h40m · </span>
      <span>{movie.release_date.split("-")[0]} · </span>
      <span>
        <Genre>
          <p>{movie.genres[0]}</p>
          <p>{movie.genres[1]}</p>
        </Genre>
      </span>
    </div>
  );
}

export default MovieInfo;
