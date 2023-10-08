import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb://localhost:27017/streamlet", {
  useNewUrlParser: true,
});

const moviesSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
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

const Movies = mongoose.model("Movies", moviesSchema);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch movies from API

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
  },
};

async function fetchMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false",
      options
    );
    const data = await response.json();
    console.log(data.results.length);
  } catch (error) {}
}

fetchMovies();

app.get("/", function (req, res) {
  res.send("Hello, Nodejs!");
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
