<template>
    <div class="topbar">
        <div class="left">
            <div class="topbar-item topbar-logo">
                <small>ApexTrader</small>
            </div>
            <div class="topbar-item">
                <button class="button" @click="this.updatePairSelectorVisibility(true);">
                    <img class="asset-icon" :src="this.assetIconPath" :alt="`${this.asset} icon`" />
                    <span>{{ asset }}-{{ counterpart }}</span>
                    <ChevronRightIcon class="icon" />
                </button>
            </div>
            <div class="topbar-item">
                <span class="title">Price ({{ baseCurrency }})</span>
                <Price size="big" />
            </div>
            <div class="topbar-item">
                <span class="title">Change ({{ timeframe }}h)</span>
                <Change size="big" />
            </div>
            <div class="topbar-item">
                <span class="title">Volume ({{ timeframe }}h)</span>
                <span class="value">$ 6.874.214</span>
            </div>
        </div>
        <div class="right">
            <button class="button settings-button" @click="this.updateSettingsVisibility(true)">
                <Cog8ToothIcon class="icon" />
            </button>
        </div>
    </div>
</template>

<script>
import Change from './Change.vue'
import Price from './Price.vue';
import { mapGetters, mapMutations } from 'vuex'
import { ChevronRightIcon, Cog8ToothIcon } from '@heroicons/vue/24/solid'

export default {
    components: {
        Change,
        Price,
        ChevronRightIcon,
        Cog8ToothIcon
    },
    computed: {
        ...mapGetters(['baseCurrency', 'timeframe', 'counterpart', 'asset', 'selectedAssetPrice', 'assetIconPath']),
    },
    methods: {
        ...mapMutations(['updatePairSelectorVisibility', 'updateSettingsVisibility']),
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.topbar {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .left,
    .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
    }
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
    gap: 4px;
}

.asset-icon {
    width: 24px;
    margin-right: 4px;
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