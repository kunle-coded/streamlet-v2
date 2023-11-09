/* eslint-disable react/prop-types */
import { Footer, Header, Navbar, VideoPlayer } from "../components";

function VideoScreen() {
  return (
    <div className="video-screen">
      <Header slider={false}>
        <Navbar />
      </Header>

      <VideoPlayer />
      <Footer />
    </div>
  );
}

export default VideoScreen;
