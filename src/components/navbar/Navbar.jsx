import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/Streamlet.svg";
import Buttons from "../buttons/Buttons";
import { ReactComponent as Bell } from "../../assets/icons/bell.svg";
import { ReactComponent as UserProfile } from "../../assets/icons/user-icon.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow_down.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as LikeFill } from "../../assets/icons/like-icon.svg";
import { ReactComponent as BookmarkSmall } from "../../assets/icons/bookmark-small.svg";

function Navbar({
  watchlist,
  likes,
  isLogin,
  onLogin,
  onSignup,
  onLogout,
  isDropdown,
  onDropdown,
  onBack,
  onDropdownGlobal,
  searchQuery,
  onSearch,
  onMovieSearch,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [isNotify, setNotify] = useState(false);
  const [watchlistCounter, setWatchlistCounter] = useState(0);
  const [likesCounter, setLikesCounter] = useState(0);

  useEffect(() => {
    if (watchlist) {
      if (watchlist.length >= 1) {
        setNotify(true);
      }
    } else {
      setNotify(false);
    }

    if (watchlist) {
      const watchlistCount = watchlist.length;
      setWatchlistCounter(watchlistCount);
    }

    if (likes) {
      const likesCount = likes.length;
      setLikesCounter(likesCount);
    }
  }, [watchlist, likes]);

  function handleSearch() {
    setExpanded((exp) => !exp);

    if (searchQuery) {
      onMovieSearch();
    }
  }

  return (
    <nav className="navbar" onClick={onDropdownGlobal}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-links">
        <ul className="nav-links_items">
          <li onClick={onBack}>
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
            value={searchQuery}
            placeholder="Search movies..."
            className={`search-input ${isExpanded ? "reveal" : ""}`}
            onChange={(e) => onSearch(e.target)}
          />
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearch}
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
        {!isLogin && (
          <div className="login-buttons">
            <Buttons onClick={onSignup}>Sign up</Buttons>
            <Buttons
              background="#00925d"
              border={false}
              borderRadius="6px"
              color="#fff"
              onClick={onLogin}
            >
              Login
            </Buttons>
          </div>
        )}
        {isLogin && (
          <div className="profile-buttons">
            <div className="notification">
              <Bell />
              {isNotify ? <div className="notification-icon"></div> : null}
            </div>
            <div className="user-profile">
              <span>
                <UserProfile />
              </span>
              <span onClick={onDropdown}>
                {isDropdown ? <ArrowUp /> : <ArrowDown />}
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`drop-down ${
          isDropdown ? "open-dropdown" : "close-dropdown"
        }`}
      >
        {isDropdown && (
          <ul
            className={`dropdown-items ${
              isDropdown ? "reveal-dropdown" : "hide-dropdown"
            }`}
          >
            <li className="dropdown-item">Profile </li>
            <li className="dropdown-item">
              My Watchlist <span>{watchlistCounter}</span>
            </li>
            <li className="dropdown-item">
              Likes <span>{likesCounter}</span>
            </li>
            <li className="dropdown-item">Settings</li>
            <li className="dropdown-item" onClick={onLogout}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
