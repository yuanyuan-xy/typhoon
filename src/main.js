import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Print from 'vue-print-nb'
import Print from 'vue-print-nb'
import './style/index.css'
// import echarts from 'echarts'
// Vue.use(echarts)
// import mapBox from 'mapbox-gl'
// Vue.use(mapBox)
Vue.use(Print)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
