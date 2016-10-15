import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import MyFruit from './components/MyFruit';
import fruits from './FruitsDictionary';
import Keyborder from './Keyborder';
import * as Utils from './Utils';

Vue.directive('visible', {
  update: function(elm, binding) {
    if (binding.value == false) {
      elm.style.visibility = 'hidden';
    }
    else {
      elm.style.visibility = 'visible';
    }
  },
});

export const vm = new Vue({
  el: '#app',
  data: {
    fruitsList: new FruitsList(),
    selectedFruits: [],
    fruits: [],
    status: '',
    message: '',
  },
  components: {
    'my-fruit': MyFruit
  },
  created: function() {
    // Map fruits dictionary to Fruit object array
    for (let prop in fruits) {
      let fruit = fruits[prop];
      this.fruits.push({
        id: prop,
        data: new Fruit(fruit.name, fruit.type),
      });
    }
  },
  mounted: function() {
    // Add hover class to root element when using non-touch devices
    if (!('ontouchstart' in window)) {
      document.body.className += 'hover';
    }
    this.keyborder = new Keyborder('#fruits, #selected-fruits');
  },
  methods: {
    addFruit: function(fruit) {
      console.log(fruit.id);
      Utils.resetTabIndex(document.getElementById('selected-fruits'));
      Utils.focusNextElement(fruit.id, this.keyborder);
      this.fruitsList.push(fruit.data);
      this.selectedFruits.push(fruit);
      this.fruits.splice(this.fruits.indexOf(fruit), 1);
      Utils.sendAnalyticsEvent(fruit.data.name);
    },
    removeFruit: function(fruit) {
      Utils.resetTabIndex(document.getElementById('fruits'));
      this.fruitsList.remove(fruit.data);
      this.selectedFruits.splice(this.selectedFruits.indexOf(fruit), 1);
      this.fruits.push(fruit);
    }
  },
  watch: {
    selectedFruits: function() {
      const combination = Combination.check(this.fruitsList);
      this.message = combination.message;
      this.status = combination.status;
    }
  }
});
