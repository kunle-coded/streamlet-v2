/* eslint-disable react/prop-types */
import React from "react";
import Buttons from "../buttons/Buttons";
import Genre from "../genres/Genre";
import useWatchlistMarker from "../../utils/useWatchlistMarker";
import { Link, useNavigate } from "react-router-dom";
import { useMovies } from "../../contexts/MoviesContext";
import { useForms } from "../../contexts/FormContext";

function Slide({ movie, type, index, currentSlide, slider = true }) {
  const { watchlist, handleMovieClick, handleWatchlist, handleVideoPlayer } =
    useMovies();
  const { status } = useForms();
  const navigate = useNavigate();

  let watchlisted = useWatchlistMarker(watchlist, movie);
  const title = movie.title ? movie.title : movie.name;
  const duration = movie.title ? true : false;

  function handleClick(e, slide) {
    if (!slider) return;

    handleMovieClick(slide);
    const title = movie.title ? movie.title : movie.name;

    if (e.target.name === "slide") {
      return;
    }

    navigate(
      `/movie/${movie.id}&${decodeURIComponent(title).replace(/ /g, "-")}`
    );
  }

  return (
    <div
      className={`slide ${index === currentSlide ? "active" : ""}`}
      onClick={(e) => handleClick(e, movie)}
      style={{ cursor: slider ? "pointer" : "" }}
    >
      <div className="slide-overlay"></div>

      <div
        className="slide-image"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      ></div>

      <div className="slide-text-area">
        <div className="slide-movie-tag">{type}</div>
        <div className="slide-movie-title">
          <h3>{title}</h3>
        </div>
        <Genre movie={movie} duration={duration} year={true} />
        {slider ? (
          <div className="slide-movie-desc">{movie.overview}</div>
        ) : null}
        <div className="slide-movie-buttons">
          <Buttons
            name="slide"
            play={true}
            width="150px"
            height="35px"
            background="#00925d"
            border={false}
            borderRadius="9px"
            color="#fff"
            onClick={() => handleVideoPlayer(movie, status)}
          >
            Watch Trailer
          </Buttons>
          <Buttons
            name="slide"
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
    </div>
  );
}

export default Slide;
