/* eslint-disable */
import Fruit from '../src/js/Fruit';
import FruitsList from '../src/js/FruitsList';
import Combination from '../src/js/Combination';

describe("Combination", () => {
  let fruits, melon, sweet, acid, subAcid, fat, anotherFat, subAcidVeggie,
      acidVeggie, starchy;

  beforeAll(() => {
    fruits  = new FruitsList();
    melon   = new Fruit('Watermelon', 'melon'),
    sweet   = new Fruit('Banana', 'sweet'),
    acid    = new Fruit('Orange', 'acid'),
    subAcid = new Fruit('Mango', 'sub-acid'),
    fat     = new Fruit('Avocado', 'fat'),
    anotherFat = new Fruit('Brazil Nut', 'fat');
    subAcidVeggie = new Fruit('Cucumber', 'sub-acid-veggie');
    acidVeggie = new Fruit('Tomato', 'acid-veggie');
    starchy = new Fruit('Potato', 'starchy');
  });

  beforeEach(() => {
    fruits = new FruitsList();
  });

  // it("doesn't combine more than 3 fruits", () =>{
  // 	fruits.push(sweet);
  // 	fruits.push(subAcid);
  // 	fruits.push(new Fruit('Persimmon', 'sweet'));
  // 	fruits.push(new Fruit('Dates', 'sweet'));
  // 	let result = Combination.check(fruits);
  // 	expect(result.status).toBe(false);
  // });

  it("doesn't combine melons and fruits", () => {
    fruits.push(melon);
    fruits.push(sweet);
    const result = Combination.check(fruits);
    expect(result.status).toBe(false);
  });

  it("doesn't combine 2 types of melons", () => {
  	fruits.push(melon);
  	fruits.push(new Fruit('Cantaloupe', 'melon'));
  	const result = Combination.check(fruits);
  	expect(result.status).toBe(false);
  });

  it("doesn't combine sweets and acids", () => {
    fruits.push(sweet);
    fruits.push(acid);
    const result = Combination.check(fruits);
    expect(result.status).toBe(false);
  });

  it("does combine sweets and sub-acids", () => {
    fruits.push(sweet);
    fruits.push(subAcid);
    const result = Combination.check(fruits);
    expect(result.status).toBe(true);
  });

  it("does combine acids and sub-acids", () => {
    fruits.push(acid);
    fruits.push(subAcid);
    const result = Combination.check(fruits);
    expect(result.status).toBe(true);
  });

  it("doesn't combine sweet fruits and fats", () => {
    fruits.push(sweet);
    fruits.push(fat);
    const result = Combination.check(fruits);
    expect(result.status).toBe(false);
  });

  it("doesn't combine 2 types of fats", () => {
    fruits.push(fat);
    fruits.push(anotherFat);
    const result = Combination.check(fruits);
    expect(result.status).toBe(false);
  })

  it("doesn't combine starchies and fruits", () => {
    fruits.push(sweet);
    fruits.push(starchy);
    const result = Combination.check(fruits);
    expect(result.status).toBe(false);
  });

  it("does combine sub-acid veggies and fats", () => {
    fruits.push(subAcidVeggie);
    fruits.push(fat);
    const result = Combination.check(fruits);
    expect(result.status).toBe(true);
  });

  it("does combine acid veggies and fats", () => {
    fruits.push(acidVeggie);
    fruits.push(fat);
    const result = Combination.check(fruits);
    expect(result.status).toBe(true);
  });
});
