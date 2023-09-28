import React from "react";
import "./main.css";
import Poster from "../poster/Poster";

function Main({ newMovies }) {
  return (
    <main className="main-section">
      <section className="new-release">
        <div className="section-title">
          <h2>New Release</h2>
        </div>
        <div className="section-content">
          {newMovies.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
