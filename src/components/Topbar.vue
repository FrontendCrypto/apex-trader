<script>
import store from '../store'
export default {

}
</script>

<template>
    <div class="topbar">
        <div class="topbar-item topbar-logo">
            <small>Logo</small>
        </div>
        <div class="topbar-item">
            <span class="value">$ 24.875,93</span>
        </div>
        <div class="topbar-item">
            <span class="title">Change 24h</span>
            <span class="value">-3.67%</span>
        </div>
        <div class="topbar-item">
            <span class="title">Volume 24h</span>
            <span class="value">$ 6.874.214</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.topbar {
    display: flex;
    flex-direction: row;
}

.topbar-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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