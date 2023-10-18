import React from "react";
import "./header.css";

function Header({ slider = true, children }) {
  const headerStyle = {
    height: slider ? "600px" : "",
  };
  return (
    <header className="header" style={headerStyle}>
      {children}
    </header>
  );
}
export default Header;
