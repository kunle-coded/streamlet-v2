// trim array to any desired length. Returns an array with specified number length.
// Parameters: array (array to trim), number (length of new array)
// Return: new array with elements from the beginning of the original array to the index of specified number

const useTrimArrays = function (array, start, end) {
  let trimedMovies = [];
  for (let i = start; i < end; i++) {
    trimedMovies.push(array[i]);
    console.log("start x end", i, end);
  }
  console.log("trimedArray", trimedMovies);

  return trimedMovies;
};

export default useTrimArrays;
