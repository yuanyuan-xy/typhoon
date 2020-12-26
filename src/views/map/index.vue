<template>
  <div class="map-index">
    <div id="container" class="container"></div> 
  </div>
</template>

<script>
// import { IsPtInPoly } from './index'
import AMap from 'AMap'
export default {
  name: 'App',
  components: {
  },
  methods: {
    initMap () {
      var map = new AMap.Map('container', {
        center:[113.281391,40.168111],
        layers: [//使用多个图层
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet(),
            new AMap.Buildings({
                'zooms':[16,18],
                'zIndex':10,
                'heightFactor':2//2倍于默认高度，3D下有效
            })
        ],
        viewMode:'3D',
        mapStyle: 'amap://styles/whitesmoke',
        resizeEnable: true,
        zoom: 13
      })
      map.on('complete', this.mapCom()) // 地图加载完事件
    },
    mapCom () {
      console.log(123)
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style scoped>
.container {
  width: 1000px;
  height: 1000px;
}
</style>