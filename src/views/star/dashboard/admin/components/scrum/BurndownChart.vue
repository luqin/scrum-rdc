<template>
  <Chart :options="options"/>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'BurndownChart',
  components: { Chart },
  props: {
    title: {
      type: String,
      default: '故事点燃尽图'
    },
    data: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      days: []
    }
  },
  computed: {
    options() {
      const expectedData = []
      const actualData = this.data
      return {
        title: this.title ? {
          left: 'center',
          text: this.title
        } : null,
        xAxis: {
          data: this.groups,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['理想进度', '实际进度'],
          right: 10
        },
        series: [{
          name: '理想进度',
          itemStyle: {
            normal: {
              color: '#00EC00',
              lineStyle: {
                type: 'dashed',
                color: '#00EC00',
                width: 2
              }
            }
          },
          smooth: false,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '实际进度',
          type: 'line',
          smooth: false,
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
