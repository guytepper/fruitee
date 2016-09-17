import Fruit from './Fruit';
import FruitsList from './FruitsList';

let arr = new FruitsList();
let watermelon = new Fruit('Watermelon', 'melon')
arr.push(watermelon);
console.log(arr.melon);
