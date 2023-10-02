function useWatchlistMarker(watchlist, movie) {
  let watchlisted;
  watchlist.forEach((watched) => {
    if (watched.title === movie.title) {
      watchlisted = movie;
    }
  });
  return watchlisted;
}

export default useWatchlistMarker;
