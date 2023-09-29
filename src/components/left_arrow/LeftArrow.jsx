import React from "react";

function LeftArrow({ onClick }) {
  return (
    <button className="arrow " onClick={onClick}>
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

export default LeftArrow;
