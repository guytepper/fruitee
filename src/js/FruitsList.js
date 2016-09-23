// FruitsList acts as an array with additional helper methods.
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
      this.typesList = new Set(this.map(fruit => fruit.type)); // Unique types set
    }
    return Array.from(this.typesList).sort();
  }

  has(type) {
    switch (type) {
      case 'fruits':
        return this.types.includes('sweet') ||
               this.types.includes('acid')  ||
               this.types.includes('sub-acid');

    }
  }
  
  getFruitsOfType({ type, onlyNames = false }) {    
    let filteredList = this.filter( fruit => fruit.type === type );

    // Return only the fruit names
    if ( onlyNames ) {
      filteredList = filteredList.map( fruit => fruit.name );
    }

    return filteredList
  }
}
