// FruitsList acts as an array with additional helper methods.
import Fruit from './Fruit';

export default class FruitsList extends Array {
  constructor() {
    this.list = [];
  }

  // Add fruit to the list
  push(fruit) {
    // Validate that a fruit object is being added to the array
    if (!(fruit instanceof Fruit)) {
      throw new TypeError(
        `Cannot add '${fruit}' to fruits list: not an instance of Fruit.`
      );
    }

    this.list.push(fruit);
  }

  // Remove fruit from the list
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

  // Check if the list contains the provided type
  has(type) {
    switch (type) {
      case 'sweet':
        return this.types.includes('sweet');
      case 'acid':
        return this.types.includes('acid');
      case 'sub-acid':
        return this.types.includes('sub-acid');
      case 'melon':
        return this.types.includes('melon');
      case 'fat':
        return this.types.includes('fat');
      case 'fats':
        return this.types.filter(t => t === 'fat').length > 1;
      case 'acid-veggie':
        return this.types.includes('acid-veggie');
      case 'fruits':
        return this.types.includes('sweet') ||
               this.types.includes('acid')  ||
               this.types.includes('sub-acid');
    }
  }

  getFruitsOfType({ type, onlyNames = false }) {
    let filteredList = this.list.filter( fruit => fruit.type === type );

    // Return only the fruit names
    if ( onlyNames ) {
      filteredList = filteredList.map( fruit => fruit.name );
    }

    return filteredList;
  }
}
