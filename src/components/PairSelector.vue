<script>
import { mapGetters, mapMutations } from 'vuex';
import anime from 'animejs'
import { StarIcon as StarIconOutlined } from '@heroicons/vue/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'
import store from '../store'
export default {
    components: {
        starIconOutlined: StarIconOutlined,
        starIconSolid: StarIconSolid,
    },
    computed: {
        ...mapGetters(['pairSelectorVisibility']),
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
        ...mapMutations(['updatePairSelectorVisibility']),
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
        <button @click="isVisible = false">Cerrar</button>
        <div class="markets">
            <div class="row header">
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
            <div class="row" v-for="pair in markets" :key="pair.ticker">
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
                    <button>
                        <star-icon-solid v-if="pair.favorite" class="icon favorite" />
                        <star-icon-outlined v-else class="icon" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variables.scss';

.pair-selector {
    position: absolute;
    height: 100vh;
    background-color: $surfaceHight;
    width: 500px;
    left: -500px;
    padding: 16px;
    z-index: 2;
    box-sizing: border-box;
}

.markets {
    display: grid;
    grid-auto-flow: row;
    gap: 12px;
    margin-top: 16px;
}

.icon {
    color: $surfaceContent;
    width: 24px;

    &.favorite {
        color: $surfaceContentHight;
    }
}

.row {
    flex: 1;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr auto;

    >div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    span {
        color: $surfaceContent;
        font-size: 14px;
    }

    &.header {
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