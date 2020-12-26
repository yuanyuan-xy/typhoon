import mapboxgl from 'mapbox-gl'
import pic1 from './img/svgtopng/jichang.png'
import pic2 from './img/svgtopng/gangkou.png'
import pic3 from './img/svgtopng/daodan.png'
import pic4 from './img/svgtopng/leida.png'
import pic5 from './img/svgtopng/zhihui.png'
import pic99 from './img/svgtopng/qita.png'
// 图片,源和图层都需要id,所以现在外面定义一个
var imageId = null
var sourceId = null
var layerId = null
var tipArr = []
var layerArr = []
var imageArr = []
var sourceArr = []
export function addMapImage (map, pointData) {
  // 首先要做的就是清除图层
  if(layerArr.length > 0) {
    layerArr.forEach(item => map.removeLayer(item))
    layerArr.length = 0
  }
  if(tipArr.length > 0) {
    tipArr.forEach(item => item.remove())
    tipArr.length = 0
  }
  if(imageArr.length > 0) {
    imageArr.forEach(item => map.removeImage(item))
    imageArr.length = 0
  }
  if(sourceArr.length > 0) {
    sourceArr.forEach(item => map.removeSource(item))
    sourceArr.length = 0
  }
  // 创建一个根据classid分类的对象,把相同类型放在同一个数组里
  var pointTypeObj = {}
  pointData.forEach(item => {
    if (pointTypeObj[item.classid]) {
      pointTypeObj[item.classid].push(item)
    } else {
      pointTypeObj[item.classid] = [item]
    }
  })
  // 这个是图片对象,键的名称和classid相对应
  var picObj = {
    '1': pic1, // 机场
    '2': pic2, // 港口
    '3': pic3, // 导弹
    '4': pic4, // 雷达
    '5': pic5, // 指挥
    '99': pic99 // 其他
    
  }
  // 循环分类对象,有一个类型就循环一次,每循环一次就创建一个不同图片的图层,每个图层里再循环图片 我这么说你应该懂吧? !-.-
  for (const k in pointTypeObj) {
    map.loadImage(picObj[k],(error, image) => {
      if (error) throw error;
      // 每循环一次就更新一下每个id,保证每次id不一样才可以渲染多个图片图层
      imageId = 'custom-marker' + k
      sourceId = 'source' + k
      layerId = 'layer' + k
      // 将图层id放在一个全局变量数组里,这样才能在别的函数中清除它
      layerArr.push(layerId)
      imageArr.push(imageId)
      sourceArr.push(sourceId)
      map.addImage(imageId, image); // 相同1
  
      map.addSource(sourceId, { // 相同2
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': uploadPoint(map, pointTypeObj[k])
        }
      });
      map.addLayer({
        'id': layerId, // 相同3
        'type': 'symbol',
        'source': sourceId, // 相同2
        'layout': {
          'icon-image': imageId, // 相同1
          'icon-rotate': 45,
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true
        }
      });
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
  
      map.on('mouseenter', layerId, function (e) { // 相同3 layerId
        // e.preventDefault()
        // if(e.defaultPrevented) return;
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
    
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
    
        // 处理缩放
        while (Math.abs(e.lngLalng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLalng > coordinates[0] ? 360 : -360;
        }
    
        // 加载弹出框
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });
    
      map.on('mouseleave', layerId, function () { // 相同3 layerId
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

    })
  }
}
// 这是各个点的数据
function uploadPoint (map,pointData) {
  var pointArr = []
  for (var i = 0;i< pointData.length; i++) {
    pointArr.push({
      'type': 'Feature',
      'properties': {
        
        "title": "Mapbox DC",
        "marker-symbol": "monument",
        
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
    // 点旁边的文字
    var pointName = document.createElement('div')
    pointName.style.backgroundColor = 'rgba(0,0,0,.7)'
    pointName.style.color = '#fff'
    pointName.style.transform = 'translate(-10px, -10px)'
    pointName.style.top = '-2.3%'
    pointName.style.left = '2%'
    pointName.innerHTML = pointData[i].name
    var tipMember = new mapboxgl.Marker(pointName).setLngLat([pointData[i].lon, pointData[i].lat]).addTo(map)
    tipArr.push(tipMember) // 将文字的id也添加进去数组,然后在清除函数中循环这个数组并清除
  }
  return pointArr
}


// 清除图层的方法
export function removeImageLayer (map) {
  if(layerArr.length > 0) {
    layerArr.forEach(item => map.removeLayer(item))
    layerArr.length = 0
  }
  if(tipArr.length > 0) {
    tipArr.forEach(item => item.remove())
    tipArr.length = 0
  }
  if(imageArr.length > 0) {
    imageArr.forEach(item => map.removeImage(item))
    imageArr.length = 0
  }
  if(sourceArr.length > 0) {
    sourceArr.forEach(item => map.removeSource(item))
    sourceArr.length = 0
  }

}