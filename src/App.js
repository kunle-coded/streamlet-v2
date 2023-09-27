import React, { useState } from "react";
import "./App.css";
import { Header, Navbar, Slider } from "./components";
import movieData from "./data";

function App() {
  const [movies, setMovies] = useState(movieData);
  const [login, setLogin] = useState(false);
  return (
    <div>
      <Header>
        <Navbar />
        <Slider slides={movies} />
      </Header>
    </div>
  );
}

export default App;
