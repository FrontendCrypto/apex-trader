<template>
    <div class="chart-container">
        <highcharts class="price-chart" :options="chartOptions"></highcharts>
    </div>
</template>
  
<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsRangeSelector from 'highcharts/modules/stock';
import { mapGetters } from 'vuex';
// import HighchartsAccessibility from 'highcharts/modules/accessibility';

HighchartsStock(Highcharts);
HighchartsRangeSelector(Highcharts);
// HighchartsAccessibility(Highcharts);

export default {
    components: {
        highcharts: Chart,
    },
    computed: {
        ...mapGetters(['timeframe']),
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'stock',
                    marginBottom: 16,
                    spacing: [0, 0, 0, 0],
                },
                rangeSelector: {
                    selected: 2,
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
                        stemColor: null,
                    },
                    series: {
                        states: {
                            hover: {
                                enabled: false,
                                opacity: 1,
                            }
                        }
                    }
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            color: 'rgb(204, 208, 220)',
                        },
                    },
                    minRange: 30 * 24 * 3600 * 1000,
                    min: Date.UTC(2023, 0, 15) - (60 * 24 * 3600 * 1000),
                    max: Date.UTC(2023, 0, 15),
                },
                yAxis: [
                    {
                        title: '',
                        opposite: true,
                        labels: {
                            x: -40,
                            style: {
                                color: 'rgb(204, 208, 220)',
                            },
                        },
                    },
                    {
                        title: '',
                        labels: {
                            enabled: false,
                        },
                        top: '80%',
                        height: '20%',
                        offset: 0,
                        lineWidth: 2,
                    }
                ],
                series: [],
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
            seriesOptions: {
                candlestick: {
                    color: 'rgba(173, 155, 227, 1)',
                    upColor: 'rgba(118, 209, 170, 1)',
                    lineColor: 'rgba(173, 155, 227, 1)',
                    upLineColor: 'rgba(118, 209, 170, 1)',
                    stemColor: null,
                },
                volume: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'transparent',
                    borderRadius: 0,
                    borderWidth: 0,
                    strokeWidth: 0,
                },
            },
        };
    },
    mounted() {
        this.loadData();
        const style = document.createElement('style');
        style.innerHTML = '.highcharts-grid-line { stroke: rgba(255, 255, 255, 0.05) !important; }';
        document.head.appendChild(style);
    },
    watch: {
        timeframe(newTimeframe) {
            this.loadData(newTimeframe);
        },
    },

    methods: {
        loadData(selectedTimeframe = null) {
            const timeframes = [selectedTimeframe || this.timeframe];
            // const timeframes = ['1d'];
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
                                const parsedTimestamp = parseInt(timestamp) * 1000;
                                const parsedOpen = parseFloat(open);
                                const parsedHigh = parseFloat(high);
                                const parsedLow = parseFloat(low);
                                const parsedClose = parseFloat(close);
                                const parsedVolume = parseFloat(volume);
                                candlestickData.push([parsedTimestamp, parsedOpen, parsedHigh, parsedLow, parsedClose]);
                                volumeData.push([parsedTimestamp, parsedVolume]);
                            }
                        });

                        const seriesOptions = [
                            {
                                type: 'candlestick',
                                data: candlestickData,
                                dataGrouping: {
                                    units: [
                                        ['week', [1]],
                                        ['month', [1, 2, 3, 4, 6]]
                                    ]
                                },
                                color: this.seriesOptions.candlestick.color,
                                upColor: this.seriesOptions.candlestick.upColor,
                                lineColor: this.seriesOptions.candlestick.lineColor,
                                upLineColor: this.seriesOptions.candlestick.upLineColor,
                                stemColor: this.seriesOptions.candlestick.stemColor,
                            },
                            {
                                name: 'Volume',
                                type: 'column',
                                data: volumeData,
                                yAxis: 1,
                                dataGrouping: {
                                    units: [
                                        ['week', [1]],
                                        ['month', [1, 2, 3, 4, 6]]
                                    ]
                                },
                                color: this.seriesOptions.volume.color,
                                borderColor: this.seriesOptions.volume.borderColor,
                                borderRadius: this.seriesOptions.volume.borderRadius,
                                borderWidth: this.seriesOptions.volume.borderWidth,
                                strokeWidth: this.seriesOptions.volume.strokeWidth,
                            }
                        ];

                        return seriesOptions;
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
            this.$store.commit('updateTimeframe', selectedTimeframe);
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
  