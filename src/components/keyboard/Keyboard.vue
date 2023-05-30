<script>
import { market } from '../../data/market'
import Actions from '../actions/Actions.vue'
import Categories from '../categories/Categories.vue'
import Coin from './Coin.vue'
import Tab from './Tab.vue'
import Configuration from './Configuration.vue'
import anime from 'animejs/lib/anime.es.js';
import { Bars2Icon } from '@heroicons/vue/24/solid'

import store from '../../store'

export default {
  components: {
    Categories,
    Coin,
    Actions,
    Tab,
    Configuration,
    Bars2Icon
  },
  data() {
    return {
      startY: 0,
    }
  },
  // @todo getters and setters like in Configuration.vue
  computed: {
    filteredMarketData() {
      // Get only 18 elements from market
      return Object.values(market).slice(0, 18)
    },
    actions() {
      return store.state.user.configuration.showActions
    },
    categories() {
      return store.state.user.configuration.showCategories
    },
    isVisible() {
      return store.getters.isKeyboardVisible
    },
    keyboardHeight() {
      return this.$refs.keyboard.offsetHeight
    },
    notchHeight() {
      return this.$refs.notch.offsetHeight
    }
  },
  watch: {
    isVisible(value) {
      value ? this.show() : this.hide()
    }
  },
  methods: {
    show() {
      anime({
        targets: this.$refs.keyboard,
        bottom: 0
      })
      // Hide configuration if open
      this.$store.commit('hideConfiguration')
      this.$store.commit('setKeyboardHeight', this.keyboardHeight - this.notchHeight)
    },
    hide() {
      anime({
        targets: this.$refs.keyboard,
        bottom: -this.keyboardHeight + this.notchHeight
      })
      //hide configuration if open
      this.$store.commit('hideConfiguration')
      this.$store.commit('setKeyboardHeight', 0)
    },
    onDragStart(event) {
      this.startY = event.clientY
    },
    onDragEnd(event) {
      const currentY = event.clientY;
      const deltaY = currentY - this.startY;

      if (deltaY > 0) {
        this.$store.commit('hideKeyboard')
      } else if (deltaY < 0) {
        this.$store.commit('showKeyboard')
      }
    },
  }
}
</script>

<template>
  <div class="keyboard" ref="keyboard">
    <div class="notch" ref="notch">
      <button draggable="true" class="notch-button" @dragstart="onDragStart" @dragend="onDragEnd">
        <Bars2Icon class="notch-icon" />
      </button>
    </div>
    <div class="keyboard-wrapper">
      <Configuration class="configuration" />
      <Tab />
      <Categories v-show="categories" />
      <div class="coins">
        <Coin v-for="coin in filteredMarketData" :ticker="coin.ticker" :key="coin.ticker" />
      </div>
      <!-- @todo -->
      <Actions v-show="actions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.notch {
  display: flex;
  justify-content: center;
}

.notch-button {
  background-color: transparent;
}

.notch-icon {
  width: 32px;
  color: #ffffff
}

.coins {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 48px);
  gap: 4px;
  overflow: hidden;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  bottom: 0;
  z-index: 3;
  width: 100%;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}

.keyboard-wrapper {
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.configuration {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}
</style>