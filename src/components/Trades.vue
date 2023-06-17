<template>
    <div class="content">
        <table class="table">
            <thead>
                <th class="fixed-header">Time</th>
                <th class="fixed-header">Amount</th>
                <th class="fixed-header">Price</th>
            </thead>
            <tbody>
                <tr v-for="item in trades" class="row" :key="item.time">
                    <td class="time">{{ item.time }}</td>
                    <td class="amount">{{ item.amount }}</td>
                    <td class="price">{{ item.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import store from '../store'

export default {
    mounted() {
    },
    computed: {
        trades() {
            return store.state.trades
        },
    },
}
</script>


<style scoped lang="scss">
@import '@/assets/variables.scss';

.content {
    padding: 12px;
}

.table {
    width: 100%;

    td,
    th {
        font-size: 13px;
    }
}

.row {


    .price {
        text-align: right;
    }
}

.fixed-header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: $surface;
}
</style>