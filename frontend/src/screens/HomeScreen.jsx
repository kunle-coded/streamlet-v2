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
}) {
  return (
    <div className="app">
      <Header>
        <Navbar />
        <Slider slides={slides} watchlist={watchlist} />
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
      />
      <Footer />
    </div>
  );
}

export default HomeScreen;
