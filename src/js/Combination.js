export default class Combination {
  static generateMessage(list, ...types) {
    const fruitsA = list.getFruitsOfType({ type: types[0] });
    const fruitsB = list.getFruitsOfType({ type: types[1] });
    return `Combining ${types[0]}s (${fruitsA}) and ${types[1]}s (${fruitsB}) is not optimal.`;
  }

  static check(fruitsList) {
    const list = fruitsList.list;
    let combination = { status: true, fruits: list, message: '' };

    if ( fruitsList.has('melon') && list.length > 1) {
      combination.status = false;
      const melonsName = fruitsList.getFruitsOfType({ type: 'melon' });
      combination.message = `Melons (${melonsName})  should be eaten as a mono meal, without any other food.`;
      return combination;
    }

    if ( fruitsList.has('sweet') && fruitsList.has('acid') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid');
      return combination;
    }

    if ( fruitsList.has('sweet') && fruitsList.has('acid-veggie') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid-veggie');
      return combination;
    }

    if ( fruitsList.has('sweet') && fruitsList.has('fat') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'fat');
      return combination;
    }

    if ( fruitsList.has('fats') ) {
      combination.status = false;
      const fatNames = fruitsList.getFruitsOfType({ type: 'fat' });
      combination.message = `Combining more than one fat (${fatNames}) in a meal is not optimal.`;
      return combination;
    }

    if ( fruitsList.has('starchy') && fruitsList.has('fruits') ) {
      combination.status = false;
      const starchyNames = fruitsList.getFruitsOfType({ type: 'starchy' });
      combination.message = `Combining strachy vegetables (${starchyNames}) and fruits is not optimal.`;
      return combination;
    }

    if ( fruitsList.has('starchy') && fruitsList.has('fat') ) {
      combination.status = false;
      const starchyNames = fruitsList.getFruitsOfType({ type: 'starchy' });
      const fatNames = fruitsList.getFruitsOfType({ type: 'fat' });
      combination.message = `Combining strachy vegetables (${starchyNames}) and fats (${fatNames}) is not optimal.`;
      return combination;
    }

    if ( fruitsList.has('cruci') && fruitsList.has('fruits') ) {
      combination.status = false;
      const cruciNames = fruitsList.getFruitsOfType({ type: 'cruci' });
      combination.message = `Combining cruciferous vegetables (${cruciNames}) and fruits is not optimal.`;
      return combination;
    }

    return combination;
  }
}
