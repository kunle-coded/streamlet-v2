import React from "react";
import Buttons from "../buttons/Buttons";
import Genre from "../genres/Genre";
import useWatchlistMarker from "../../utils/useWatchlistMarker";

function Slide({
  watchlist,
  movie,
  type,
  index,
  currentSlide,
  silder = true,
  onWatchlist,
}) {
  let watchlisted = useWatchlistMarker(watchlist, movie);
  const title = movie.title ? movie.title : movie.name;

  return (
    <div className={`slide ${index === currentSlide ? "active" : ""}`}>
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
        <Genre movie={movie} duration={true} year={true} />
        {silder ? (
          <div className="slide-movie-desc">{movie.overview}</div>
        ) : null}
        <div className="slide-movie-buttons">
          <Buttons
            play={true}
            width="150px"
            height="35px"
            background="#00925d"
            border={false}
            borderRadius="9px"
            color="#fff"
          >
            Watch Trailer
          </Buttons>
          <Buttons
            bookmark={true}
            watchlisted={watchlisted}
            width="150px"
            height="35px"
            borderRadius="9px"
            onClick={() => onWatchlist(movie)}
          >
            Add Watchlist
          </Buttons>
        </div>
      </div>
    </div>
  );
}

export default Slide;
