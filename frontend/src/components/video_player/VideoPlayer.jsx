/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Buttons from "../buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../contexts/MoviesContext";

function VideoPlayer() {
  const { singleMovie } = useMovies();
  const navigate = useNavigate();

  const title = singleMovie ? singleMovie.title : null;
  const url = singleMovie ? singleMovie.video_url[0] : null;

  useEffect(() => {
    document.title = `Streamlet - ${
      singleMovie.title ? singleMovie.title : singleMovie.name
    }`;

    return () => {
      document.title = "Streamlet";
    };
  }, [singleMovie]);

  return (
    <main className="video-page">
      <div className="video-player-container">
        <div className="player">
          <iframe
            width="100%"
            height="535"
            src={`https://www.youtube.com/embed/${url}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
            allowFullScreen
          ></iframe>
        </div>
        <Buttons width="100px" color="#9ca4ab" onClick={() => navigate(-1)}>
          Close video
        </Buttons>
      </div>
    </main>
  );
}

export default VideoPlayer;
