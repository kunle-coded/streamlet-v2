function useGenreFetcher(movieData, genres) {
  if (!movieData && !genres) return;

  const updatedMovieData = movieData.map((movie) => {
    const genreArr = movie.genre_ids;
    const movieGenres = [];
    genres.forEach((genre) => {
      for (let i = 0; i < genreArr.length; i++) {
        const genreId = genreArr[i];

        if (genre.id === genreId) {
          movieGenres.push(genre.name);
        }
      }
    });

    return {
      ...movie,
      genres: movieGenres,
    };
  });

  return updatedMovieData;
}

export default useGenreFetcher;
