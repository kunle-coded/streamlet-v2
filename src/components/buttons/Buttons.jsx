import React from "react";
import "./buttons.css";

function Buttons({
  watchlisted,
  width = "75px",
  height = "32px",
  background = "#0d0c0f",
  border = true,
  borderRadius = "8px",
  color = "#fff",
  borderColor = "",
  fontWeight = "normal",
  padding = "0",
  onClick,
  bookmark = false,
  play = false,
  disabled = false,
  children,
}) {
  const buttonStyle = {
    width: width,
    height: height,
    background: background,
    border: border ? `1px solid ${borderColor ? borderColor : color}` : "none",
    borderRadius: borderRadius,
    color: color,
    fontWeight: fontWeight,
    padding: padding,
  };

  return (
    <button
      className="global-btn"
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
    >
      {play && (
        <span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 0C3.35625 0 0 3.35625 0 7.5C0 11.6438 3.35625 15 7.5 15C11.6438 15 15 11.6438 15 7.5C15 3.35625 11.6438 0 7.5 0ZM5.625 3.75L11.25 7.5L5.625 11.25V3.75Z"
              fill="white"
            />
          </svg>
        </span>
      )}
      {bookmark && (
        <span>
          <svg
            className=""
            width="14"
            height="17"
            viewBox="0 0 14 17"
            fill={watchlisted ? "#fff" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 16V2.66667C1 1.74619 1.74619 1 2.66667 1H11C11.9205 1 12.6667 1.74619 12.6667 2.66667V16L7.73458 12.8294C7.18558 12.4764 6.48108 12.4764 5.93208 12.8294L1 16Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}{" "}
      {children}
    </button>
  );
}
export default Buttons;
