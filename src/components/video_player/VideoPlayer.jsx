import React from "react";
import sampleVid from "../../assets/sample-video.mp4";

function VideoPlayer() {
  return (
    <div className="video-player-container">
      <div className="player">
        <iframe
          width="951"
          height="535"
          src="https://www.youtube.com/embed/HF8BcUBUBb4"
          title="Taking On AI | Mission: Impossible – Dead Reckoning Part One - Tom Cruise"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default VideoPlayer;
