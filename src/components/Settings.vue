<script>
import { mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';
import { XMarkIcon } from '@heroicons/vue/24/solid'

export default {
    components: {
        XMarkIcon
    },
    computed: {
        ...mapGetters(['isSettingsVisible', 'baseCurrency', 'currencies']),
        isVisible: {
            get() {
                return this.isSettingsVisible;
            },
            set(newValue) {
                this.updateSettingsVisibility(newValue);
            },
        },
    },
    watch: {
        isVisible(newValue) {
            console.log('dentro')
            newValue ? this.show() : this.hide();
        }
    },
    methods: {
        ...mapMutations(['updateSettingsVisibility', 'updateBaseCurrency']),
        selectPair() {
            this.updateSettingsVisibility(false)
        },
        show() {
            anime({
                targets: '.settings',
                right: '0px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        },
        hide() {
            anime({
                targets: '.settings',
                right: '-300px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        },
        onChange(event) {
            const formattedBaseCurrency = event.target.value
            this.updateBaseCurrency(formattedBaseCurrency)
        }
    },
}
</script>

<template>
    <div class="panel settings">
        <div class="header">
            <span class="title">Settings</span>
            <button class="button" @click="isVisible = false">
                <XMarkIcon class="icon" />
            </button>
        </div>
        <div class="content">
            <div class="order-type form-element">
                <label for="baseCurrency">Base currency</label>
                <select id="baseCurrency" name="baseCurrency" @change="onChange($event)">
                    <option v-for="currency in currencies" :key="currency.slug" :value="currency.slug">
                        {{ currency.name }}
                    </option>
                </select>
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

    .title {
        font-size: 20px;
        color: $surfaceContent;
    }
}

.settings {
    width: 300px;
    right: -300px;
    padding: 16px;
}
</style>