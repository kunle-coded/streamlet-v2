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
import useTrimArrays from "./utils/useTrimArrays";

function App() {
  const [slideMovies, setSlideMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistMov, setWatchlistMov] = useState();
  // const [login, setLogin] = useState(false);

  const url = process.env.API_URL;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
    },
  };

  // Add genres property to movie data using custom hook
  // const trimmedMovieData = useTrimArrays(movieData, 5);
  const trimmedNewMovieData = movieData.slice(5, 10);
  const trimmedPopularMovie = movieData.slice(10, 14);
  const updatedMovieData = useGenreFetcher(useTrimArrays(movieData, 5), genres);
  const updatedNewMovieData = useGenreFetcher(trimmedNewMovieData, genres);
  const updatedPopularMovie = useGenreFetcher(movieData.slice(10, 14), genres);

  useEffect(() => {
    setSlideMovies(updatedMovieData);
    setNewMovies(updatedNewMovieData);
    setPopularMovies(updatedPopularMovie);
  }, []);

  function handleWatchlist(mov) {
    const isMovieInWatchlist = watchlist.some(
      (movie) => movie.title === mov.title
    );

    if (!isMovieInWatchlist) {
      setWatchlist((movies) => [...movies, mov]);
      // setIsWatchlist(true);
    }

    if (isMovieInWatchlist) {
      setWatchlist((movies) =>
        movies.filter((movie) => movie.title !== mov.title)
      );
      // setIsWatchlist(false);
    }
  }

  function handleSlider(e) {
    // const firstElement = e[0];
    // firstElement.style.transform = "translateX(-110%)";
    console.log("slider button clicked", e);
  }

  return (
    <div>
      <Header>
        <Navbar />
        <Slider
          slides={slideMovies}
          onWatchlist={handleWatchlist}
          watchlist={watchlist}
        />
      </Header>
      <Main
        newMovies={newMovies}
        popular={popularMovies}
        onSlide={handleSlider}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
    </div>
  );
}

export default App;
