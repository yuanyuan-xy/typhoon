<template>
  <div>
    <div id="map"></div>
    <button @click="loadPoint"> daidhajk </button>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import pic1 from '../pointMap/img/svgtopng/jichang.png'
// import pic2 from '../pointMap/img/svgtopng/gangkou.png'
export default {
  name: 'airportMap',
  data () {
    return {
      map: null
    }
  },
  methods: {
    initMap () {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 2,
        center: [13,13]
      })
      this.map.on('load',() => {
        // this.addPoint()
      })
    },
    addPoint () {
      this.map.addSource('sourceId', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'color': '#ff3040',
                    'coordinates': [12,12]
                }
            },
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'color': '#ff3040',
                    'coordinates': [2,2]
                }
            }
          ]
        }
      })
      this.map.addLayer({
          'id': 'point',
          'source': 'sourceId',
          'type': 'symbol',
          'layout': {
            'icon-image': 'airport-15',
            'icon-rotate': 90,
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true
          }
      })









      this.map.addSource('sourceId1', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'color': '#ff3040',
                    'coordinates': [22,22]
                }
            }
          ]
        }
      })
      this.map.addLayer({
          'id': 'point1',
          'source': 'sourceId1',
          'type': 'symbol',
          'layout': {
            'icon-image': 'airport-15',
            'icon-rotate': 39,
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true
          }
      })
    },
    changePoint () {
      this.map.getSource('sourceId1').setData({
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'color': '#ff3040',
                    'coordinates': [52,52]
                }
            }
          ]
        })
    },
    loadPoint () {
      this.map.loadImage(pic1,(error, image) => {
        if (error) throw error;
        var imageId = 'custom-marker'
        var sourceId = 'source'
        var layerId = 'layer'

        this.map.addImage(imageId, image); // 相同1
    
        this.map.addSource(sourceId, { // 相同2
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': [52.87469227071318, 32.70188365979197]
                }
                // var arr = [
                //   [52.87469227071318, 92.70188365979197],
                //   [146.603773097382, 79.86197139614087],
                //   [92.52560740944138, 121.67505071194373],
                //   [171.9478023150902, 25.927608568275264],
                //   [110.59269202929148, 78.46051879999449],
                //   [128.95964101158592, 108.52301161281959],
                //   [1.0356879390245977, 67.52633680926601],
                //   [165.53434205233143, 117.4064927476657],
                //   [130.25195713772553, 111.5340561244787],
                //   [123.70276730620512, 97.99598624202864]
                // ]
              },
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': [32.87469227071318, 62.70188365979197]
                }
                // var arr = [
                //   [52.87469227071318, 92.70188365979197],
                //   [146.603773097382, 79.86197139614087],
                //   [92.52560740944138, 121.67505071194373],
                //   [171.9478023150902, 25.927608568275264],
                //   [110.59269202929148, 78.46051879999449],
                //   [128.95964101158592, 108.52301161281959],
                //   [1.0356879390245977, 67.52633680926601],
                //   [165.53434205233143, 117.4064927476657],
                //   [130.25195713772553, 111.5340561244787],
                //   [123.70276730620512, 97.99598624202864]
                // ]
              }
            ]
          }
        });
        this.map.addLayer({
          'id': layerId, // 相同3
          'type': 'symbol',
          'source': sourceId, // 相同2
          'layout': {
            'icon-image': imageId, // 相同1
            'icon-rotate': 45,
            'icon-size': 0.8,
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true
          }
        });
      })
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style scoped lang="less">
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
@import url("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css");
#map {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
}
</style>