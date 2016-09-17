// This file contains all the possible fruit combinations.
// * Fruit types should be sorted (A-Z), since the array that will be checked
//   against will be sorted.
// * When an combination is FALSE - add an info message to explain why it's bad.
let combinations = {};

combinations[['melon']] = {
  combination: true
};

combinations[['sweet', 'acid']] = {
  combination: false,
  message: ''
};

export default combinations;
