<template>
  <div class="index">
    <button @click="clear">length = 0清空</button>
    <button @click="remove">重新赋值清空</button>
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [1,2,3]
    }
  },
  methods: {
    clear () {
      this.arr.length = 0
      console.log(this.arr)
    },
    remove () {
      this.arr = []
    }
  }
}
</script>

<style>

</style>