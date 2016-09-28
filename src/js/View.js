import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import fruits from './FruitsDictionary';

const FruitsComponent = Vue.extend({
  name: 'my-fruits',

});

Vue.component('my-fruits', {
  template: `
    <div class="frt-item" id="{{ fruit.name }}" data-fruit-type="{{ fruit.type }}">
    <label for="{{ fruit.name }}">{{ fruit.name }}</label></div>
  `,
});

export const vm = new Vue({
  el: '#app',
  data: {
    list: new FruitsList(),
    fruits: fruits,
  },
});
