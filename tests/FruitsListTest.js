/* eslint-disable */
import Fruit from '../src/js/Fruit'
import FruitsList from '../src/js/FruitsList'

describe("Fruits List", () => {
  let fruits, melon, sweet;  

  beforeAll(() => {
    melon = new Fruit('Watermelon', 'melon'),
    sweet = new Fruit('Banana', 'sweet');
  });

  beforeEach(() => {
    fruits = new FruitsList();
  });

  it("is an array", () => {
    let isArr = Array.prototype.isPrototypeOf(fruits);
    expect(isArr).toBe(true);
  });

  it("contains only fruits", () => {
    // toThrow is invoking the method, so we provide it through
    // an anonymous function
    expect(() => fruits.push(2)).toThrow();
  });

  it("can remove a fruit from a list", () => {
    fruits.push(melon);
    fruits.push(sweet);
    fruits.remove(melon);
    let newList = new FruitsList();
    newList.push(sweet);
    expect(fruits.list).toEqual(newList.list);
  });

  it("returns fruits of specific type", () => {
    fruits.push(melon);
    fruits.push(sweet);

    const onlySweet = fruits.getFruitsOfType({
      type: 'sweet'
    });

    expect(onlySweet).toEqual([sweet]);
  });

  it("returns fruits name of specific type", () => {
    fruits.push(melon);
    fruits.push(sweet);

    const onlySweet = fruits.getFruitsOfType({
      type: 'sweet',
      onlyNames: true
    });

    expect(onlySweet).toEqual(['Banana']);
  });
});
