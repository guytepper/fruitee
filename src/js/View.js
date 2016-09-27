import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';
import fruits from './FruitsDictionary';

const FruitsComponent = Vue.extend({
  name: 'my-fruits',
  template: `
    <div v-for="(id, fruit) in fruits">
{{fruit.name}} !
    </div>
  `
});

Vue.component('my-fruits', FruitsComponent);

export const vm = new Vue({
  el: '#app',
  components: FruitsComponent,
  data: {
    list: new FruitsList(),
    fruits: fruits
  },
});
