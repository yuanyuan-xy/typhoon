<template>
  <div class="index">
    <div id="printMe">
      <p class="yy1">打印内容</p>
    </div>
    <button v-print="popTitle">点击打印</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popTitle: {
        id: 'printMe',
        popTitle: '打印的东西'
      }
    }
  }
}
</script>

<style scoped>
  .yy1 {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>