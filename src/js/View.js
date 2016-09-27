import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';

export var vm = new Vue({
  el: '#app',
  data: {
    list: new FruitsList(),
    fruits: {}
  },
  created: function() {
    // Init fruits object base on DOM elements
    let fruits = document.getElementsByClassName('frt-item');
    Array.prototype.forEach.call(fruits, (fruit) => {
      let type = fruit.getAttribute('data-fruit-type');
      this.fruits[fruit.id] = new Fruit(fruit.id, type);
    });
  }
});
