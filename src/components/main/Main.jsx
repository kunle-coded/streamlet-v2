import React from "react";
import "./main.css";
import Poster from "../poster/Poster";
import Section from "../section/Section";
import Card from "../cards/Card";

function Main({ newMovies, popular }) {
  console.log(popular);
  return (
    <main className="main-section">
      <Section title="New Release">
        {newMovies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Section>
      <Section title="Popular This Week" gap="50px">
        {popular.map((movie, i) => (
          <Card movie={movie} index={i} />
        ))}
      </Section>
    </main>
  );
}
export default Main;
