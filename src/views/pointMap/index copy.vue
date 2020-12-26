<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
var pointData = [
  {
    classid: 2,
    country: "TWN",
    describe: "基隆港位于基隆市中山区东南部，西距福州港276千米，为台湾大型国际贸易港和主要海军作战基地之一。驻有海军巡防第一舰队、北区巡逻支队（62.2特遣支队）和北区运输支队（62.4特遣支队）。主要担负台湾北部海区作战、后勤补给、舰艇维修，以及支援、运补马祖地区的主要任务。常驻各型舰艇30余艘，约占台海军舰艇总数的20%。设有台海军在北部地区最大油库和弹药库。",
    gd: 0,
    lat: 25.1502,
    lon: 121.7496,
    name: "基隆港",
    qc: "中国台湾 Taiwan, Province of China",
    zwjc: "中国台湾"
  },
  {
    classid: 1,
    country: "TWN",
    describe: "松山空军基地位于台北市东北5千米，距福州253千米。为台湾北部地区的重要军民两用机场。可容纳战斗机150架，保障中型运输机遂行军事空运、空投和空降任务，亦可保障中型轰炸机起降。松山空军基地占地面积1.82平方千米。跑道1条，长2605米，宽60米，真北方向93°～273°。滑行道1条，位于跑道南侧，与跑道连接成三角形，长2950米，宽22.5米。集体停机坪2处，机库9座，均位于南集体停机坪旁。油库2处，其中西油库有地面油罐4个。东油库有地面油罐5个。机场雷达站1座，候机楼1座。",
    gd: 100,
    lat: 25.0697,
    lon: 121.5533,
    name: "松山空军基地",
    qc: "中国台湾 Taiwan, Province of China",
    zwjc: "中国台湾",
  },
  {
    classid: 1,
    country: "KOR",
    describe: "军民两用。首尔特别市东南约18千米。占地面积4平方千米，标高22米，二条跑道2700×45、3000×45，方向，178°-358°、7°-187°。现驻韩空军第15特殊任务飞行团第296侦察大队，装备装备RC-800型机8架，第255特战大队，装备C-130飞机5架，第35空运战队，下辖总统专机及CN-235型机18架。群山空军基地	KOR	1	126.6163889	35.90277778	100	韩美共用军民两用。全罗北道群山市西南12千米处。占地面积7平方千米，标高10米，二条跑道2750×50、2400×30，方向，170°-350°、-240°。美太平洋空军在东北亚的一线作战基地也是韩空军在西部沿海的最重要防空作战基地之一和民用机场。现驻美空军第7航空队第8战斗机联队，装备KF-16型战斗机；另驻有韩南部战斗司令部直属第38战斗飞行战队，装备KF-16C/D战斗机20架。",
    gd: 100,
    lat: 37.4428,
    lon: 127.1153,
    name: "新村里空军基地",
    qc: "大韩民国 Republic of Korea",
    zwjc: "韩国"
  }
]
import mapboxgl from 'mapbox-gl'
import MapboxLanguage  from '@mapbox/mapbox-gl-language'
// import 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
export default {
  name: 'pointMap',
  data () {
    return {
      map: null
    }
  },
  methods: {
    initMap () {
      mapboxgl.accessToken = "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/streets-v9',// satellite light dark 
        center: [25.1502,21.7496], // 初始坐标系
        zoom: 3, // starting zoom 地图初始的拉伸比例
        pitch: 0, //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: false, //抗锯齿，通过false关闭提升性能
      });
      // 配置中文
      var language = new MapboxLanguage({ defaultLanguage: "zh" });
      this.map.addControl(language);
      this.map.on('load', () => {
        this.addMapImage()
      })
    },
    addMapImage () {
      var t = this
       t.map.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      function (error, image) {
        if (error) throw error;
        t.map.addImage('custom-marker', image);

        t.map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': t.uploadPoint(pointData)
          }
        });
        t.map.addLayer({
          'id': 'places',
          'type': 'symbol',
          'source': 'places',
          'layout': {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true
          }
        });
      }
      )
      t.uploadTextArea()
    },
    uploadTextArea () {
      var t = this
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      t.map.on('mouseenter', 'places', function (e) { // 这里的places是id
        // Change the cursor style as a UI indicator.
        t.map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(t.map);
      });

      t.map.on('mouseleave', 'places', function () {
        t.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    },
    uploadPoint (pointData) {
      var pointArr = []
      for (var i = 0;i< pointData.length; i++) {
        pointArr.push({
          'type': 'Feature',
          'properties': {
            'description':
            `<table>
              <tr>
                <td class="label">名称:</td>
                <td class="content">${pointData[i].name}</td>
              </tr>
              <tr>
                <td class="label">国籍:</td>
                <td class="content">${pointData[i].zwjc}</td></tr>
              <tr>
                <td class="label">详情:</td>
                <td class="content">${pointData[i].describe}</td></tr>
            </table>`
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [pointData[i].lon, pointData[i].lat]
          }
        })
      }
      return pointArr
    }
  },
  mounted () {
    this.initMap()
  }
}
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
  /deep/ .mapboxgl-popup {
    background-color: red;
    width: 432px;
    border-radius: 10px;
    max-width: unset !important;
    background-color: rgba(0, 0, 0, .7);
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;

    .mapboxgl-popup-content {
      background-color: unset;
      
      .label {
        font-size: 16px;
        color: #ffffff;
        width: 50px;
        vertical-align: initial;
      }
      .content {
        font-size: 14px;
        color: #2fd3c6;
      }
    }
  }
</style>