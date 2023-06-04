<script>
import store from '../store'
import VueApexCharts from 'vue3-apexcharts'
export default {
    components: {
        VueApexCharts
    },
    data() {
        return {
            options: {
                chart: {
                    // height: '100%',
                    type: 'line',
                    stacked: false,
                    toolbar: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: 'Series 1',
                        data: [30, 40, 25, 50, 49, 21, 70, 51, 32, 90, 36, 80].map((value, index) => ({
                            x: value,
                            y: index,
                        })),
                    },
                ],
                xaxis: {
                    type: 'numeric', // Utilizar el tipo de eje 'numeric' para representar los valores en el eje vertical
                    labels: {
                        show: false, // Ocultar las etiquetas del eje x
                    },
                    axisBorder: {
                        show: false, // Ocultar la línea del eje y
                    },
                },
                yaxis: {
                    title: {
                        text: 'Value',
                    },
                    labels: {
                        show: false, // Ocultar las etiquetas del eje x
                    },
                    axisBorder: {
                        show: false, // Ocultar la línea del eje y
                    },
                },
                stroke: {
                    curve: 'stepline',
                },
                grid: {
                    show: false, // Ocultar las líneas de fondo
                },
                legend: {
                    show: false, // Ocultar la leyenda
                },
            }
        }
    },
    mounted() {
    },
    computed: {
        bid() {
            return store.state.orderbook.bid
        }
    }
}
</script>

<template>
    <div class="orderbook">
        <div class="side bid">
            <VueApexCharts class="bid-chart" :options="options" :series="options.series" />
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
            <div v-for="item in bid" class="row" :key="item.price">
                <span class="price">{{ item.price }}</span>
                <span class="indicator"></span>
                <span class="size">{{ item.size }}</span>
                <span class="amount">{{ item.amount }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.orderbook {
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

    .bid-chart {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
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