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
};

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
      !fasts.some((fastMovie) => fastMovie.title === movie.title)
    ) {
      const movieGenres = movie.genres;
      movieGenres.forEach((genre) => {
        if (genre.name === "Thriller") {
          fastMovies.push(movie);
        }
      });
    }
  });

  return fastMovies;
}

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
    case "singleMovie":
      return {
        ...state,
        singleMovie: JSON.parse(localStorage.getItem("movie")),
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
    case "fast": {
      const fasts = addMoviesToFast(action.payload, state.fast);
      return { ...state, fast: fasts };
    }
    case "movieSlides": {
      const slides = addMoviesToSlide(action.payload, state.slideMovies);
      return { ...state, slideMovies: slides };
    }
    case "serieSlides": {
      const slides = addSeriesToSlide(action.payload, state.slideMovies);
      return { ...state, slideMovies: [...state.slideMovies, ...slides] };
    }
    default:
      throw new Error("Unknown action");
  }
}
