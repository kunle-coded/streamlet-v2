/* eslint-disable react/prop-types */
import { Footer, Header, Main, Navbar, Slider } from "../components";

function HomeScreen({
  movies,
  slides,
  watchlist,
  series,
  active,
  featured,
  trending,
  popular,
  awards,
  fastMovies,
  fastPage,
  liveMovies,
  livePage,
  onMovieClick,
  onWatchlist,
  onVideo,
  status,
  isSlide,
  dispatch,
}) {
  return (
    <div className="app">
      <Header>
        <Navbar isLogin={status} />
        <Slider
          slides={slides}
          watchlist={watchlist}
          onMovieClick={onMovieClick}
          onWatchlist={onWatchlist}
          onVideo={onVideo}
        />
      </Header>
      <Main
        movies={movies}
        watchlist={watchlist}
        series={series}
        trending={trending}
        popular={popular}
        active={active}
        awards={awards}
        featured={featured}
        fastMovies={fastMovies}
        fastPage={fastPage}
        liveMovies={liveMovies}
        livePage={livePage}
        onMovieClick={onMovieClick}
        onWatchlist={onWatchlist}
        onVideo={onVideo}
      />
      <Footer />
    </div>
  );
}

export default HomeScreen;
