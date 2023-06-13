<template>
    <div class="topbar">
        <div class="topbar-item topbar-logo">
            <small>Logo</small>
        </div>
        <div class="topbar-item">
            <span class="title">Price ({{ currency }})</span>
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
</template>

<script>
import store from '../store';
import Change from './Change.vue'
import Price from './Price.vue';

export default {
    components: {
        Change,
        Price
    },
    computed: {
        currency() {
            return store.state.price.currency
        },
        timeframe() {
            return store.state.timeframe.selected
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
    padding: 0 16px;
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
    width: 64px;
    color: $surfaceContentLow
}
</style>