<script>
import { mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';
import Favorite from './Favorite.vue';
import store from '../store';
import { XMarkIcon } from '@heroicons/vue/24/solid'

export default {
    components: {
        Favorite,
        XMarkIcon
    },
    computed: {
        ...mapGetters(['pairSelectorVisibility', 'asset']),
        isVisible: {
            get() {
                return this.pairSelectorVisibility;
            },
            set(newValue) {
                this.updatePairSelectorVisibility(newValue);
            },
        },
        markets: {
            get() {
                return store.state.markets
            }
        }
    },
    watch: {
        isVisible(newValue) {
            newValue ? this.show() : this.hide();
        }
    },
    methods: {
        ...mapMutations(['updatePairSelectorVisibility', 'updateAsset']),
        selectPair(value){
            this.updateAsset(value)
        },
        toggleFavorite(pair) {
            pair.favorite = !pair.favorite
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
        }
    },
}
</script>

<template>
    <div class="pair-selector">
        <div class="header">
            <button class="button" @click="isVisible = false">
                <XMarkIcon class="icon" />
            </button>
        </div>
        <div class="markets">
            <div class="row markets-header">
                <div>
                    <span>Pair</span>
                </div>
                <div>
                    <span>Volume</span>
                </div>
                <div>
                    <span>Price</span>
                </div>
                <div>
                    <star-icon-solid class="icon" />
                </div>
            </div>
            <div class="row" v-for="pair in markets" :key="pair.ticker" @click="selectPair(pair.ticker)">
                <div>
                    <!-- https://vue-cryptoicon.netlify.app/ -->
                    <span>{{ pair.ticker }}</span>
                    <span>{{ pair.name }}</span>
                </div>
                <div>
                    <span>{{ pair.volume.counterpart }}</span>
                    <span>{{ pair.volume.asset }} {{ pair.volume.ticker }}</span>
                </div>
                <div>
                    <span>{{ pair.price.value }}</span>
                    <span>{{ pair.price.change }}</span>
                </div>
                <div>
                    <Favorite :ticker="pair.ticker" :size="24" :favorite="pair.favorite"
                        @toggleFavorite="toggleFavorite(pair)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variables';

.header {
    display: flex;
    justify-content: flex-end;
}

.pair-selector {
    position: absolute;
    height: 100vh;
    background-color: $surfaceHigh;
    width: 500px;
    left: -500px;
    padding: 16px 0;
    z-index: 2;
    box-sizing: border-box;
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

    &:hover {
        background-color: $buttonHover;
        cursor: pointer;
    }

    >div {
        display: flex;
        flex-direction: column;
        justify-content: center;
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