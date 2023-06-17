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
                <span class="price">{{ this.getFormattedCurrency(bid.price) }}</span>
                <div class="row-bar" :style="{ width: getAskBarWidth(index) }"></div>
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
                <span class="price">{{ this.getFormattedCurrency(ask.price) }}</span>
                <div class="row-bar" :style="{ width: getAskBarWidth(index) }"></div>
            </div>
        </div>
    </div>
</template>
  
<script>
import store from '../store'
// import Chart from 'chart.js/auto';
import { mapGetters } from 'vuex'
import Change from './Change.vue';
import Price from './Price.vue';

// Chart.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
import { formatCurrency } from '../helpers/helpers'

export default {
    components: {
        Change,
        Price,
    },
    data() {
        return {
            totalAmount: 0,
        };
    },
    mounted() {
        const totalBids = this.bids.reduce((sum, bid) => sum + bid.amount, 0);
        const totalAsks = this.asks.reduce((sum, ask) => sum + ask.amount, 0);
        this.totalAmount = Math.max(totalBids, totalAsks);
    },
    computed: {
        ...mapGetters(['bids', 'asks', 'baseCurrency']),
        bids: {
            get() {
                return store.state.orderbook.bids
            }
        },
        asks: {
            get() {
                return store.state.orderbook.asks
            }
        },
        baseCurrency: {
            get() {
                return store.state.baseCurrency
            }
        }
    },
    methods: {
        getFormattedCurrency(value) {
            const formattedCurrency = formatCurrency(this.baseCurrency, value, 1)
            return formattedCurrency
        },
        calculateBidSum(index) {
            let sum = 0;
            for (let i = this.bids.length - 1; i >= index; i--) {
                sum += this.bids[i].amount;
            }
            return sum.toFixed(1);
        },
        calculateAskSum(index) {
            let sum = 0;
            for (let i = 0; i <= index; i++) {
                sum += this.asks[i].amount;
            }
            return sum.toFixed(1);
        },
        getBidBarWidth(index) {
            const sum = this.calculateBidSum(index);
            const totalAmount = this.calculateBidSum(this.bids.length - 1);
            const percentage = (sum / totalAmount) * 100;
            return `${percentage}%`;
        },
        getAskBarWidth(index) {
            const sum = this.calculateAskSum(index);
            const totalAmount = this.calculateAskSum(this.asks.length - 1);
            const percentage = (sum / totalAmount) * 100;
            return `${percentage}%`;
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
        background-color: rgba(118, 209, 170, 1);
    }
}

.ask {
    .indicator {
        background-color: rgba(173, 155, 227, 1);
    }
}

.row {
    display: grid;
    grid-template-columns: 24px 72px 1fr 72px;
    grid-template-rows: 24px;
    gap: 12px;
    // padding: 0 12px;
    position: relative;

    .row-bar {
        position: absolute;
        background-color: #CC25CF;
        opacity: 0.1;
        content: '';
        height: 100%;
        left: 0;
        z-index: 0;
        width: calc((var(--amount) / var(--total-amount)) * 100%);
    }

    span {
        font-size: 13px;
        z-index: 1;
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