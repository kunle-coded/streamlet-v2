/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./movie_page.css";
import Buttons from "../buttons/Buttons";

// import { ReactComponent as Like } from "/like.svg";
// import { ReactComponent as LikeFill } from "/like-fill.svg";
// import { ReactComponent as Download } from "/download.svg";
import Cast from "./Cast";
import { BigCard, Section } from "..";
import Slide from "../slider/Slide";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function MoviePage({
  watchlist,
  movie,
  series,
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

  const similarMovies = movie.title ? movies : series;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPageTop]);

  useEffect(() => {
    const isLiked = likes.some((likedMovie) => likedMovie.id === movie.id);
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
              <svg
                width="13"
                height="14"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 14V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V14M4 8L9 13M9 13L14 8M9 13V1"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
              <svg
                width="12"
                height="12"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3387 10.027C12.8464 10.0302 12.3609 10.1425 11.9171 10.3557C11.4733 10.569 11.0823 10.8779 10.7721 11.2603L6.52208 9.30195C6.7219 8.69007 6.7219 8.03049 6.52208 7.41862L10.7721 5.46028C11.2734 6.06526 11.9724 6.47368 12.7455 6.61348C13.5187 6.75328 14.3164 6.61547 14.9979 6.22437C15.6793 5.83327 16.2007 5.21401 16.47 4.4759C16.7394 3.73779 16.7393 2.92827 16.4698 2.19021C16.2004 1.45214 15.6789 0.832987 14.9973 0.442008C14.3158 0.0510287 13.5181 -0.086638 12.7449 0.0533039C11.9718 0.193246 11.2729 0.6018 10.7717 1.20686C10.2705 1.81193 9.99906 2.5746 10.0054 3.36028C10.0079 3.55881 10.0274 3.75676 10.0637 3.95195L5.66375 5.97695C5.19465 5.51827 4.60062 5.20821 3.95609 5.08564C3.31155 4.96307 2.64518 5.03342 2.04046 5.28789C1.43573 5.54237 0.91955 5.96963 0.556582 6.51617C0.193613 7.0627 0 7.7042 0 8.36028C0 9.01637 0.193613 9.65786 0.556582 10.2044C0.91955 10.7509 1.43573 11.1782 2.04046 11.4327C2.64518 11.6871 3.31155 11.7575 3.95609 11.6349C4.60062 11.5124 5.19465 11.2023 5.66375 10.7436L10.0637 12.7686C10.0274 12.9638 10.0079 13.1618 10.0054 13.3603C10.0054 14.0196 10.2009 14.664 10.5672 15.2122C10.9335 15.7603 11.4541 16.1876 12.0631 16.4399C12.6722 16.6922 13.3424 16.7582 13.989 16.6296C14.6357 16.501 15.2296 16.1835 15.6958 15.7173C16.1619 15.2511 16.4794 14.6572 16.608 14.0106C16.7367 13.364 16.6706 12.6938 16.4183 12.0847C16.1661 11.4756 15.7388 10.955 15.1906 10.5887C14.6425 10.2224 13.998 10.027 13.3387 10.027ZM13.3387 1.69362C13.6684 1.69362 13.9906 1.79137 14.2647 1.9745C14.5388 2.15764 14.7524 2.41793 14.8785 2.72248C15.0047 3.02702 15.0377 3.36213 14.9734 3.68543C14.9091 4.00874 14.7503 4.30571 14.5173 4.5388C14.2842 4.77188 13.9872 4.93062 13.6639 4.99493C13.3406 5.05924 13.0055 5.02623 12.7009 4.90008C12.3964 4.77394 12.1361 4.56032 11.953 4.28623C11.7698 4.01215 11.6721 3.68992 11.6721 3.36028C11.6721 2.91826 11.8477 2.49433 12.1602 2.18177C12.4728 1.86921 12.8967 1.69362 13.3387 1.69362ZM3.33875 10.027C3.00911 10.027 2.68688 9.9292 2.4128 9.74607C2.13872 9.56293 1.92509 9.30263 1.79895 8.99809C1.6728 8.69355 1.6398 8.35844 1.70411 8.03513C1.76841 7.71183 1.92715 7.41486 2.16024 7.18177C2.39332 6.94869 2.6903 6.78995 3.0136 6.72564C3.3369 6.66133 3.67201 6.69434 3.97655 6.82048C4.2811 6.94663 4.54139 7.16025 4.72453 7.43433C4.90767 7.70842 5.00541 8.03065 5.00541 8.36028C5.00541 8.80231 4.82982 9.22623 4.51726 9.53879C4.2047 9.85136 3.78078 10.027 3.33875 10.027ZM13.3387 15.027C13.0091 15.027 12.6869 14.9292 12.4128 14.7461C12.1387 14.5629 11.9251 14.3026 11.7989 13.9981C11.6728 13.6935 11.6398 13.3584 11.7041 13.0351C11.7684 12.7118 11.9271 12.4149 12.1602 12.1818C12.3933 11.9487 12.6903 11.79 13.0136 11.7256C13.3369 11.6613 13.672 11.6943 13.9766 11.8205C14.2811 11.9466 14.5414 12.1603 14.7245 12.4343C14.9077 12.7084 15.0054 13.0306 15.0054 13.3603C15.0054 13.8023 14.8298 14.2262 14.5173 14.5388C14.2047 14.8514 13.7808 15.027 13.3387 15.027Z"
                  fill="white"
                />
              </svg>
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
            <span className="like">
              {liked ? (
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 9.5C22 8.39 21.1 7.5 20 7.5H13.68L14.64 2.93C14.66 2.83 14.67 2.72 14.67 2.61C14.67 2.2 14.5 1.82 14.23 1.55L13.17 0.5L6.59 7.08C6.22 7.45 6 7.95 6 8.5V18.5C6 19.0304 6.21071 19.5391 6.58579 19.9142C6.96086 20.2893 7.46957 20.5 8 20.5H17C17.83 20.5 18.54 20 18.84 19.28L21.86 12.23C21.95 12 22 11.76 22 11.5V9.5ZM0 20.5H4V8.5H0V20.5Z"
                    fill="#fff"
                  />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="23"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.35981 9.49502V16.652H4.38981L4.54281 16.67C7.35581 17.326 9.21981 17.799 10.1488 18.092C11.3828 18.481 11.8428 18.576 12.6798 18.632C13.3058 18.675 14.0168 18.434 14.3408 18.104C14.5198 17.922 14.6538 17.548 14.7068 16.968C14.7178 16.8464 14.7613 16.73 14.8327 16.6309C14.9041 16.5319 15.0009 16.4538 15.1128 16.405C15.3618 16.297 15.5688 16.121 15.7418 15.865C15.9018 15.631 16.0058 15.195 16.0248 14.564C16.0281 14.448 16.061 14.3348 16.1204 14.235C16.1797 14.1353 16.2635 14.0523 16.3638 13.994C16.9458 13.657 17.2338 13.277 17.2938 12.831C17.3598 12.338 17.1998 11.783 16.7808 11.151C16.6825 11.0028 16.6459 10.8221 16.6788 10.6473C16.7116 10.4725 16.8114 10.3174 16.9568 10.215C17.3578 9.93302 17.5778 9.54102 17.6328 8.98502C17.7208 8.09902 17.1558 7.44402 15.8768 7.31302C14.7377 7.20035 13.5875 7.29625 12.4828 7.59602C12.3575 7.62877 12.2254 7.62504 12.1021 7.58529C11.9789 7.54553 11.8695 7.47139 11.787 7.37159C11.7044 7.27179 11.652 7.15049 11.6361 7.02195C11.6201 6.89341 11.6412 6.76299 11.6968 6.64602C12.1968 5.58802 12.4748 4.71502 12.5398 4.03902C12.6248 3.14202 12.4178 2.49202 11.9338 1.95602C11.5668 1.55002 10.9798 1.31802 10.7598 1.36602C10.4698 1.42802 10.2808 1.59602 10.0348 2.18402C9.88981 2.53202 9.81981 2.82802 9.69981 3.51902C9.58481 4.17502 9.52181 4.47102 9.39081 4.85902C8.99581 6.03502 8.02681 7.25402 6.72581 8.09502C5.814 8.68373 4.82581 9.14469 3.78881 9.46502C3.72402 9.48499 3.6566 9.4951 3.58881 9.49502H1.35981ZM1.31781 18.015C0.994807 18.024 0.704807 17.952 0.461807 17.782C0.151807 17.565 0.00580697 17.223 0.00280697 16.829L0.00580697 9.50602C-0.028193 9.11602 0.086807 8.75802 0.358807 8.49202C0.613807 8.24202 0.946807 8.12402 1.29881 8.13202H3.48381C4.36766 7.85039 5.21033 7.45294 5.98981 6.95002C7.03781 6.27202 7.80981 5.30002 8.10481 4.42402C8.20581 4.12202 8.25981 3.87202 8.36181 3.28402C8.49981 2.49502 8.58581 2.12802 8.78381 1.65602C9.19381 0.674018 9.73181 0.194018 10.4738 0.0330184C11.2038 -0.124982 12.2668 0.296018 12.9388 1.04002C13.6838 1.86402 14.0128 2.89502 13.8908 4.16902C13.8388 4.71702 13.6868 5.33002 13.4368 6.01302C14.2906 5.8886 15.1564 5.86979 16.0148 5.95702C18.0218 6.16202 19.1488 7.46902 18.9848 9.12102C18.9128 9.83302 18.6548 10.438 18.2158 10.913C18.5848 11.624 18.7318 12.327 18.6398 13.013C18.5338 13.803 18.0938 14.461 17.3618 14.972C17.3048 15.665 17.1458 16.218 16.8638 16.632C16.6416 16.9665 16.3517 17.2506 16.0128 17.466C15.9048 18.15 15.6778 18.685 15.3068 19.061C14.6918 19.687 13.5928 20.06 12.5888 19.992C11.6358 19.928 11.0718 19.812 9.74181 19.392C8.86481 19.115 7.04881 18.655 4.31181 18.015H1.31781ZM3.01881 9.18402C3.01854 9.09455 3.03594 9.00591 3.06999 8.92318C3.10405 8.84045 3.1541 8.76525 3.21727 8.70189C3.28044 8.63854 3.35549 8.58827 3.43812 8.55397C3.52075 8.51967 3.60934 8.50202 3.69881 8.50202C3.78811 8.50228 3.87648 8.52013 3.95888 8.55454C4.04128 8.58896 4.1161 8.63927 4.17905 8.7026C4.24201 8.76593 4.29188 8.84104 4.32581 8.92364C4.35974 9.00624 4.37707 9.09472 4.37681 9.18402V16.862C4.37694 16.9513 4.35948 17.0398 4.32543 17.1223C4.29138 17.2049 4.2414 17.2799 4.17835 17.3431C4.1153 17.4064 4.04041 17.4566 3.95796 17.4909C3.8755 17.5252 3.78711 17.5429 3.69781 17.543C3.60851 17.5429 3.52011 17.5252 3.43766 17.4909C3.35521 17.4566 3.28032 17.4064 3.21727 17.3431C3.15422 17.2799 3.10424 17.2049 3.07019 17.1223C3.03613 17.0398 3.01868 16.9513 3.01881 16.862V9.18402Z"
                    fill="white"
                  />
                </svg>
              )}
            </span>{" "}
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
                {movie.cast &&
                  movie.cast.map((castItem, index) => (
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
                {similarMovies.map((movie, ind) => (
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
