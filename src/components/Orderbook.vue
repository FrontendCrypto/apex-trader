<template>
    <div class="orderbook">
        <div class="chart">
            <canvas ref="chart"></canvas>
        </div>
        <div class="side bid">
            <div v-for="item in bid" class="row" :key="item.price">
                <span class="price">{{ item.price }}</span>
                <span class="indicator"></span>
                <span class="size">{{ item.size }}</span>
                <span class="amount">{{ item.amount }}</span>
            </div>
        </div>
        <div class="current">
            <span>27.184</span>
        </div>
        <div class="side ask">
            <div v-for="item in ask" class="row" :key="item.price">
                <span class="price">{{ item.price }}</span>
                <span class="indicator"></span>
                <span class="size">{{ item.size }}</span>
                <span class="amount">{{ item.amount }}</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import store from '../store'
import Chart from 'chart.js/auto';

// Chart.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

export default {
    mounted() {
        console.log('dentro')
        this.createDepthChart();
    },
    computed: {
        bid() {
            return store.state.orderbook.bid
        },
        ask() {
            return store.state.orderbook.ask
        },
        bidPrices() {
            return store.state.orderbook.bid.map(item => item.price);
        },
        bidSizes() {
            return store.state.orderbook.bid.map(item => item.size);
        },
        askPrices() {
            return store.state.orderbook.ask.map(item => item.price);
        },
        askSizes() {
            return store.state.orderbook.ask.map(item => item.size);
        },
    },
    methods: {
        createDepthChart() {
            console.log('dentro')
            const bidPrices = this.bidPrices;
            const bidSizes = this.bidSizes;
            const askPrices = this.askPrices;
            const askSizes = this.askSizes;

            const ctx = this.$refs.chart.getContext('2d');

            // Crear el gráfico
            const depthChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: bidPrices.concat(askPrices.reverse()),
                    datasets: [
                        {
                            label: 'Bid',
                            data: bidSizes.concat(new Array(askSizes.length).fill(0)),
                            backgroundColor: '#76D1AA',
                            borderColor: '#76D1AA',
                            fill: 'start',
                        },
                        {
                            label: 'Ask',
                            data: new Array(bidSizes.length).fill(0).concat(askSizes),
                            backgroundColor: '#CC25CF',
                            borderColor: '#CC25CF',
                            fill: 'start',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: true,
                        },
                        y: {
                            display: true,
                        },
                    },
                },
            });
        },

    }
}
</script>


<style scoped lang="scss">
.chart,
.chart>canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
}

.orderbook {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 56px 1fr;
    height: 100%;
}

.side {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

}

.bid {
    position: relative;

    .indicator {
        background-color: #76D1AA;
    }
}

.ask {
    .indicator {
        background-color: #CC25CF;
    }
}

.row {
    display: grid;
    grid-template-columns: 72px 24px 1fr 72px;
    grid-template-rows: 24px;
    gap: 12px;
    padding: 0 12px;

    span {
        font-size: 13px;
    }



    .amount {
        text-align: right;
    }
}

.current {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 12px;
    font-weight: bolder;
}

.current {}
</style>