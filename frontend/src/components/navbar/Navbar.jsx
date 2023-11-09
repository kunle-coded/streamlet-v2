/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import logo from "/Streamlet.svg";
import Buttons from "../buttons/Buttons";
import { NavLink, useNavigate } from "react-router-dom";
import { useMovies } from "../../contexts/MoviesContext";
import { useForms } from "../../contexts/FormContext";

function Navbar() {
  const { watchlist, likes, onCloseDropdown, isDropdown } = useMovies();
  const { status, query, onSearchQuery, onMovieSearch } = useForms();
  const [isExpanded, setExpanded] = useState(false);
  const [isNotify, setNotify] = useState(false);
  const [watchlistCounter, setWatchlistCounter] = useState(0);
  const [likesCounter, setLikesCounter] = useState(0);

  const navigate = useNavigate();
  const inputRef = useRef(null);

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

  useEffect(() => {
    inputRef.current.focus();

    // function callback(e) {
    //   if (e.code === "Enter") {
    //     onMovieSearch();
    //   }
    // }

    // document.addEventListener("keydown", callback);
    // return () => document.addEventListener("keydown", callback);
  }, [isExpanded]);

  function handleSearch() {
    setExpanded((exp) => !exp);

    if (!query) return;

    onMovieSearch();
    navigate(`/search/${query}`);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-links">
        <ul className="nav-links_items">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/discover">Discover</NavLink>
          </li>
          <li>
            <NavLink to="/new">New Release</NavLink>
          </li>
          <li>
            <NavLink to="/forum">Forum</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-search-area">
        <div className="search-area ">
          <input
            type="text"
            value={query}
            placeholder="Search movies..."
            className={`search-input ${isExpanded ? "reveal" : ""}`}
            onChange={(e) => onSearchQuery(e.target.value)}
            ref={inputRef}
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
        {status === "unauthorised" && (
          <div className="login-buttons">
            <Buttons onClick={() => navigate("/user/signup")}>Sign up</Buttons>
            <Buttons
              background="#00925d"
              border={false}
              borderRadius="6px"
              color="#fff"
              onClick={() => navigate("/user/login")}
            >
              Login
            </Buttons>
          </div>
        )}
        {status === "authorised" && (
          <div className="profile-buttons">
            <div className="notification">
              <span>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.53483 17.3306H11.7706C11.6994 18.7028 10.8151 19.577 9.59537 19.577C8.36543 19.577 7.49128 18.7028 7.40997 17.3306H5.82431C5.90563 19.2822 7.44046 21 9.59537 21C11.7401 21 13.2749 19.2822 13.3562 17.3306H17.6457C18.6112 17.3306 19.1806 16.8326 19.1806 16.1007C19.1806 15.0842 18.1539 14.1694 17.2696 13.2648C16.5988 12.5634 16.4158 11.12 16.3447 9.95112C16.2633 5.94627 15.2367 3.35428 12.5228 2.37848C12.1873 1.05712 11.0896 0 9.59537 0C8.09099 0 7.00338 1.05712 6.65778 2.37848C3.95403 3.35428 2.91721 5.94627 2.84608 9.95112C2.76477 11.12 2.59194 12.5634 1.91092 13.2648C1.03678 14.1694 0 15.0842 0 16.1007C0 16.8326 0.579365 17.3306 1.53483 17.3306ZM1.98209 15.7957V15.6738C2.16506 15.3689 2.76477 14.7793 3.3035 14.1796C4.02515 13.3664 4.37076 12.0654 4.46223 10.0731C4.54354 5.64134 5.86495 4.21828 7.61324 3.75072C7.86738 3.68974 7.99952 3.55759 8.00967 3.30345C8.05035 2.23619 8.65006 1.49419 9.59537 1.49419C10.5305 1.49419 11.1404 2.23619 11.1709 3.30345C11.181 3.55759 11.3233 3.68974 11.5775 3.75072C13.3156 4.21828 14.637 5.64134 14.7285 10.0731C14.8098 12.0654 15.1554 13.3664 15.8872 14.1796C16.4158 14.7793 17.0257 15.3689 17.2086 15.6738V15.7957H1.98209Z"
                    fill="white"
                  />
                </svg>
              </span>
              {isNotify ? <div className="notification-icon"></div> : null}
            </div>
            <div className="user-profile">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7667 24.7177V26.3513C21.2557 28.2903 18.1728 29.3421 15.0003 29.3421C11.8278 29.3421 8.74478 28.2903 6.2338 26.3513V24.7177C6.2338 22.3927 7.1574 20.1629 8.80143 18.5189C10.4455 16.8749 12.6753 15.9513 15.0003 15.9513C17.3253 15.9513 19.5551 16.8749 21.1991 18.5189C22.8431 20.1629 23.7667 22.3927 23.7667 24.7177ZM18.1641 6.36966C18.8926 7.09499 19.347 8.05056 19.4497 9.07343C19.5524 10.0963 19.2972 11.1231 18.7274 11.9789C18.1577 12.8346 17.3088 13.4662 16.3255 13.766C15.3422 14.0657 14.2853 14.0152 13.3351 13.6228C12.3849 13.2305 11.6002 12.5207 11.1148 11.6145C10.6294 10.7083 10.4734 9.66178 10.6733 8.65339C10.8733 7.645 11.4168 6.7372 12.2112 6.08476C13.0057 5.43232 14.0019 5.07566 15.0299 5.07558C15.6118 5.07392 16.1884 5.18741 16.7263 5.40951C17.2642 5.6316 17.7528 5.95792 18.1641 6.36966Z"
                    fill="#00925D"
                  />
                  <path
                    d="M15.0002 0.657959C22.9213 0.657959 29.3424 7.07903 29.3424 15.0001C29.3445 17.1928 28.8428 19.3568 27.8761 21.3249C26.9094 23.2931 25.5034 25.0128 23.7667 26.3514V24.7179C23.7667 22.3929 22.8431 20.1631 21.1991 18.5191C19.555 16.875 17.3252 15.9514 15.0002 15.9514C12.6752 15.9514 10.4454 16.875 8.8014 18.5191C7.15737 20.1631 6.23376 22.3929 6.23376 24.7179V26.3514C4.49704 25.0128 3.09108 23.2931 2.12434 21.3249C1.15761 19.3568 0.655956 17.1928 0.658088 15.0001C0.658088 7.07903 7.07916 0.657959 15.0002 0.657959ZM19.4581 9.50403C19.456 8.48224 19.0997 7.49278 18.45 6.70412C17.8004 5.91547 16.8974 5.37637 15.8949 5.17862C14.8925 4.98086 13.8524 5.13668 12.9519 5.61955C12.0514 6.10241 11.3461 6.88246 10.9561 7.82689C10.5661 8.77132 10.5154 9.82174 10.8128 10.7993C11.1102 11.7769 11.7372 12.6211 12.5871 13.1884C13.437 13.7556 14.4572 14.0107 15.4741 13.9103C16.4909 13.8099 17.4415 13.3601 18.1641 12.6376C18.5757 12.2264 18.902 11.7379 19.1241 11.2001C19.3462 10.6623 19.4597 10.0859 19.4581 9.50403Z"
                    fill="#66bd9d"
                  />
                  <path
                    d="M15.0002 0C12.4426 0.000973972 9.9276 0.655669 7.69411 1.90193C5.46061 3.14818 3.58272 4.94464 2.23874 7.12073C0.894752 9.29682 0.129277 11.7803 0.0149905 14.3354C-0.0992961 16.8905 0.441399 19.4325 1.58574 21.7199C2.59971 23.7317 4.05008 25.4919 5.83101 26.8718C8.45724 28.8999 11.6818 30 14.9999 30C18.3181 30 21.5427 28.8999 24.1689 26.8718C25.9501 25.492 27.4007 23.7318 28.4148 21.7199C29.56 19.4326 30.1013 16.8904 29.9874 14.335C29.8735 11.7796 29.1082 9.29568 27.764 7.11933C26.4199 4.94297 24.5416 3.14644 22.3076 1.90039C20.0737 0.654335 17.5582 0.000157294 15.0002 0ZM6.89167 26.0236V24.7178C6.89167 22.5673 7.74597 20.5048 9.26662 18.9842C10.7873 17.4635 12.8497 16.6093 15.0002 16.6093C17.1508 16.6093 19.2132 17.4635 20.7339 18.9842C22.2545 20.5048 23.1088 22.5673 23.1088 24.7178V26.0236C20.7586 27.752 17.9176 28.6843 15.0002 28.6843C12.0829 28.6843 9.24186 27.752 6.89167 26.0236ZM24.4246 24.9216V24.7177C24.4246 19.5211 20.1968 15.2933 15.0002 15.2933C12.5008 15.2934 10.1037 16.2864 8.3363 18.0538C6.56891 19.8213 5.57597 22.2183 5.57588 24.7178V24.9218C4.22519 23.6471 3.15028 22.109 2.41758 20.4024C1.68488 18.6959 1.30996 16.8572 1.316 15C1.316 7.45456 7.45477 1.31579 15.0002 1.31579C22.5457 1.31579 28.6845 7.45456 28.6845 15C28.6905 16.8572 28.3156 18.6958 27.5829 20.4023C26.8502 22.1089 25.7753 23.647 24.4246 24.9216Z"
                    fill="white"
                  />
                  <path
                    d="M15.0298 4.41776C13.8559 4.42009 12.719 4.82925 11.8128 5.57558C10.9066 6.32191 10.2871 7.35926 10.0598 8.51101C9.83244 9.66276 10.0114 10.8577 10.566 11.8924C11.1207 12.927 12.0169 13.7375 13.1019 14.1856C14.187 14.6338 15.3938 14.6921 16.517 14.3505C17.6401 14.0089 18.6102 13.2885 19.2619 12.3121C19.9137 11.3357 20.2069 10.1635 20.0915 8.99523C19.9762 7.82695 19.4595 6.73475 18.6294 5.90461C18.1576 5.43093 17.5965 5.0556 16.9786 4.80037C16.3608 4.54515 15.6983 4.4151 15.0298 4.41776ZM17.6986 12.1725C17.0809 12.7933 16.2669 13.1806 15.3955 13.2683C14.5241 13.3561 13.6492 13.1388 12.9201 12.6535C12.191 12.1683 11.6529 11.4451 11.3974 10.6074C11.1419 9.76971 11.1849 8.86931 11.5191 8.05977C11.8533 7.25023 12.458 6.5817 13.23 6.16817C14.002 5.75465 14.8936 5.62175 15.7527 5.79215C16.6118 5.96254 17.3851 6.42567 17.9409 7.10255C18.4966 7.77944 18.8004 8.62815 18.8003 9.50396C18.8023 9.99953 18.706 10.4906 18.5169 10.9486C18.3278 11.4067 18.0497 11.8227 17.6986 12.1725Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span onClick={onCloseDropdown}>
                {isDropdown ? (
                  <svg
                    width="14"
                    height="6"
                    viewBox="0 0 21 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9.61719L12.0025 2.61975C11.1761 1.79337 9.82387 1.79337 8.99749 2.61975L2 9.61719"
                      stroke="white"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="6"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L11 11L21 1"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
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
            <li className="dropdown-item">Logout</li>
          </ul>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
