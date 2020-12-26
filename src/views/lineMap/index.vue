<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-09-14 13:42:08
 * @LastEditors: YangXy
 * @LastEditTime: 2020-11-26 14:42:25
-->
<template>
  <div>
    <div id="map"></div>
    <button id="replay" @click="replay">Replay</button>
    <!-- <button @click="changePlant">换位置</button>
    <button @click="changePlant2">换位置</button>
    <button @click="changeLine">延长线</button> -->
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import plane from './timg.jpg'
var turf = require("@turf/turf");
export default {
  name: "lineMap",
  data() {
    return {
      map: null,
      a: 10,
      lineData: [
        [-122.48369693756104, 37.83381888486939],
        [-122.48348236083984, 37.83317489144141],
        [-122.48339653015138, 37.83270036637107],
        [-122.48356819152832, 37.832056363179625],
        [-122.48404026031496, 37.83114119107971],
        [-122.48404026031496, 37.83049717427869],
        [-122.48348236083984, 37.829920943955045],
        [-122.48356819152832, 37.82954808664175],
        [-122.48507022857666, 37.82944639795659],
        [-122.48610019683838, 37.82880236636284],
        [-122.48695850372314, 37.82931081282506],
        [-122.48700141906738, 37.83080223556934],
        [-122.48751640319824, 37.83168351665737],
        [-122.48803138732912, 37.832158048267786],
        [-122.48888969421387, 37.83297152392784],
        [-122.48987674713133, 37.83263257682617],
        [-122.49043464660643, 37.832937629287755],
        [-122.49125003814696, 37.832429207817725],
        [-122.49163627624512, 37.832564787218985],
        [-122.49223709106445, 37.83337825839438],
        [-122.49378204345702, 37.83368330777276],
      ],
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        style: "mapbox://styles/mapbox/streets-v9", // satellite light dark
        center: [125.264,30.419], // 初始坐标系
        zoom: 15, // starting zoom 地图初始的拉伸比例
        pitch: 0, //地图的角度,不写默认是0,取值是0-60度,一般在3D中使用
        bearing: 0, //地图的初始方向,值是北的逆时针度数,默认是0,即是正北
        antialias: false, //抗锯齿,通过false关闭提升性能
      });
      this.map.on("click", (e) => {
        console.log(e);
      });
      this.map.on("load", () => {
        this.loadAnimate();
      });
    },
    loadAnimate() {
      this.map.loadImage(plane, (error, image) => {
          if (error) throw error;
          this.map.addImage("cat", image);
          this.map.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    retate: 45
                  },
                  geometry: {
                    type: "Point",
                    coordinates: this.lineData[0],
                  },
                },
              ],
            },
          });
          this.map.addLayer({
            id: "points",
            type: "symbol",
            source: "point",
            layout: {
              "icon-image": "cat",
              "icon-size": 0.025,
              'icon-rotate': ['get', 'rotate']
            },
          });
        }
      )
      var line = turf.lineString(this.lineData);
      var options = {units: 'meters'};
      let b = 1
      setInterval(() => {
          setData(b)
          b+= this.a
      },1000)
      var setData = (a) => {
        let point1 = turf.point(turf.along(line, a, options).geometry.coordinates)
        let point2 = turf.point(turf.along(line, a + 10, options).geometry.coordinates)
        let deg = turf.bearing(point1, point2)
        let coordinates = turf.along(line, a, options).geometry.coordinates
        this.map.getSource('point').setData(updatePoint(deg,coordinates ))
      }
      var updatePoint = (deg, coordinates) => {
        return {
          'type': "FeatureCollection",
          'features': [
            {
              'type': "Feature",
              'properties': {
                  'rotate': deg
                },
              'geometry': {
                'type': "Point",
                'coordinates': coordinates,
              },
            },
          ],
        }
      }
      this.map.addSource("route", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [112.41354233050643, 25.69320026658777], 
                  [125.264, 30.419],
                  [125.265, 30.419],
                  [125.266, 30.419],
                  [125.267, 30.419],
                  [125.268, 30.419],
                  [125.269, 30.419],
                  [125.270, 30.419],
                  [125.271, 30.419],
                  [125.272, 30.419],
                  [125.273, 30.419],
                  [125.274, 30.419],
                  [125.275, 30.419],
                  [125.276, 30.419],
                  [112.41454233050644, 25.69420026658777],
                  [112.41554233050644, 25.695200266587772],
                  [112.41654233050645, 25.696200266587773],
                  [112.41754233050645, 25.697200266587775]
                ],
              },
            },
          ],
        },
      });
      this.map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 3,
        },
      });
    },
    replay () {
      this.a += 10
    }
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped lang="less">
@import url("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css");
#map {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
}
</style>