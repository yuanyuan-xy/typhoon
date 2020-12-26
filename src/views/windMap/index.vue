<template>
  <div>
    <div id="wind-map"></div>
    <button @click="handleWind">点击</button>
    <button @click="cancelWind" style="color:#a50026">取消</button>
    <router-link to="/mapboxgl">去</router-link>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import windData from './wind.json'
import EchartsLayer from './echartsLayer'
// import EchartsLayer from 'echartslayer'
window.echarts = require("echarts");
import 'echarts-gl'
export default {
  name: 'windMap',
  data () {
    return {
      map: null,
      echartslayer: null,
    }
  },
  methods: {
    initMap () {
      // var host = window.isLocal ? window.server : "https://iserver.supermap.io";
      // var mapUrl = host + "/iserver/services/map-china400/rest/maps/ChinaDark/zxyTileImage.png?z={z}&x={x}&y={y}"
      mapboxgl.accessToken = "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: 'wind-map',
        altitudeScale: 2,
        style: 'mapbox://styles/mapbox/dark-v9',// satellite light dark 
        // style: {
        //   "version": 8,
        //   "sources": {
        //     "raster-tiles": {
        //       "attribution": '123',
        //       "type": "raster",
        //       "tiles": [mapUrl],
        //       "tileSize": 256
        //     }
        //   },
        //   "layers": [{
        //     "id": "simple-tiles",
        //     "type": "raster",
        //     "source": "raster-tiles",
        //   }]
        // },
        center: [0, 0],
        zoom: 1,
      })
      var language = new MapboxLanguage({defaultLanguage: 'zh'})
      this.map.addControl(language)
      this.map.on('load', () => {
        // this.addWind()
      })
      this.map.on('click', () => {
        // if ()
      })
    },
    addWind () {
      if (this.echartslayer) this.echartslayer.chart.clear()
      var data = [];
      var p = 0;
      var maxMag = 0;
      var minMag = Infinity;
      for (var j = 0; j < windData.ny; j++) {
          for (var i = 0; i < windData.nx; i++, p++) {
              var vx = windData.data[p][0];
              var vy = windData.data[p][1];
              var mag = Math.sqrt(vx * vx + vy * vy);
              // 数据是一个一维数组
              // [ [经度, 维度,向量经度方向的值,向量维度方向的值] ]
              var y = j / windData.ny * 180 - 90;
              if (y > 85 || y < -85) {
                  continue;
              }
              data.push([
                  i / windData.nx * 360 - 180,
                  y,
                  vx,
                  vy,
                  mag
              ]);
              maxMag = Math.max(mag, maxMag);
              minMag = Math.min(mag, minMag);
          }
      }
      var testTime = +new Date()
      this.echartslayer = new EchartsLayer(this.map);
      var option = {
          GLMap: {
              roam: true,
          },
          geo: {
              map: "GLMap"
          },
          visualMap: { // 图例相关
              show: false,
              min: minMag,
              max: maxMag,
              dimension: 4,
              inRange: {
                  // color: ['green', 'yellow', 'red']
                  // 由小到大
                  color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
                      '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027',
                      '#a50026'
                  ]
              },
              realtime: false,
              calculable: true,
              textStyle: {
                  color: '#fff'
              }
          },
          series: [{
              type: 'flowGL',
              coordinateSystem: 'GLMap',
              data: data,
              particleDensity: 512, // 粒子密度
              particleSpeed: 2, // 粒子速度
              particleSize: 1, // 粒子大小
              gridWidth: 300, // 网格宽度
              gridHeight: 100, // 网格高度
              itemStyle: {
                opacity: 0.3
              }
          }]
      }
      // this.echartslayer.chart.appendData({
      //   seriesIndex: 0,
      //   data: data
      // })
      this.echartslayer.chart.setOption(option);
      console.log(+new Date() - testTime)
    },
    handleWind () {
      this.addWind()
    },
    cancelWind () {
      if (this.echartslayer) this.echartslayer.chart.clear()
      
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style scoped lang="less">
  #wind-map {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    /* left: 0; */
    width: 90%;
  }
  /deep/ #echarts {
    height: 0 !important;
  }
  /deep/ #echarts div {
    position: unset !important;
    height: 0 !important;
  }
  /deep/ .mapboxgl-ctrl-bottom-right {
    display: none;
  }
</style>