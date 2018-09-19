<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  content: {
    default: ''
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LTooltip',
  props: props,
  inject: ['rootMapObject'],
  data () {
    return {
    };
  },
  mounted () {
    this.mapObject = L.tooltip(this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.setContent(this.content || this.$el);
    this.rootMapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy () {
    if (this.rootMapObject.getTooltip()) {
      this.rootMapObject.unbindTooltip();
    }
  }
};
</script>
