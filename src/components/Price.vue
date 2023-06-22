<template>
    <span :class="[size, valueClass]">{{ getFormattedCurrency(this.baseCurrency, this.selectedAssetPrice) }}</span>
</template>
<script>

import { mapGetters } from 'vuex'
import { getFormattedCurrency } from '../helpers/helpers'

export default {
    props: {
        size: String
    },
    computed: {
        ...mapGetters(['price', 'change', 'baseCurrency', 'selectedAssetPrice', 'selectedAssetPrice']),
        valueClass() {
            const valueClass = this.selectedAssetPrice > 0 ? 'positive' : 'negative'
            return valueClass
        }
    },
    methods: {
        getFormattedCurrency,
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