/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { initialFormState, formReducer } from "../reducers/formReducer";
import { useNavigate } from "react-router-dom";
import { useForms } from "./FormContext";

const MovieContext = createContext();

function MoviesProvider({ children }) {
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
      isSlidePoster,
      isDropDown,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const navigate = useNavigate();

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

  // 3- Add movie to watchlist
  function handleWatchlist(movie, status) {
    if (status === "unauthorised") {
      return navigate("/user/login");
    }

    const isMovieInWatchlist = watchlist.some(
      (watchlistMovie) => watchlistMovie._id === movie._id
    );

    if (!isMovieInWatchlist) {
      dispatch({ type: "watchlist", payload: movie });
    }

    if (isMovieInWatchlist) {
      dispatch({ type: "watchlisted", payload: movie });
    }
  }

  // 4- Add movie to likes
  function handleMovieLike(movie, status) {
    if (status === "unauthorised") {
      console.log("status>>", status);
      return navigate("/user/login");
    }

    const isAlreadyLiked = likes.some((likedItem) => likedItem.id === movie.id);

    if (isAlreadyLiked) {
      // Remove the movie from likedMovies
      dispatch({ type: "liked", payload: movie });
    } else {
      // Add the movie to likedMovies
      dispatch({ type: "likes", payload: movie });
    }
  }

  // 5- Watch video on movie click
  function handleVideoPlayer(movie, status) {
    if (status === "unauthorised") {
      return navigate("/user/login");
    } else {
      const title = movie.title ? movie.title : movie.name;
      navigate(`/video/${movie.id}&${title}`);
    }
  }

  //   6- Slide movie card on arrow button click
  let currentIndex = 0;

  function slideCards(cardList, direction) {
    const cards = cardList.childNodes;
    const cardWidth = cards[0].offsetWidth;
    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = cards.length - 4;
    } else if (currentIndex >= cards.length - 3) {
      currentIndex = 0;
    }
    const translateX = -currentIndex * cardWidth;
    cardList.style.transform = `translateX(${translateX}px)`;
  }

  //   7- Close/Open dropdown menu
  function onCloseDropdown() {
    dispatch({ type: "dropdown" });
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

  const contextValues = {
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
    isSlidePoster,
    isDropDown,
    handleMovieClick,
    handleWatchlist,
    handleMovieLike,
    handleVideoPlayer,
    slideCards,
    onCloseDropdown,
    dispatch,
  };

  return (
    <MovieContext.Provider value={contextValues}>
      {children}
    </MovieContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MovieContext);

  if (context === undefined)
    throw new Error("MovieContext was used out of the MovieProvider");
  return context;
}

export { MoviesProvider, useMovies };
