import React, { useState } from "react";
import "./movie_page.css";
import Slide from "../slider/Slide";
import Buttons from "../buttons/Buttons";
import { ReactComponent as Share } from "../../assets/icons/share-icon.svg";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as LikeFill } from "../../assets/icons/like-fill.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import Cast from "./Cast";

function MoviePage({ watchlist, movie, onWatchlist }) {
  const [isLike, setIsLike] = useState(false);

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
      <section className="movie-page-section">Movie Page</section>
    </main>
  );
}

export default MoviePage;
