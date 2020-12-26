<template>
  <div class="echarts-index">
    我是echarts
    <div id="my-echarts" class="my-echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echarts',
  mounted () {
    this.loadEcharts()
  },
  methods: {
    loadEcharts () {
      var myEcharts = echarts.init(document.getElementById('my-echarts'))
      var option = {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          title: {
              text: '杨欣远的图表测试'
          },
          xAxis: {
            type: 'category', // 类目轴,意思是坐标是没有规则的字符串,通过同级data指定
            data: [0,2,4,6,8,10,12,14,16],
            // min: 0,
            // max: 12,
            show: true,
            position: 'top', // x轴位于上方还是下方
            offset: 0, // x轴上下偏移量
            name: '轴', // x轴的名字
            nameLocation: 'end', // x轴名字的位置
            nameTextStyle: { // X名字样式
              color: 'red',
              fontStyle: 'oblique',
              fontWeight: 'bold',
              fontSize: 12,
              align: 'right', // 水平对齐方式
              verticalAlign: 'middle',// 垂直对齐方式
              lineHeight: 10, // 行高
              backgroundColor: {
                image: './logo.png'
              }, // 文字背景颜色,也可以是一张图片,{image:路径},可以设置宽高
              borderColor: 'green',
              padding: [0,-10,0,10], // 文字块的padding
              width: '200%'
            
            
            
            
            },
            nameGap: 15, // 轴线和名称之间的距离
            nameRotate: -45, // 名称的旋转角度
            inverse: false, // 是否翻转
            boundaryGap: true, // 两侧留白
            axisLine: { // 轴线相关设置
              show: true, // 是否显示
              onZero: false, // 是否在Y轴0刻度线上
              // onZeroAxisIndex: 4 // 有双轴时指定在哪根轴上
              lineStyle: {
                color: 'red',
                width: 2,
                type: 'dashed'
              }
            },
            axisTick: { // 坐标轴刻度相关
              show: true,
              alignWithLabel: true, // 刻度和文字对齐,类目轴在设置了boundaryGap: true 时有效
              inside: false, // 坐标轴刻度是否朝内
              lineStyle: {
                color: 'green'
              }
            },
            axisLabel: { // 坐标轴的参数
              show: true,
              color: function (value, index) {
                return index % 2 == 0 ? 'red' : 'green'
              }
            },
            splitLine: { // 在坐标系里的分隔线
              show: true,
              lineStyle: {
                color: 'red',
                type: 'dotted'
              }
            },
            minorSplitLine: { // 次分割线
              show: true,
              type: 'solid'
            },
            // splitArea: {
            //   interval: 2,
            //   show: true,
            //   areaStyle: {
            //     color: [
            //       'rgba(45,14,210,0.9)',
            //       'rgba(45,14,210,0.5)',
            //       'rgba(45,14,210,0.2)',
            //     ]
            //   }
            // },
            axisPointer: {
              show: true,
              type: 'shadow',
              snap: false,
              z: 12,
              label: {
                show: true,
                text: '123'
              }
            }
          },
          yAxis: {
            min: 0,
            max: 10,
            splitLine: {
              show: false
            }
          },
          series: [{
              type: 'line',
              data: [
                2,4,5,3,6,1,7
              ],
              markArea: {
                data: [
                  [
                    {
                      name: 'WSA',
                      xAxis: 1
                    },
                    { 
                      xAxis: 2
                    }
                  ]
                ],
                label: {
                  show: true,
                  offset: [0, 80],
                  fontSize: 20,
                  color: '#fff'
                }
              }
          }]
      };
      myEcharts.setOption(option);
    }
  }
  
}
</script>

<style scoped>
  .my-echarts {
    width: 800px;
    height: 650px;
  }
</style>
