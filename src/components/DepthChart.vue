<template>
    <div class="depth-chart">
        <div class="bid-chart">
            <div id="bidChartCanvas" class="chart-canvas"></div>
        </div>
        <div class="ask-chart">
            <div id="askChartCanvas" class="chart-canvas"></div>
        </div>
    </div>
</template>
  
<script>
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { orderbook } from '../data/orderbook.js';

// Import the Highcharts styles if needed
import 'highcharts/css/highcharts.css';

// Initialize the modules
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

export default {
    mounted() {
        this.generateDepthChart();
    },
    computed: {
        bids() {
            return orderbook.bids;
        },
        asks() {
            return orderbook.asks;
        },
    },
    methods: {
        calculateCumulativeData(data) {
            let cumulativeSum = 0;
            return data.map((item) => {
                const price = item.price;
                cumulativeSum += item.amount;
                return { x: cumulativeSum, y: price };
            });
        },
        generateDepthChart() {
            const bidsData = this.calculateCumulativeData(this.bids);
            const asksData = this.calculateCumulativeData(this.asks);

            Highcharts.chart('bidChartCanvas', {
                chart: {
                    type: 'area',
                    inverted: true,
                    margin: 0,
                    spacing: [0, 0, 0, 0]
                },
                title: {
                    text: null
                },
                xAxis: {
                    reversed: true,
                    min: 0,
                    max: Math.max(...bidsData.map((data) => data.x)),
                    visible: false
                },
                yAxis: {
                    reversed: false,
                    min: Math.min(...bidsData.map((data) => data.y)),
                    max: Math.max(...bidsData.map((data) => data.y)),
                    visible: false
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [
                    {
                        name: 'Bids',
                        data: bidsData,
                        color: 'rgba(118, 209, 170, 0.1)',
                        lineColor: 'rgba(118, 209, 170, 1)',
                        fillOpacity: 0.5
                    }
                ],
                credits: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                legend: {
                    enabled: false
                }
            });

            Highcharts.chart('askChartCanvas', {
                chart: {
                    type: 'area',
                    inverted: true,
                    margin: 0,
                    spacing: [0, 0, 0, 0],
                },
                title: {
                    text: null
                },
                xAxis: {
                    reversed: false,
                    min: 0,
                    max: Math.max(...asksData.map((data) => data.x)),
                    visible: false
                },
                yAxis: {
                    reversed: false,
                    min: Math.min(...asksData.map((data) => data.y)),
                    max: Math.max(...asksData.map((data) => data.y)),
                    visible: false
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [
                    {
                        name: 'Asks',
                        data: asksData,
                        color: 'rgba(173, 155, 227, 0.1)',
                        lineColor: 'rgba(173, 155, 227, 1)',
                        fillOpacity: 0.5
                    }
                ],
                credits: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                legend: {
                    enabled: false
                }
            });
        }
    }
};
</script>
  
<style>
.highcharts-background {
    background-color: transparent !important;
    fill: transparent !important;
}

.depth-chart {
    display: grid;
    grid-template-rows: 1fr 1fr;
    height: 100%;
}

.bid-chart {
    grid-row: 1;
    height: 100%;
}

.ask-chart {
    grid-row: 2;
    height: 100%;
}

.chart-canvas {
    width: 100%;
    height: 100%;
}
</style>
  