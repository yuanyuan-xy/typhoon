import mapboxgl from 'mapbox-gl'
import pic0 from '../../assets/lol/0.png'
import pic100 from '../../assets/lol/100.png'
// import { directive } from 'vue/types/umd';
// var markerObj = {}

// var sourceObj = {}
// var layerObj = {}
// var imageObj = {}
export function addMapImage(map, pointData) {
  var pointTypeObj = {}
  pointData.forEach(item => {
    if (pointTypeObj[item.gd]) {
      pointTypeObj[item.gd].push(item)
    } else {
      pointTypeObj[item.gd] = [item]
    }
  })
  var picObj = {
    '0': pic0,
    '100': pic100
  }
  // -----------------------------------------------------------------------------------------------
  for (const k in pointTypeObj) {
    
      map.loadImage(picObj[k], function (error, image) {
        if (error) throw error;
        map.addImage(pointTypeObj[k].name, image);

        map.addSource('pointData[i].country', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            // 'features': uploadPoint(pointData)
            'features': uploadPoint(pointTypeObj[k]) //TODO:
          }
        });
        map.addLayer({
          'id': 'pointData[i].country',
          'type': 'symbol',
          'source': 'pointData[i].country',
          'layout': {
            'icon-image': pointTypeObj[k].name,
            'icon-allow-overlap': true
          }
        });
      })
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      map.on('mouseenter', 'pointData[i].country', function (e) { // 这里的places是id
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // 应对缩放问题
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // 添加进去
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      map.on('mouseleave', 'pointData[i].country', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  }
  // --------------------------------------------------------------------------------------------------
  function uploadPoint (pointData) {
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
















 














  // uploadTextArea()
  // // 加载文字弹出窗
  // // 加载点的数据
  // function uploadPoint (pointData) {
  //   for (var i = 0;i< pointData.length; i++) {
  //     var pointName = document.createElement('div')
  //     pointName.innerHTML = pointData[i].name
  //     markerObj[i] = new mapboxgl.Marker(pointName).setLngLat([pointData[i].lon, pointData[i].lat]).addTo(map)
  //   }
  // }
// }