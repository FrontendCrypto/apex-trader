<template>
    <span :class="[size, valueClass]">{{ formattedPrice }}</span>
</template>
<script>

import store from '../store'
export default {
    props: {
        size: String
    },
    computed: {
        value() {
            return store.state.price.value
        },
        change(){
            return store.state.change
        },
        currency() {
            return store.state.price.currency
        },
        formattedPrice() {
            const usd = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
            return usd.format(this.value)
        },
        valueClass() {
            const valueClass = this.change > 0 ? 'positive' : 'negative'
            return valueClass
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

.medium {
    font-size: 14px;
}

.big {
    font-size: 18px;
}
</styles>