import React, { useState } from "react";

function TextReveal({ fontSize = "14px", children }) {
  const [isShow, setIsShow] = useState(false);

  let text;

  if (children) {
    text = isShow
      ? children
      : children.split(" ").slice(0, 30).join(" ") + "...";
  }

  const textStyle = {
    fontSize: fontSize,
  };

  function handleShowText() {
    setIsShow((show) => !show);
  }

  return (
    <p style={textStyle}>
      {text}{" "}
      <span className="read-more" onClick={handleShowText}>
        {isShow ? "Read less" : "Read more"}
      </span>
    </p>
  );
}

export default TextReveal;
