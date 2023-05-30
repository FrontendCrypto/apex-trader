<template>
  <div v-if="series.length > 0">
    <VueApexCharts ref="chart" type="area" :options="options" :series="series" class="chart" />
  </div>
</template>

<script>
import store from '../../store'
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts
  },
  props: {
    ticker: String,
  },
  data() {
    return {
      options: {
        colors: [store.state.color],
        chart: {
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
        },
        yaxis: {
          show: false
        },
        grid: {
          show: false
        },
        tooltip: {
          enabled: false,
        }
      },
    }
  },
  computed: {
    series() {
      return store.state.series
    },
    color() {
      return store.state.color
    }
  },
  watch: {
    color(newColor) {
      this.updateChartColor(newColor)
    }
  },
  methods: {
    updateChartColor(newColor) {
      this.$refs.chart.updateOptions({
        colors: [newColor]
      })
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/button.scss';

.chart {
  width: 100%;
}
</style>
