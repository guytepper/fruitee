export default class Combination {
  static generateMessage(list, ...types) {
    const fruitsA = list.getFruitsOfType({ type: types[0], onlyNames: true });
    const fruitsB = list.getFruitsOfType({ type: types[1], onlyNames: true });
    return `Combining ${types[0]} fruits (${fruitsA}) and ${types[1]} fruits (${fruitsB}) is not optimal.`;
  }

  static check(list) {
    const types = list.types;
    let result = { combination: true, fruits: list };

    if ( types.includes('melon') && list.length > 1) {
      result.combination = false;
      result.message = '';
      return result;
    }

    if ( types.includes('sweet') && (types.includes('acid') || types.includes('acid-veggie')) ) {
      result.combination = false;
      result.message = '';
      return result;
    }

    if ( types.includes('sweet') && types.includes('fat') ) {
      result.combination = false;
      result.message = '';
      return result;
    }

    return result;

    console.log('%c No combination exists! Needs to take care of that huston!',
                'background: #222; color: #bada55');
  }
}
