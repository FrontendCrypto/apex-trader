<template>
    <span :class="[size, valueClass]">{{ formattedPrice }}</span>
</template>
<script>

import store from '../store'
import { mapGetters } from 'vuex'
export default {
    props: {
        size: String
    },
    computed: {
        ...mapGetters(['price', 'change', 'baseCurrency']),
        currentValue: {
            get() {
                return store.state.price.value
            }
        },
        currentChange: {
            get() {
                return store.state.change
            }
        },
        selectedBaseCurrency: {
            get() {
                return store.state.baseCurrency
            }
        },
        formattedPrice() {
            const usd = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.selectedBaseCurrency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
            return usd.format(this.currentValue)
        },
        valueClass() {
            const valueClass = this.currentChange > 0 ? 'positive' : 'negative'
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