/* eslint-disable react/prop-types */
import { Footer, Header, Navbar, Search } from "../components";
import Searchv2 from "../components/search_page/Searchv2";

function SearchScreen({
  movies,
  query,
  searchQuery,
  watchlist,
  userRating,
  onRate,
  onWatchlist,
  isLoading,
  onSearchQuery,
  onSearch,
  status,
  onDropdown,
  isDropdown,
}) {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar
          isLogin={status}
          watchlist={watchlist}
          searchQuery={query}
          onSearchQuery={onSearchQuery}
          onMovieSearch={onSearch}
          onDropdown={onDropdown}
          isDropdown={isDropdown}
        />
      </Header>
      <Searchv2
        movies={movies}
        query={searchQuery}
        watchlist={watchlist}
        onWatchlist={onWatchlist}
        isLoading={isLoading}
        onRate={onRate}
        userRating={userRating}
      />
      <Footer />
    </div>
  );
}

export default SearchScreen;
