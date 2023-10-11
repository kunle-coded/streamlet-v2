function useWatchlistMarker(watchlist, movie) {
  let watchlisted;
  watchlist.forEach((watched) => {
    if (watched._id === movie._id) {
      watchlisted = movie;
    }
  });
  return watchlisted;
}

export default useWatchlistMarker;
