<template>
    <div class="orderbook">
        <!-- Orderbook  header -->
        <div class="header">
            <div></div>
            <div class="sum"><span>Sum ({{ this.asset }})</span></div>
            <div><span>Amount ({{ this.asset }})</span></div>
            <div><span>Price ({{ this.baseCurrency }})</span></div>
        </div>

        <!-- Bids side -->
        <div class="side bid">
            <div v-for="(bid, index) in bids.slice().reverse()" class="row" :key="bid.price">
                <!-- Bid indicator -->
                <span class="indicator" :style="{ opacity: getBidBarWidth(index) }"></span>
                <!-- Bid sum -->
                <span class="sum">{{ calculateBidSum(index) }}</span>
                <!-- Bid amount -->
                <span class="amount">{{ bid.amount }}</span>
                <!-- Bid price -->
                <span class="price">{{ this.getFormattedCurrency(bid.price) }}</span>
                <!-- Bid row bar -->
                <div class="row-bar" :style="{ width: getBidBarWidth(index) }"></div>
            </div>
        </div>

        <!-- Current price and change -->
        <div class="current">
            <div class="spread" title="Spread">
                <Bars2Icon class="spread-icon" />
                <span>0.04%</span>
            </div>
            <div class="price">
                <Change size="medium" />
                <Price size="big" />
            </div>
        </div>

        <!-- Asks side -->
        <div class="side ask">
            <div v-for="(ask, index) in asks" class="row" :key="ask.price">
                <!-- Ask indicator -->
                <span class="indicator" :style="{ opacity: getAskBarWidth(index) }"></span>
                <!-- Ask sum -->
                <span class="sum">{{ calculateAskSum(index) }}</span>
                <!-- Ask amount -->
                <span class="amount">{{ ask.amount }}</span>
                <!-- Ask price -->
                <span class="price">{{ this.getFormattedCurrency(ask.price) }}</span>
                <!-- Ask row bar -->
                <div class="row-bar" :style="{ width: getAskBarWidth(index) }"></div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import Change from './Change.vue';
import Price from './Price.vue';
import { formatCurrency } from '../helpers/helpers';
import { Bars2Icon } from '@heroicons/vue/24/solid'

/**
 * Represents an order book component.
 */
export default {
    components: {
        Change,
        Price,
        Bars2Icon
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
        ...mapGetters(['bids', 'asks', 'baseCurrency', 'asset']),
    },
    methods: {
        /**
         * Formats the currency value based on the base currency.
         * @param {number} value - The currency value to format.
         * @returns {string} The formatted currency value.
         */
        getFormattedCurrency(value) {
            const formattedCurrency = formatCurrency(this.baseCurrency, value, 1);
            return formattedCurrency;
        },

        /**
         * Calculates the sum of bid amounts from the given index to the end of the bids list.
         * @param {number} index - The starting index.
         * @returns {number} The calculated sum.
         */
        calculateBidSum(index) {
            let sum = 0;
            for (let i = this.bids.length - 1; i >= index; i--) {
                sum += this.bids[i].amount;
            }
            return sum.toFixed(1);
        },
        /**
         * Calculates the sum of ask amounts from the beginning of the asks list to the given index.
         * @param {number} index - The ending index.
         * @returns {number} The calculated sum.
         */
        calculateAskSum(index) {
            const sum = this.asks.slice(0, index + 1).reduce((accumulator, ask) => accumulator + ask.amount, 0);
            return sum.toFixed(1);
        },

        /**
         * Calculates the width of the bid row bar based on the sum of bid amounts and the maximum total bid amount.
         * @param {number} index - The index of the bid row.
         * @returns {string} The calculated width in percentage.
         */
        getBidBarWidth(index) {
            const maxTotalAmount = this.calculateBidSum(0);
            const sum = this.calculateBidSum(index);
            const percentage = (sum / maxTotalAmount) * 100;
            return `${percentage}%`;
        },

        /**
         * Calculates the width of the ask row bar based on the sum of ask amounts and the total ask amount.
         * @param {number} index - The index of the ask row.
         * @returns {string} The calculated width in percentage.
         */
        getAskBarWidth(index) {
            const sum = this.calculateAskSum(index);
            const totalAmount = this.calculateAskSum(this.asks.length - 1);
            const percentage = (sum / totalAmount) * 100;
            return `${percentage}%`;
        },
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

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
    grid-template-rows: auto 1fr 56px 1fr;
    height: 100%;
}

.header {
    display: grid;
    grid-template-columns: 24px 72px 1fr 80px;
    gap: 12px;
    text-align: right;
    padding: 8px 8px 8px 0;

    span {
        font-size: 10px;
        display: block;
    }

    .sum {
        text-align: left;
    }
}

.side {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .price {
        text-align: right;
    }
}

.bid {
    border-left: 1px solid rgba(118, 209, 170, .75);
    justify-content: flex-end;

    .indicator {
        background-color: rgba(118, 209, 170, 1);
    }

    .row-bar {
        background-color: rgba(118, 209, 170, 1);
    }
}

.ask {
    border-left: 1px solid rgba(173, 155, 227, .75);

    .indicator {
        background-color: rgba(173, 155, 227, 1);
    }

    .row-bar {
        background-color: rgba(173, 155, 227, 1);
    }

}

.row {
    display: grid;
    grid-template-columns: 24px 72px 1fr 80px;
    grid-template-rows: 24px;
    gap: 12px;
    position: relative;
    padding-right: 8px;

    &:hover {
        background-color: $buttonHover;
        cursor: pointer;
    }

    .row-bar {
        position: absolute;
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
    justify-content: space-between;
    padding: 12px;
    gap: 16px;
    border: 1px solid rgb(38, 43, 56);
    border-left: 0;
    border-right: 0;

    .spread {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;
    }

    .spread-icon {
        width: 24px;
        color: $surfaceContent;
    }

    .price {
        font-weight: bolder;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 12px;
    }
}</style>