<template>
  <div>
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  content: {
    default: ''
  },
  latLng: {
    type: [Object, Array]
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LPopup',
  props: props,
  inject: ['rootMapObject'],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.popup(this.options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    this.mapObject.setContent(this.content || this.$el);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.rootMapObject.bindPopup(this.mapObject);
  },
  beforeDestroy () {
    if (this.rootMapObject && this.rootMapObject.getPopup()) {
      this.rootMapObject.unbindPopup();
    }
  }
};
</script>
