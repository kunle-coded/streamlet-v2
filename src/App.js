import React, { useEffect, useState } from "react";
import "./App.css";

import { Header, Navbar, Slider } from "./components";
import movieData from "./data";

function App() {
  const [movies, setMovies] = useState(movieData.slice(0, 5));
  const [watchlist, setWatchlist] = useState([]);
  const [login, setLogin] = useState(false);

  const url = process.env.API_URL;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
    },
  };

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

  console.log(movies);

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
