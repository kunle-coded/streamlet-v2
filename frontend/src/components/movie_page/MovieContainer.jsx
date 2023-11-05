import { Outlet } from "react-router-dom";

function MovieContainer() {
  return (
    <div className="movie-page">
      <Outlet />
    </div>
  );
}

export default MovieContainer;
