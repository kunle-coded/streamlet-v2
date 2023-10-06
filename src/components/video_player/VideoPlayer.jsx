import React from "react";
import sampleVid from "../../assets/sample-video.mp4";

function VideoPlayer() {
  return (
    <div className="video-player-container">
      <div className="player">
        <video src={sampleVid} width="100%" height="400" controls></video>
      </div>
    </div>
  );
}

export default VideoPlayer;
