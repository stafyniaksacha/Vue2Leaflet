const Vue2Leaflet = {};
const components = {};

components.LCircle = require('./components/LCircle').default;
components.LCircleMarker = require('./components/LCircleMarker').default;
components.LControlAttribution = require('./components/LControlAttribution').default;
components.LControlLayers = require('./components/LControlLayers').default;
components.LControlScale = require('./components/LControlScale').default;
components.LControlZoom = require('./components/LControlZoom').default;
components.LFeatureGroup = require('./components/LFeatureGroup').default;
components.LGeoJson = require('./components/LGeoJson').default;
components.LIconDefault = require('./components/LIconDefault').default;
components.LImageOverlay = require('./components/LImageOverlay').default;
components.LLayerGroup = require('./components/LLayerGroup').default;
components.LMap = require('./components/LMap').default;
components.LMarker = require('./components/LMarker').default;
components.LPolygon = require('./components/LPolygon').default;
components.LPolyline = require('./components/LPolyline').default;
components.LPopup = require('./components/LPopup').default;
components.LRectangle = require('./components/LRectangle').default;
components.LTileLayer = require('./components/LTileLayer').default;
components.LTooltip = require('./components/LTooltip').default;
components.LWMSTileLayer = require('./components/LWMSTileLayer').default;

Vue2Leaflet.install = function (Vue) {
  for (let component in components) {
    Vue.component(component, components[component]);
  }
};

exports.default = Vue2Leaflet;

for (let component in components) {
  exports[component] = components[component];
}

exports.findRealParent = require('./utils/findRealParent').default;
exports.propsBinder = require('./utils/propsBinder').default;
