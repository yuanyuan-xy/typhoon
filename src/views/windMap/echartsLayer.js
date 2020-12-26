/* eslint-disable */
/*!
* 	  Copyright (c) 2016 @thinkinggis
* 	  CopyrightÂ© 2000-2017 SuperMap Software Co. Ltd
*     echartsLayer.
*     github: https://github.com/SuperMap/echartsLayer
*     license: MIT
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("echarts")):"function"==typeof define&&define.amd?define(["echarts"],e):"object"==typeof exports?exports.EchartsLayer=e(require("echarts")):t.EchartsLayer=e(t.echarts)}(this,function(t){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(e,n){e.exports=t},function(t,e,n){n(2);var o=n(6);t.exports=o},function(t,e,n){var o;void 0!==(o=function(t){return n(0).registerCoordinateSystem("GLMap",n(3)),n(4),n(5),n(0).registerAction({type:"GLMapRoam",event:"GLMapRoam",update:"updateLayout"},function(t,e){}),{version:"1.0.0"}}.call(e,n,e,t))&&(t.exports=o)},function(t,e,n){var o;void 0!==(o=function(t){function e(t,e){this._GLMap=t,this.dimensions=["lng","lat"],this._mapOffset=[0,0],this._api=e}var o=n(0);return e.prototype.dimensions=["lng","lat"],e.prototype.setMapOffset=function(t){this._mapOffset=t},e.prototype.getBMap=function(){return this._GLMap},e.prototype.fixLat=function(t){return t>=90?89.99999999999999:t<=-90?-89.99999999999999:t},e.prototype.dataToPoint=function(t){t[1]=this.fixLat(t[1]);var e=this._GLMap.project(t),n=this._mapOffset;return[e.x-n[0],e.y-n[1]]},e.prototype.pointToData=function(t){var e=this._mapOffset,t=this._bmap.project([t[0]+e[0],t[1]+e[1]]);return[t.lng,t.lat]},e.prototype.getViewRect=function(){var t=this._api;return new o.graphic.BoundingRect(0,0,t.getWidth(),t.getHeight())},e.prototype.getRoamTransform=function(){return o.matrix.create()},e.prototype.prepareCustoms=function(t){function e(t,e){return e=e||[0,0],n.map([0,1],function(n){var o=e[n],i=t[n]/2,r=[],a=[];return r[n]=o-i,a[n]=o+i,r[1-n]=a[1-n]=e[1-n],Math.abs(this.dataToPoint(r)[n]-this.dataToPoint(a)[n])},this)}var n=o.util,i=this.getViewRect();return{coordSys:{type:"GLMap",x:i.x,y:i.y,width:i.width,height:i.height},api:{coord:n.bind(this.dataToPoint,this),size:n.bind(e,this)}}},e.dimensions=e.prototype.dimensions,e.create=function(t,n){var i;t.eachComponent("GLMap",function(t){var r=(n.getZr().painter.getViewportRoot(),o.glMap);i=new e(r,n),i.setMapOffset(t.__mapOffset||[0,0]),t.coordinateSystem=i}),t.eachSeries(function(t){"GLMap"===t.get("coordinateSystem")&&(t.coordinateSystem=i)})},e}.call(e,n,e,t))&&(t.exports=o)},function(t,e,n){var o;void 0!==(o=function(t){return n(0).extendComponentModel({type:"GLMap",getBMap:function(){return this.__GLMap},defaultOption:{roam:!1}})}.call(e,n,e,t))&&(t.exports=o)},function(t,e,n){var o;void 0!==(o=function(t){return n(0).extendComponentView({type:"GLMap",render:function(t,e,n){function o(){i||n.dispatchAction({type:"GLMapRoam"})}var i=!0,r=echarts.glMap,a=n.getZr().painter.getViewportRoot(),s=t.coordinateSystem,p=function(e,o){if(!i){var r=document.getElementsByClassName("mapboxgl-map")[0],p=[-parseInt(r.style.left,10)||0,-parseInt(r.style.top,10)||0];a.style.left=p[0]+"px",a.style.top=p[1]+"px",s.setMapOffset(p),t.__mapOffset=p,n.dispatchAction({type:"GLMapRoam"})}};r.off("move",this._oldMoveHandler),r.off("zoomend",this._oldZoomEndHandler),r.on("move",p),r.on("zoomend",o),this._oldMoveHandler=p,this._oldZoomEndHandler=o;t.get("roam");i=!1}})}.call(e,n,e,t))&&(t.exports=o)},function(t,e){function n(t){const e=t.getCanvasContainer();this._container=document.createElement("div"),this._container.style.width=t.getCanvas().style.width,this._container.style.height=t.getCanvas().style.height,this._container.setAttribute("id","echarts"),this._container.setAttribute("class","echartMap"),this._map=t,e.appendChild(this._container),this.chart=echarts.init(this._container),echarts.glMap=t,this.resize()}n.prototype.remove=function(){var t=this;this._map._listeners.move.forEach(function(e){"moveHandler"===e.name&&t._map.off("move",e)}),this._map._listeners.move.forEach(function(e){"zoomEndHandler"===e.name&&t._map.off("zoomend",e)}),this.chart.clear(),this._container.parentNode&&this._container.parentNode.removeChild(this._container),this._map=void 0},n.prototype.resize=function(){const t=this;window.onresize=function(){t._container.style.width=t._map.getCanvas().style.width,t._container.style.height=t._map.getCanvas().style.height,t.chart.resize()}},t.exports=n}])});