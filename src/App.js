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
  const [isSliding, setIsSliding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
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

    // Add counter prop to popular movies data

    const modifiedPopular = [];
    popular.forEach((movie, index) => {
      const updatedPopular = { ...movie };
      updatedPopular.counter = index;
      modifiedPopular.push(updatedPopular);
    });

    setPopular((popular) => [...modifiedPopular]);
    // console.log(modifiedPopular);
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

  //   Next slide
  function handleNextSlide(stateName) {
    setIsSliding(true);

    if (stateName === "trending") {
      let firstEl = [];
      trending.forEach((movie, index) => {
        if (index === 0) {
          firstEl.push(movie);
        }
      });

      setTrending((trending) => trending.filter((movie, index) => index >= 1));

      if (firstEl.length > 0) {
        setTrending((trending) => [...trending, ...firstEl]);
      }
    }

    if (stateName === "popular") {
      let firstEl = [];
      popular.forEach((movie, index) => {
        if (index === 0) {
          firstEl.push(movie);
        }
      });

      setPopular((popular) => popular.filter((movie, index) => index >= 1));

      if (firstEl.length > 0) {
        setPopular((popular) => [...popular, ...firstEl]);
      }
    }
    const totalSlides = trending.length - 1;

    setCurrentSlide((slide) => slide + 1);

    if (totalSlides === currentSlide) {
      setIsSliding(false);
      setCurrentSlide(0);
    }
  }

  // Previuos slide
  const handlePrevSlide = (slides) => {
    // let totalSlides = slides.length;
    // setCurrentSlide((prevSlide) =>
    //   prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    // );
    console.log("button left clicked", slides.length);
  };

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
        onSlideRight={handleNextSlide}
        onSlideLeft={handlePrevSlide}
        isSlide={isSliding}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer />
    </div>
  );
}

export default App;
