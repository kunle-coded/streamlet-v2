import React from "react";
import "./header.css";
import Navbar from "../navbar/Navbar";
import Slider from "../slider/Slider";

function Header({ children }) {
  return <header className="header">{children}</header>;
}
export default Header;
