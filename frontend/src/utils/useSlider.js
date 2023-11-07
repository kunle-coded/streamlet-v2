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

    setMoviesOnAwards((movies) => movies.filter((movie, index) => index >= 1));

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
