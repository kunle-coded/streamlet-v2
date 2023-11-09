/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
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
import { useMovies } from "../../contexts/MoviesContext";

function Main() {
  const {
    movies,
    trending,
    activePoster,
    series,
    popular,
    featured,
    awardMovies,
    fast,
    live,
    watchlist,
    isSlidePoster,
    fastPage,
    livePage,
    dispatch,
    handleWatchlist,
    handleVideoPlayer,
    slideCards,
  } = useMovies();

  const [isLong, setIsLong] = useState(false);
  useEffect(() => {
    if (activePoster.title) {
      const titleCount = activePoster.title.length;
      if (titleCount > 21) {
        setIsLong(true);
      } else {
        setIsLong(false);
      }
    }
  }, [trending, activePoster]);

  let watchlisted = useWatchlistMarker(watchlist, activePoster);
  const movieImg = activePoster
    ? activePoster.poster_path
    : "4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg";

  // Trim movie overview

  const ulRef = useRef(null);
  const ulRef2 = useRef(null);
  const ulRef4 = useRef(null);
  const ulRef5 = useRef(null);

  return (
    <main className="main-section">
      {/* New movie release section */}
      <Section
        title="New Release"
        btnTop="50%"
        slide={true}
        isSlide={isSlidePoster}
        onSlideRight={() => slideCards(ulRef.current, 1)}
        onSlideLeft={() => slideCards(ulRef.current, -1)}
      >
        <ul ref={ulRef} className="main-section-movie-list">
          {trending.map((movie, index) => (
            <li key={movie.id} className="main-section-movie-item">
              <Poster movie={movie} index={index} length={trending.length} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Popular movies of the week section */}
      <Section
        title="Popular This Week"
        gap="50px"
        btnTop="50%"
        slide={true}
        onSlideRight={() => slideCards(ulRef2.current, 1)}
        onSlideLeft={() => slideCards(ulRef2.current, -1)}
      >
        <ul ref={ulRef2} className="main-section-movie-list">
          {popular.map((movie, i) => (
            <li key={movie.id} className="main-section-movie-item">
              <Card
                movie={movie}
                index={i}
                slide={true}
                length={popular.length}
                whiteSpace="normal"
              />
            </li>
          ))}
        </ul>
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
        onSlideRight={() => dispatch({ type: "featuredSlide", payload: 1 })}
        onSlideLeft={() => dispatch({ type: "featuredSlide", payload: -1 })}
        backgroundImage={movieImg}
        origin="featured"
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
                {activePoster.overview && (
                  <TextReveal>{activePoster.overview}</TextReveal>
                )}
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
                onClick={() => handleVideoPlayer(activePoster)}
              >
                Play Now
              </Buttons>
              <Buttons
                bookmark={true}
                watchlisted={watchlisted}
                width="150px"
                height="35px"
                borderRadius="9px"
                onClick={() => handleWatchlist(activePoster)}
              >
                Add Watchlist
              </Buttons>
            </div>
          </div>
          <div className="featured-movies-poster">
            <Poster movie={activePoster} index={0} border={true} />
            {featured.map((movie, i) =>
              i === 0 ? null : (
                <Poster key={movie.id} movie={movie} index={i} border={true} />
              )
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Movies"
        arrowTop="0px"
        slide={true}
        onSlideRight={() => slideCards(ulRef4.current, 1)}
        onSlideLeft={() => slideCards(ulRef4.current, -1)}
      >
        <ul ref={ulRef4} className="main-section-movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="main-section-movie-item">
              <BigCard movie={movie} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Series"
        arrowTop="0%"
        slide={true}
        onSlideRight={() => slideCards(ulRef5.current, 1)}
        onSlideLeft={() => slideCards(ulRef5.current, -1)}
      >
        <ul ref={ulRef5} className="main-section-movie-list">
          {series.map((movie) => (
            <li key={movie.id} className="main-section-movie-item">
              <BigCard movie={movie} />
            </li>
          ))}
        </ul>
      </Section>

      <Section height="740px">
        <div className="movie-awards-section">
          <div className="movie-on-award">
            <Title
              title="Movies on Awards"
              onSlideRight={() => dispatch({ type: "awardsSlide", payload: 1 })}
              onSlideLeft={() => dispatch({ type: "awardsSlide", payload: -1 })}
            />
            {awardMovies.map(
              (movie, i) => i < 1 && <WideCard key={i} movie={movie} />
            )}
          </div>
          <div className="fast-live">
            <div className="award-fast">
              <Title
                title="Fast"
                onSlideLeft={() => dispatch({ type: "fastSlide", payload: -1 })}
                onSlideRight={() => dispatch({ type: "fastSlide", payload: 1 })}
              />
              {fast.map(
                (movie, i) =>
                  i < fastPage && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
                      live={true}
                    />
                  )
              )}
            </div>
            <div className="award-live">
              <Title
                title="Live"
                live={true}
                onSlideLeft={() => dispatch({ type: "liveSlide", payload: -1 })}
                onSlideRight={() => dispatch({ type: "liveSlide", payload: 1 })}
              />
              {live.map(
                (movie, i) =>
                  i < livePage && (
                    <Card
                      movie={movie}
                      key={movie.id}
                      showNumber={false}
                      width="100%"
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
