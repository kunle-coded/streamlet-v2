import React, { useEffect, useState } from "react";
import "./App.css";

import {
  Footer,
  Genre,
  Header,
  Main,
  Navbar,
  Rating,
  RatingLabel,
  Slider,
} from "./components";
import genres from "./genres";
import tvGenres from "./tvGenres";
import useTrimArrays from "./utils/useTrimArrays";

function App() {
  const [slideMovies, setSlideMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistMov, setWatchlistMov] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/movies");

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();

        // setSlideMovies(data);
        setMovies(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchSeries = async () => {
      try {
        const res = await fetch("/series");

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();

        setSeries(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (login) {
      fetchMovies();
      fetchSeries();
      console.log("series>>", series);
    }

    const randomInteger = Math.floor(Math.random() * (60 - 0)) + 0;

    // for (let i = 0; i < 10; i++) {
    //   const movie = movies[randomInteger];
    //   console.log("movies slide", movie);
    //   setSlideMovies((movies) => [...movies, movie]);

    //   console.log(slideMovies);
    // }

    // for (let j = 0; j <= series.length; j++) {
    //   const serie = series[randomInteger];
    //   console.log(serie);
    //   if (j < 10) {
    //     setSlideMovies((movies) => [...movies, serie]);
    //   }
    // }
  }, [login]);

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
          slides={movies}
          onWatchlist={handleWatchlist}
          watchlist={watchlist}
        />
      </Header>
      {/* <Main
        newMovies={newMovies}
        series={series}
        popular={popularMovies}
        onSlide={handleSlider}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer /> */}
    </div>
  );
}

export default App;
