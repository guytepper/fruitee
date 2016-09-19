// This file contains all the possible fruit combinations.
// * Fruit types should be sorted (A-Z), since the array that will be checked
//   against will be sorted.
// * When an combination is FALSE - add an info message to explain why it's bad.

let combinations = {};

combinations[['melon']] = {
  combination: true
};

combinations[['acid', 'sweet']] = {
  combination: false,
  message: ''
};

combinations[['acid', 'sub-acid', 'sweet']] = {
  combination: false,
  message: ''
};

combinations[['acid', 'sub-acid']] = {
  combination: true,
  message: ''
};

combinations[['sub-acid', 'sweet']] = {
  combination: true,
  message: ''
};

export default class Combination {
  static check(list) {
    const types = list.types;

  	// TODO: Improve melon type checking & check for when theres more than 3 fruits of the same type
  	// If contains only one type, this is a great combination
    if ( types.length === 1 && !types.includes('melon')) {
      return { combination: true }
    }

	// TODO: check that there's no more than 2 melons in fruits list
    if ( types.includes('melon') && types.length > 1) {
      return { combination: false, message: 'Melons are best eaten alone.'}
    }

    if (list.has('fruits') && types.includes('fat')) {
      // return false
    }

    const combination = combinations[types];

    if ( combination ) {
      return combination;
    }

    console.log('%c No combination exists! Needs to take care of that huston!',
                'background: #222; color: #bada55');
  }
}
