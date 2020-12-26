<template>
  <div>
    <div id="map"></div>
    <button @click="addlayer3" style="z-index: 99999999">添加不规则区域</button>
    <button @click="removelayer3" style="z-index: 99999999">取消不规则区域</button><br>
    <button @click="addWind" style="z-index: 99999999">加风</button> <br>
    <button @click="addCircle">添加会动的圆</button> <br>

    <button @click="addLayer1">添加坐标点</button>
    <button @click="removePoint">移除坐标点</button><br>

    <button @click="addfallbackImg">添加应急图片坐标点</button><br>
    <button @click="addMyPoint">添加自定义图标</button>
  </div>
</template>

<script type="text/ecmascript-6">











/**
console.log(turf.booleanPointInPolygon([122.99905071195005, 93.8496074094477], [
  [
    [73.92599735925918, 66.80117624614829],
    [132.8879359116272, 58.68247129292979],
    [73.51077243987666, 30.610389944741726],
    [73.92599735925918, 66.80117624614829]
  ]
]))
 */













// const mapboxgl = require("mapbox-gl");
// import ChongQing from "./Chongqing.json";

// import echarts from 'echarts'
// import './include-mapboxgl'
import { IsPtInPoly } from '../map/index'
import mapboxgl from 'mapbox-gl'
import CHN from "./CHN.json";
// 中文包
import MapboxLanguage  from '@mapbox/mapbox-gl-language'
import $ from 'jquery'
import 'echarts-gl'
window.echarts = require("echarts");
// import EchartsLayer from 'echartslayer' import导入会有问题
var EchartsLayer = require("echartslayer");
// import EchartsLayer from './echartslayer'
var turf = require('@turf/turf')
export default {
  name: "mapboxgl",
  data () {
    return {
      map: null,
      marker: {},
      flag: null,
      jsonArea: [
                [-67.13734351262877, 45.137451890638886],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573401557249, 43.090083319667144],
                [-70.75102474636725, 43.08003225358635],
                [-70.79761105007827, 43.21973948828747],
                [-70.98176001655037, 43.36789581966826],
                [-70.94416541205806, 43.46633942318431],
                [-71.08482, 45.3052400000002],
                [-70.6600225491012, 45.46022288673396],
                [-70.30495378282376, 45.914794623389355],
                [-70.00014034695016, 46.69317088478567],
                [-69.23708614772835, 47.44777598732787],
                [-68.90478084987546, 47.184794623394396],
                [-68.23430497910454, 47.35462921812177],
                [-67.79035274928509, 47.066248887716995],
                [-67.79141211614706, 45.702585354182816],
                [-67.13734351262877, 45.137451890638886]
              ]
    }
  },
  
  mounted() {
    this.initmap();
    var a = turf.point([ 159.64228558307263, 45.057406328341585])
    var b = turf.polygon([[
      [142.2947655564448, 46.94471168460147],
      [160.38919934794174, 56.69131530560128],
      [-176.04483212864892 + 360, 44.425149156120575],
      [160.45939749901427, 35.22642360670715],
      [142.2947655564448, 46.94471168460147]
    ]])
    console.log('转完之后', turf.booleanPointInPolygon(a,b))
    console.log('没转的时候',
      turf.booleanPointInPolygon([159.64228558307263, 45.057406328341585],
      [
        [
          [142.2947655564448, 46.94471168460147],
          [160.38919934794174, 56.69131530560128],
          [-176.04483212864892 + 360, 44.425149156120575],
          [160.45939749901427, 35.22642360670715],
          [142.2947655564448, 46.94471168460147]
        ]
      ])
    )
  },

  methods: {
    initmap() {
      mapboxgl.accessToken = "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      // mapboxgl.setRTLTextPlugin(
      //   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js"
      // );
      // var coordinates = document.getElementById("map");
      this.map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        // style: {
        //   version: 8,
        //   sources: {
        //     "raster-tiles": {
        //       attribution: attribution,
        //       type: "raster",
        //       tiles: [
        //         'https://iserver.supermap.io/iserver/services/maps/rest/maps/World/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}',
        //       ],
        //       tileSize: 256,
        //     },
        //   },
        //   layers: [
        //     {
        //       id: "simple-tiles",
        //       type: "raster",
        //       source: "raster-tiles",
        //       minzoom: 0,
        //       maxzoom: 22,
        //     },
        //   ],
        //   sprite: "mapbox://styles/mapbox/satellite-v9",
        // }, //地图样式，可以使用官网预定义的样式,也可以自定义
        style: 'mapbox://styles/mapbox/streets-v9',// satellite light dark 
        // style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-176.04483212864892, 44.425149156120575], // 初始坐标系
        zoom: 10, // starting zoom 地图初始的拉伸比例
        pitch: 0, //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: false, //抗锯齿，通过false关闭提升性能
      });
      
      // 导航
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
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

      // 全图
      this.map.addControl(new mapboxgl.FullscreenControl());

      // 定位
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true
        })
      )
      // 显示路线 需要下包
      // this.map.addControl(
      //   new MapboxDirections({
      //     accessToken: mapboxgl.accessToken
      //   }),
      //   'top-left'
      // );
      this.map.on("load", () => {
          // this.addLayer1()
          // this.addLayer2()
      });
      //地图监听点击，触发回调
      this.map.on("click", (e) => {
        console.log(e)
        var abc = []
        this.jsonArea.forEach(item => {
          abc.push({lng: item[0], lat: item[1]})
        })
        var a = IsPtInPoly(e.lngLat.lng, e.lngLat.lat, abc)
        console.log(a)
      });
    },
    // 坐标点
    addLayer1() {
      this.removePoint()
      var pointArr = [
          {name: "自作里陆航机场", lon: 159.64228558307263,  lat:45.057406328341585, gd: 100, country: "KOR"},
        ]
      var el = document.createElement('div');
      el.style.width = '20px'
      el.style.height= '20px'
      el.backgroundColor = '#ff3040'
      pointArr.forEach((item, index) => {
          this.marker[index] = new mapboxgl.Marker({
            draggable: false, // 是否可拖拽
            color: '#30ff40'
          })
          .setLngLat([item.lon, item.lat]) //添加marker的初始化点
          .addTo(this.map) //在哪个地图中添加
      })
      //   坐标点可拖拽的时候触发的事件
      //   marker.on("dragstart", () => console.log('鼠标移动开始'));  // 拖拽开始
      //   marker.on("drag", () => console.log('鼠标移动中'));  // 拖拽中
      //   marker.on("dragend", (e) => console.log(e)); // 拖拽结束
    },
    // 移除坐标点
    removePoint () {
      for (var key in this.marker) {
        this.marker[key].remove()
      }
    },
    // 中国地图的边框
    addLayer2 () {
      var array = []
      CHN.features.forEach(item => {
        item.geometry.points.forEach(item => {
          array.push([item.x,item.y])
        })
      })
      // 线的配置
      this.map.addSource("yuan", {       /* addSource()函数添加资源,资源ID是route */
        "type": "geojson",
        "data": 
        {                  /* GeoJSON格式数据 */
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates":array
            }
        }
      })
      // 绘制线
      this.map.addLayer({                 /* 为地图添加layer */
        "id": "route",             /* layer id是route */
        "type": "line",            /* line类型layer*/
        "source": "yuan",         /* 资源引用的是上面定义的source*/
        "layout": {
            "line-join": "round",  /* 线条相交的形状 */
            "line-cap": "round"    /* 线条末端形状 */
        },
        "paint": {
            "line-color": "red",  /* 线条颜色 */
            "line-width": 2        /* 线条宽度 */
        }
      });
    },
    // 添加自定义geojson区域
    addlayer3() {
      this.flag = +new Date()
      this.map.addSource(this.flag.toString(), {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  [ 
                    // [157.70046818239786, 51.55629576804125],
                    // [147.2731382496733, 41.842600213867684],
                    // [177.41760114609792, 37.315544801504444],
                    // [181.3989453022287, 49.0131386450698],
                    // [157.70046818239786, 51.55629576804125],
                    [142.2947655564448, 46.94471168460147],
                    [160.38919934794174, 56.69131530560128],
                    [-176.04483212864892 + 360, 44.425149156120575],
                    [160.45939749901427, 35.22642360670715],
                    [142.2947655564448, 46.94471168460147]
                  ]
                ]
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  // this.jsonArea
                ]
              }
            }
          ]
          
        }
      });
      this.map.addLayer({
        'id': '123',
        'type': 'fill',
        'source': this.flag.toString(),
        'layout': {},
        'paint': {
          'fill-color': 'red',
          'fill-opacity': 0.8
        }
      });
    },
    // 取消自定义geojson区域
    removelayer3 () {
      if (this.flag != null) {
        this.map.removeLayer('123')
      }
    },
    addWind () {
      var that=this;
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
                            //                         color: ['green', 'yellow', 'red']
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
                        itemStyle: {
                            opacity: 0.7
                        }
                    }]
                });

            });
    },
    // 添加会动的圆
    addCircle () {
      var t = this
      var radius = 5;
 
      function pointOnCircle(angle) {
      return {
        'type': 'Point',
        'coordinates': [Math.cos(angle) * radius, Math.sin(angle) * radius]
      };
      }
      this.map.addSource('point', {
        'type': 'geojson',
        'data': pointOnCircle(0)
      });
      this.map.addLayer({
        'id': 'point',
        'source': 'point',
        'type': 'circle',
        'paint': {
          'circle-radius': 10,
          'circle-color': 'red'
        }
      });
      function animateMarker(timestamp) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        t.map.getSource('point').setData(pointOnCircle(timestamp / 1000));
        
        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
      }
        
        // Start the animation.
      animateMarker(10);
    },
    // 添加应急图片
    addfallbackImg () {
      this.map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  -77.03238901390978,
                  38.913188059745586
                ]
              },
              'properties': {
                // 'title': 'Washington DC',
                'icon': 'monument'
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-79.9959, 40.4406]
              },
              'properties': {
                // 'title': 'Pittsburgh',
                'icon': 'bridges'
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-76.2859, 36.8508]
              },
              'properties': {
                // 'title': 'Norfolk',
                'icon': 'harbor'
              }
            }
          ]
        }
      });
      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': [
            'coalesce',
            ['image', ['concat', ['get', 'icon'], '-15']],
            ['image', 'marker-15']
          ],
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
        }
      });
    },
    // 添加自定义图片坐标
    addMyPoint () {
      var geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'message': 'Foo',
              'iconSize': [60, 60]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [-66.324462890625, -16.024695711685304]
            }
          },
          {
            'type': 'Feature',
            'properties': {
              'message': 'Bar',
              'iconSize': [50, 50]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [-61.2158203125, -15.97189158092897]
            }
          },
          {
            'type': 'Feature',
            'properties': {
              'message': 'Baz',
              'iconSize': [40, 40]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [-63.29223632812499, -18.28151823530889]
            }
          }
        ]
      }
      geojson.features.forEach((marker) => {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage =
          'url(https://placekitten.com/g/' +
          marker.properties.iconSize.join('/') +
          '/)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
        el.style.display = 'block'
        el.style.border = 'none';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.padding = '0';
        
        el.addEventListener('click', function() {
          window.alert(marker.properties.message);
        });
        
        // add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);
        });
    }
  },
}
</script>

<style  scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
/* @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"); */
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
