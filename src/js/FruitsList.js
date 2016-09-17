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

    super.push(fruit);
  }

  get types() {
    // Check if fruits list has changed (cache result if it has)
    if (this.cachedList != this) {
      this.cachedList = this;
      this.typesList = new Set(this.map(fruit => fruit.type));
    }
    return this.typesList;
  }

  get melon() {
    return this.types.has('melon');
  }
}
