<script>
import store from '../store'
import Topbar from './Topbar.vue'
import Tabs from './Tabs.vue'
import Trades from './Trades.vue'
import Operative from './Operative.vue'
import Orderbook from './Orderbook.vue'
import DepthChart from './DepthChart.vue'
import PairSelector from './PairSelector.vue'

export default {
    components: {
        Orderbook,
        DepthChart,
        Topbar,
        Tabs,
        Operative,
        Trades,
        PairSelector,
    },
    data() {
        return {
            tab: null,
        }
    },
    props: {

    },
    computed: {
        // series() {
        //     return store.state.series.chart[0]
        // },
    },
    methods: {

    },
}
</script>

<template>
    <PairSelector />
    <div class="grid">

        <div class="topbar">
            <Topbar />
        </div>

        <div class="grid-item operative">
            <Operative>

            </Operative>
        </div>

        <div class="grid-item orderbook">
            <Orderbook />
        </div>
        <!-- <div class="trades">
                                                                                                                                                    <p>Trades</p>
                                                                                                                                                </div> -->

        <div class="grid-item chart">
            <div class="price-chart">Price</div>
            <div class="depth-chart">
                <div class="depth-chart-content">
                    <DepthChart />
                </div>
            </div>
        </div>
        <div class="grid-item tabs-section">
            <Tabs :expanded="false"
                :tabs="[{ name: 'Open orders', active: true }, { name: 'Filled orders', active: false }]">
            </Tabs>
        </div>

        <div class="grid-item trades">
            <Trades />
        </div>

        <div class="footer">
            <span class="footer-author"><a target="_blank"
                    href="https://github.com/FrontendCrypto/apex-trader">ApexTrader</a> by Pablo Carballeda</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.order-type {
    display: flex;
    flex-direction: row;

    div,
    label {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
            color: $surfaceContent;
        }
    }

    input {
        display: none;

        &:checked {
            &+label {
                width: 100%;
                height: 48px;

                span {
                    color: $surfaceContentHight;
                }
            }
        }

    }
}

.fill-height {
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 300px 300px 1fr 300px;
    grid-template-rows: 72px 1fr 300px 64px;
    width: 100vw;
    height: 100vh;
    gap: 4px;

    .grid-item {
        color: $surfaceContent
    }
}

.topbar {
    grid-row: 1;
    grid-column: 1/5;
    background-color: $surface;
}

.orderbook {
    grid-row: 2/4;
    grid-column: 2;
    background-color: $surface;
}

.chart {
    grid-column: 3;
    grid-row: 2;
    display: grid;
    gap: 4px;
    grid-template-columns: 1fr 100px;

    .price-chart {
        background-color: $positive;
        background-color: $surface;
    }

    .depth-chart {
        background-color: $negative;
        background-color: $surface;
        display: flex;
        flex-direction: column;
        height: 100%;

        .depth-chart-content {
            flex: 1;
            overflow: auto;
        }
    }
}

.tabs-section {
    grid-row: 3/4;
    grid-column: 3/4;
    background-color: $surface;
}

.operative {
    grid-row: 2/4;
    grid-column: 1;
    background-color: $surface;
}

.trades {
    grid-row: 2/4;
    grid-column: 4;
    background-color: $surface;
    overflow-y: scroll;
}

.footer {
    grid-row: 4;
    grid-column: 1/5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $surface;
}

.footer-author {
    font-size: 14px;
    color: $surfaceContent;

    a {
        font-weight: bolder;
        color: inherit;
    }
}
</style>