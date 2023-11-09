/* eslint-disable react/prop-types */
import { Footer, Header, Main, Navbar, Slider } from "../components";
import { useMovies } from "../contexts/MoviesContext";

function HomeScreen() {
  return (
    <div className="app">
      <Header>
        <Navbar />
        <Slider />
      </Header>
      <Main />
      <Footer />
    </div>
  );
}

export default HomeScreen;
