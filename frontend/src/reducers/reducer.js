export const initialState = {
  movies: [],
  series: [],
  popular: [],
  trending: [],
  featured: [],
  awardMovies: [],
  slideMovies: [],
  fast: [],
  live: [],
  watchlist: [],
  likes: [],
  activePoster: {},
  singleMovie: JSON.parse(localStorage.getItem("movie")) || {},
  fastPage: 4,
  livePage: 4,
  status: "loading",
  isSlidePoster: false,
  isDropDown: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "movies":
      return { ...state, movies: action.payload };
    case "series":
      return { ...state, series: action.payload };
    case "popular":
      return { ...state, popular: action.payload };
    case "trending":
      return { ...state, trending: action.payload };
    case "featured":
      return { ...state, featured: action.payload };
    case "watchlist":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "watchlisted":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case "singleMovie":
      return {
        ...state,
        singleMovie: JSON.parse(localStorage.getItem("movie")),
      };
    case "likes":
      return { ...state, likes: [...state.likes, action.payload] };
    case "liked":
      return {
        ...state,
        likes: state.likes.filter(
          (likedItem) => likedItem.id !== action.payload.id
        ),
      };
    case "active": {
      const activeExist = state.activePoster.id;
      return {
        ...state,
        activePoster: !activeExist ? action.payload : state.activePoster,
      };
    }
    case "awards":
      return { ...state, awardMovies: action.payload };
    case "live":
      return { ...state, live: action.payload };
    case "movieSlides": {
      const slides = addMoviesToSlide(action.payload, state.slideMovies);
      return { ...state, slideMovies: slides };
    }
    case "serieSlides": {
      const slides = addSeriesToSlide(action.payload, state.slideMovies);
      return { ...state, slideMovies: [...state.slideMovies, ...slides] };
    }
    case "fast": {
      const fasts = addMoviesToFast(action.payload, state.fast);
      return { ...state, fast: fasts };
    }
    case "slidePoster":
      return { ...state, isSlidePoster: true };
    case "featuredSlide": {
      const updated = slideCardNext(state.featured, action.payload);
      return { ...state, featured: updated, activePoster: updated[0] };
    }
    case "awardsSlide": {
      const updated = slideCardNext(state.awardMovies, action.payload);
      return { ...state, awardMovies: updated };
    }
    case "fastSlide": {
      const updated = slideFastCard(state.fast, action.payload);
      return { ...state, fast: updated };
    }
    case "liveSlide": {
      const updated = slideFastCard(state.live, action.payload);
      return { ...state, live: updated };
    }
    case "dropdown":
      return { ...state, isDropDown: !state.isDropDown };
    default:
      throw new Error("Unknown action");
  }
}

function addMoviesToSlide(movies, slides) {
  const newMoviesToAdd = [];
  movies.forEach((movie, ind) => {
    if (
      ind < 5 &&
      !slides.some((slideItem) => slideItem.title === movie.title)
    ) {
      newMoviesToAdd.push(movie);
    }
  });

  return newMoviesToAdd;
}
function addSeriesToSlide(movies, slides) {
  const newMoviesToAdd = [];
  movies.forEach((movie, ind) => {
    if (ind < 5 && !slides.some((slideItem) => slideItem.name === movie.name)) {
      newMoviesToAdd.push(movie);
    }
  });

  return newMoviesToAdd;
}

function addMoviesToFast(movies, fasts) {
  const fastMovies = [];
  movies.forEach((movie) => {
    if (
      movie.genres &&
      !fasts.some((fastMovie) => fastMovie.title === movie.title) &&
      movie.genres.some((genre) => genre.name === "Action")
    ) {
      fastMovies.push(movie);
    }
  });

  return fastMovies;
}

function slideCardNext(state, direction) {
  if (direction === 1) {
    let newState = [];

    let firstEl = [];
    state.forEach((movie, index) => {
      if (index === 0) {
        firstEl.push(movie);
      }
    });

    const updated = state.filter((movie, index) => index >= 1);

    if (firstEl.length > 0) {
      newState = [...updated, ...firstEl];
    }

    return newState;
  }

  if (direction === -1) {
    let newState = [];

    let lastEl = [];
    const dataLength = state.length - 1;

    state.forEach((movie, index) => {
      if (index === dataLength) {
        lastEl.push(movie);
      }
    });

    const updated = state.filter((movie, index) => index < dataLength);

    if (lastEl.length > 0) {
      newState = [...lastEl, ...updated];
    }

    return newState;
  }
}

function slideFastCard(state, direction) {
  if (direction === 1) {
    let newState = [];

    let firstEl = [];
    state.forEach((movie, index) => {
      if (index < 4) {
        firstEl.push(movie);
      }
    });

    const updated = state.filter((movie, index) => index >= 4);

    if (firstEl.length > 0) {
      newState = [...updated, ...firstEl];
    }

    return newState;
  }

  if (direction === -1) {
    let newState = [];

    let lastEl = [];
    const dataLength = state.length - 4;

    state.forEach((movie, index) => {
      if (index >= dataLength) {
        lastEl.push(movie);
      }
    });

    const updated = state.filter((movie, index) => index < dataLength);

    if (lastEl.length > 0) {
      newState = [...lastEl, ...updated];
    }

    return newState;
  }
}
