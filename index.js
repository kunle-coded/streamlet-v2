import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import genres from "./genres.js";

mongoose.connect("mongodb://localhost:27017/streamletDB", {
  useNewUrlParser: true,
});

// Schemas

const moviesSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
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

const seriesSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
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

// fetchMovies(seriesUrl);

// Function to write movies data from API to database

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

  const updatedData = movieData.map((movie) => {
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

    return {
      ...movie,
      genres: movieGenres,
    };
  });

  for (const movie of updatedData) {
    const movieTitle = movie.title;
    const serieName = movie.name;

    // Movies - check if movie already exists
    if (type === "movies") {
      Movies.findOne({ title: movieTitle })
        .then((result) => {
          if (!result) {
            const dataMovie = new Movies(movie);
            // dataMovie.save();
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
            // dataMovie.save();
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

            // dataMovie.save();
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

            // dataMovie.save();
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

// await addMoviesToDatabase("live");

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
      res.status(400);
    }

    let oldUser;

    Users.findOne({ email })
      .then((user) => {
        oldUser = user;
        res.status(409).send({ message: "User Already Exist. Please Login" });
        console.log("user exists", user);
      })
      .catch((err) => {
        console.log(err);
      });

    if (oldUser) {
      res.send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const newUser = new Users(user);
    if (!oldUser) {
      newUser.save();
      console.log(newUser);
    }

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
  } catch (err) {
    console.log(err);
  }
});

const portNum = process.env.PORT;

app.listen(portNum, () => {
  console.log("Server started on port " + portNum);
});
