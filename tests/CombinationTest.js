/* eslint-disable */
import Fruit from '../src/js/Fruit';
import FruitsList from '../src/js/FruitsList';
import Combination from '../src/js/Combination';

describe("Combination", () => {
  let fruits, melon, sweet, acid, subAcid, fat;

  beforeAll(() => {
    fruits  = new FruitsList();
    melon   = new Fruit('Watermelon', 'melon'),
    sweet   = new Fruit('Banana', 'sweet'),
    acid    = new Fruit('Orange', 'acid'),
    subAcid = new Fruit('Mango', 'sub-acid'),
    fat     = new Fruit('Avocado', 'fat');
  })

  beforeEach(() => {
    fruits = new FruitsList();
  })

  it("doesn't combine melons and fruits", () => {
    fruits.push(melon);
    fruits.push(sweet);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });

  it("doesn't combine sweets and acids", () => {
    fruits.push(sweet);
    fruits.push(acid);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });

  it("does combine sweets and sub-acids", () => {
    fruits.push(sweet);
    fruits.push(subAcid);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(true);
  });

  it("does combine acids and sub-acids", () => {
    fruits.push(acid);
    fruits.push(subAcid);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(true);
  });

  it("doesn't combine fruits and fats", () => {
    fruits.push(sweet);
    fruits.push(fat);
    let result = Combination.check(fruits);
    expect(result.combination).toBe(false);
  });
});
