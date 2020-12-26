<template>
  <div style="background-color:#002d5d;height:100vh;" class="container">
    <div class="otherEcharts"></div>
    <div id="warnEcharts" class="warnEcharts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
var series0Data = null
var xAxisData = null
var windirectionData = null
export default {
  name: 'warnEcharts',
  methods: {
    initEcharts () {
      var eR = echarts.init(document.getElementById("warnEcharts"));
      var optionR = {
              xAxis: {
                type: 'category',
                axisLabel: {
                  color: 'white',
                  fontSize: '12'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    color: '#4fadd0'
                  }
                },
                boundaryGap: true,
                data: xAxisData
              },
              tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                  return `${params[0].name} <br> 风向：${
                    params[1].data.direc
                  }° <br> 风速：${Number(params[0].value).toFixed(2)} m/s `
                },
                axisPointer: {
                  animation: false
                }
              },
              grid: {
                top: 20,
                bottom: 24,
                left: 40,
                right: 15
              },
              yAxis: {
                name: '风速',
                type: 'value',
                axisLabel: {
                  color: 'white',
                  fontSize: '12'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(138,227,253,0.3)',
                    width: 1
                  }
                }
              },
              series: [
                {
                  symbol: 'circle',
                  symbolSize: 8,
                  lineStyle: {
                    color: '#3095ba',
                    width: 1
                  },
                  label: {
                    normal: {
                      name: 'c',
                      show: false,
                      position: 'top',
                      formatter (a) {
                        return a['value'] + ''
                      }
                    }
                  },
                  data: series0Data,
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color: '#fff'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#64bb99' // '#64bb99'//'#3095ba'
                        },
                        {
                          offset: 1,
                          color: 'rgba(81,140,120,0.1)' // '#3095ba26'
                        }
                      ])
                    }
                  }
                },
                {
                  lineStyle: {
                    color: '#3095ba26',
                    width: 1
                  },
                  data: windirectionData,
                  type: 'line'
                }
              ]
            };
      eR.setOption(optionR);
    }
  },
  mounted () {
    this.initEcharts()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.otherEcharts {
  width: 600px;
  height: 200px;
  background-color: #fff;
}
.warnEcharts {
  width: 332px;
  height: 201px;
}

</style>