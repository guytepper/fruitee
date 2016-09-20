import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';

let arr = new FruitsList();
let watermelon = new Fruit('Watermelon', 'melon');
let orange = new Fruit('Orange', 'acid');

arr.push(watermelon);
arr.push(orange);

// console.log(combinations);
//
// console.log( combinations[['sweet', 'acid']] );

console.log(Combination.check(arr));
