/* eslint-disable */
import Fruit from '../src/js/Fruit'
import FruitsList from '../src/js/FruitsList'

describe("Fruits List", () => {
  let fruits = new FruitsList();
  let watermelon = new Fruit('Watermelon', 'melon');
  fruits.push(watermelon);

  it("is an array", () => {
    let isArr = Array.prototype.isPrototypeOf(fruits);
    expect(isArr).toBe(true);
  });

  it("contains only fruits", () => {
    // toThrow is invoking the method, so we provide it through
    // an anonymous function
    expect(() => fruits.push(2)).toThrow();
  })
});
