import React, { useRef, useState } from "react";
import "./movie_page.css";
import Slide from "../slider/Slide";
import Buttons from "../buttons/Buttons";
import { ReactComponent as Share } from "../../assets/icons/share-icon.svg";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as LikeFill } from "../../assets/icons/like-fill.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import Cast from "./Cast";
import { BigCard, Section } from "..";

function MoviePage({
  watchlist,
  movie,
  popular,
  movies,
  onWatchlist,
  isSlideCard,
  isSlideMovies,
  onSlideRight,
  onSlideLeft,
  onMovieClick,
}) {
  const [isLike, setIsLike] = useState(false);

  const ref = useRef();

  function handleTabClick(e) {
    const lists = ref.current.childNodes;
    const selected = e.target;
    lists.forEach((list) => {
      if (list === selected) {
        list.classList.add("active-tab");
      } else {
        list.classList.remove("active-tab");
      }
    });
  }

  return (
    <main className="movie-page">
      <div className="slide-container">
        <Slide
          onWatchlist={onWatchlist}
          watchlist={watchlist}
          movie={movie}
          type="Movie"
          silder={false}
        />
        <div className="movie-engagement-btns">
          <Buttons
            width="100px"
            borderColor="#28262d"
            fontSize="11px"
            fontWeight="400"
          >
            <span>
              <Download />
            </span>{" "}
            Download
          </Buttons>
          <Buttons
            width="80px"
            borderColor="#28262d"
            fontSize="11px"
            fontWeight="400"
          >
            <span>
              <Share />
            </span>{" "}
            Share
          </Buttons>
          <Buttons
            width="70px"
            background={isLike ? "#eb3f5e" : "#0d0c0f"}
            border={isLike ? false : true}
            borderColor={isLike ? "" : "#28262d"}
            fontSize="11px"
            fontWeight="400"
            onClick={() => setIsLike((like) => !like)}
          >
            <span className="like">{isLike ? <LikeFill /> : <Like />}</span>{" "}
            Like
          </Buttons>
        </div>
      </div>

      <section className="movie-info-section">
        <div className="story-line">
          <h4>Story Line</h4>
          <p>{movie.overview}</p>
        </div>
        <div className="top-cast">
          <h4>Top Cast</h4>
          <div className="top-casts">
            <ul>
              <li>
                <Cast name="Tom Cruise" castName="Newton Purcel" />
              </li>
              <li>
                <Cast name="Pedro Pascal" castName="Joel Müller" />
              </li>
              <li>
                <Cast name="Bella Ramsey" castName="Ellie" />
              </li>
              <li>
                <Cast name="Anna Tory" castName="Tessa" />
              </li>
              <li>
                <Cast name="Ashley Johnson" castName="Ellie Mother" />
              </li>
              <li>
                <Cast name="Nick Offermann" castName="Bill" />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="movie-page-section">
        <Section
          showBorder={true}
          border={true}
          padding="70px"
          btnTop="50%"
          slide={true}
          isSlideCard={isSlideCard}
          onSlideRight={() => onSlideRight("popular")}
          onSlideLeft={() => onSlideLeft("popular")}
        >
          <div className="movies-card-tabs">
            <div className="tab-items">
              <ul ref={ref} onClick={handleTabClick}>
                <li className="tab active-tab">Universe</li>
                <li className="tab">News</li>
                <li className="tab">Reviews</li>
              </ul>
            </div>
            <div className="tab-cards">
              <ul>
                {popular.map((movie, ind) => (
                  <li key={movie.id} onClick={() => onMovieClick(movie)}>
                    <BigCard movie={movie} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          title="Similar Movies for you"
          border={true}
          padding="70px"
          marginTop="30px"
          marginBottomTitle="0"
          btnTop="50%"
          slide={true}
          isSlideMovies={isSlideMovies}
          onSlideRight={() => onSlideRight("movies")}
          onSlideLeft={() => onSlideLeft("movies")}
        >
          <div className="movies-card-tabs">
            <div className="tab-items"></div>
            <div className="tab-cards">
              <ul>
                {movies.map((movie, ind) => (
                  <li key={movie.id} onClick={() => onMovieClick(movie)}>
                    <BigCard movie={movie} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </section>
    </main>
  );
}

export default MoviePage;
