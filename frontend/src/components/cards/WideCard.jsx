/* eslint-disable react/prop-types */
import React from "react";
// import sampleImg from "../../assets/img/last-of-us.png";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";
import TextReveal from "../text_reveal/TextReveal";
import Buttons from "../buttons/Buttons";
import useWatchlistMarker from "../../utils/useWatchlistMarker";
import { Link } from "react-router-dom";
import { useMovies } from "../../contexts/MoviesContext";

function WideCard({ movie }) {
  const { watchlist, handleMovieClick, handleWatchlist, handleVideoPlayer } =
    useMovies();

  let watchlisted = useWatchlistMarker(watchlist, movie);

  const title = movie.title ? movie.title : movie.name;

  return (
    <div
      className="wide-card-container"
      onClick={() => handleMovieClick(movie)}
    >
      <Link
        to={`/movie/${movie.id}&${decodeURIComponent(title).replace(
          / /g,
          "-"
        )}`}
        className="wide-link"
      >
        <div className="wide-card-wrapper">
          <div className="wide-card-img">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
              alt="movie poster"
            />
          </div>
          <div className="wide-card-text">
            <div className="wide-card-tag">Movie</div>
            <div className="wide-card-title">
              <h3>{movie.title}</h3>
            </div>
            <div className="wide-card-label">
              <RatingLabel>
                <Rating>{movie.vote_average}</Rating>
                <Genre
                  movie={movie}
                  genre={true}
                  label={false}
                  divider={true}
                  duration={true}
                  year={true}
                />
              </RatingLabel>
            </div>
            <div className="wide-card-overview">
              <TextReveal>{movie.overview}</TextReveal>
            </div>
          </div>
        </div>
      </Link>
      <div className="wide-card-buttons">
        <Buttons
          play={true}
          width="150px"
          height="35px"
          background="#00925d"
          border={false}
          borderRadius="9px"
          color="#fff"
          onClick={() => handleVideoPlayer(movie)}
        >
          Play Now
        </Buttons>
        <Buttons
          bookmark={true}
          watchlisted={watchlisted}
          width="150px"
          height="35px"
          borderRadius="9px"
          onClick={() => handleWatchlist(movie)}
        >
          Add Watchlist
        </Buttons>
      </div>
    </div>
  );
}

export default WideCard;
