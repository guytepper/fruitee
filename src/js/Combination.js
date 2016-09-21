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
    const types = list.types,
    	  combination = combinations[types];
	
    // Check there's no more than 3 fruits on the list
    if ( list.length > 3 ) {
      return { combination: false, message: '' };
    }
  
    // Check if there's only one melon type on the list
    if ( types.includes('melon') && list.length > 1 ) {
      return { combination: false, message: 'Melons are best eaten alone.' };
    }
  
  	// Check if contains only one type
    if ( types.length === 1 && !types.includes('melon')) {
      return { combination: true }
    }
    
    // Check if combination object exists for the current types
    if ( combination ) {
      return combination;
    }

	// Check if list contains any fruits and fats
    if ( list.has('fruits') && types.includes('fat') ) {
      return { combination: false, message: '' };
    }

    console.log('%c No combination exists! Needs to take care of that huston!',
                'background: #222; color: #bada55');
  }
}
