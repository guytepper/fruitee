import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import fruits from './FruitsDictionary';

export const vm = new Vue({
  el: '#app',
  data: {
    fruitsList: new FruitsList(),
    fruits: [],
    message: '',
  },
  created: function() {
    // Map fruits dictionary to Fruit object array
    for (let prop in fruits) {
      let fruit = fruits[prop];
      this.fruits.push(new Fruit(fruit.name, fruit.type));
    }
  },
  methods: {
    selectFruit: function(fruit, index) {
      this.fruitsList.push(fruit);
      // this.fruits.splice(index, 1);
      this.fruits.splice(this.fruits.indexOf(fruit), 1);
    },
    removeFruit: function(fruit) {
      this.fruitsList.remove(fruit);
      this.fruits.push(fruit);
    }
  },
  watch: {
    'fruitsList.list': function() {
      this.message = Combination.check(this.fruitsList).message;
    }
  }
});
