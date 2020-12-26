/**
 * 这个页面是配置路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


const Hello = () => import('@/views/admin/index.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
    children: [
      {
        path: '/children',
        name: 'children',
        component: () => import('@/views/children/index.vue')
      }
    ]
  },
      {
        path: '/yy',
        name: 'yy',
        component: () => import('@/views/yy/index.vue')
      },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts')
  },
  {
    path: '/',
    name: 'map',
    component: () => import('@/views/map/index.vue')
  },
  {
    path: '/mapbox',
    name: 'mapbox',
    component: () => import('@/views/mapbox/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: '/wsaEcharts',
    name: 'wsaEcharts',
    component: () => import('@/views/wsa-echarts/index.vue')
  },
  {
    path: '/mapboxgl',
    name: 'mapboxgl',
    component: () => import('@/views/mapboxGl/index.vue')
  },
  {
    path: '/windMap',
    name: 'windMap',
    component: () => import('@/views/windMap/index.vue')
  },
  {
    path: '/pointMap',
    name: 'pointMap',
    component: () => import('@/views/pointMap/index.vue')
  },
  {
    path: '/lineMap',
    name: 'lineMap',
    component: () => import('@/views/lineMap/index.vue')
  },
  {
    path: '/planeMap',
    name: 'planeMap',
    component: () => import('@/views/planeMap/index.vue')
  },
  {
    path: '/airportMap',
    name: 'airportMap',
    component: () => import('@/views/airportMap/index.vue')
  },
  {
    path: '/boxMap',
    name: 'boxMap',
    component: () => import('@/views/boxMap/index.vue')
  },
  {
    path: '/leaflet',
    name: 'leaflet',
    component: () => import('@/views/leaflet/index.vue')
  },
  {
    path: '/leafetWind',
    name: 'leafetWind',
    component: () => import('@/views/leafetWind/index.vue')
  },
  {
    path: '/car',
    name: 'car',
    component: () => import('@/views/car/index.vue')
  },
]

const router = new VueRouter({
  routes
})



export default router