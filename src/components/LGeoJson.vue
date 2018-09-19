<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  geojson: {
    type: [Object, Array],
    custom: true,
    default: () => ({})
  },
  options: {
    type: Object,
    default: () => ({})
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'LGeoJson',
  props: props,
  inject: ['rootMapObject', 'addLayer'],
  mounted () {
    this.mapObject = L.geoJSON(this.geojson, this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.addLayer(this, !this.visible);
  },
  beforeDestroy () {
    this.rootMapObject.removeLayer(this.mapObject);
  },
  methods: {
    setGeojson (newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData () {
      return this.mapObject.toGeoJSON();
    },
    getBounds () {
      return this.mapObject.getBounds();
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.rootMapObject);
      } else {
        this.rootMapObject.removeLayer(this.mapObject);
      }
    }
  },
  render () {
    return null;
  }
};
</script>
