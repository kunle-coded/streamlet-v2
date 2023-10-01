import React, { useEffect, useState } from "react";
import "./main.css";
import Poster from "../poster/Poster";
import Section from "../section/Section";
import Card from "../cards/Card";
import Genre from "../genres/Genre";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";

function Main({ newMovies, popular, onSlide }) {
  const [sectionImg, setSectionImg] = useState("");
  const [activePoster, setActivePoster] = useState({});

  let loadedPopular = [];
  function loadSectionImage() {
    const min = 1;
    const max = 3;
    const randomInt = Math.floor(Math.random() * (max - min)) + min;

    // setSectionImg(popular[2]);

    popular.forEach((movie) => {
      loadedPopular.push(movie);
    });
  }

  useEffect(() => {
    loadSectionImage();
    const img = loadedPopular[2];
  }, []);

  // set active poster
  function handleActivePoster(movie) {
    setActivePoster(movie);
    console.log("active poster", activePoster);
  }

  return (
    <main className="main-section">
      {/* New movie release section */}
      <Section title="New Release">
        {newMovies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Section>

      {/* Popular movies of the week section */}
      <Section
        title="Popular This Week"
        gap="40px"
        slide={true}
        onSlide={onSlide}
      >
        {popular.map((movie, i) => (
          <Card key={movie.id} movie={movie} index={i} slide={true} />
        ))}
      </Section>

      {/* Featured movies section */}
      <Section
        height="700px"
        padding="70px"
        display="flex"
        alignItems="center"
        useBackground={true}
        backgroundImage="4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"
      >
        <div className="featured-movies-container">
          <div className="featured-movies-section-info">
            <h3>Featured in Streamlet</h3>
            <p>Best featured for you today</p>
          </div>

          <div className="featured-movies-details">
            <div className="featured-label">#1 in Nigeria</div>
            <div className="featured-title">
              <h1>{activePoster.title}</h1>
            </div>
            <div className="featured-genre">
              <RatingLabel>
                <Rating>{activePoster.vote_average}</Rating>
                <Genre
                  movie={activePoster}
                  genre={true}
                  label={false}
                  divider={true}
                  duration={true}
                  year={true}
                />
              </RatingLabel>
            </div>
            <div className="featured-desc">
              <p>{activePoster.overview}</p>
            </div>
            <div className="featured-btn"></div>
          </div>
          <div className="featured-movies-poster">
            {newMovies.map((movie, i) => (
              <Poster
                key={movie.id}
                movie={movie}
                index={i}
                border={true}
                onActive={handleActivePoster}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="New Release">
        {newMovies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Section>
    </main>
  );
}
export default Main;
