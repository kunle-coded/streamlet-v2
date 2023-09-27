import React from "react";
import "./header.css";
import Navbar from "../navbar/Navbar";
import Slider from "../slider/Slider";

function Header() {
  return (
    <header className="header">
      <Navbar />
      <Slider />
    </header>
  );
}
export default Header;
