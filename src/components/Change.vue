<template>
    <span :class="[size, changeClass]">{{ this.selectedAssetChange }}%</span>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
    props:{
        size: String
    },
    computed: {
        ...mapGetters(['price', 'change', 'baseCurrency', 'selectedAssetChange']),
        changeClass() {
            const changeClass = this.selectedAssetChange > 0 ? 'positive' : 'negative'
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