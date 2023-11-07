import { useRef } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ModalScreen from "./screens/ModalScreen";
import SearchScreen from "./screens/SearchScreen";
import AboutScreen from "./screens/AboutScreen";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducers/reducer";
import { initialFormState, formReducer } from "./reducers/formReducer";
import { initialSearchState, searchReducer } from "./reducers/searchReducer";
import { Login, LoginForm, Success } from "./components";
import SignupForm from "./components/forms/SignupForm";
import VideoScreen from "./screens/VideoScreen";

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
      isSlidePoster,
      isDropDown,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [
    {
      username,
      email,
      password,
      confirmPassword,
      loginErrorMessage,
      userExists,
      existingEmail,
      signupSuccessMessage,
      token,
      status,
      userRating,
    },
    formDispatch,
  ] = useReducer(formReducer, initialFormState);

  const [{ query, searchQuery, results, searchStatus }, searchDispatch] =
    useReducer(searchReducer, initialSearchState);

  const navigate = useNavigate();

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

  // form inputs handler functions
  function handleFormInput(input) {
    if (input.name === "Username") {
      formDispatch({ type: "username", payload: input.value });
    }
    if (input.name === "Email") {
      formDispatch({ type: "email", payload: input.value });
      if (existingEmail !== email) {
        formDispatch({ type: "userExists", payload: false });
      }
    }
    if (input.name === "Password") {
      formDispatch({ type: "password", payload: input.value });
      formDispatch({ type: "error", payload: "" });
    }
    if (input.name === "Confirm password") {
      formDispatch({ type: "confirmPassword", payload: input.value });
    }

    // errorMessage("");
  }

  const signupFormData = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupFormData),
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formName = e.target.name;

    if (formName === "signup") {
      if (!(username && email && password)) return;

      try {
        const res = await fetch("/api/signup", postOptions);

        const data = await res.json();

        if (res.status === 409) {
          formDispatch({ type: "userExists", payload: true });
          formDispatch({ type: "registered", payload: data.userEmail });

          // setSuccessMessage("");
        } else {
          formDispatch({ type: "userExists", payload: false });
          formDispatch({ type: "signupSuccessful", payload: data.message });
          navigate("/user/success");
          // resetUserData();
          // setSuccessMessage(data);
          // setIsSuccess(true);
          // setIsSignup(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (formName === "login") {
      try {
        const res = await fetch("/api/login", postOptions);

        if (res.status === 201) {
          formDispatch({ type: "loggedIn" });
          formDispatch({ type: "error", payload: "" });
          navigate(-1);
        } else {
          const error = await res.text();
          formDispatch({ type: "error", payload: error });

          // setLogin(false);
        }

        const data = await res.text();
        formDispatch({ type: "allow", payload: data });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Function to handle movie watchlist
  // Add movies/series to watchlist on click AddWatchlist
  function handleWatchlist(movie) {
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

  // Function to handle movie like
  function handleMovieLike(movie) {
    if (status === "unauthorised") {
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

  // Function to watch video
  function handleVideoPlayer(movie) {
    if (status === "unauthorised") {
      return navigate("/user/login");
    } else {
      const title = movie.title ? movie.title : movie.name;
      navigate(`/video/${movie.id}&${title}`);
    }
  }

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

  // Handling movie search
  function handleSearchQuery(input) {
    searchDispatch({ type: "query", payload: input });
  }

  const searchData = {
    query,
  };

  const searchPostOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchData),
  };

  const searchMovies = async () => {
    try {
      searchDispatch({ type: "searching" });
      const res = await fetch("/api/search", searchPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      const results = data.results;
      searchDispatch({ type: "results", payload: results });
      searchDispatch({ type: "loaded" });
    } catch (err) {
      console.log(err.message);
    }
  };

  const rateMovies = async (id, rating) => {
    if (status === "unauthorised") {
      return navigate("/user/login");
    }

    const ratingData = {
      movieId: id,
      rating: rating,
    };

    const ratingPostOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratingData),
    };

    try {
      const res = await fetch("/api/rating", ratingPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      formDispatch({ type: "rating", payload: data.userRating });
      // setUserRating(data.userRating);
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleSearch() {
    searchMovies();
    searchDispatch({ type: "searchQuery", payload: query });
    searchDispatch({ type: "query", payload: "" });
  }

  function handleCloseDropdown() {
    dispatch({ type: "dropdown" });
  }

  return (
    <div className="app">
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
              onWatchlist={handleWatchlist}
              onVideo={handleVideoPlayer}
              onSlideRight={slideCards}
              onSlideLeft={slideCards}
              dispatch={dispatch}
              isSlidePoster={isSlidePoster}
              status={status}
              searchQuery={query}
              onSearchQuery={handleSearchQuery}
              onSearch={handleSearch}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropDown}
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
              onWatchlist={handleWatchlist}
              onLike={handleMovieLike}
              onVideo={handleVideoPlayer}
              status={status}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropDown}
            />
          }
        />

        <Route path="/" element={<ModalScreen />}>
          <Route
            path="user/login"
            element={
              <LoginForm
                email={email}
                password={password}
                passwordError={loginErrorMessage}
                onFormInput={handleFormInput}
                onFormSubmit={handleFormSubmit}
              />
            }
          />
          <Route
            path="user/signup"
            element={
              <SignupForm
                username={username}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                onFormInput={handleFormInput}
                onFormSubmit={handleFormSubmit}
                isUserExist={userExists}
              />
            }
          />
          <Route
            path="user/success"
            element={
              <Success
                username={username}
                signupSuccess={signupSuccessMessage}
              />
            }
          />
        </Route>
        <Route
          path="video/:id"
          element={
            <VideoScreen onVideo={handleVideoPlayer} movie={singleMovie} />
          }
        />
        <Route
          path="search/:id"
          element={
            <SearchScreen
              movies={results}
              query={query}
              searchQuery={searchQuery}
              watchlist={watchlist}
              userRating={userRating}
              onSearchQuery={handleSearchQuery}
              onSearch={handleSearch}
              isLoading={searchStatus}
              onRate={rateMovies}
              status={status}
              onWatchlist={handleWatchlist}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropDown}
            />
          }
        />
        <Route path="about" element={<AboutScreen />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default Appv2;
