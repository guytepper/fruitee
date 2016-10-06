// FruitsList acts as an array with additional helper methods.
import Fruit from './Fruit';

export default class FruitsList extends Array {
  constructor() {
    this.list = [];
  }

  push(fruit) {
    // Validate that a fruit object is being added to the array
    if (!(fruit instanceof Fruit)) {
      throw new TypeError(
        `Cannot add '${fruit}' to fruits list: not an instance of Fruit.`
      );
    }

    this.list.push(fruit);
  }

  remove(fruit) {
    this.list.splice(this.list.indexOf(fruit), 1);
  }

  // Returns array contains all fruit types
  get types() {
    return this.list.map(fruit => fruit.type);
  }

  // Returns array contains unique types
  get uniqueTypes() {
    return this.types.filter((type, i, a) => a.indexOf(type) === i);
  }

  has(type) {
    switch (type) {
      case 'fruits':
        return this.types.includes('sweet') ||
               this.types.includes('acid')  ||
               this.types.includes('sub-acid');
      case 'fats':
        // TODO: Create a new object prop the includes all fruit types
    }
  }

  getFruitsOfType({ type, onlyNames = false }) {
    let filteredList = this.list.filter( fruit => fruit.type === type );

    // Return only the fruit names
    if ( onlyNames ) {
      filteredList = filteredList.map( fruit => fruit.name );
    }

    return filteredList
  }
}
