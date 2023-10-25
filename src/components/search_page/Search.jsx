import React, { useEffect, useRef, useState } from "react";
import "./search.css";
import ResultItem from "./ResultItem";
import Buttons from "../buttons/Buttons";
import useGenreFetcher from "../../utils/useGenreFetcher";
import genres from "../../genres";
import ResultDetail from "./ResultDetail";
import StarRating from "../rating/StarRating";
import Loader from "../loader/Loader";
import useWatchlistMarker from "../../utils/useWatchlistMarker";

function Search({
  movies,
  query,
  watchlist,
  userRating,
  onRate,
  onWatchlist,
  isLoading,
  onDropdownGlobal,
}) {
  const [resultCount, setResultCount] = useState(3);
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [firstQuery, setFirstQuery] = useState("");
  const length = movies.length;
  const ref = useRef();
  const selectedMovieLength = movie.id;

  useEffect(() => {
    setFirstQuery(query);

    if (firstQuery !== query) {
      setMovie({});
    }
  }, [firstQuery, query]);

  useEffect(() => {
    let rate = 0;
    userRating.forEach((user) => {
      if (user.movieId === movie.id) {
        rate = user.rating;
      }
    });

    setRating(rate);
  }, [userRating, movie]);

  let watchlisted = useWatchlistMarker(watchlist, movie);

  function handleLoadMore() {
    setResultCount((count) => count + 3);
  }

  function handleResultClick(movie) {
    window.scrollTo(0, ref);
    setMovie(movie);
  }

  function handleRating(rating) {
    onRate(movie.id, rating);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="search-page" onClick={onDropdownGlobal}>
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
          {movies.map(
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
              <StarRating rating={rating} onRate={handleRating} />
            </div>

            <div className="results-movie-details-overview">
              <p>{movie.overview}</p>
              <p className="results-movie-details-staring">
                Staring{" "}
                {movie.cast.map((cast, i) => (
                  <React.Fragment key={i}>
                    {" "}
                    {cast.name}
                    {i < movie.cast.length - 1 && ","}
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="results-movie-details-btn">
              <Buttons
                bookmark={true}
                watchlisted={watchlisted}
                width={watchlisted ? "170px" : "150px"}
                height="35px"
                borderRadius="9px"
                onClick={() => onWatchlist(movie)}
              >
                {watchlisted ? "Remove Watchlist" : "Add Watchlist"}
              </Buttons>
            </div>
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
