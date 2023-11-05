import { useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ModalScreen from "./screens/ModalScreen";
import SearchScreen from "./screens/SearchScreen";
import AboutScreen from "./screens/AboutScreen";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducers/reducer";
import { MoviePage } from "./components";

function Appv2() {
  const [
    {
      movies,
      series,
      slideMovies,
      fast,
      featured,
      trending,
      live,
      watchlist,
      activePoster,
      awardMovies,
      popular,
      fastPage,
      livePage,
      singleMovie,
      likes,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Functions

  // 1- Fetch movies from backend/database
  const fetchMovies = async (endpoint) => {
    try {
      const res = await fetch(`/api/${endpoint}`);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();

      dispatch({ type: endpoint, payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };

  // 2- Add movie to state on click to open single page

  function handleMovieClick(movie) {
    localStorage.setItem("movie", JSON.stringify(movie));
    dispatch({ type: "singleMovie" });
  }

  // Effects - useEffect

  useEffect(() => {
    fetchMovies("movies");
    fetchMovies("series");
    fetchMovies("popular");
    fetchMovies("trending");
    fetchMovies("live");
  }, []);

  // Add movies to state -- slideMovies
  useEffect(() => {
    dispatch({ type: "movieSlides", payload: movies });
    dispatch({ type: "serieSlides", payload: series });
    // Add movies to fast state
    dispatch({ type: "fast", payload: movies });
  }, [movies, series]);

  // console.log(fast);

  useEffect(() => {
    // Add movies to featured state
    const moviesFeatured = [];
    movies.forEach((movie) => {
      if (movie.vote_average >= 7.5) {
        moviesFeatured.push(movie);
        moviesFeatured.sort((a, b) => b.vote_average - a.vote_average);
      }
    });
    dispatch({ type: "featured", payload: moviesFeatured });

    // Add movies to awards state
    const moviesAward = [];
    movies.forEach((movie) => {
      if (movie.popularity >= 1200) {
        moviesAward.push(movie);
        moviesAward.sort((a, b) => b.popularity - a.popularity);
      }
    });
    dispatch({ type: "awards", payload: moviesFeatured });
  }, [movies]);

  useEffect(() => {
    let newPosterToAdd = {};
    featured.forEach((movie, index) => {
      if (index < 1 && !newPosterToAdd.id) {
        newPosterToAdd = { ...movie };
      }
    });
    dispatch({ type: "active", payload: newPosterToAdd });
  }, [featured]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                movies={movies}
                series={series}
                slides={slideMovies}
                watchlist={watchlist}
                active={activePoster}
                awards={awardMovies}
                trending={trending}
                featured={featured}
                popular={popular}
                fastMovies={fast}
                fastPage={fastPage}
                liveMovies={live}
                livePage={livePage}
                onMovieClick={handleMovieClick}
              />
            }
          />

          <Route
            path="movie/:id"
            element={
              <MovieScreen
                movies={movies}
                series={series}
                popular={popular}
                watchlist={watchlist}
                movie={singleMovie}
                likes={likes}
                onMovieClick={handleMovieClick}
              />
            }
          />

          <Route path="login" element={<ModalScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="about" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Appv2;
