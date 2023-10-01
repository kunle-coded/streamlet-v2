import React from "react";
import Buttons from "../buttons/Buttons";
import Genre from "../genres/Genre";

function Slide({
  watchlist,
  movie,
  index,
  currentSlide,
  onWatchlist,
  isWatchlist,
  onWatchlistMark,
  children,
}) {
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
        <div className="slide-movie-tag">Movie</div>
        <div className="slide-movie-title">
          <h3>{movie.title}</h3>
        </div>
        <Genre movie={movie} duration={true} year={true} />
        <div className="slide-movie-desc">{movie.overview}</div>
        <div className="slide-movie-buttons">
          <Buttons
            width="150px"
            height="35px"
            background="#00925d"
            border={false}
            borderRadius="9px"
            color="#fff"
          >
            <span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0C3.35625 0 0 3.35625 0 7.5C0 11.6438 3.35625 15 7.5 15C11.6438 15 15 11.6438 15 7.5C15 3.35625 11.6438 0 7.5 0ZM5.625 3.75L11.25 7.5L5.625 11.25V3.75Z"
                  fill="white"
                />
              </svg>
            </span>{" "}
            Watch Trailer
          </Buttons>
          <Buttons
            btnMovie={movie}
            watchlistMovie={watchlist}
            width="150px"
            height="35px"
            borderRadius="9px"
            onClick={() => onWatchlist(movie)}
          >
            <span>
              <svg
                className=""
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill={isWatchlist ? "#fff" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 16V2.66667C1 1.74619 1.74619 1 2.66667 1H11C11.9205 1 12.6667 1.74619 12.6667 2.66667V16L7.73458 12.8294C7.18558 12.4764 6.48108 12.4764 5.93208 12.8294L1 16Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>{" "}
            Add Watchlist
          </Buttons>
        </div>
      </div>
    </div>
  );
}

export default Slide;
