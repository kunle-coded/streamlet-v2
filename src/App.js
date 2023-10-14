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
  const [featured, setFeatured] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activePoster, setActivePoster] = useState({});
  const [posterIsSliding, setPosterIsSliding] = useState(false);
  const [cardIsSliding, setCardIsSliding] = useState(false);
  const [movieCardIsSliding, setMovieCardIsSliding] = useState(false);
  const [seriesCardIsSliding, setSeriesCardIsSliding] = useState(false);
  const [currentPoster, setCurrentPoster] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [currentSerie, setCurrentSerie] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(true);
  const [update, setUpdate] = useState(0);

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

    // Add movies to featured state
    const moviesFeatured = [];

    movies.forEach((movie) => {
      if (movie.vote_average >= 7.5) {
        moviesFeatured.push(movie);
        moviesFeatured.sort((a, b) => b.vote_average - a.vote_average);
      }
    });

    setFeatured((prevFeatured) => [...moviesFeatured]);

    // Add counter prop to popular movies data

    const modifiedPopular = [];
    popular.forEach((movie, index) => {
      const updatedPopular = { ...movie };
      updatedPopular.counter = index;
      modifiedPopular.push(updatedPopular);
    });

    setPopular((popular) => [...modifiedPopular]);
  }, [movies, series]);

  // Add movie to state -- activePoster
  useEffect(() => {
    let newPosterToAdd = {};

    featured.forEach((movie, index) => {
      if (index < 1 && !newPosterToAdd.id) {
        newPosterToAdd = { ...movie };
      }
    });
    setActivePoster((prevPoster) =>
      prevPoster.id !== newPosterToAdd.id ? newPosterToAdd : prevPoster
    );
  }, [movies, update]);

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

  //   Next slide
  function handleNextSlide(stateName) {
    setUpdate((update) => update + 1);
    // next button for trending section
    if (stateName === "trending") {
      setPosterIsSliding(true);
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

    // next button for popular section
    if (stateName === "popular") {
      setCardIsSliding(true);
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

    // next button for featured section
    if (stateName === "featured") {
      let firstEl = [];
      featured.forEach((movie, index) => {
        if (index === 0) {
          firstEl.push(movie);
        }
      });

      setFeatured((featured) => featured.filter((movie, index) => index >= 1));

      if (firstEl.length > 0) {
        setFeatured((featured) => [...featured, ...firstEl]);
      }
    }

    // next button for movies section
    if (stateName === "movies") {
      setMovieCardIsSliding(true);
      let firstEl = [];
      movies.forEach((movie, index) => {
        if (index === 0) {
          firstEl.push(movie);
        }
      });

      setMovies((movies) => movies.filter((movie, index) => index >= 1));

      if (firstEl.length > 0) {
        setMovies((movies) => [...movies, ...firstEl]);
      }
    }
    // next button for movies section
    if (stateName === "series") {
      setSeriesCardIsSliding(true);
      let firstEl = [];
      series.forEach((serie, index) => {
        if (index === 0) {
          firstEl.push(serie);
        }
      });

      setSeries((series) => series.filter((serie, index) => index >= 1));

      if (firstEl.length > 0) {
        setSeries((series) => [...series, ...firstEl]);
      }
    }

    const totalSlides = trending.length - 1;
    setCurrentPoster((slide) => slide + 1);
    if (totalSlides === currentPoster) {
      setPosterIsSliding(false);
      setCurrentPoster(0);
    }

    const totalPopular = popular.length - 1;
    setCurrentCard((popular) => popular + 1);
    if (totalPopular === currentCard) {
      setCardIsSliding(false);
      setCurrentCard(0);
    }

    const totalMovies = movies.length - 1;
    setCurrentMovie((movie) => movie + 1);
    if (totalMovies === currentMovie) {
      setMovieCardIsSliding(false);
      setCurrentMovie(0);
    }

    const totalSeries = series.length - 1;
    setCurrentSerie((serie) => serie + 1);
    if (totalSeries === currentSerie) {
      setSeriesCardIsSliding(false);
      setCurrentSerie(0);
    }
  }

  // Previous slide handler
  const handlePrevSlide = (stateName) => {
    // New release section
    if (stateName === "trending") {
      let lastEl = [];
      const dataLength = trending.length - 1;

      trending.forEach((movie, index) => {
        if (index === dataLength) {
          lastEl.push(movie);
        }
      });

      setTrending((trending) =>
        trending.filter((movie, index) => index < dataLength)
      );

      if (lastEl.length > 0) {
        setTrending((trending) => [...lastEl, ...trending]);
      }
    }

    // popular section
    if (stateName === "popular") {
      let lastEl = [];
      const dataLength = popular.length - 1;

      popular.forEach((movie, index) => {
        if (index === dataLength) {
          lastEl.push(movie);
        }
      });

      setPopular((popular) =>
        popular.filter((movie, index) => index < dataLength)
      );

      if (lastEl.length > 0) {
        setPopular((popular) => [...lastEl, ...popular]);
      }
    }

    // movies section
    if (stateName === "movies") {
      let lastEl = [];
      const dataLength = movies.length - 1;

      movies.forEach((movie, index) => {
        if (index === dataLength) {
          lastEl.push(movie);
        }
      });

      setMovies((movies) =>
        movies.filter((movie, index) => index < dataLength)
      );

      if (lastEl.length > 0) {
        setMovies((movies) => [...lastEl, ...movies]);
      }
    }

    // series section
    if (stateName === "series") {
      let lastEl = [];
      const dataLength = series.length - 1;

      series.forEach((serie, index) => {
        if (index === dataLength) {
          lastEl.push(serie);
        }
      });

      setSeries((series) =>
        series.filter((serie, index) => index < dataLength)
      );

      if (lastEl.length > 0) {
        setSeries((series) => [...lastEl, ...series]);
      }
    }
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
        movies={movies}
        trending={trending}
        active={activePoster}
        series={series}
        popular={popular}
        featured={featured}
        onSlideRight={handleNextSlide}
        onSlideLeft={handlePrevSlide}
        isSlidePoster={posterIsSliding}
        isSlideCard={cardIsSliding}
        isSlideMovies={movieCardIsSliding}
        isSlideSeries={seriesCardIsSliding}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer />
    </div>
  );
}

export default App;
