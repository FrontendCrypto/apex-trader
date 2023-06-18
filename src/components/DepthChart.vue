<script>
import store from '../store'
import Chart from 'chart.js/auto'
import { mapGetters } from 'vuex'

export default {
    mounted() {
        const bidsData = this.calculateCumulativeData(this.bids);
        const asksData = this.calculateCumulativeData(this.asks);

        const ctxBid = document.getElementById('bidChartCanvas').getContext('2d');
        const ctxAsk = document.getElementById('askChartCanvas').getContext('2d');

        new Chart(ctxBid, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Bids',
                        data: bidsData,
                        borderColor: 'rgba(118, 209, 170, 1)',
                        backgroundColor: 'rgba(118, 209, 170, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        pointRadius: 0,
                        stepped: 'before' // Stepline
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'top',
                        min: Math.min(...bidsData.map(data => data.x)),
                        max: Math.max(...bidsData.map(data => data.x)),
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'right',
                        min: Math.min(...bidsData.map(data => data.y)),
                        max: Math.max(...bidsData.map(data => data.y)),
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });

        new Chart(ctxAsk, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Asks',
                        data: asksData,
                        borderColor: 'rgba(173, 155, 227, 1)',
                        backgroundColor: 'rgba(173, 155, 227, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        pointRadius: 0,
                        stepped: 'before' // Stepline
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: Math.min(...asksData.map(data => data.x)),
                        max: Math.max(...asksData.map(data => data.x)),
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'right',
                        min: Math.min(...asksData.map(data => data.y)),
                        max: Math.max(...asksData.map(data => data.y)),
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    },
    computed: {
        ...mapGetters(['bids', 'asks']),
        bids: {
            get() {
                return store.state.orderbook.bids;
            }
        },
        asks: {
            get() {
                return store.state.orderbook.asks;
            }
        }
    },
    methods: {
        calculateCumulativeData(data) {
            let cumulativeSum = 0;
            return data.map((item) => {
                const price = item.price;
                cumulativeSum += item.amount;
                return { x: cumulativeSum, y: price };
            });
        }
    }
}

</script>

<template>
    <div class="depth-chart">
         <div class="bid-chart">
                <canvas id="bidChartCanvas" class="chart-canvas"></canvas>
            </div>
        <div class="ask-chart">
            <canvas id="askChartCanvas" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<style>
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
#bidChartCanvas{
    transform: scaleY(-1);
}
</style>
