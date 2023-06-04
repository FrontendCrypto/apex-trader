<script>
import store from '../store'
import Topbar from './Topbar.vue'
import Orderbook from './Orderbook.vue'
import VueApexCharts from 'vue3-apexcharts'
export default {
    components: {
        VueApexCharts,
        Orderbook,
        Topbar
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
    <div class="grid">

        <div class="topbar">
            <Topbar />
        </div>

        <div class="grid-item operative">
            <!-- <v-card class="fill-height">
            <v-tabs v-model="tab" grow>
                <v-tab value="buy">Buy</v-tab>
                    <v-tab value="sell">Sell</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-window v-model="tab">
                        <v-window-item value="buy">
                            One
                        </v-window-item>

                        <v-window-item value="sell">
                            Two
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card> -->
        </div>

        <div class="grid-item orderbook">
            <Orderbook />
        </div>
        <!-- <div class="trades">
                                                        <p>Trades</p>
                                                    </div> -->

        <div class="grid-item chart">
            <p>Chart</p>
            <!-- <VueApexCharts ref="chart" :options="options" :series="options.series" class="chart" /> -->
        </div>
        <div class="grid-item tabs">
            <p>Tabs</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';


.fill-height {
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 300px 350px 1fr;
    grid-template-rows: 72px 1fr 250px;
    width: 100vw;
    height: 100vh;
    gap: 4px;

    .grid-item {
        // padding: 8px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        color: $surfaceContent
    }
}

.topbar {
    grid-row: 1;
    grid-column: 1/4;
    background-color: $surface;
}

.orderbook {
    grid-row: 2/4;
    grid-column: 2;
    background-color: $surface;
    // display: grid;
    // grid-template-rows: 1fr 1fr;
    // grid-template-columns: 1fr;
    // gap: 4px;

    // >div {
    //     background-color: $surfaceHight;
    // }
}

// .trades {
//     grid-row: 1;
//     grid-column: 3;
//     background-color: $surface;
// }

.chart {
    grid-column: 3;
    grid-row: 2;
    background-color: $surface;
}

.tabs {
    grid-row: 3;
    grid-column: 3/4;
    background-color: $surface;
}

.operative {
    grid-row: 2/4;
    grid-column: 1;
    background-color: $surface;
}
</style>