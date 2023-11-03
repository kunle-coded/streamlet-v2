import React from "react";
import ResultDetail from "./ResultDetail";

function ResultItem({ movie, onClick }) {
  return (
    <div className="result-card" onClick={() => onClick(movie)}>
      <div className="result-image">
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt=""
        />
      </div>
      <ResultDetail movie={movie} />
    </div>
  );
}

export default ResultItem;
