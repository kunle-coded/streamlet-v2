import React from "react";
import "./main.css";
import Poster from "../poster/Poster";
import Section from "../section/Section";

function Main({ newMovies }) {
  return (
    <main className="main-section">
      <Section title="New Release">
        {newMovies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Section>
      <Section title="Popular This Week"></Section>
    </main>
  );
}
export default Main;
