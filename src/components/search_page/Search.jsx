import React, { useRef, useState } from "react";
import "./search.css";
import ResultItem from "./ResultItem";
import Buttons from "../buttons/Buttons";
import useGenreFetcher from "../../utils/useGenreFetcher";
import genres from "../../genres";
import ResultDetail from "./ResultDetail";
import StarRating from "../rating/StarRating";

function Search({ movies, query }) {
  const [resultCount, setResultCount] = useState(3);
  const [movie, setMovie] = useState({});
  const length = movies.length;
  const ref = useRef();

  const updatedMovie = useGenreFetcher(movies, genres);
  const selectedMovieLength = movie.id;

  function handleLoadMore() {
    setResultCount((count) => count + 3);
  }

  function handleResultClick(movie) {
    window.scrollTo(0, ref);
    setMovie(movie);
  }

  return (
    <main className="search-page">
      <section className="search-header">
        <div className="header-top">
          <div className="search-result-title">
            <h4>{`Showing results for ${query ? `"${query}"` : ""}`}</h4>
          </div>
          <div className="search-result-rigth">
            <div className="search-result-count">{`Found ${length} results`}</div>
          </div>
        </div>
      </section>
      <section className="search-results-container">
        <ul className="search-results">
          {updatedMovie.map(
            (movie, index) =>
              index <= resultCount && (
                <li key={index}>
                  <ResultItem movie={movie} onClick={handleResultClick} />
                </li>
              )
          )}
        </ul>
        {selectedMovieLength && (
          <div className="search-results-movie-details" ref={ref}>
            <div className="results-movie-details-top">
              <div className="results-movie-details-image">
                <img
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  alt=""
                />
              </div>
              <div className="results-movie-details-detail">
                <ResultDetail movie={movie} />
              </div>
            </div>

            <div className="results-movie-details-rate">
              <StarRating />
            </div>

            <div className="results-movie-details-overview">movie mid</div>
            <div className="results-movie-details-btn">movie bottom</div>
          </div>
        )}
      </section>
      <section className="button-sect">
        <div className="load-more-results">
          <Buttons
            width="100px"
            background="#00925d"
            border={false}
            onClick={handleLoadMore}
          >
            Load more
          </Buttons>
        </div>
      </section>
    </main>
  );
}

export default Search;
