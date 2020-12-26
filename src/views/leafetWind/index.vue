<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-10-14 17:06:12
 * @LastEditors: YangXy
 * @LastEditTime: 2020-11-26 10:12:28
-->
<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity";
import './movingMarker'
import pic from '../../assets/logo.png'
// import datas from '../leaflet/data/xx.json'
export default {
  name: "leafeltMap",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      // //风场样式引用
      // //生成风场实例
      // var velocityLayer = L.velocityLayer({
      //   displayValues: true,
      //   displayOptions: {
      //     velocityType: "GBR Wind",
      //     displayPosition: "bottomleft",
      //     displayEmptyString: "No wind data",
      //   },
      //   data: datas, //风场数据
      //   minVelocity: 0, //Velocity：速率
      //   maxVelocity: 10,
      //   velocityScale: 0.005,
      //   particleMultiplier: 1 / 1200, //粒子的数量
      //   lineWidth: 5, //粒子的粗细
      //   frameRate: 15, //定义每秒执行的次数
      //   colorScale: [
      //     "rgb(47,112,47)",
      //     "rgb(47,112,47)",
      //     "rgb(47,112,47)",
      //     "rgb(47,112,47)",
      //     "rgb(47,112,47)",
      //   ],
      // });
      //添加风场样式至地图中
      this.map = L.map("map", {
        center: [38.065, 114.61],
        zoom: 4,
      });
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(this.map);
      // // 风场实例添加到地图上
      // velocityLayer.addTo(this.map);
      let icon = L.icon({
        className: 'abc',
        iconUrl: pic,
        iconSize: [40, 40]
      })
      var myMovingMarker = L.Marker.movingMarker([[48.8567, 2.3508],[50.45, 30.523333]],{icon: icon},
            [20000]).addTo(this.map);
      myMovingMarker.start();
    },
  },
  mounted () {
    this.initMap()
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css');
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>