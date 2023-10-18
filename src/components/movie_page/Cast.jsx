import React from "react";
import castImg from "../../assets/img/fast-x.jpeg";

function Cast({ name, castName }) {
  return (
    <div className="movie-cast">
      <div className="cast-image">
        <img src={castImg} alt="actor" />
      </div>
      <div className="cast-name">
        <p className="cast-realname">{name}</p>
        <p className="cast-alias"> {castName}</p>
      </div>
    </div>
  );
}

export default Cast;
