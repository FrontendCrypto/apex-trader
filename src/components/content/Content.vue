<script>
import store from '../../store'
import Chart from './Chart.vue'
import Change from './Change.vue'
import BookmarkAction from '../actions/BookmarkAction.vue'
import { BookmarkIcon } from '@heroicons/vue/24/solid'
import fitty from 'fitty'
import anime from 'animejs/lib/anime.es.js';


// @todo Set content height on initialization looking keyboard status.
// @todo keyboard status shown or hidden in initialization.
export default {
    components: {
        BookmarkAction,
        Chart,
        Change,
        BookmarkIcon,
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(number)
        }
    },
    mounted() {
        fitty(this.$refs.headerName, {
            maxSize: 20,
            multiline: false
        })
    },
    computed: {
        // Computed are re-evaluated on change => store
        iconPath() {
            const part = this.ticker.toLowerCase();
            return `src/assets/icons/coins/${part}.svg`
        },
        icon() {
            return store.state.icon
        },
        currency() {
            return store.state.user.currency
        },
        ticker() {
            return store.state.ticker
        },
        formattedTicker() {
            return this.ticker.toUpperCase()
        },
        name() {
            return store.state.data.name
        },
        price() {
            return this.formatNumber(store.state.data.price)
        },
        change() {
            return this.formatNumber(store.state.data.change)
        },
        marketData() {
            return {
                capitalization: this.formatNumber(store.state.data.market.capitalization),
                maxSupply: this.formatNumber(store.state.data.market.maxSupply),
                currentSupply: this.formatNumber(store.state.data.market.currentSupply),
            }
        },
        color() {
            return store.state.color
        },
        isBookmarked() {
            // Get bookmark status
            return store.getters.isBookmarked
        },
        getKeyboardHeight() {
            return store.state.user.keyboard.height
        }
    },
    watch: {
        getKeyboardHeight(value) {
            anime({
                targets: this.$refs.content,
                height: `calc(100% - ${value}px)`,
                easing: 'linear',
                duration: 0
            })
        }
    }
}
</script>

<template>
    <div class="content" ref="content">
        <header class="header">
            <div class="header-icon">
                <img :src="iconPath" :alt="name">
                <div class="bookmark" v-if="isBookmarked">
                    <BookmarkIcon @click="this.$store.commit('removeBookmark')" class="bookmark-icon" />
                </div>
            </div>
            <h2 class="header-name" ref="headerName">{{ name }}</h2>
            <h3 class="header-ticker">{{ formattedTicker }}</h3>

            <h2 class="header-price">{{ price }} {{ currency }}</h2>
            <h3 class="header-change">
                <Change />
            </h3>
        </header>
        <Chart />
        <BookmarkAction />
        <main>
            <div class="market-data">
                <div class="item">
                    <h5>Market Cap.</h5>
                    <p>{{ marketData.capitalization }} {{ currency }}</p>
                </div>
                <div class="item">
                    <h5>Max. Supply</h5>
                    <p>{{ marketData.maxSupply }} {{ formattedTicker }}</p>
                </div>
                <div class="item">
                    <h5>Current Supply</h5>
                    <p>{{ marketData.currentSupply }} {{ formattedTicker }}</p>
                </div>
            </div>
            <p>Long content</p>
            <p>Long content</p>
            <p>Long content</p>
            <p>Long content</p>
        </main>
    </div>
</template>

<style scoped lang="scss">
.content {
    display: grid;
    gap: 24px;
    overflow-y: auto;
    overflow-x: hidden;
    grid-auto-rows: min-content;
    padding-bottom: 32px;
}

.header {
    display: grid;
    grid-template-rows: repeat(2, 32px);
    grid-template-columns: 64px 1fr 1fr;
    column-gap: 16px;
    padding: 24px 16px 0px 16px;
}

.header-icon {
    grid-row: 1/3;
    grid-column: 1;
    display: flex;
    align-items: center;
    position: relative;

    img {
        width: 64px;
        height: 64px;
        z-index: 1;
    }

    .bookmark {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #ffffff;
        z-index: 2;
        position: absolute;
        right: 0;
        bottom: 0;

        .bookmark-icon {
            width: 16px;
            height: 16px;
            color: #2b2b2b
        }
    }
}

.header-name {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    align-items: center;
}

.header-ticker {
    grid-row: 2;
    grid-column: 2;
    display: flex;
    align-items: center;
}

.header-price {
    grid-row: 1;
    grid-column: 3;
    text-align: right;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.header-change {
    grid-row: 2;
    grid-column: 3;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.market-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 8px;
    column-gap: 16px;
}

.header-name,
.header-price,
.header-ticker,
.market-data {
    color: #ffffff;
}
</style>