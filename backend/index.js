import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import genres from "./genres.js";
import auth from "./middleware/auth.js";

// const dbUrl = process.env.MONGODB_CONNSTRING;

// mongoose.connect(`mongodb+srv:${dbUrl}/streamletDB`, {
//   useNewUrlParser: true,
// });

mongoose.connect("mongodb://localhost:27017/streamletDB", {
  useNewUrlParser: true,
});

// Schemas

const moviesSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  cast: [
    {
      adult: Boolean,
      gender: Number,
      id: Number,
      known_for_department: String,
      name: String,
      original_name: String,
      popularity: Number,
      profile_path: String,
      cast_id: Number,
      character: String,
      credit_id: String,
      order: Number,
    },
  ],
  genres: [],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: Array,
  release_date: String,
  runtime: Number,
  title: String,
  video_url: [String],
  vote_average: Number,
  vote_count: Number,
});

const seriesSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  cast: [
    {
      adult: Boolean,
      gender: Number,
      id: Number,
      known_for_department: String,
      name: String,
      original_name: String,
      popularity: Number,
      profile_path: String,
      cast_id: Number,
      character: String,
      credit_id: String,
      order: Number,
    },
  ],
  id: Number,
  name: String,
  original_language: String,
  original_name: String,
  overview: String,
  poster_path: String,
  media_type: String,
  genre_ids: Array,
  genres: Array,
  popularity: Number,
  first_air_date: String,
  title: String,
  video_url: [String],
  vote_average: Number,
  vote_count: Number,
  origin_country: Array,
});

const popularSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  cast: [
    {
      adult: Boolean,
      gender: Number,
      id: Number,
      known_for_department: String,
      name: String,
      original_name: String,
      popularity: Number,
      profile_path: String,
      cast_id: Number,
      character: String,
      credit_id: String,
      order: Number,
    },
  ],
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: Array,
  release_date: String,
  runtime: Number,
  title: String,
  video_url: [String],
  vote_average: Number,
  vote_count: Number,
});

const trendingSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  cast: [
    {
      adult: Boolean,
      gender: Number,
      id: Number,
      known_for_department: String,
      name: String,
      original_name: String,
      popularity: Number,
      profile_path: String,
      cast_id: Number,
      character: String,
      credit_id: String,
      order: Number,
    },
  ],
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: Array,
  release_date: String,
  runtime: Number,
  title: String,
  video_url: [String],
  vote_average: Number,
  vote_count: Number,
});

const liveSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  cast: [
    {
      adult: Boolean,
      gender: Number,
      id: Number,
      known_for_department: String,
      name: String,
      original_name: String,
      popularity: Number,
      profile_path: String,
      cast_id: Number,
      character: String,
      credit_id: String,
      order: Number,
    },
  ],
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: Array,
  release_date: String,
  runtime: Number,
  title: String,
  video_url: [String],
  vote_average: Number,
  vote_count: Number,
});

const userSchema = {
  username: String,
  email: String,
  password: String,
  token: String,
  userRating: [Object],
};

const Movies = mongoose.model("Movies", moviesSchema);
const Series = mongoose.model("Series", seriesSchema);
const Populars = mongoose.model("Populars", popularSchema);
const Trendings = mongoose.model("Trending", trendingSchema);
const Lives = mongoose.model("Lives", liveSchema);
const Users = mongoose.model("Users", userSchema);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch movies from API
const moviesUrl =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1";

const seriesUrl =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1";

const trendingMoviesUrl =
  "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";

const liveMoviesUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1 ";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
  },
};

// Function to fetch movies from API
async function fetchMovies(url) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        "Movies cannot be loaded at the moment 😢, please try again"
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}

// Function to fetch more movie details from API
// function fetchMovieDetails(movieId) {
//   return `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
// }

async function fetchMovieDetails(idMovie, type, option) {
  const urlPartCast =
    option === "movies" ? "movie" : option === "series" ? "tv" : "movie";
  const urlPartVideo =
    option === "movies" ? "movie" : option === "series" ? "tv" : "movie";
  const castUrl = `https://api.themoviedb.org/3/${urlPartCast}/${idMovie}/credits?language=en-US`;
  const videoUrl = `https://api.themoviedb.org/3/${urlPartVideo}/${idMovie}/videos?language=en-US`;

  const url = type === "cast" ? castUrl : type === "video" ? videoUrl : "";

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        "Movies cannot be loaded at the moment 😢, please try again"
      );
    }

    const data = await response.json();

    const casts =
      type === "cast"
        ? await data.cast
        : type === "video"
        ? await data.results
        : await data.results;

    return casts;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchSeriesVideo(serieId) {
  const videoUrl = `https://api.themoviedb.org/3/tv/${serieId}/videos?language=en-US`;

  try {
    const response = await fetch(videoUrl, options);

    if (!response.ok) {
      throw new Error(
        "Movies cannot be loaded at the moment 😢, please try again"
      );
    }

    const data = await response.json();

    const video = await data.results;

    return video;
  } catch (error) {
    console.error(error.message);
  }
}

async function addMoviesToDatabase(type) {
  let movieData;

  if (type === "movies") {
    movieData = await fetchMovies(moviesUrl);
  } else if (type === "series") {
    movieData = await fetchMovies(seriesUrl);
  } else if (type === "popular") {
    movieData = await fetchMovies(popularMoviesUrl);
  } else if (type === "trending") {
    movieData = await fetchMovies(trendingMoviesUrl);
  } else if (type === "live") {
    movieData = await fetchMovies(liveMoviesUrl);
  }

  async function processMoviesData(movieData) {
    const updatedData = await Promise.all(
      movieData.map(async (movie) => {
        const movieId = movie.id;
        let movieDetails;

        if (type !== "series") {
          const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

          try {
            const response = await fetch(url, options);

            if (!response.ok) {
              throw new Error(
                "Movies cannot be loaded at the moment 😢, please try again"
              );
            }

            const data = await response.json();
            movieDetails = data;
            // return data.results;
          } catch (error) {
            console.error(error.message);
          }
        }

        if (type === "series") {
          const url = `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`;

          try {
            const response = await fetch(url, options);

            if (!response.ok) {
              throw new Error(
                "Movies cannot be loaded at the moment 😢, please try again"
              );
            }

            const data = await response.json();
            movieDetails = data;
            // return data.results;
          } catch (error) {
            console.error(error.message);
          }
        }

        // console.log(movieDetails);

        // const genreArr = movie.genre_ids;
        // const movieGenres = [];
        // genres.forEach((genre) => {
        //   for (let i = 0; i < genreArr.length; i++) {
        //     const genreId = genreArr[i];
        //     if (genre.id === genreId) {
        //       movieGenres.push(genre.name);
        //     }
        //   }
        // });

        const casts = await fetchMovieDetails(movieId, "cast", type);
        const castArray = [];
        casts.forEach((cast, index) => {
          if (index <= 15) {
            castArray.push(cast);
          }
        });

        const videos = await fetchMovieDetails(movieId, "video", type);
        const videoArray = [];

        videos.forEach((video, index) => {
          const trailer = video.name;
          if (trailer.includes("Official Trailer")) {
            videoArray.push(video.key);
          } else if (trailer.includes("Teaser")) {
            videoArray.push(video.key);
          }
        });

        const videoUrl = [];
        if (type === "series") {
          const seriesVideo = await fetchSeriesVideo(movieId);
          seriesVideo.forEach((serie, index) => {
            videoUrl.push(serie.key);
          });
        }

        const videoToAdd = type === "series" ? videoUrl : videoArray;

        const movieWithDetails = {
          ...movieDetails,
          // genres: movieGenres,
          cast: castArray,
          video_url: videoToAdd,
        };

        // console.log(movieWithDetails);

        return movieWithDetails;
      })
    );

    return updatedData;
  }

  const updatedData = await processMoviesData(movieData);

  for (const movie of updatedData) {
    const movieTitle = movie.title;
    const serieName = movie.name;

    // Movies - check if movie already exists
    if (type === "movies") {
      Movies.findOne({ title: movieTitle })
        .then((result) => {
          if (!result) {
            const dataMovie = new Movies(movie);
            dataMovie.save();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "series") {
      // Movies - check if movie already exists
      Series.findOne({ name: serieName })
        .then((result) => {
          if (!result) {
            if (!(movie.video_url.length < 1)) {
              const dataMovie = new Series(movie);
              dataMovie.save();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "popular") {
      // Movies - check if movie already exists
      Populars.findOne({ title: movieTitle })
        .then((result) => {
          if (!result) {
            const dataMovie = new Populars(movie);
            dataMovie.save();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "trending") {
      // Movies - check if movie already exists
      Populars.findOne({ title: movieTitle })
        .then((result) => {
          if (!result) {
            const dataMovie = new Trendings(movie);
            dataMovie.save();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "live") {
      // Movies - check if movie already exists
      Lives.findOne({ title: movieTitle })
        .then((result) => {
          if (!result) {
            const dataMovie = new Lives(movie);
            dataMovie.save();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

// Call the movies api fetcher function
// await addMoviesToDatabase("series");

app.get("/movies", function (req, res) {
  console.log(req);
  const movies = Movies.find()
    .then((movie) => {
      // console.log(movie);
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/series", function (req, res) {
  const movies = Series.find()
    .then((serie) => {
      res.send(serie);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/popular", function (req, res) {
  const movies = Populars.find()
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/trending", function (req, res) {
  const movies = Trendings.find()
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/live", function (req, res) {
  const movies = Lives.find()
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/signup", async function (req, res) {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      // If any required data is missing, send a 400 Bad Request response.
      return res.status(400).send({
        message: "Incomplete data. Please provide all required information.",
      });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, send a 409 Conflict response.
      return res.status(409).send({
        message: "User Already Exist. Please Login",
        userEmail: existingUser.email,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      userRating: [],
    });

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    newUser.token = token;

    await newUser.save();

    return res.status(201).send("Signup Successful");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;

      return res.status(201).send(user.token);
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
  }
});

async function fetchSearchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error("No result for this query 😢, please try something else");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}

app.post("/search", async (req, res) => {
  try {
    const searchQuery = req.body.query;
    const results = await fetchSearchMovies(searchQuery);

    const resultToSend = await Promise.all(
      results.map(async (movie) => {
        if (movie.media_type === "movie" || movie.media_type === "tv") {
          if (!movie.poster_path) return;

          let castOption, movieId;
          if (movie.media_type === "movie") {
            castOption = "movies";
          } else if (movie.media_type === "tv") {
            castOption = "series";
          }

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

          movieId = movie.id;
          const casts = await fetchMovieDetails(movieId, "cast", castOption);
          const castArray = [];
          casts.forEach((cast, index) => {
            if (index < 10) {
              castArray.push(cast);
            }
          });

          const movieWithDetails = {
            ...movie,
            cast: castArray,
            genres: movieGenres,
          };

          return movieWithDetails;
        }
      })
    );

    const filteredResult = resultToSend.filter((entry) => entry !== undefined);

    res.send({ results: filteredResult });
  } catch (err) {
    console.log(err);
  }
});

app.post("/rating", async (req, res) => {
  try {
    const { movieId, rating } = req.body;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      Users.findOne({ _id: decoded.user_id })
        .then((user) => {
          if (user) {
            const ratingToAdd = { movieId, rating };

            const existingRatingIndex = user.userRating.findIndex(
              (ratingItem) => ratingItem.movieId === movieId
            );

            if (existingRatingIndex !== -1) {
              // If the user already rated the movie, update their rating
              user.userRating[existingRatingIndex].rating = rating;
            } else {
              // If the user hasn't rated the movie, add the new rating to the array
              user.userRating.push(ratingToAdd);
            }

            user.save().then(() => {
              res.send({ userRating: user.userRating });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
});

const portNum = process.env.PORT || 5000;

app.listen(portNum, () => {
  console.log("Server started on port " + portNum);
});
