<template>
  <div>
    <div id="map"></div>
    <button @click="addWind" style="z-index: 99999999">加风</button> <br>
    <div id="calculated-area" style="position:absolute;background-color:rgba(0, 206, 201, .2);top:0;left: 10%"></div>
    <button @click="abc">绘制</button>
  </div>
</template>

<script type="text/ecmascript-6">
// const mapboxgl = require("mapbox-gl");
// import ChongQing from "./Chongqing.json";

// import echarts from 'echarts'
// import './include-mapboxgl'
// import mapboxgl from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
// 中文包
import MapboxLanguage  from '@mapbox/mapbox-gl-language'
import $ from 'jquery'
import 'echarts-gl'
window.echarts = require("echarts");
// import  { EchartsLayer }  from './include-mapboxgl'
import EchartsLayer from './echartsLayer'
// import turf from 'turf'
import MapboxDraw from 'mapbox-gl-draw'
export default {
  name: "mapboxgl",
  data () {
    return {
      map: null,
      marker: {},
      flag: null,
      draw: null
    }
  },
  mounted() {
    this.initmap();
  },

  methods: {
    initmap() {
      mapboxgl.accessToken = "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      // mapboxgl.setRTLTextPlugin(
      //   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js"
      // );
      // var coordinates = document.getElementById("map");
      
      // var attribution =
      //   "© Mapbox  | Map Data © SuperMap iServer with © SuperMap iClient";
      this.map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/streets-v9',// satellite light dark 
        center: [40, -30], // 初始坐标系
        zoom: 2, // starting zoom 地图初始的拉伸比例
        pitch: 0, //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: false, //抗锯齿，通过false关闭提升性能
      });
      // 配置中文
      var language = new MapboxLanguage({ defaultLanguage: "zh" });
      this.map.addControl(language);
      // 比例尺
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "metric" // metric 千米 imperial: 英里
      });
      this.map.addControl(scale);
      // scale.setUnit("metric"); // 设置单位
      this.map.on("load", () => {
        this.initDraw()
      });
      //地图监听点击，触发回调
      this.map.on("click", function () {
      });
    },
    addWind () {
      var that = this;
      $.getJSON('https://iclient.supermap.io/examples/data/globalWindData.json', function (windData) {
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
            // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
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
        var echartslayer = new EchartsLayer(that.map);
        echartslayer.chart.setOption({
            GLMap: {
                roam: true,
            },
            geo: {
                map: "GLMap"
            },
            visualMap: {
                left: 'right',
                min: minMag,
                max: maxMag,
                dimension: 4,
                inRange: {
                    // color: ['green', 'yellow', 'red']
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
                particleDensity: 512,
                particleSpeed: 2,
                particleSize: 1,
                gridWidth: 180,
                gridHeight: 60,
                zIndex: 999,
                itemStyle: {
                    opacity: 0.7
                }
            }]
        });
      });
      
    
    
    },
    initDraw() {
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: true,
          point: true,
          trash: true
        }
      })
      this.map.addControl(this.draw)
      $('.mapboxgl-ctrl-group').css({
        display: 'none'
      })
      this.map.on('draw.create', this.updateArea)
      this.map.on('draw.delete', this.updateArea)
      this.map.on('draw.update', this.updateArea)
    },
    updateArea(e) {
      console.log(123)
      console.log('点1经度:' + e.features[0].geometry.coordinates[0][0])
      console.log('点1纬度:' + e.features[0].geometry.coordinates[0][1])
      console.log('点2经度:' + e.features[0].geometry.coordinates[1][0])
      console.log('点2纬度:' + e.features[0].geometry.coordinates[1][1])
      var answer = document.getElementById('calculated-area')
      if (e.features.length > 0) {
        if (e.type == 'draw.delete') {
          if (confirm('确定删除吗')) answer.innerHTML = ''
          
        } else if (e.type == 'draw.create') {
          var data = e.features[0].geometry.coordinates
          data.forEach((item, index) => {
            answer.innerHTML += `
              <p>点${index + 1}经度: ${item[0]}</p>
              <p>点${index + 1}纬度: ${item[1]}</p>
            `
          })
        }
        
      } else {
        answer.innerHTML = ''
        if (e.type !== 'draw.delete') alert('Use the draw tools to draw a polygon!')
      }
    },
    abc () {
      // eslint-disable-next-line no-debugger
      // eslint-disable-next-line no-debugger
      // debugger;
      $('.mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_line').trigger('click')
    }
  },
}
</script>

<style  scoped>
/* @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"); */
@import url("https://cdn.jsdelivr.net/npm/mapbox-gl@1.6.1/dist/mapbox-gl.min.css");
@import url("https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.0.9/mapbox-gl-draw.css");


@import url('https://cdn.jsdelivr.net/npm/mapbox-gl@1.6.1/dist/mapbox-gl.min.css');
@import url('https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.2.0/mapbox-gl-enhance.css');
@import url('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.0.9/mapbox-gl-draw.css');
@import url('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-compare/0.3.0/mapbox-gl-compare.css');
@import url('https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css');
@import url('https://cdn.bootcss.com/antd/3.25.3/antd.min.css');
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 90%;
}
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
</style>
