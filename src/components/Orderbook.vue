<template>
    <div class="orderbook">
        <!-- <div class="chart">
            <canvas ref="chart"></canvas>
        </div> -->
        <div class="side bid">
            <div v-for="(bid, index) in bids" class="row" :key="bid.price">
                <span class="indicator"></span>
                <span class="sum">{{ calculateBidSum(index) }}</span>
                <span class="amount">{{ bid.amount }}</span>
                <span class="price">{{ bid.price }}</span>
            </div>
        </div>
        <div class="current">
            <Price size="big" />
            <Change size="medium" />
        </div>
        <div class="side ask">
            <div v-for="(ask, index) in asks" class="row" :key="ask.price">
                <span class="indicator"></span>
                <span class="sum">{{ calculateAskSum(index) }}</span>
                <span class="amount">{{ ask.amount }}</span>
                <span class="price">{{ ask.price }}</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import store from '../store'
// import Chart from 'chart.js/auto';
import Change from './Change.vue';
import Price from './Price.vue';

// Chart.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

export default {
    components: {
        Change,
        Price,
    },
    mounted() {
        // this.createDepthChart();
    },
    computed: {
        bids() {
            return store.state.orderbook.bids
        },
        asks() {
            return store.state.orderbook.asks
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
        calculateBidSum(index) {
            let sum = 0;
            for (let i = this.bids.length - 1; i >= index; i--) {
                sum += this.bids[i].amount;
            }
            return sum;
        },
        calculateAskSum(index) {
            let sum = 0;
            for (let i = 0; i <= index; i++) {
                sum += this.asks[i].amount;
            }
            return sum;
        },
        // createDepthChart() {
        //     console.log('dentro')
        //     const bidPrices = this.bidPrices;
        //     const bidSizes = this.bidSizes;
        //     const askPrices = this.askPrices;
        //     const askSizes = this.askSizes;

        //     const ctx = this.$refs.chart.getContext('2d');

        //     // Crear el gráfico
        //     const depthChart = new Chart(ctx, {
        //         type: 'line',
        //         data: {
        //             labels: bidPrices.concat(askPrices.reverse()),
        //             datasets: [
        //                 {
        //                     label: 'Bid',
        //                     data: bidSizes.concat(new Array(askSizes.length).fill(0)),
        //                     backgroundColor: '#76D1AA',
        //                     borderColor: '#76D1AA',
        //                     fill: 'start',
        //                 },
        //                 {
        //                     label: 'Ask',
        //                     data: new Array(bidSizes.length).fill(0).concat(askSizes),
        //                     backgroundColor: '#CC25CF',
        //                     borderColor: '#CC25CF',
        //                     fill: 'start',
        //                 },
        //             ],
        //         },
        //         options: {
        //             responsive: true,
        //             maintainAspectRatio: false,
        //             scales: {
        //                 x: {
        //                     display: true,
        //                 },
        //                 y: {
        //                     display: true,
        //                 },
        //             },
        //         },
        //     });
        // },
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
    grid-template-columns: 24px 72px 1fr 72px;
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
    padding: 12px;
    gap: 16px;
    border: 1px solid rgb(38, 43, 56);
    border-left: 0;
    border-right: 0;

    .price {
        font-weight: bolder;
        font-size: 16px;
    }


}

.current {}
</style>