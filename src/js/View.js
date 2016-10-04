import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import fruits from './FruitsDictionary';

export const vm = new Vue({
  el: '#app',
  data: {
    fruitsList: new FruitsList(),
    selectedFruits: [],
    fruits: [],
    message: '',
  },
  created: function() {
    // Map fruits dictionary to Fruit object array
    let count = 0;
    for (let prop in fruits) {
      let fruit = fruits[prop];
      this.fruits.push({
       id: count,
       data: new Fruit(fruit.name, fruit.type)
      });
      count++;
    }
  },
  methods: {
    selectFruit: function(fruit, index) {
      this.fruitsList.push(fruit.data);
      this.selectedFruits.push(fruit);
      this.fruits.splice(this.fruits.indexOf(fruit), 1);
    },
    removeFruit: function(fruit) {
      this.fruitsList.remove(fruit.data);
      this.selectedFruits.splice(this.selectedFruits.indexOf(fruit), 1);
      this.fruits.push(fruit);
    }
  },
});
