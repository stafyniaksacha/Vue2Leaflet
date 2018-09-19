<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  draggable: {
    type: Boolean,
    custom: true,
    default: false
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  latLng: {
    type: [Object, Array],
    custom: true
  },
  icon: {
    custom: false,
    default: () => new L.Icon.Default()
  },
  zIndexOffset: {
    type: Number,
    custom: false
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LMarker',
  props: props,
  inject: ['addLayer', 'removeLayer'],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = this.options;
    if (this.icon) {
      options.icon = this.icon;
    }
    options.draggable = this.draggable;
    this.mapObject = L.marker(this.latLng, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.addLayer(this, !this.visible);
  },
  beforeDestroy () {
    this.removeLayer(this);
  },
  methods: {
    setDraggable (newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
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
    },
    setLatLng (newVal) {
      if (newVal == null) {
        return;
      }

      if (this.mapObject) {
        let oldLatLng = this.mapObject.getLatLng();
        let newLatLng = {
          lat: newVal[0] || newVal.lat,
          lng: newVal[1] || newVal.lng
        };
        if (newLatLng.lat !== oldLatLng.lat || newLatLng.lng !== oldLatLng.lng) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    }
  }
};
</script>
