// FruitsList acts as an array with additional helper methods
import Fruit from './Fruit';

export default class FruitsList extends Array {
  push(fruit) {
    // Validate that a fruit object is being added to the array
    if (!(fruit instanceof Fruit)) {
      throw new TypeError(
        `Cannot add '${fruit}' to fruits list: not an instance of Fruit.`
      );
    }

    // Push fruit to the array
    super.push(fruit);
  }
}
