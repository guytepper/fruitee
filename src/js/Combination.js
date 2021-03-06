export default class Combination {
  // Generate message for combination error
  static generateMessage(list, ...types) {
    const fruitsA = list.getFruitsOfType({ type: types[0] });
    const fruitsB = list.getFruitsOfType({ type: types[1] });
    return `Combining ${types[0]}s (${fruitsA}) and ${types[1]}s (${fruitsB}) is not optimal.`;
  }

  // Check combination for fruits currently in FruitsList
  static check(fruitsList) {
    const list = fruitsList.list;
    let combination = { status: true, fruits: list, message: '' };

	// Check if there are more than 3 fruits
	if ( list.length > 3 ) {
	  combination.status = false;
      combination.message = `Combining more than 3 fruits in a meal is not optimal.`;
      return combination;
	}

	// Check if a melon is combined with other fruits
    if ( fruitsList.has('melon') && list.length > 1) {
      combination.status = false;
      const melonsName = fruitsList.getFruitsOfType({ type: 'melon' });
      combination.message = `Melons (${melonsName})  should be eaten as a mono meal, without any other food.`;
      return combination;
    }

	// Check if sweet fruits are being combined with acids
    if ( fruitsList.has('sweet') && fruitsList.has('acid') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid');
      return combination;
    }

	// Check if sweets fruits are being combined with acid veggies
    if ( fruitsList.has('sweet') && fruitsList.has('acid-veggie') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'acid-veggie');
      return combination;
    }

	// Check if sweet fruits are being combined with fats
    if ( fruitsList.has('sweet') && fruitsList.has('fat') ) {
      combination.status = false;
      combination.message = this.generateMessage(fruitsList, 'sweet', 'fat');
      return combination;
    }

	// Check if 2 (or more) type of fats are being combined
    if ( fruitsList.has('fats') ) {
      combination.status = false;
      const fatNames = fruitsList.getFruitsOfType({ type: 'fat' });
      combination.message = `Combining more than one fat (${fatNames}) in a meal is not optimal.`;
      return combination;
    }

	// Check if starchies and fruits are being combined
    if ( fruitsList.has('starchy') && fruitsList.has('fruits') ) {
      combination.status = false;
      const starchyNames = fruitsList.getFruitsOfType({ type: 'starchy' });
      combination.message = `Combining strachy vegetables (${starchyNames}) and fruits is not optimal.`;
      return combination;
    }

	// Check if starchies and fats are being combined
    if ( fruitsList.has('starchy') && fruitsList.has('fat') ) {
      combination.status = false;
      const starchyNames = fruitsList.getFruitsOfType({ type: 'starchy' });
      const fatNames = fruitsList.getFruitsOfType({ type: 'fat' });
      combination.message = `Combining strachy vegetables (${starchyNames}) and fats (${fatNames}) is not optimal.`;
      return combination;
    }

	// Check if cruciferous veggie and fruits are being combined
    if ( fruitsList.has('cruci') && fruitsList.has('fruits') ) {
      combination.status = false;
      const cruciNames = fruitsList.getFruitsOfType({ type: 'cruci' });
      combination.message = `Combining cruciferous vegetables (${cruciNames}) and fruits is not optimal.`;
      return combination;
    }

    return combination;
  }
}
