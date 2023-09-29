import React from "react";
import "./section.css";

function Section({ title, children }) {
  return (
    <section className="popular">
      <div className="section-title">
        <h2>{title}</h2>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}

export default Section;
