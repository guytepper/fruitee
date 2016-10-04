export default class Combination {
  static generateMessage(list, ...types) {
    const fruitsA = list.getFruitsOfType({ type: types[0], onlyNames: true });
    const fruitsB = list.getFruitsOfType({ type: types[1], onlyNames: true });
    return `Combining ${types[0]}s (${fruitsA}) and ${types[1]}s (${fruitsB}) is not optimal.`;
  }

  static check(fruitsList) {
    const types = fruitsList.types;
    let combination = { status: true, fruits: fruitsList.list, message: '' };

    if ( types.includes('melon') && fruitsList.list.length > 1) {
      combination.status = false;
      combination.message = '';
      return combination;
    }

    if ( types.includes('sweet') && types.includes('acid') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid');
      return combination;
    }

    if ( types.includes('sweet') && types.includes('acid-veggie') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid-veggie');
      return combination;
    }

    if ( types.includes('sweet') && types.includes('fat') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'fat');
      return combination;
    }

    return combination;

    console.log('%c No combination exists! Needs to take care of that huston!',
                'background: #222; color: #bada55');
  }
}
