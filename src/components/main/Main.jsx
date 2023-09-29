import React, { useRef } from "react";
import "./main.css";
import Poster from "../poster/Poster";
import Section from "../section/Section";
import Card from "../cards/Card";

function Main({ newMovies, popular, onSlide }) {
  return (
    <main className="main-section">
      <Section title="New Release">
        {newMovies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Section>
      <Section
        title="Popular This Week"
        gap="50px"
        slide={true}
        onSlide={onSlide}
      >
        {popular.map((movie, i) => (
          <Card key={movie.id} movie={movie} index={i} slide={true} />
        ))}
      </Section>
    </main>
  );
}
export default Main;
