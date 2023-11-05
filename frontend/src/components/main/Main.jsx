/* eslint-disable react/prop-types */
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
  movies,
  trending,
  active,
  series,
  popular,
  featured,
  awards,
  fastMovies,
  liveMovies,
  watchlist,
  onWatchlist,
  onSlide,
  onSlideRight,
  onSlideLeft,
  isSlidePoster,
  isSlideCard,
  isSlideMovies,
  isSlideSeries,
  fastPage,
  livePage,
  onFast,
  onLive,
  onMovieClick,
  onVideo,
  onDropdownGlobal,
  dispatch,
}) {
  const [isLong, setIsLong] = useState(false);
  useEffect(() => {
    if (active.title) {
      const titleCount = active.title.length;
      if (titleCount > 21) {
        setIsLong(true);
      } else {
        setIsLong(false);
      }
    }
  }, [trending, active]);

  // console.log(series);

  let watchlisted = useWatchlistMarker(watchlist, active);
  const movieImg = active
    ? active.poster_path
    : "4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg";

  // Trim movie overview

  // console.log("main", fastMovies);

  return (
    <main className="main-section" onClick={onDropdownGlobal}>
      {/* New movie release section */}
      <Section
        title="New Release"
        btnTop="50%"
        slide={true}
        isSlide={isSlidePoster}
        onSlideRight={() => onSlideRight("trending")}
        onSlideLeft={() => onSlideLeft("trending")}
      >
        {trending.map((movie, index) => (
          <Poster
            onMovieClick={onMovieClick}
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
        isSlideCard={isSlideCard}
        onSlideRight={() => onSlideRight("popular")}
        onSlideLeft={() => onSlideLeft("popular")}
      >
        {popular.map((movie, i) => (
          <Card
            onMovieClick={onMovieClick}
            key={movie.id}
            movie={movie}
            index={i}
            slide={true}
            length={popular.length}
            whiteSpace="normal"
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
        onSlideRight={() => onSlideRight("featured")}
        backgroundImage={movieImg}
      >
        <div className="featured-movies-container">
          <div className="featured-movies-section-info">
            <h3>Featured in Streamlet</h3>
            <p>Best featured for you today</p>
          </div>

          <div className="featured-movies-details">
            <div className="featured-label">#1 in Nigeria</div>

            <div className="featured-text">
              <div
                className={`featured-title ${isLong ? "smaller-title" : ""}`}
              >
                <h1>{active.title}</h1>
              </div>
              <div className="featured-genre">
                <RatingLabel>
                  <Rating>{active.vote_average}</Rating>
                  <Genre
                    movie={active}
                    genre={true}
                    label={false}
                    divider={true}
                    duration={true}
                    year={true}
                  />
                </RatingLabel>
              </div>
              <div className="featured-desc">
                {active.overview && <TextReveal>{active.overview}</TextReveal>}
              </div>
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
                onClick={() => onVideo(active)}
              >
                Play Now
              </Buttons>
              <Buttons
                bookmark={true}
                watchlisted={watchlisted}
                width="150px"
                height="35px"
                borderRadius="9px"
                onClick={() => onWatchlist(active)}
              >
                Add Watchlist
              </Buttons>
            </div>
          </div>
          <div className="featured-movies-poster">
            <Poster
              onMovieClick={onMovieClick}
              movie={active}
              index={0}
              border={true}
            />
            {featured.map((movie, i) =>
              i === 0 ? null : (
                <Poster
                  onMovieClick={onMovieClick}
                  key={movie.id}
                  movie={movie}
                  index={i}
                  border={true}
                />
              )
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Movies"
        arrowTop="0px"
        slide={true}
        isSlideMovies={isSlideMovies}
        onSlideRight={() => onSlideRight("movies")}
        onSlideLeft={() => onSlideLeft("movies")}
      >
        {movies.map((movie) => (
          <BigCard movie={movie} key={movie.id} onMovieClick={onMovieClick} />
        ))}
      </Section>

      <Section
        title="Series"
        arrowTop="0%"
        slide={true}
        isSlideSeries={isSlideSeries}
        onSlideRight={() => onSlideRight("series")}
        onSlideLeft={() => onSlideLeft("series")}
      >
        {series.map((movie) => (
          <BigCard movie={movie} key={movie.id} onMovieClick={onMovieClick} />
        ))}
      </Section>

      <Section height="740px">
        <div className="movie-awards-section">
          <div className="movie-on-award">
            <Title
              title="Movies on Awards"
              onSlideRight={() => onSlideRight("awards")}
              onSlideLeft={() => onSlideLeft("awards")}
            />
            {awards.map(
              (movie, i) =>
                i < 1 && (
                  <WideCard
                    key={i}
                    movie={movie}
                    onWatchlist={onWatchlist}
                    watchlist={watchlist}
                    onMovieClick={onMovieClick}
                    onVideo={onVideo}
                  />
                )
            )}
          </div>
          <div className="fast-live">
            <div className="award-fast">
              <Title
                title="Fast"
                onSlideLeft={() => onSlideLeft("fast")}
                onSlideRight={() => onSlideRight("fast")}
              />
              {fastMovies.map(
                (movie, i) =>
                  i < fastPage && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
                      onMovieClick={onMovieClick}
                      live={true}
                    />
                  )
              )}
            </div>
            <div className="award-live">
              <Title
                title="Live"
                live={true}
                onSlideLeft={() => onSlideLeft("live")}
                onSlideRight={() => onSlideRight("live")}
              />
              {liveMovies.map(
                (movie, i) =>
                  i < livePage && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
                      onMovieClick={onMovieClick}
                      live={true}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
export default Main;
