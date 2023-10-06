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
  const [series, setSeries] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistMov, setWatchlistMov] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [login, setLogin] = useState(false);

  // Add genres array to movie data
  function genreFetcher(movieData, genres) {
    if (!movieData && !genres) return;

    const updatedMovieData = movieData.map((movie) => {
      const genreArr = movie.genre_ids;
      const movieGenres = [];
      genres.forEach((genre) => {
        for (let i = 0; i < genreArr.length; i++) {
          const genreId = genreArr[i];

          if (genre.id === genreId) {
            movieGenres.push(genre.name);
          }
        }
      });

      return {
        ...movie,
        genres: movieGenres,
      };
    });

    return updatedMovieData;
  }

  // Fetch movies from API

  const moviesUrl =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false";
  const seriesUrl =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
  const newMoviesUrl =
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDM4MWM1OWVkNzRjNjFjYWZiYWFhOTNmNGQzNWQ4YiIsInN1YiI6IjY1MTRhZmQ1OTNiZDY5MDBjNGRkNzU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GhwpTStMYW2hzXUGDTIpNQhgx5xtXLikDtso5HasjTc`,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(moviesUrl, options);

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();

        const updatedMovieData = genreFetcher(data.results, genres);
        setSlideMovies(updatedMovieData);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    // Fetch series
    const fetchSeries = async () => {
      try {
        const res = await fetch(seriesUrl, options);

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();
        const updatedSerieData = genreFetcher(data.results, tvGenres);
        setSeries(updatedSerieData);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    };

    fetchSeries();

    // Fetch new movies

    const fetchNewMovies = async () => {
      try {
        const res = await fetch(newMoviesUrl, options);

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();
        const updatedData = genreFetcher(data.results, genres);
        setNewMovies(updatedData);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    };

    fetchNewMovies();

    // Fetch popular movies

    const fetchPopularMovies = async () => {
      try {
        const res = await fetch(popularMoviesUrl, options);

        if (!res.ok) {
          throw new Error("Failed to load movies, please retry!");
        }

        const data = await res.json();
        const updatedData = genreFetcher(data.results, genres);
        setPopularMovies(updatedData);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    };

    fetchPopularMovies();
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
        series={series}
        popular={popularMovies}
        onSlide={handleSlider}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer />
    </div>
  );
}

export default App;
