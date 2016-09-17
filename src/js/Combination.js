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

combinations[['sweet', 'acid', 'sub-acid']] = {
  combination: false,
  message: ''
};

combinations[['sub-acid', 'acid']] = {
  combination: true,
  message: ''
};

combinations[['sub-acid', 'sweet']] = {
  combination: true,
  message: ''
};

combinations[['sub-acid', 'acid']] = {
  combination: true,
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

    // TODO: OK if combined with veggies - not with fruits
    if ( types.includes('starchy') ) {
      return { combination: false, message: 'Starchy veggies should not be eaten with fruits.'}
    }

    const combination = combinations[this.types];

    if ( combination ) {
      return combination;
    }

    console.log('%c No combination exists! Needs to take care of that huston!',
                'background: #222; color: #bada55');
  }
}
