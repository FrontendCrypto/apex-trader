<template>
    <div class="chart-container">
        <div class="button-group">
            <button @click="setTimeframe('1d')" :class="['button', { active: timeframe === '1d' }]">1 Day</button>
            <button @click="setTimeframe('1w')" :class="['button', { active: timeframe === '1w' }]">1 Week</button>
            <button @click="setTimeframe('1m')" :class="['button', { active: timeframe === '1m' }]">1 Month</button>
        </div>
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>
  
<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';

HighchartsStock(Highcharts);

import { getRandomData } from '../helpers/utils';

export default {
    components: {
        highcharts: Chart,
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'candlestick',
                    backgroundColor: '#131722',
                    // style: {
                    //     fontFamily: 'Arial, sans-serif',
                    // },
                },
                title: null,
                plotOptions: {
                    candlestick: {
                        color: 'rgba(173, 155, 227, 1)',
                        upColor: 'rgba(118, 209, 170, 1)',
                        lineColor: 'rgba(173, 155, 227, 1)',
                        upLineColor: 'rgba(118, 209, 170, 1)',
                        // ...
                    },
                },
                xAxis: {
                    type: 'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Price',
                        style: {
                            color: 'rgb(204, 208, 220)',
                        },
                    },
                    gridLineColor: 'rgba(117, 134, 150, 0.5)',
                    labels: {
                        style: {
                            color: 'rgb(204, 208, 220)',
                        },
                    },
                },
                series: [
                    {
                        name: 'BTC-USD',
                        type: 'candlestick',
                        data: [],
                        upColor: 'rgba(118, 209, 170, 1)',
                        color: 'rgba(173, 155, 227, 1)',
                    },
                ],
            },
            timeframe: '1w',
        };
    },
    mounted() {
        this.generateRandomData();
    },
    methods: {
        generateRandomData() {
            const data = getRandomData(60);
            this.chartOptions.series[0].data = data;
        },
        setTimeframe(selectedTimeframe) {
            this.timeframe = selectedTimeframe;
            this.generateRandomData();
        },
    },
};
</script>
  
<style scoped lang="scss">
@import '../assets/variables';

.chart-container {
    background-color: #262d38;
    color: rgb(204, 208, 220);
    //   padding: 20px;
}

.button-container {
    margin-bottom: 20px;
}

.chart-button {
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    color: rgb(204, 208, 220);
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.chart-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.button-group {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    width: 100%;
}

.button {
    background-color: $button;
    color: $surfaceContent;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: $buttonHover;
    }

    &.active {
        background-color: $buttonHover;
    }
}
</style>