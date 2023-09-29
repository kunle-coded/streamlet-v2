import React from "react";
import "./buttons.css";

function Buttons({
  width = "75px",
  height = "32px",
  background = "#0d0c0f",
  border = true,
  borderRadius = "8px",
  color = "#fff",
  onClick,
  children,
}) {
  const buttonStyle = {
    width: width,
    height: height,
    background: background,
    border: border ? `1px solid ${color}` : "none",
    borderRadius: borderRadius,
    color: color,
  };

  return (
    <button className="global-btn" style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}
export default Buttons;
