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
import Title from "../title/Title";
import WideCard from "../cards/WideCard";
import VideoPlayer from "../video_player/VideoPlayer";

function Main({
  trending,
  active,
  series,
  popular,
  watchlist,
  onWatchlist,
  onSlide,
  onSlideRight,
  onSlideLeft,
  isSlide,
}) {
  const [activePoster, setActivePoster] = useState({});

  useEffect(() => {
    let activePosterMovie = {};

    trending.forEach((movie, index) => {
      if (index < 1) {
        activePosterMovie = movie;
      }
    });
    setActivePoster(activePosterMovie);
  }, [trending]);

  // set active poster
  function handleActivePoster(movie) {
    // if (movie) {
    // }
    // setActivePoster(movie);
  }

  let watchlisted = useWatchlistMarker(watchlist, activePoster);
  const movieImg = activePoster
    ? activePoster.poster_path
    : "4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg";

  // Trim movie overview

  return (
    <main className="main-section">
      {/* New movie release section */}
      <Section
        title="New Release"
        btnTop="50%"
        slide={true}
        isSlide={isSlide}
        onSlideRight={() => onSlideRight("trending")}
        onSlideLeft={() => onSlideLeft(trending)}
      >
        {trending.map((movie, index) => (
          <Poster
            key={movie.id}
            movie={movie}
            index={index}
            length={trending.length}
          />
        ))}
      </Section>

      {/* Popular movies of the week section */}
      <Section
        title="Popular This Week"
        gap="50px"
        btnTop="50%"
        slide={true}
        onSlide={onSlide}
      >
        {popular.map((movie, i) => (
          <Card
            key={movie.id}
            movie={movie}
            index={i}
            slide={true}
            whiteSpace="nowrap"
          />
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
        btnTop="50%"
        slide={true}
        useBackground={true}
        // backgroundImage="4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"
        backgroundImage={movieImg}
      >
        <div className="featured-movies-container">
          <div className="featured-movies-section-info">
            <h3>Featured in Streamlet</h3>
            <p>Best featured for you today</p>
          </div>

          <div className="featured-movies-details">
            <div className="featured-label">#1 in Nigeria</div>
            {active.map(
              (movie, ind) =>
                ind < 1 && (
                  <React.Fragment key={ind}>
                    <div className="featured-title">
                      <h1>{movie.title}</h1>
                    </div>
                    <div className="featured-genre">
                      <RatingLabel>
                        <Rating>{movie.vote_average}</Rating>
                        <Genre
                          movie={movie}
                          genre={true}
                          label={false}
                          divider={true}
                          duration={true}
                          year={true}
                        />
                      </RatingLabel>
                    </div>
                    <div className="featured-desc">
                      <TextReveal>{movie.overview}</TextReveal>
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
                        onClick={() => onWatchlist(movie)}
                      >
                        Add Watchlist
                      </Buttons>
                    </div>
                  </React.Fragment>
                )
            )}
          </div>
          <div className="featured-movies-poster">
            <Poster
              movie={activePoster}
              index={0}
              border={true}
              onActive={handleActivePoster}
            />
            {trending.map((movie, i) =>
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

      <Section title="Movies" arrowTop="0px" slide={true}>
        {popular.map((movie) => (
          <BigCard movie={movie} key={movie.id} />
        ))}
      </Section>

      <Section title="Series" arrowTop="0%" slide={true}>
        {series.map((movie) => (
          <BigCard movie={movie} key={movie.id} />
        ))}
      </Section>

      <Section height="720px">
        <div className="movie-awards-section">
          <div className="movie-on-award">
            <Title title="Movies on Awards" />
            {trending.map(
              (movie, i) =>
                i < 1 && (
                  <WideCard
                    key={i}
                    movie={movie}
                    onWatchlist={onWatchlist}
                    watchlist={watchlist}
                  />
                )
            )}
          </div>
          <div className="fast-live">
            <div className="award-fast">
              <Title title="Fast" />
              {popular.map(
                (movie, i) =>
                  i < 4 && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
                    />
                  )
              )}
            </div>
            <div className="award-live">
              <Title title="Live" live={true} />
              {trending.map(
                (movie, i) =>
                  i < 4 && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* <Section title="Videos">
        <VideoPlayer />
      </Section> */}
    </main>
  );
}
export default Main;
