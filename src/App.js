import React, { useEffect, useState } from "react";
import "./App.css";

import {
  Footer,
  Genre,
  Header,
  Loader,
  Login,
  Main,
  MoviePage,
  Navbar,
  Rating,
  RatingLabel,
  Search,
  Slider,
  VideoPlayer,
} from "./components";

function App() {
  const [slideMovies, setSlideMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [moviesOnAwards, setMoviesOnAwards] = useState([]);
  const [fast, setFast] = useState([]);
  const [live, setLive] = useState([]);
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
  const [fastCard, setFastCard] = useState({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
    page5: false,
    page6: false,
  });
  const [liveCard, setLiveCard] = useState({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
    page5: false,
    page6: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [update, setUpdate] = useState(0);
  const [fastCounter, setFastCounter] = useState(4);
  const [liveCounter, setLiveCounter] = useState(4);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [existingEmail, setExistingEmail] = useState("");
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isPageTop, setIsPageTop] = useState(false);
  const [singleMovie, setSingleMovie] = useState({});
  const [likedMovies, setLikedMovies] = useState([]);
  // const [isLike, setIsLike] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [singleVideo, setSingleVideo] = useState({});
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userRating, setUserRating] = useState([]);

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
    fetchMovies("movies", setMovies);
    fetchMovies("series", setSeries);
    fetchMovies("popular", setPopular);
    fetchMovies("trending", setTrending);
    fetchMovies("live", setLive);
  }, []);

  useEffect(() => {
    // Add movies to state -- slideMovies
    const newMoviesToAdd = [];

    movies.forEach((movie, ind) => {
      if (
        ind < 5 &&
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
        ind < 5 &&
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
    // console.log(featured);

    // Add movies to awards state
    const moviesAward = [];

    movies.forEach((movie) => {
      if (movie.popularity >= 1200) {
        moviesAward.push(movie);
        moviesAward.sort((a, b) => b.popularity - a.popularity);
      }
    });
    setMoviesOnAwards((prevAward) => [...prevAward, ...moviesAward]);

    // Add movies to fast state
    const fastMovies = [];

    movies.forEach((movie) => {
      if (
        movie.genres &&
        !fast.some((fastMovie) => fastMovie.name === movie.name)
      ) {
        const movieGenres = movie.genres;
        movieGenres.forEach((genre) => {
          if (genre.name === "Thriller") {
            fastMovies.push(movie);
          }
        });
      }
    });
    setFast((prevFast) => [...prevFast, ...fastMovies]);

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
  }, [movies, update, featured]);

  // Add movies/series to watchlist on click AddWatchlist
  function handleWatchlist(mov) {
    if (!login) {
      openLoginModal();
      return;
    }
    const isMovieInWatchlist = watchlist.some((movie) => movie._id === mov._id);

    if (!isMovieInWatchlist) {
      setWatchlist((movies) => [...movies, mov]);
    }

    if (isMovieInWatchlist) {
      setWatchlist((movies) => movies.filter((movie) => movie._id !== mov._id));
    }
  }

  useEffect(() => {
    const updateFastPage = () => {
      // page 1
      if (fastCounter <= 4) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: true,
          page2: false,
          page3: false,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 2
      if (fastCounter > 4 && fastCounter <= 8) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: true,
          page3: false,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 3
      if (fastCounter > 8 && fastCounter <= 12) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: true,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 4
      if (fastCounter > 12 && fastCounter <= 16) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: false,
          page4: true,
          page5: false,
          page6: false,
        }));
      }
      // page 5
      if (fastCounter > 16 && fastCounter <= 20) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: false,
          page4: false,
          page5: true,
          page6: false,
        }));
      }
      // page 6
      if (fastCounter > 20 && fastCounter <= 24) {
        setFastCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: false,
          page4: false,
          page5: false,
          page6: true,
        }));
      }
    };

    updateFastPage();
  }, [fastCounter]);

  // Live page update on button next click
  useEffect(() => {
    const updateLivePage = () => {
      // page 1
      if (liveCounter <= 4) {
        setLiveCard((prevState) => ({
          ...prevState,
          page1: true,
          page2: false,
          page3: false,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 2
      if (liveCounter > 4 && liveCounter <= 8) {
        setLiveCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: true,
          page3: false,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 3
      if (liveCounter > 8 && liveCounter <= 12) {
        setLiveCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: true,
          page4: false,
          page5: false,
          page6: false,
        }));
      }

      // page 4
      if (liveCounter > 12 && liveCounter <= 16) {
        setLiveCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: false,
          page4: true,
          page5: false,
          page6: false,
        }));
      }
      // page 5
      if (liveCounter > 16 && liveCounter <= 20) {
        setLiveCard((prevState) => ({
          ...prevState,
          page1: false,
          page2: false,
          page3: false,
          page4: false,
          page5: true,
          page6: false,
        }));
      }
    };

    updateLivePage();
  }, [liveCounter]);

  //   Next button slider handler
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

    // next button for awards section
    if (stateName === "awards") {
      let firstEl = [];
      moviesOnAwards.forEach((movie, index) => {
        if (index === 0) {
          firstEl.push(movie);
        }
      });

      setMoviesOnAwards((movies) =>
        movies.filter((movie, index) => index >= 1)
      );

      if (firstEl.length > 0) {
        setMoviesOnAwards((movies) => [...movies, ...firstEl]);
      }
    }

    // next button for fast section
    if (stateName === "fast") {
      const fastLength = fast.length;

      setFastCounter((count) => count + 4);

      if (fastCounter === fastLength) {
        setFastCounter(4);
      }
    }

    // next button for live section
    if (stateName === "live") {
      const liveLength = live.length;

      setLiveCounter((count) => count + 4);

      if (liveCounter === liveLength) {
        setLiveCounter(4);
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

    // awards section
    if (stateName === "awards") {
      let lastEl = [];
      const dataLength = moviesOnAwards.length - 1;

      moviesOnAwards.forEach((movie, index) => {
        if (index === dataLength) {
          lastEl.push(movie);
        }
      });

      setMoviesOnAwards((movies) =>
        movies.filter((movie, index) => index < dataLength)
      );

      if (lastEl.length > 0) {
        setMoviesOnAwards((movies) => [...lastEl, ...movies]);
      }
    }

    // fast section
    if (stateName === "fast") {
      const fastLength = fast.length;

      setFastCounter((count) => count - 4);

      if (fastCounter === 4) {
        setFastCounter(24);
      }
    }

    // live section
    if (stateName === "live") {
      const liveLength = live.length - 1;

      setLiveCounter((count) => count - 4);

      if (liveCounter === 4) {
        setLiveCounter(20);
      }
    }
  };

  // form handler functions
  function handleForm(input) {
    if (input.name === "Username") {
      setUsername(input.value);
    }
    if (input.name === "Email") {
      setUserEmail(input.value);
      if (existingEmail !== userEmail) {
        setUserExist(false);
      }
    }
    if (input.name === "Password") {
      setUserPassword(input.value);
    }
    if (input.name === "Confirm password") {
      setConfirmPassword(input.value);
    }

    setErrorMessage("");
  }

  function closeModal() {
    setIsLogin(false);
    setIsSignup(false);
    setIsSuccess(false);
    setIsModal(false);
    resetUserData();
  }

  function openLoginModal(e) {
    //e.preventDefault();
    setIsSignup(false);
    setIsSuccess(false);
    setIsModal(true);
    setIsLogin(true);
  }
  function openSignupModal(e) {
    e.preventDefault();
    setIsLogin(false);
    setIsModal(true);
    setIsSignup(true);
  }

  const signupFormData = {
    username: username,
    email: userEmail,
    password: userPassword,
    confirmPassword: confirmPassword,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupFormData),
  };

  function resetUserData() {
    setUserEmail("");
    setUsername("");
    setUserPassword("");
    setConfirmPassword("");
    setSuccessMessage("");
    setErrorMessage("");
    setUserExist(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formName = e.target.name;

    if (formName === "signup") {
      if (!(username && userEmail && userPassword)) return;

      try {
        const res = await fetch("/signup", postOptions);

        const data = await res.text();

        if (res.status === 409) {
          setUserExist(true);
          setExistingEmail(data.userEmail);
          setSuccessMessage("");
        } else {
          setUserExist(false);
          // resetUserData();
          setSuccessMessage(data);
          setIsSuccess(true);
          setIsSignup(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (formName === "login") {
      try {
        const res = await fetch("/login", postOptions);

        if (res.status === 201) {
          setLogin(true);
          setErrorMessage("");
          closeModal();
        } else {
          const error = await res.text();
          setErrorMessage(error);
          setLogin(false);
        }

        const data = await res.text();
        setToken(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleLogout() {
    setIsDropdown(false);
    setLogin(false);
  }

  // Function to open single page on movie click

  function handleMovieClick(movie) {
    let newPosterToAdd = {};

    if (!newPosterToAdd.id) {
      newPosterToAdd = { ...movie };
    }

    setSingleMovie((single) =>
      single.id !== newPosterToAdd.id ? newPosterToAdd : single
    );

    setIsMoviePage(true);

    if (isMoviePage) {
      setIsPageTop((prevState) => !prevState);
    }
  }

  function handleMovieLike(movie) {
    if (!login) {
      return openLoginModal();
    }
    const isAlreadyLiked = likedMovies.some(
      (likedItem) => likedItem.title === movie.title
    );

    if (isAlreadyLiked) {
      // Remove the movie from likedMovies and update the isLike state
      const updatedLikedMovies = likedMovies.filter(
        (likedItem) => likedItem.title !== movie.title
      );
      setLikedMovies(updatedLikedMovies);
      // setIsLike(false);
    } else {
      // Add the movie to likedMovies and update the isLike state
      setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
      // setIsLike(true);
    }
  }

  function handleVideoPlayer(movie) {
    if (!login) {
      return openLoginModal();
    }

    let newVideoToAdd = {};

    if (!newVideoToAdd.id) {
      newVideoToAdd = { ...movie };
    }

    setSingleVideo((video) =>
      video.id !== newVideoToAdd.id ? newVideoToAdd : video
    );

    setIsModal(true);
    setIsVideo(true);
  }

  function handleCloseVideo() {
    setIsVideo(false);
    setIsModal(false);
  }

  function handleCloseDropdown() {
    setIsDropdown((prevState) => !prevState);
  }
  function handleCloseDropdownGlobal(e) {
    if (
      e.target.classList.contains("dropdown-items") ||
      e.target.classList.contains("drop-down")
    ) {
      return;
    }

    if (isDropdown) {
      setIsDropdown(false);
    } else {
      return;
    }
  }

  // Handling movie search
  function handleSearchQuery(input) {
    setQuery(input.value);
  }

  const searchData = {
    query,
  };

  const searchPostOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(searchData),
  };

  const searchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/search", searchPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      const results = data.results;
      setSearched(results);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const rateMovies = async (id, rating) => {
    if (!login) {
      return openLoginModal();
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
      const res = await fetch("/rating", ratingPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      setUserRating(data.userRating);
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleSearch() {
    searchMovies();
    setSearchQuery(query);
    setQuery("");
    setIsSearch(true);
  }

  function handleRating(id, rating) {
    rateMovies(id, rating);
  }

  function handleGoBack() {
    setIsMoviePage(false);
    setIsSearch(false);
  }

  function handleLoader() {
    console.log("loading");
  }

  if (isModal) {
    return (
      <div className="login-modal">
        <Header>
          <Navbar
            searchQuery={query}
            onSearch={handleSearchQuery}
            onMovieSearch={handleSearch}
          />
        </Header>

        {isLogin && (
          <Login
            onFormInput={handleForm}
            email={userEmail}
            password={userPassword}
            onCloseModal={closeModal}
            login={isLogin}
            passwordError={errorMessage}
            onSignup={openSignupModal}
            onFormSubmit={handleFormSubmit}
          />
        )}
        {isSignup && (
          <Login
            onFormInput={handleForm}
            username={username}
            email={userEmail}
            password={userPassword}
            confirmPassword={confirmPassword}
            onCloseModal={closeModal}
            signup={isSignup}
            signupSuccess={successMessage}
            onLogin={openLoginModal}
            formHeight="690px"
            onFormSubmit={handleFormSubmit}
            isUserExist={userExist}
          />
        )}
        {isSuccess && (
          <Login
            username={username}
            onCloseModal={closeModal}
            isSuccess={isSuccess}
            signupSuccess={successMessage}
            formHeight="290px"
            onLogin={openLoginModal}
          />
        )}
        {isVideo && (
          <VideoPlayer movie={singleVideo} onClose={handleCloseVideo} />
        )}
        {!isVideo && <Footer />}
      </div>
    );
  }

  return (
    <div className="app">
      {!isMoviePage && !isSearch && (
        <>
          <Header>
            <Navbar
              watchlist={watchlist}
              likes={likedMovies}
              onLogin={openLoginModal}
              onSignup={openSignupModal}
              isLogin={login}
              onLogout={handleLogout}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropdown}
              onDropdownGlobal={handleCloseDropdownGlobal}
              searchQuery={query}
              onSearch={handleSearchQuery}
              onMovieSearch={handleSearch}
            />

            <Slider
              slides={slideMovies}
              onWatchlist={handleWatchlist}
              watchlist={watchlist}
              onMovieClick={handleMovieClick}
              onVideo={handleVideoPlayer}
              onDropdownGlobal={handleCloseDropdownGlobal}
            />
          </Header>

          <Main
            movies={movies}
            trending={trending}
            active={activePoster}
            series={series}
            popular={popular}
            featured={featured}
            awards={moviesOnAwards}
            fastMovies={fast}
            liveMovies={live}
            onSlideRight={handleNextSlide}
            onSlideLeft={handlePrevSlide}
            isSlidePoster={posterIsSliding}
            isSlideCard={cardIsSliding}
            isSlideMovies={movieCardIsSliding}
            isSlideSeries={seriesCardIsSliding}
            onFast={fastCard}
            onLive={liveCard}
            onWatchlist={handleWatchlist}
            watchlist={watchlist}
            onMovieClick={handleMovieClick}
            onVideo={handleVideoPlayer}
            onDropdownGlobal={handleCloseDropdownGlobal}
          />
        </>
      )}

      {isMoviePage && !isSearch && (
        <>
          <Header slider={false}>
            <Navbar
              watchlist={watchlist}
              likes={likedMovies}
              onLogin={openLoginModal}
              onSignup={openSignupModal}
              isLogin={login}
              onLogout={handleLogout}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropdown}
              onBack={handleGoBack}
              onDropdownGlobal={handleCloseDropdownGlobal}
              searchQuery={query}
              onSearch={handleSearchQuery}
              onMovieSearch={handleSearch}
            />
          </Header>

          <MoviePage
            onWatchlist={handleWatchlist}
            watchlist={watchlist}
            movie={singleMovie}
            popular={popular}
            movies={movies}
            isSlideCard={cardIsSliding}
            isSlideMovies={movieCardIsSliding}
            onSlideRight={handleNextSlide}
            onSlideLeft={handlePrevSlide}
            onMovieClick={handleMovieClick}
            isPageTop={isPageTop}
            onLike={handleMovieLike}
            likes={likedMovies}
            onVideo={handleVideoPlayer}
            onDropdownGlobal={handleCloseDropdownGlobal}
          />
        </>
      )}

      {isSearch && (
        <>
          <Header slider={false}>
            <Navbar
              watchlist={watchlist}
              likes={likedMovies}
              onLogin={openLoginModal}
              onSignup={openSignupModal}
              isLogin={login}
              onLogout={handleLogout}
              onDropdown={handleCloseDropdown}
              isDropdown={isDropdown}
              onBack={handleGoBack}
              onDropdownGlobal={handleCloseDropdownGlobal}
              searchQuery={query}
              onSearch={handleSearchQuery}
              onMovieSearch={handleSearch}
            />
          </Header>

          <Search
            movies={searched}
            query={searchQuery}
            watchlist={watchlist}
            isSearch={isSearch}
            userRating={userRating}
            onRate={handleRating}
            onWatchlist={handleWatchlist}
            isLoading={isLoading}
            onDropdownGlobal={handleCloseDropdownGlobal}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
