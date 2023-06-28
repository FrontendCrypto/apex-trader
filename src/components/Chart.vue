<template>
    <div class="chart-container">
        <!-- <div class="button-group">
            <button @click="setTimeframe('1d')" :class="['button', { active: timeframe === '1d' }]">1 Day</button>
            <button @click="setTimeframe('1w')" :class="['button', { active: timeframe === '1w' }]">1 Week</button>
            <button @click="setTimeframe('1m')" :class="['button', { active: timeframe === '1m' }]">1 Month</button>
        </div> -->
        <highcharts class="price-chart" :options="chartOptions"></highcharts>
    </div>
</template>
  
<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsRangeSelector from 'highcharts/modules/stock';
// import HighchartsAccessibility from 'highcharts/modules/accessibility';

HighchartsStock(Highcharts);
HighchartsRangeSelector(Highcharts);
// HighchartsAccessibility(Highcharts);

export default {
    components: {
        highcharts: Chart,
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'stock',
                    marginBottom: 16,
                    spacing: [0, 0, 0, 0]
                },
                rangeSelector: {
                    selected: 2, // Set the initial range selection (0 = all, 1 = 1 month, 2 = 3 months, etc.)
                    inputPosition: {
                        align: 'right'
                    }
                },
                navigator: {
                    enabled: true,
                },
                title: {
                    text: 'BTC-USD Price (Kraken)',
                    style: {
                        color: 'rgb(204, 208, 220)',
                    },
                },
                plotOptions: {
                    candlestick: {
                        color: 'rgba(173, 155, 227, 1)',
                        upColor: 'rgba(118, 209, 170, 1)',
                        lineColor: 'rgba(173, 155, 227, 1)',
                        upLineColor: 'rgba(118, 209, 170, 1)',
                    },
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            color: 'rgb(204, 208, 220)',
                        },
                    },
                    minRange: 30 * 24 * 3600 * 1000, // Set the minimum range to 30 days
                    min: Date.UTC(2023, 0, 15) - (60 * 24 * 3600 * 1000), // Set the minimum value to 60 days ago
                    max: Date.UTC(2023, 0, 15), // Set the maximum value to January 20, 2023
                },
                yAxis: [
                    {
                        title: {
                            text: 'Price',
                        },
                        opposite: true,
                        labels: {
                            x: -40,
                            style: {
                                color: 'rgb(204, 208, 220)',
                            },
                        },
                    },
                    {
                        title: {
                            text: 'Volume',
                        },
                        opposite: true,
                        labels: {
                            style: {
                                color: 'rgb(204, 208, 220)',
                            },
                        },
                    }],
                series: [{
                    name: 'BTC-USD',
                    type: 'candlestick',
                    data: [],
                    dataGrouping: {
                        units: [
                            ['week', [1]], // Group data by week
                            ['month', [1, 2, 3, 4, 6]] // Group data by month
                        ]
                    },
                    upColor: 'red',
                    color: 'rgba(173, 155, 227, 1)',
                }, {
                    name: 'Volume',
                    type: 'column',
                    data: [],
                    yAxis: 1,
                    color: 'rgba(173, 155, 227, 0.5)',
                    dataGrouping: {
                        units: [
                            ['week', [1]],
                            ['month', [1, 2, 3, 4, 6]]
                        ]
                    },
                }],
                credits: {
                    enabled: false
                },
                tooltip: {
                    enabled: true
                },
                legend: {
                    enabled: false
                }
            },
            timeframe: '1w',
        };
    },
    mounted() {
        this.loadData();
        const style = document.createElement('style');
        style.innerHTML = '.highcharts-grid-line { stroke: rgba(255, 255, 255, 0.05) !important; }';
        document.head.appendChild(style);
    },
    methods: {
        loadData() {
            const timeframes = ['1d'];
            const baseUrl = 'src/data/OHCLVT/XBTUSD/';
            const fileExtensions = ['1440.csv'];

            const promises = timeframes.map((timeframe, index) => {
                const url = baseUrl + 'XBTUSD_' + fileExtensions[index];
                return fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        const lines = data.split('\n');
                        const candlestickData = [];
                        const volumeData = [];

                        lines.forEach(line => {
                            if (line.trim() !== '') {
                                const [timestamp, open, high, low, close, volume, trades] = line.split(',');
                                const parsedTimestamp = parseInt(timestamp) * 1000; // Convert Unix timestamp to milliseconds
                                const parsedOpen = parseFloat(open);
                                const parsedHigh = parseFloat(high);
                                const parsedLow = parseFloat(low);
                                const parsedClose = parseFloat(close);
                                const parsedVolume = parseFloat(volume);
                                candlestickData.push([parsedTimestamp, parsedOpen, parsedHigh, parsedLow, parsedClose]);
                                volumeData.push([parsedTimestamp, parsedVolume]);
                            }
                        });

                        return [{
                            name: 'XBTUSD ' + timeframe.toUpperCase(),
                            type: 'candlestick',
                            data: candlestickData
                        }, {
                            name: 'Volume',
                            type: 'column',
                            data: volumeData,
                        }];
                    });
            });

            Promise.all(promises)
                .then(seriesData => {
                    this.chartOptions.series = seriesData.flat();
                    console.log(seriesData)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        setTimeframe(selectedTimeframe) {
            this.timeframe = selectedTimeframe;
            this.loadData();
        },
    },
};
</script>
  
<style scoped>
.price-chart {
    width: 100%;
    height: 100%;
}

.highcharts-background {
    background-color: transparent !important;
    fill: transparent !important;
}

.chart-container {
    width: 100%;
    height: 100%;
}

.button {
    background-color: #2d3542;
    color: rgb(204, 208, 220);
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #39455a;
    }

    &.active {
        background-color: #39455a;
    }
}
</style>
  