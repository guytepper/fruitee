/* eslint-disable */
import Fruit from '../src/js/Fruit';
import FruitsList from '../src/js/FruitsList';
import Combination from '../src/js/Combination';

describe("Combination", () => {
  let fruits = new FruitsList();
  let watermelon = new Fruit('Watermelon', 'melon');
  fruits.push(watermelon);

  it("doesn't combine melons and fruits", () => {
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });


});
