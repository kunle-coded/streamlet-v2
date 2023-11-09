/* eslint-disable react/prop-types */
import { Footer, Header, Navbar, Search } from "../components";

function SearchScreen() {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar />
      </Header>
      <Search />
      <Footer />
    </div>
  );
}

export default SearchScreen;
