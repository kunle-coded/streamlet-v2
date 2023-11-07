/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { Footer, Header, MoviePage, Navbar } from "../components";

function MovieScreen({
  movies,
  series,
  movie,
  popular,
  watchlist,
  likes,
  onMovieClick,
  onWatchlist,
  onLike,
  onVideo,
  status,
}) {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar isLogin={status} />
      </Header>
      <MoviePage
        watchlist={watchlist}
        movie={movie}
        popular={popular}
        movies={movies}
        series={series}
        likes={likes}
        onMovieClick={onMovieClick}
        onWatchlist={onWatchlist}
        onLike={onLike}
        onVideo={onVideo}
      />
      <Footer />
    </div>
  );
}

export default MovieScreen;
