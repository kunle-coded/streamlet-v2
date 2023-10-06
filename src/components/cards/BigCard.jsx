import React from "react";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";

function BigCard({ movie }) {
  const imgStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w300/${movie.backdrop_path})`,
  };

  const title = movie.title ? movie.title : movie.name;

  return (
    <div className="big-card">
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
            <Rating>{parseFloat(movie.vote_average.toFixed(1))}</Rating>
            <Genre movie={movie} genre={true} label={false} divider={true} />
          </RatingLabel>
        </div>
      </div>
    </div>
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
