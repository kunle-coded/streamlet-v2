import React, { useEffect, useRef, useState } from "react";
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
  likes,
  onLike,
  isSlideCard,
  isSlideMovies,
  onSlideRight,
  onSlideLeft,
  onMovieClick,
  isPageTop,
  onVideo,
  onDropdownGlobal,
}) {
  const [liked, setLiked] = useState(false);
  const ref = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPageTop]);

  useEffect(() => {
    const isLiked = likes.some(
      (likedMovie) => likedMovie.title === movie.title
    );
    setLiked(isLiked);
  }, [likes, movie]);

  useEffect(() => {
    document.title = `Streamlet - ${movie.title ? movie.title : movie.name}`;

    return () => {
      document.title = "Streamlet";
    };
  }, [movie]);

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
    <main className="movie-page" onClick={onDropdownGlobal}>
      <div className="slide-container">
        <Slide
          onWatchlist={onWatchlist}
          watchlist={watchlist}
          movie={movie}
          type="Movie"
          slider={false}
          onVideo={onVideo}
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
            background={liked ? "#eb3f5e" : "#0d0c0f"}
            border={liked ? false : true}
            borderColor={liked ? "" : "#28262d"}
            fontSize="11px"
            fontWeight="400"
            onClick={() => onLike(movie)}
          >
            <span className="like">{liked ? <LikeFill /> : <Like />}</span>{" "}
            {liked ? "Liked" : "Like"}
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
          <Section slide={true} btnTop="50%" marginBottomTitle="0">
            <div className="top-casts">
              <ul>
                {movie.cast.map((castItem, index) => (
                  <li key={castItem.id}>
                    <Cast
                      name={castItem.name}
                      imgUrl={castItem.profile_path}
                      character={castItem.character}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Section>
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
                  <li key={movie.id}>
                    <BigCard movie={movie} onMovieClick={onMovieClick} />
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
                  <li key={movie.id}>
                    <BigCard movie={movie} onMovieClick={onMovieClick} />
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
