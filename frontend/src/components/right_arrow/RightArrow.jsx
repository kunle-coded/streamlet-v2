import React from "react";

function RightArrow({
  top = "0",
  right = "0",
  btnTop = "20%",
  slide = false,
  onClick,
}) {
  const btnStyle = {
    right: right,
    top: top,
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
            d="M1 1L8.5 8.5L1 16"
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
    <div className="btn_arrow btn_right" style={btnStyle}>
      <button className="arrow right" onClick={onClick} style={arrowStyle}>
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L8.5 8.5L1 16"
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

export default RightArrow;
