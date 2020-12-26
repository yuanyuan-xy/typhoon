<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-11-04 16:04:10
 * @LastEditors: YangXy
 * @LastEditTime: 2020-11-05 10:11:42
-->
<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import data from "./car.json";
import pic1 from '../lineMap/airplane4.png'
import pic2 from '../lineMap/timg.jpg'
window.echarts = require("echarts")
var EchartsLayer = require("echartslayer");
import 'echarts-gl'
// require('./include')
export default {
  name: "carMap",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        style: "mapbox://styles/mapbox/streets-v9", // satellite light dark
        center: [125.33, 43.89], // 初始坐标系
        zoom: 13, // starting zoom 地图初始的拉伸比例
        pitch: 0, //地图的角度,不写默认是0,取值是0-60度,一般在3D中使用
        bearing: 0, //地图的初始方向,值是北的逆时针度数,默认是0,即是正北
        antialias: false, //抗锯齿,通过false关闭提升性能
      });
      this.map.on('load', () => {
        this.initCar()
      })
    },
    initCar() {
      var lines = [].concat.apply(
        [],
        data.map(function (busLine) {
          busLine.lineStyle.normal.color = "#000";
          busLine.effect = {
            constantSpeed: 60,
            show: true,
            trailLength: 0,
            symbolSize: 30,
            symbol: (function () {
              if (Math.round(Math.random() * 2) % 2) {
                return pic1;
              } else {
                return pic2;
              }
            })(),
          };
          return busLine;
        })
      );
      var option = {
        animation: false,
        GLMap: {
          roam: true,
        },
        coordinateSystem: "geo",
        geo: {
          map: "GLMap",
        },

        series: [
          {
            type: "lines",
            polyline: true,
            data: lines,
            silent: true,
            lineStyle: {
              normal: {
                opacity: 1,
                width: 2,
              },
            },
            progressiveThreshold: 500,
            progressive: 100,
          },
          {
            type: "lines",
            coordinateSystem: "geo",
            polyline: true,
            data: lines,
            lineStyle: {
              normal: {
                width: 0.2,
              },
            },
            effect: {
              constantSpeed: 60,
              show: true,
              trailLength: 0,
              symbolSize: 30,
            },
          },
        ],
      };
      var echartslayer = new EchartsLayer(this.map)
      echartslayer.chart.setOption(option)
    },
  },
};
</script>

<style scoped lang="less">
@import url("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css");
#map {
  position: absolute;
  left: 10%;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>