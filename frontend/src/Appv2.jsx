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
import { Login, LoginForm, Success } from "./components";
import SignupForm from "./components/forms/SignupForm";

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

  const [
    {
      username,
      email,
      password,
      confirmPassword,
      userExists,
      existingEmail,
      status,
    },
    formDispatch,
  ] = useReducer(formReducer, initialFormState);

  // console.log(username);

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

        const data = await res.text();

        if (res.status === 409) {
          formDispatch({ type: "userExists", payload: true });
          formDispatch({ type: "registered", payload: data.userEmail });

          // setSuccessMessage("");
        } else {
          formDispatch({ type: "userExists", payload: false });
          // resetUserData();
          // setSuccessMessage(data);
          // setIsSuccess(true);
          // setIsSignup(false);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (formName === "login") {
      try {
        const res = await fetch("/api/login", postOptions);

        if (res.status === 201) {
          formDispatch({ type: "loggedIn" });
          // setErrorMessage("");
          // closeModal();
        } else {
          const error = await res.text();
          // setErrorMessage(error);
          // setLogin(false);
        }

        // const data = await res.text();
        console.log("form submitted", res);
        // setToken(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

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

          <Route path="/" element={<ModalScreen />}>
            <Route
              path="user/login"
              element={
                <LoginForm
                  email={email}
                  password={password}
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
                />
              }
            />
            <Route path="user/success" element={<Success />} />
          </Route>
          <Route path="search" element={<SearchScreen />} />
          <Route path="about" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Appv2;
