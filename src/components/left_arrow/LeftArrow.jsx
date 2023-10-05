import React from "react";

function LeftArrow({
  top = "0",
  left = "0",
  btnTop = "20%",
  slide = false,
  onClick,
}) {
  const btnStyle = {
    left: left,
  };

  const arrowStyle = {
    top: btnTop,
  };

  if (!slide) {
    return (
      <button className="arrow no-slide" onClick={onClick}>
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 1L1 8.5L8.5 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="btn_arrow" style={btnStyle}>
      <button className="arrow left" onClick={onClick} style={arrowStyle}>
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 1L1 8.5L8.5 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default LeftArrow;
