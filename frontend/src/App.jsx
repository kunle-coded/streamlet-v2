import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ModalScreen from "./screens/ModalScreen";
import SearchScreen from "./screens/SearchScreen";
import AboutScreen from "./screens/AboutScreen";

import { LoginForm, Success } from "./components";
import SignupForm from "./components/forms/SignupForm";
import VideoScreen from "./screens/VideoScreen";
import "./App.css";
import { MoviesProvider } from "./contexts/MoviesContext";
import { FormProvider } from "./contexts/FormContext";

function App() {
  return (
    <div className="app">
      <MoviesProvider>
        <FormProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="movie/:id" element={<MovieScreen />} />
            <Route path="/" element={<ModalScreen />}>
              <Route path="user/login" element={<LoginForm />} />
              <Route path="user/signup" element={<SignupForm />} />
              <Route path="user/success" element={<Success />} />
            </Route>
            <Route path="video/:id" element={<VideoScreen />} />
            <Route path="search/:id" element={<SearchScreen />} />
            <Route path="about" element={<AboutScreen />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </FormProvider>
      </MoviesProvider>
    </div>
  );
}

export default App;
