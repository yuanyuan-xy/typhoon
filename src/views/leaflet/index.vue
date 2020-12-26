<!--
 * @Descripttion: 风场图
 * @Author: YangXy
 * @Date: 2020-10-14 10:48:18
 * @LastEditors: YangXy
 * @LastEditTime: 2020-10-26 10:59:12
-->
<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import '@supermap/iclient-leaflet'
// import './js/leaflet-windy/windy'
import 'leaflet-velocity/dist/leaflet-velocity.css'
import 'leaflet-velocity/dist/leaflet-velocity'
import data from './data/xx.json'
export default {
  name: 'leaflet',
  data () {
    return {
      map: null,
      layer: null
    }
  },
  methods: {
    initMap () {
      let map = L.map('map', {
        minZoom: 3,
        maxZoom: 20,
        center: [39.550339, 116.114129],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      })
      this.map = map
      window.map = map
      L.tileLayer(
        'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
      ).addTo(map)
    },
    addWind (data) {
      var velocityLayer = L.velocityLayer({
        // displayValues: true,
        // displayOptions: {
        //     velocityType: 'GBR Wind',
        //     displayPosition: 'bottomleft',
        //     displayEmptyString: 'No wind data'
        // },
        data: data,
        // minVelocity: 0, //Velocity：速率
        // maxVelocity: 10,
        // velocityScale: 0.005,
        particleMultiplier: 1 / 100, // 粒子的数量
        lineWidth: 1, // 粒子的粗细
        // frameRate: 15, //定义每秒执行的次数
        colorScale: ['#0b38f3', '#028df3', '#01f3c4', '#01f31d', '#f4ec05',
          '#f4b201', '#f30101', '#d701ae', '#630268'
        ]
      })
      velocityLayer.addTo(this.map)
    }
  },
  mounted () {
    this.initMap()
    this.addWind(data)
  }
}
</script>

<style scoped lang="less">
  @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css');
  #map {
    position: absolute;
    top: 0;
    left: 10%;
    right: 0;
    bottom: 0;
  }
</style>
