<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'LLayerGroup',
  props: props,
  inject: ['addLayer', 'removeLayer'],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, props);
    L.DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    if (this.visible) {
      this.addLayer(this);
    }
  },
  beforeDestroy () {
    this.removeLayer(this);
  },
  methods: {
    addLayer (layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
      this.addLayer(layer, true);
    },
    removeLayer (layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
      this.removeLayer(layer, true);
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.addLayer(this);
      } else {
        this.removeLayer(this);
      }
    }
  }
};
</script>
