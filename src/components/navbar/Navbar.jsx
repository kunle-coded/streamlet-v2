import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/Streamlet.svg";
import Buttons from "../buttons/Buttons";

function Navbar() {
  const [isExpanded, setExpanded] = useState(false);

  function handleSignup() {
    console.log("sign up");
  }
  function handleLogin() {
    console.log("login");
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-links">
        <ul className="nav-links_items">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#discover">Discover</a>
          </li>
          <li>
            <a href="#new-release">New Release</a>
          </li>
          <li>
            <a href="#forum">Forum</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </div>
      <div className="nav-search-area">
        <div className="search-area ">
          <input
            type="text"
            placeholder="Search movies..."
            className={`search-input ${isExpanded ? "reveal" : ""}`}
          />
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setExpanded((exp) => !exp)}
          >
            <path
              d="M15.11 15.11L19.48 19.48"
              stroke="white"
              strokeWidth="2.16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 9.49143C2 13.6288 5.35402 16.9829 9.49143 16.9829C11.5637 16.9829 13.4395 16.1414 14.7957 14.7816C16.1473 13.4266 16.9829 11.5566 16.9829 9.49143C16.9829 5.35402 13.6288 2 9.49143 2C5.35402 2 2 5.35402 2 9.49143Z"
              stroke="white"
              strokeWidth="2.16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="login-buttons">
          <Buttons onClick={handleSignup}>Sign up</Buttons>
          <Buttons
            background="#00925d"
            border={false}
            borderRadius="6px"
            color="#fff"
            onClick={handleLogin}
          >
            Login
          </Buttons>
        </div>
        <div className="profile-buttons"></div>
      </div>
    </nav>
  );
}
export default Navbar;
