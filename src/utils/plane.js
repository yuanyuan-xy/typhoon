import mapboxgl from 'mapbox-gl'
import pic4 from '../../../static/mapbox/img/leida.png'
var planeDataArr = []
let imageID = null
var sourceId = null
var LayerId = null
var idx = null
var old1 = null
var old2 = null
var old3 = null
var isStop = false
export function addPlaneFun (map, planeData) {
  old1 = imageID
  old2 = sourceId
  old3 = LayerId
  // if (isStop) {
  //   map.removeImage(imageID)
  // }
  // isStop = true
  var flag = false
  imageID = +new Date() + Math.random() + 'a'
  sourceId = +new Date() + Math.random() + 'a'
  LayerId = +new Date() + Math.random() + 'a'
  if (planeDataArr.length > 0) {
    planeDataArr.forEach((item, index) => {
      if (planeData.mbid === item.mbid) {
        flag = true
        idx = index
      }
    })
  } else {
    planeDataArr.push(planeData)
  }

  if (flag) {
    planeDataArr[idx] = planeData
  } else {
    planeDataArr.push(planeData)
  }
  // 妈的天坑!这特么是一个异步函数
  map.loadImage(pic4, (error, image) => {
    if (error) throw error
    map.addImage(imageID, image) // 相同1
    console.log(123)
    map.addSource(sourceId, { // 相同2
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': uploadPoint(map, planeDataArr)
      }
    })
    map.addLayer({
      'id': LayerId, // 相同3
      'type': 'symbol',
      'source': sourceId, // 相同2
      'layout': {
        'icon-image': imageID, // 相同1
        'icon-allow-overlap': true
      }
    })
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

    map.on('mouseenter', LayerId, function (e) { // 相同3 layerId
      map.getCanvas().style.cursor = 'pointer'

      var coordinates = e.features[0].geometry.coordinates.slice()
      var description = e.features[0].properties.description

      // 处理缩放
      while (Math.abs(e.lngLalng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLalng > coordinates[0] ? 360 : -360
      }

      // 加载弹出框
      popup.setLngLat(coordinates).setHTML(description).addTo(map)
    })

    map.on('mouseleave', LayerId, function () { // 相同3 layerId
      map.getCanvas().style.cursor = ''
      popup.remove()
    })
    if (isStop) {
      map.removeImage(old1)
      map.removeSource(old2)
      map.removeLayer(old3)
    }
    isStop = true
  })
}
function uploadPoint (map, planeDataArr) {
  var pointArr = []
  for (var i = 0; i < planeDataArr.length; i++) {
    pointArr.push({
      'type': 'Feature',
      'properties': {
        'description':
        `<table>
          <tr>
            <td class="label">地址码:</td>
            <td class="content">${planeDataArr[i].mbid}</td>
          </tr>
          <tr>
            <td class="label">航班号:</td>
            <td class="content">${planeDataArr[i].hbh}</td>
          </tr>
          <tr>
            <td class="label">机型:</td>
            <td class="content">${planeDataArr[i].jx}</td>
          </tr>
          <tr>
            <td class="label">呼号:</td>
            <td class="content">${planeDataArr[i].hh}</td>
          </tr>
        </table>`
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [planeDataArr[i].jd, planeDataArr[i].wd]
      }
    })
  }
  return pointArr
}
