<template>
  <div/>
</template>

<script>
import L from 'leaflet';
import propsBinder from '../utils/propsBinder.js';

const props = {
  url: String,
  attribution: {
    type: String,
    custom: true
  },
  detectRetina: {
    type: Boolean,
    custom: false,
    default: false
  },
  token: {
    type: String,
    custom: true
  },
  opacity: {
    type: Number,
    custom: false,
    default: 1.0
  },
  zIndex: {
    type: Number,
    default: 1
  },
  options: {
    type: Object,
    default: function () {
      return {};
    }
  },
  tms: {
    type: Boolean,
    default: false
  },
  tileLayerClass: {
    type: Function,
    default: L.tileLayer
  },
  layerType: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'LTileLayer',
  props: props,
  inject: ['rootMapObject', 'addLayer', 'removeLayer'],
  mounted () {
    const options = this.options;
    const otherPropertytoInitialize = [ 'attribution', 'token', 'detectRetina', 'opacity', 'zIndex' ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = this.tileLayerClass(this.url, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.addLayer(this, !this.visible);
  },
  beforeDestroy () {
    this.removeLayer(this);
  },
  methods: {
    setAttribution (val, old) {
      let attributionControl = this.rootMapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setToken (val) {
      this.options.token = val;
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.addLayer(this);
        } else {
          this.removeLayer(this);
        }
      }
    }
  },
  render () {
    return null;
  }
};
</script>
