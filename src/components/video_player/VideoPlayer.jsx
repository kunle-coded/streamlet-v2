import React, { useEffect } from "react";
import Buttons from "../buttons/Buttons";

function VideoPlayer({ movie, onClose }) {
  const title = movie ? movie.title : null;
  const url = movie ? movie.video_url[0] : null;

  useEffect(() => {
    document.title = `Streamlet - ${movie.title ? movie.title : movie.name}`;

    return () => {
      document.title = "Streamlet";
    };
  }, [movie]);

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
        <Buttons width="100px" color="#9ca4ab" onClick={onClose}>
          Close video
        </Buttons>
      </div>
    </main>
  );
}

export default VideoPlayer;
