/* eslint-disable react/prop-types */
import React from "react";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";
import { Link } from "react-router-dom";

function BigCard({ movie, onMovieClick }) {
  const title = movie.title ? movie.title : movie.name;
  const rating = parseFloat(movie.vote_average.toFixed(1));

  return (
    <Link
      to={`/movie/${movie.id}&${decodeURIComponent(movie.title).replace(
        / /g,
        "-"
      )}`}
    >
      <div className="big-card" onClick={() => onMovieClick(movie)}>
        <div className="big-card_image">
          <img
            src={`https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`}
            alt=""
          />
        </div>
        <div className="big-card_text">
          <div className="big-card_title">
            <h3>{title}</h3>
          </div>
          <div className="big-card_label">
            <RatingLabel>
              <Rating>{rating}</Rating>
              <Genre movie={movie} genre={true} label={false} divider={true} />
            </RatingLabel>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BigCard;

// {popular.map((movie) => (
//     <Card
//       key={movie.id}
//       movie={movie}
//       orientation={true}
//       imgWidth="100%"
//       showLabel={false}
//       // height="100%"
//     />
//   ))}
