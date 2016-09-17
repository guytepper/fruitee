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


export default class Combination {
  static check(types) {
    if ( types.length === 1 ) {
      return { combination: true }
    }

    if ( types.includes('melon') && types.length > 1) {
      return { combination: false, message: 'Melons are best eaten alone.'}
    }

    const combination = combinations[this.types];

    if ( combination ) {
      return combination;
    }

    console.log('Huston, we have a problem - NO COMBINATION WAS FOUND!!');

  }
}
