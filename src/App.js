import React, { useEffect, useState } from "react";
import "./App.css";

import {
  Genre,
  Header,
  Main,
  Navbar,
  Rating,
  RatingLabel,
  Slider,
} from "./components";
import movieData from "./data";
import genres from "./genres";
import useGenreFetcher from "./utils/useGenreFetcher";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState(movieData.slice(5, 10));
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

  // Add genres property to movie data using custom hook
  const updatedMovieData = useGenreFetcher(movieData.slice(0, 5), genres);
  useEffect(() => {
    setMovies(updatedMovieData);
  }, []);

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

  // console.log(useGenreFetcher(movies, genres));

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
      <Main newMovies={movies} />
    </div>
  );
}

export default App;
