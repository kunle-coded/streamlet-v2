import React from "react";
import "./main.css";
import Poster from "../poster/Poster";

function Main({ movies }) {
  return (
    <main className="main-section">
      <section className="new-release">
        <div className="section-title">
          <h2>New Release</h2>
        </div>
        <div className="section-content">
          <Poster />
          <Poster />
          <Poster />
          <Poster />
        </div>
      </section>
    </main>
  );
}
export default Main;
