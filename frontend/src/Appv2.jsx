import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ModalScreen from "./screens/ModalScreen";
import SearchScreen from "./screens/SearchScreen";
import AboutScreen from "./screens/AboutScreen";
import { useReducer } from "react";

const initialState = {
  movies: {},
  series: {},
};

function reducer(state, action) {
  console.log(state, action);
}

function Appv2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="movie" element={<MovieScreen />} />
          <Route path="login" element={<ModalScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="about" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Appv2;
