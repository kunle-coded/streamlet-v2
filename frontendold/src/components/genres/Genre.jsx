import React from "react";
import "./genre.css";

function Genre({
  genre = true,
  label = false,
  divider = false,
  duration = false,
  year = false,
  movie,
  live = false,
}) {
  const type = movie.title ? "Movie" : "Series";
  const genres = movie && movie.genres;

  function secondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }

  const totalSeconds = movie.runtime * 60;
  const { hours, minutes } = secondsToHoursMinutes(totalSeconds);

  // const genres = movie.genres;
  let releaseDate;

  if (genres) {
    releaseDate = movie.release_date
      ? movie.release_date.split("-")[0]
      : movie.first_air_date.split("-")[0];
  }

  const labelStyle = {
    paddingTop: "5px",
  };

  return (
    <div className="genre-label">
      {label && (
        <span style={labelStyle}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9017 0.185059H2.46833C1.86275 0.185059 1.28198 0.425623 0.85377 0.853831C0.425562 1.28204 0.184998 1.86281 0.184998 2.46839V12.9017C0.184998 13.5073 0.425562 14.0881 0.85377 14.5163C1.28198 14.9445 1.86275 15.1851 2.46833 15.1851H12.9017C13.5072 15.1851 14.088 14.9445 14.5162 14.5163C14.9444 14.0881 15.185 13.5073 15.185 12.9017V2.46839C15.185 1.86281 14.9444 1.28204 14.5162 0.853831C14.088 0.425623 13.5072 0.185059 12.9017 0.185059ZM3.51833 6.85173H1.85166V5.18506H3.51833V6.85173ZM1.85166 8.51839H3.51833V10.1851H1.85166V8.51839ZM13.5183 6.85173H11.8517V5.18506H13.5183V6.85173ZM11.8517 8.51839H13.5183V10.1851H11.8517V8.51839ZM13.5183 2.46839V3.51839H11.8517V1.85173H12.9017C12.9826 1.85173 13.0628 1.86768 13.1377 1.89867C13.2125 1.92966 13.2804 1.97508 13.3377 2.03234C13.395 2.08961 13.4404 2.15759 13.4714 2.2324C13.5024 2.30722 13.5183 2.38741 13.5183 2.46839ZM2.46833 1.85173H3.51833V3.51839H1.85166V2.46839C1.85166 2.38741 1.86761 2.30722 1.89861 2.2324C1.9296 2.15759 1.97502 2.08961 2.03228 2.03234C2.08954 1.97508 2.15753 1.92966 2.23234 1.89867C2.30716 1.86768 2.38735 1.85173 2.46833 1.85173ZM1.85166 12.9017V11.8517H3.51833V13.5184H2.46833C2.30478 13.5184 2.14793 13.4534 2.03228 13.3378C1.91663 13.2221 1.85166 13.0653 1.85166 12.9017ZM13.5183 12.9017C13.5183 13.0653 13.4534 13.2221 13.3377 13.3378C13.2221 13.4534 13.0652 13.5184 12.9017 13.5184H11.8517V11.8517H13.5183V12.9017Z"
              fill="#9CA4AB"
            />
          </svg>
        </span>
      )}
      {divider && <span> | </span>}
      {duration && (
        <span>
          {hours}h{minutes}m &#8226;{" "}
        </span>
      )}
      {year && <span>{releaseDate} &#8226; </span>}
      {genres &&
        genres.map((genre, i) => (
          <React.Fragment key={i}>
            {" "}
            {live ? (
              i < 2 && <span>{genre.name}</span>
            ) : (
              <span>{genre.name}</span>
            )}
            {live
              ? i < 1 && <span> &#8226; </span>
              : i < genres.length - 1 && <span> &#8226; </span>}
          </React.Fragment>
        ))}
      {!genre && <span>{type}</span>}
    </div>
  );
}

export default Genre;
