import React, { useState } from "react";
import "./App.css";
import { Header, Navbar, Slider } from "./components";
import movieData from "./data";

function App() {
  const [movies, setMovies] = useState(movieData);
  const [watchlist, setWatchlist] = useState([]);
  const [login, setLogin] = useState(false);

  function handleWatchlist(mov) {
    const isMovieInWatchlist = watchlist.some(
      (movie) => movie.title === mov.title
    );

    if (!isMovieInWatchlist) {
      setWatchlist((movies) => [...movies, mov]);
    }

    if (isMovieInWatchlist) {
      setWatchlist((movies) =>
        movies.filter((movie) => movie.title !== mov.title)
      );
    }
  }

  return (
    <div>
      <Header>
        <Navbar />
        <Slider
          slides={movies}
          onWatchlist={handleWatchlist}
          watchlist={watchlist}
        />
      </Header>
    </div>
  );
}

export default App;
