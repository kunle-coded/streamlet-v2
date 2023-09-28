import React from "react";
import "./genre.css";

function Genre({ children }) {
  let child1, child2;
  if (children.length > 1) {
    child1 = children[0];
    child2 = children[1];
  } else {
    child1 = children;
  }
  return (
    <div className="genre-label">
      <span> | </span>
      <span>{child1}</span>
      {child2 && <span> · </span>}
      {child2 && <span> {child2}</span>}
    </div>
  );
}

export default Genre;
