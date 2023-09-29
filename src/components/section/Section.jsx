import React from "react";
import "./section.css";

function Section({ title, gap = "15px", children }) {
  const sectionStyle = {
    gap: gap,
  };
  return (
    <section className="section">
      <div className="section-title">
        <h2>{title}</h2>
      </div>
      <div className="section-content" style={sectionStyle}>
        {children}
      </div>
    </section>
  );
}

export default Section;
