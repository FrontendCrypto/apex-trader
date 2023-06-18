<template>
    <span :class="[size, valueClass]">{{ getFormattedCurrency() }}</span>
</template>
<script>

import store from '../store'
import { mapGetters } from 'vuex'
import { formatCurrency } from '../helpers/helpers'

export default {
    props: {
        size: String
    },
    computed: {
        ...mapGetters(['price', 'change', 'baseCurrency', 'selectedAssetPrice']),
        price: {
            get() {
                return store.state.price.value
            }
        },
        change: {
            get() {
                return store.state.change
            }
        },
        baseCurrency: {
            get() {
                return store.state.baseCurrency
            }
        },
        valueClass() {
            const valueClass = this.change > 0 ? 'positive' : 'negative'
            return valueClass
        }
    },
    methods: {
        getFormattedCurrency() {
            const formattedCurrency = formatCurrency(this.baseCurrency, this.selectedAssetPrice )
            return formattedCurrency
        }
    }
}
</script>

<styles scoped lang="scss">
@import '@/assets/variables';

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