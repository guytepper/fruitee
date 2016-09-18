/* eslint-disable */
import Fruit from '../src/js/Fruit';
import FruitsList from '../src/js/FruitsList';
import Combination from '../src/js/Combination';

describe("Combination", () => {
  it("doesn't combine melons and fruits", () => {
    let fruits = new FruitsList();
    let watermelon = new Fruit('Watermelon', 'melon');
    let banana = new Fruit('Banana', 'sweet');
    fruits.push(watermelon);
    fruits.push(banana);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });


});
