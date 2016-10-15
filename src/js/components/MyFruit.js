export default MyFruit = {
  template: `
  <div class="frt-item"
       :id="fruit.id"
       :key="fruit.id"
       @click="select"
       @keyup.enter="select">
    <label :for="fruit.data.name" class="frt-item-label">{{ fruit.data.name }}</label>
  </div>`,
  props: ['fruit', 'selected'],
  mounted: function() {
    // When a new element is inserted, it should get focus when using a keyboard
    this.$el.tabIndex = '0';
  },
  methods: {
    select: function() {
      if (this.selected.includes(this.fruit)) {
        this.$emit('remove');
      }
      else {
        this.$emit('add');
      }
    }
  }
};
