import React, { useEffect, useState } from "react";
import "./main.css";
import Poster from "../poster/Poster";
import Section from "../section/Section";
import Card from "../cards/Card";
import Genre from "../genres/Genre";
import RatingLabel from "../poster_rating_label/RatingLabel";
import Rating from "../rating/Rating";
import Buttons from "../buttons/Buttons";
import useWatchlistMarker from "../../utils/useWatchlistMarker";
import TextReveal from "../text_reveal/TextReveal";
import BigCard from "../cards/BigCard";

function Main({ newMovies, watchlist, onWatchlist, popular, onSlide }) {
  const [sectionImg, setSectionImg] = useState("");
  const [activePoster, setActivePoster] = useState({});

  useEffect(() => {
    setActivePoster(newMovies[0]);
  }, []);
  // set active poster
  function handleActivePoster(movie) {
    // if (movie) {
    // }
    // setActivePoster(movie);
  }

  let watchlisted = useWatchlistMarker(watchlist, activePoster);

  // Trim movie overview

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
        gap="50px"
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
        arrowTop="0"
        arrowRight="0"
        slide={true}
        useBackground={true}
        // backgroundImage="4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"
        backgroundImage={activePoster.poster_path}
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
              <TextReveal>{activePoster.overview}</TextReveal>
            </div>
            <div className="featured-btn">
              <Buttons
                play={true}
                width="150px"
                height="35px"
                background="#00925d"
                border={false}
                borderRadius="9px"
                color="#fff"
              >
                Play Now
              </Buttons>
              <Buttons
                bookmark={true}
                watchlisted={watchlisted}
                width="150px"
                height="35px"
                borderRadius="9px"
                onClick={() => onWatchlist(activePoster)}
              >
                Add Watchlist
              </Buttons>
            </div>
          </div>
          <div className="featured-movies-poster">
            <Poster
              movie={activePoster}
              index={0}
              border={true}
              onActive={handleActivePoster}
            />
            {newMovies.map((movie, i) =>
              i === 0 ? null : (
                <Poster
                  key={movie.id}
                  movie={movie}
                  index={i}
                  border={true}
                  onActive={handleActivePoster}
                />
              )
            )}
          </div>
        </div>
      </Section>

      <Section title="Movies" arrowTop="0%" slide={true}>
        {popular.map((movie) => (
          <BigCard movie={movie} />
        ))}
      </Section>

      <Section title="Series" arrowTop="0%" slide={true}>
        {popular.map((movie) => (
          <BigCard movie={movie} />
        ))}
      </Section>
    </main>
  );
}
export default Main;
