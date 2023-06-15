<template>
    <div class="topbar">
        <div class="topbar-item topbar-logo">
            <small>ApexTrader</small>
        </div>
        <div class="topbar-item">
            <button @click="this.pairSelector = true;">{{ pairAsset }}-{{ pairCounterpart }}</button>
        </div>
        <div class="topbar-item">
            <span class="title">Price ({{ selectedBaseCurrency }})</span>
            <Price size="big" />
        </div>
        <div class="topbar-item">
            <span class="title">Change ({{ selectedTimeframe }}h)</span>
            <Change size="big" />
        </div>
        <div class="topbar-item">
            <span class="title">Volume ({{ selectedTimeframe }}h)</span>
            <span class="value">$ 6.874.214</span>
        </div>
    </div>
</template>

<script>
import Change from './Change.vue'
import Price from './Price.vue';
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        Change,
        Price
    },
    computed: {
        ...mapGetters(['baseCurrency', 'timeframe', 'counterpart', 'asset', 'pairSelectorVisibility']),
        selectedBaseCurrency: {
            get() {
                return this.baseCurrency
            }
        },
        selectedTimeframe: {
            get() {
                return this.timeframe
            }
        },
        pairCounterpart: {
            get() {
                return this.counterpart
            }
        },
        pairAsset: {
            get() {
                return this.asset
            }
        },
        pairSelector: {
            get() {
                return this.pairSelectorVisbility
            },
            set(newValue) {
                this.updatePairSelectorVisibility(newValue)
            }
        }
    },
    methods: {
        ...mapMutations(['updatePairSelectorVisibility']),
        showPairSelector() {
            
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.topbar {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.topbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    color: $surfaceContent;
    border-color: rgb(38, 43, 56);
    border-width: 0 1px 0 0;
    border-style: solid;
    height: 100%;
    gap: 4px
}

.title {
    color: $surfaceContentLow;
    font-size: 12px;
}

.value {
    color: $surfaceContent;
    font-size: 18px;
}

.topbar-logo {
    padding: 0 32px;
    color: $surfaceContentLow
}
</style>