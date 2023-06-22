<script>
import { mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';
import Favorite from './Favorite.vue';
import store from '../store';
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { getFormattedCurrency } from '../helpers/helpers';

export default {
    components: {
        Favorite,
        XMarkIcon
    },
    computed: {
        ...mapGetters(['isPairSelectorVisible', 'asset', 'counterpart', 'timeframe', 'baseCurrency']),
        isVisible: {
            get() {
                return this.isPairSelectorVisible;
            },
            set(newValue) {
                this.updatePairSelectorVisibility(newValue);
            },
        },
        markets: {
            get() {
                return store.state.markets
            }
        },
    },
    watch: {
        isVisible(newValue) {
            newValue ? this.show() : this.hide();
        }
    },
    methods: {
        getFormattedCurrency,
        ...mapMutations(['updatePairSelectorVisibility', 'updateAsset']),
        selectPair(value) {
            this.updateAsset(value)
            this.updatePairSelectorVisibility(false)
        },
        isSelectedClass(ticker) {
            return this.asset === ticker ? 'selected' : '';
        },
        handleFavoriteClick(pair) {
            pair.favorite = !pair.favorite;
            // @todo store / save preferences
        },
        show() {
            anime({
                targets: '.pair-selector',
                left: '0px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        },
        hide() {
            anime({
                targets: '.pair-selector',
                left: '-500px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        },
        getIconPath(ticker) {
            const formattedTicker = ticker.toLowerCase()
            return `node_modules/cryptocurrency-icons/svg/white/${formattedTicker}.svg`;
        },
    },
}
</script>

<template>
    <div class="panel pair-selector">
        <div class="header">
            <span class="title">Markets</span>
            <button class="button" @click="isVisible = false">
                <XMarkIcon class="icon" />
            </button>
        </div>
        <div class="content">
            <div class="row markets-header">
                <div>
                    <span>Pair</span>
                </div>
                <div>
                    <span>Volume ({{ timeframe }}h)</span>
                </div>
                <div>
                    <span>Price ({{ counterpart }})</span>
                </div>
                <div>
                    <span>Favorite</span>
                </div>
            </div>
            <div :class="['row', this.isSelectedClass(pair.ticker)]" v-for="pair in markets" :key="pair.ticker"
                @click="selectPair(pair.ticker)">
                <div class="asset-naming">
                    <img class="icon" :src="getIconPath(pair.ticker)" />
                    <div>
                        <span>{{ pair.ticker }}</span>
                        <span>{{ pair.name }}</span>
                    </div>
                </div>
                <div class="row-element">
                    <span>{{ getFormattedCurrency(counterpart, pair.volume.counterpart, 1) }}</span>
                    <span>{{ getFormattedCurrency(asset, pair.volume.asset) }}</span>
                </div>
                <div class="row-element">
                    <span>{{ getFormattedCurrency(counterpart, pair.price.value) }}</span>
                    <span>{{ pair.price.change }}%</span>
                </div>
                <div class="row-element">
                    <Favorite :ticker="pair.ticker" :size="24" :favorite="pair.favorite"
                        @click.stop="handleFavoriteClick(pair)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variables';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .title {
        font-size: 20px;
        color: $surfaceContent;
    }
}

.pair-selector {
    width: 500px;
    left: -500px;
}

.markets {
    display: grid;
    grid-auto-flow: row;
    // gap: 12px;
    margin-top: 16px;
}

.row {
    flex: 1;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr auto;
    padding: 8px 16px;
    box-sizing: border-box;

    &:not(.markets-header):hover {
        background-color: $buttonHover;
        cursor: pointer;
    }

    &.selected {
        background-color: darken($buttonHover, 50%);
    }

    .row-element {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .asset-naming {
        display: flex;
        align-items: center;
        gap: 16px;

        >div {
            display: flex;
            flex-direction: column;
        }

        .icon {
            width: 32px;
        }
    }

    span {
        color: $surfaceContent;
        font-size: 14px;
    }

    &.markets-header {
        padding-bottom: 8px;

        span {
            font-weight: bolder;
            font-size: 12px;
        }

        .icon {
            color: $surfaceContent;
        }
    }
}
</style>