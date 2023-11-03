// trim array to any desired length. Returns an array with specified number length.
// Parameters: array (array to trim), number (length of new array)
// Return: new array with elements from the beginning of the original array to the index of specified number

const useTrimArrays = function (array, number) {
  let trimedMovies = [];
  for (let i = 0; i < number; i++) {
    trimedMovies.push(array[i]);
  }

  return trimedMovies;
};

export default useTrimArrays;
