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
}) {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar />
      </Header>
      <MoviePage
        watchlist={watchlist}
        movie={movie}
        popular={popular}
        movies={movies}
        likes={likes}
        onMovieClick={onMovieClick}
      />
      <Footer />
    </div>
  );
}

export default MovieScreen;
