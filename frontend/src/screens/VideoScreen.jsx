/* eslint-disable react/prop-types */
import { Footer, Header, Navbar, VideoPlayer } from "../components";

function VideoScreen({ movie, onVideo }) {
  return (
    <div className="video-screen">
      <Header slider={false}>
        <Navbar />
      </Header>

      <VideoPlayer movie={movie} />
      <Footer />
    </div>
  );
}

export default VideoScreen;
