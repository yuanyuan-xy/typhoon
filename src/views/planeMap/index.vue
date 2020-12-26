<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-09-17 11:08:07
 * @LastEditors: YangXy
 * @LastEditTime: 2020-11-10 16:37:07
-->
<template>
  <div>
    <div id="map"></div>
    <button @click="handle2">点击挪位置</button>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "planeMap",
  data() {
    return {
      map: null,
      pointId: "point",
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: "map",
        center: [0,0],
        style: "mapbox://styles/mapbox/streets-v9",
        zoom: 3,
      });
      this.map.on("load", () => {
        this.handle1()
      });
    },
    handle2 () {
      this.map.getSource('points').setData(this.uploadWarnLight([{jd: 80, wd: 80}]))
    },
    handle1() {
      var that = this
      var size = 200;

      // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
      // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        // called once before every frame where the icon will be used
        render: function () {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          that.map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
        },
      };
      this.map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

      this.map.addSource("points", {
        type: "geojson",
        data: this.uploadWarnLight([])
      });
      this.map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "pulsing-dot",
        },
      });
    },
    uploadWarnLight (warnShipArr) {
      return {
        'type': 'FeatureCollection',
        'features': this.uploadWarnLightFea(warnShipArr)
      }
    },
    uploadWarnLightFea (warnShipArr) {
      let lightArr = []
      warnShipArr.forEach(item => {
        lightArr.push(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [item.jd, item.wd]
            }
          }
        )
      })
      return lightArr
    }
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
}
</style>