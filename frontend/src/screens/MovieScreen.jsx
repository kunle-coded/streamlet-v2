/* eslint-disable react/prop-types */
import { Footer, Header, MoviePage, Navbar } from "../components";

function MovieScreen() {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar />
      </Header>
      <MoviePage />
      <Footer />
    </div>
  );
}

export default MovieScreen;
