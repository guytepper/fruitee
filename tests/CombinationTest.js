/* eslint-disable */
import Fruit from '../src/js/Fruit';
import FruitsList from '../src/js/FruitsList';
import Combination from '../src/js/Combination';

describe("Combination", () => {
  let fruits  = new FruitsList(),
      melon   = new Fruit('Watermelon', 'melon'),
      sweet   = new Fruit('Banana', 'sweet'),
      acid    = new Fruit('Orange', 'acid'),
      subAcid = new Fruits('Mango', 'sub-acid');
      
  afterEach(() => {
    fruits = new FruitsList();
  })

  it("doesn't combine melons and fruits", () => {
    fruits.push(melon);
    fruits.push(fruit);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });
});