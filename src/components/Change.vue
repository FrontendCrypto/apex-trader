<template>
    <span :class="[size, changeClass]">{{ change }}%</span>
</template>
<script>

import store from '../store'
export default {
    props:{
        size: String
    },
    computed: {
        change() {
            return store.state.price.change
        },
        changeClass() {
            const changeClass = this.change > 0 ? 'positive' : 'negative'
            return changeClass
        }
    }
}
</script>

<styles scoped lang="scss">
@import '@/assets/variables.scss';

span {
    font-size: 14px;
}

.positive {
    color: $positive
}

.negative {
    color: $negative
}
.medium{
    font-size: 14px;
}
.big{
    font-size: 18px;
}
</styles>