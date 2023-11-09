/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./search.css";
import ResultItem from "./ResultItem";
import Buttons from "../buttons/Buttons";
import ResultDetail from "./ResultDetail";
import StarRating from "../rating/StarRating";
import Loader from "../loader/Loader";
import useWatchlistMarker from "../../utils/useWatchlistMarker";
import { useForms } from "../../contexts/FormContext";
import { useMovies } from "../../contexts/MoviesContext";

function Search() {
  const { userRating, searchQuery, results, searchStatus, onRateMovie } =
    useForms();
  const { watchlist, handleWatchlist } = useMovies();
  const [resultCount, setResultCount] = useState(3);
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [firstQuery, setFirstQuery] = useState("");
  const length = results.length;
  const ref = useRef();
  const selectedMovieLength = movie.id;

  useEffect(() => {
    setFirstQuery(searchQuery);

    if (firstQuery !== searchQuery) {
      setMovie({});
    }
  }, [firstQuery, searchQuery]);

  useEffect(() => {
    if (!(movie.title || movie.name)) return;

    document.title = `Streamlet - ${movie.title ? movie.title : movie.name}`;

    return () => {
      document.title = "Streamlet";
    };
  }, [movie, movie.name, movie.title]);

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
    // window.scrollTo(0, ref);
    setMovie(movie);
  }

  function handleRating(rating) {
    onRateMovie(movie.id, rating);
  }

  if (searchStatus === "loading") {
    return <Loader />;
  }

  return (
    <main className="search-page">
      <section className="search-header">
        <div className="header-top">
          <div className="search-result-title">
            <h4>{`Showing results for ${
              searchQuery ? `"${searchQuery}"` : ""
            }`}</h4>
          </div>
          <div className="search-result-rigth">
            <div className="search-result-count">{`Found ${length} results`}</div>
          </div>
        </div>
      </section>
      <section className="search-results-container">
        <ul className="search-results">
          {results.map(
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
                onClick={() => handleWatchlist(movie)}
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
