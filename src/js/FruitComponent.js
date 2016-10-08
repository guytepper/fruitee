export default MyFruit = {
  template: `
  <div class="frt-item"
       :id="fruit.id"
       :key="fruit.id"
       @click="select">
    <label :for="fruit.data.name">{{ fruit.data.name }}</label>
  </div>`,
  props: ['fruit', 'selected'],
  methods: {
    select: function() {
      this.$emit('select');
    }
  }
};
