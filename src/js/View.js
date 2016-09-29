import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import fruits from './FruitsDictionary';

const FruitsComponent = Vue.extend({
  name: 'my-fruits',

});

Vue.component('my-fruit', {
  props: ['fruit', 'list'],
  template: `
    <div v-on:click="list.push(fruit)" class="frt-item" v-bind:id="fruit.name" v-bind:data-fruit-type="fruit.type">
    <label v-bind:for="fruit.name">{{ fruit.name }}</label></div>
  `
});

export const vm = new Vue({
  el: '#app',
  data: {
    list: new FruitsList(),
    fruits: [],
  },
  created: function() {
    // Map fruits dictionary to Fruit object array
    for (let prop in fruits) {
      let fruit = fruits[prop];
      this.fruits.push(new Fruit(fruit.name, fruit.type));
    }
  }
});
