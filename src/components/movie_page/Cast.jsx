import React from "react";

function Cast({ name, imgUrl, character }) {
  // const castName = character ? character.split("(")[0].join(" ") : character;
  const castName = character ? character.split("(").slice(0, 1).join(" ") : "";
  const updatedCharName = castName
    ? castName.split("/").slice(0, 1).join(" ")
    : "";

  return (
    <div className="movie-cast">
      <div className="cast-image">
        <img src={`https://image.tmdb.org/t/p/w45${imgUrl}`} alt="actor" />
      </div>
      <div className="cast-name">
        <p className="cast-realname">{name}</p>
        <p className="cast-alias"> {updatedCharName}</p>
      </div>
    </div>
  );
}

export default Cast;
