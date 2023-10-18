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
  genre_ids: [Number],
  genres: [String],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
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
  genre_ids: Array,
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
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
  genre_ids: Array,
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
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
  genre_ids: Array,
  genres: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

const userSchema = {
  username: String,
  email: String,
  password: String,
  token: String,
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

let movieIdDetails;

// Fetch movies from API
const moviesUrl =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1";

const seriesUrl =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=2";

const trendingMoviesUrl =
  "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";

const liveMoviesUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1 ";

const videoUrl = `https://api.themoviedb.org/3/movie/${movieIdDetails}/videos?language=en-US`;

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

async function fetchMovieDetails(idMovie) {
  const castUrl = `https://api.themoviedb.org/3/movie/${idMovie}/credits?language=en-US`;
  try {
    const response = await fetch(castUrl, options);

    if (!response.ok) {
      throw new Error(
        "Movies cannot be loaded at the moment 😢, please try again"
      );
    }

    const data = await response.json();
    const casts = await data.cast;

    return casts;
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
        const genreArr = movie.genre_ids;
        const movieId = movie.id;
        const movieGenres = [];
        genres.forEach((genre) => {
          for (let i = 0; i < genreArr.length; i++) {
            const genreId = genreArr[i];
            if (genre.id === genreId) {
              movieGenres.push(genre.name);
            }
          }
        });

        const casts = await fetchMovieDetails(movieId);
        const castArray = [];
        casts.forEach((cast, index) => {
          if (index <= 15) {
            castArray.push(cast);
          }
        });

        const movieWithDetails = {
          ...movie,
          genres: movieGenres,
          cast: castArray,
        };

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
            const dataMovie = new Series(movie);
            dataMovie.save();
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

// await addMoviesToDatabase("movies");

app.get("/movies", function (req, res) {
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

      return res.status(201).send("login successfull");
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/home", auth, (req, res) => {
  res.status(200).send("You are signed in");
});

const portNum = process.env.PORT;

app.listen(portNum, () => {
  console.log("Server started on port " + portNum);
});
