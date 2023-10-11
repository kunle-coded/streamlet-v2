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
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activePoster, setActivePoster] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(true);

  const fetchMovies = async (endpoint, setter) => {
    try {
      const res = await fetch(`/${endpoint}`);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();

      setter(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (login) {
      fetchMovies("movies", setMovies);
      fetchMovies("series", setSeries);
      fetchMovies("popular", setPopular);
      fetchMovies("trending", setTrending);
    }
  }, [login]);

  useEffect(() => {
    // Add movies to state -- slideMovies
    const newMoviesToAdd = [];

    movies.forEach((movie, ind) => {
      if (
        ind < 10 &&
        !slideMovies.some((slideItem) => slideItem.title === movie.title)
      ) {
        newMoviesToAdd.push(movie);
      }
    });

    setSlideMovies((slides) => [...slides, ...newMoviesToAdd]);

    // Add series to state -- slideMovies
    const newSeriesToAdd = [];

    series.forEach((serie, ind) => {
      if (
        ind < 10 &&
        !slideMovies.some((slideItem) => slideItem.name === serie.name)
      ) {
        newSeriesToAdd.push(serie);
      }
    });

    setSlideMovies((slides) => [...slides, ...newSeriesToAdd]);

    // Add movie to state -- activePoster
    const newPosterToAdd = [];

    popular.forEach((movie, ind) => {
      if (
        ind < 1 &&
        !activePoster.some((slideItem) => slideItem.title === movie.title)
      ) {
        newPosterToAdd.push(movie);
      }
    });

    setActivePoster([...newPosterToAdd]);
  }, [movies, series]);

  // Add movies/series to watchlist on click AddWatchlist
  function handleWatchlist(mov) {
    const isMovieInWatchlist = watchlist.some((movie) => movie._id === mov._id);

    if (!isMovieInWatchlist) {
      setWatchlist((movies) => [...movies, mov]);
    }

    if (isMovieInWatchlist) {
      setWatchlist((movies) => movies.filter((movie) => movie._id !== mov._id));
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
        trending={trending}
        active={activePoster}
        series={series}
        popular={popular}
        onSlide={handleSlider}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer />
    </div>
  );
}

export default App;
