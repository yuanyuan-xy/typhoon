<!--
 * @Descripttion: 
 * @Author: YangXy
 * @Date: 2020-07-26 15:53:55
 * @LastEditors: YangXy
 * @LastEditTime: 2020-12-14 11:47:22
-->
<template>
  <div class="index">
    我是admin组件
    <div class="mask">
      啊空间大
      <a href="javascript:;" @click="go('/children')">点击孩子</a>
      <a href="javascript:;" @click="go('/yy')">点击去地图</a>
      <ul>
        <li v-for="(item, index) in json" :key="index">
          <div>{{item.name}}</div>
          <div>{{item.age}}</div>
          <div>{{item.sex}}</div>
        </li>
      </ul>
      <router-view></router-view>
    </div>

    
    <swiper ref="mySwiper" :options="swiperOptions" :auto-update="true">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import $ from 'jquery'
import json from './index.json'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      json: json,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    go (path) {
      this.$router.push(path)
    },
    getWarnInfo () {
      $.ajax({
        type: 'post',
        url: 'http://10.0.10.118:8083/WarningService/getWarningByCode',
        data: JSON.stringify({
          startDateTime: '2020-09-01 06:52:30',
          endDateTime: '2020-09-01 06:56:38',
          warnCode: 'WPR_WSA_%'
        }),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        success: function (params) {
          console.log(params)
        }
      })
    }
  },
  mounted () {
    this.getWarnInfo()
    this.initSwiper()
  }
}
</script>

<style scoped>
.swiper-container {
  width: 300px;
  height: 300px;
}

</style>