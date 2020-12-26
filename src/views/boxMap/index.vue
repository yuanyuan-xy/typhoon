<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-09-18 17:19:30
 * @LastEditors: YangXy
 * @LastEditTime: 2020-12-04 10:21:43
-->
<template>
  <div>
    <div id="box"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { sampleFill,particles, source, arrows  } from "@openearth/windgl";
export default {
  name: "boxMap",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: "box",
        zoom: 2,
        center: [0, 0],
        style: "mapbox://styles/mapbox/streets-v9",
      });
      this.map.on("load", () => {
        this.addBox();
      });
    },
    addBox() {
      const windSource = source("http://url/to/backend");
      this.map.addLayer(
        sampleFill({
          id: "windbackground", // required
          source: windSource, // required
          "sample-fill-opacity": 0.8, // optional
        })
      );

      this.map.addLayer(
        particles({
          id: "particles",
          source: windSource,
        })
      );

      this.map.addLayer(
        arrows({
          id: "arrows",
          source: windSource,
        })
      ); // inserting the layer in the middle of the layer stack is supported
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
#box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 90%;
}
</style>