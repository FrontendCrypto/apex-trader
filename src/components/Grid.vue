<script>
import store from '../store'

import VueApexCharts from 'vue3-apexcharts'
export default {
    components: {
        VueApexCharts
    },
    data() {
        return {
            tab: null,
            options: {
                chart: {
                    type: 'candlestick',
                    toolbar: {
                        show: false
                    }
                },
                series: [
                    {
                        name: 'Test',
                        data: [
                            {
                                x: new Date("2023-04-30"),
                                y: [100, 120, 90, 110] // [Open, High, Low, Close]
                            },
                            {
                                x: new Date("2023-05-01"),
                                y: [110, 130, 100, 120]
                            },
                            {
                                x: new Date("2023-05-02"),
                                y: [120, 140, 110, 130]
                            },
                            {
                                x: new Date("2023-05-03"),
                                y: [130, 150, 120, 140]
                            },
                            {
                                x: new Date("2023-05-04"),
                                y: [140, 160, 130, 150]
                            },
                            {
                                x: new Date("2023-05-05"),
                                y: [150, 170, 140, 160]
                            },
                            {
                                x: new Date("2023-05-06"),
                                y: [160, 180, 150, 170]
                            },
                            {
                                x: new Date("2023-05-07"),
                                y: [170, 190, 160, 180]
                            },
                            {
                                x: new Date("2023-05-08"),
                                y: [180, 200, 170, 190]
                            },
                            {
                                x: new Date("2023-05-09"),
                                y: [190, 210, 180, 200]
                            },
                            {
                                x: new Date("2023-05-10"),
                                y: [200, 220, 190, 210]
                            },
                            {
                                x: new Date("2023-05-11"),
                                y: [210, 230, 200, 220]
                            },
                            {
                                x: new Date("2023-05-12"),
                                y: [220, 240, 210, 230]
                            },
                            {
                                x: new Date("2023-05-13"),
                                y: [230, 250, 220, 240]
                            },
                            {
                                x: new Date("2023-05-14"),
                                y: [240, 260, 230, 250]
                            },
                            {
                                x: new Date("2023-05-15"),
                                y: [250, 270, 240, 260]
                            },
                            {
                                x: new Date("2023-05-16"),
                                y: [260, 280, 250, 270]
                            },
                            {
                                x: new Date("2023-05-17"),
                                y: [270, 290, 260, 280]
                            },
                            {
                                x: new Date("2023-05-18"),
                                y: [280, 300, 270, 290]
                            },
                            {
                                x: new Date("2023-05-19"),
                                y: [290, 310, 280, 300]
                            },
                            {
                                x: new Date("2023-05-20"),
                                y: [300, 320, 290, 310]
                            },
                            {
                                x: new Date("2023-05-21"),
                                y: [310, 330, 300, 320]
                            },
                            {
                                x: new Date("2023-05-22"),
                                y: [320, 340, 310, 330]
                            },
                            {
                                x: new Date("2023-05-23"),
                                y: [330, 350, 320, 340]
                            },
                            {
                                x: new Date("2023-05-24"),
                                y: [340, 360, 330, 350]
                            },
                            {
                                x: new Date("2023-05-25"),
                                y: [350, 370, 340, 360]
                            },
                            {
                                x: new Date("2023-05-26"),
                                y: [360, 380, 350, 370]
                            },
                            {
                                x: new Date("2023-05-27"),
                                y: [370, 390, 360, 380]
                            },
                            {
                                x: new Date("2023-05-28"),
                                y: [380, 400, 370, 390]
                            },
                            {
                                x: new Date("2023-05-29"),
                                y: [390, 410, 380, 400]
                            },
                            {
                                x: new Date("2023-05-30"),
                                y: [400, 420, 390, 410]
                            },
                        ]
                    }

                ],
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#00B746', // Color de velas alcistas (verde)
                            downward: '#FF0019' // Color de velas bajistas (rojo)
                        }
                    }
                }
            },
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
            <div class="topbar-item topbar-logo">
                <small>Logo</small>
            </div>
            <div class="topbar-item">
                <p>$ 24.875,93</p>
            </div>
            <div class="topbar-item">
                <p>-3.67% <span>Change 24h</span></p>
            </div>
            <div class="topbar-item">
                <p>$ 6.874.214 <span>Volume 24h</span></p>
            </div>
        </div>

        <div class="grid-item operative">
            <v-card class="fill-height">
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
            </v-card>
        </div>

        <div class="grid-item order-book">
            <div>
                <p>Order book</p>
            </div>
            <div>
                <p>Depth chart</p>
            </div>
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
$surface: #131722;
$surfaceHight: #0b0e14;
$surfaceContent: rgb(204, 208, 220);
$surfaceContentLow: rgb(117, 134, 150);


.fill-height {
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 300px 300px 1fr;
    grid-template-rows: 64px 1fr 250px;
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

    display: flex;
    flex-direction: row;

    .topbar-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        color: $surfaceContent;
        border-color: rgb(38, 43, 56);
        border-width: 0 1px 0 0;
        border-style: solid;
        height: 100%;

        span {
            color: $surfaceContentLow
        }

        &.topbar-logo {
            width: 64px;

            color: $surfaceContentLow
        }
    }


}

.order-book {
    grid-row: 2/4;
    grid-column: 2;
    background-color: $surface;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 4px;

    >div {
        background-color: $surfaceHight;
    }
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