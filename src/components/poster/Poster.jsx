import React from "react";
import "./poster.css";
import fastX from "../../assets/img/fast-x.jpeg";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Genre from "../genres/Genre";

function Poster({ movie }) {
  return (
    <div className="movie-poster">
      <div className="poster-overlay"></div>
      <div className="poster-image">
        <img src={fastX} alt="" />
      </div>
      <div className="poster-info">
        <div className="poster-title"> Fast X</div>
        <div className="poster-label">
          <RatingLabel>
            <Rating>4.6</Rating>
            <Genre>
              <p>Action</p>
              <p>Crime</p>
            </Genre>
          </RatingLabel>
        </div>
      </div>
    </div>
  );
}
export default Poster;
