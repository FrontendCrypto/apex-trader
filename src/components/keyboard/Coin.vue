<template>
  <button @click="onCoinPressed" :class="isActive">
    <img :src="iconPath" size="20" />
    <span>{{ ticker }}</span>
  </button>
</template>

<script>
import store from '../../store'
export default {
  props: {
    ticker: String,
  },
  methods: {
    onCoinPressed() {
      this.$store.commit('selectCoin', this.getFormattedTicker) // @test lorcase
    }
  },
  computed: {
    getFormattedTicker() {
      return this.ticker.toLowerCase()
    },
    getTicker() {
      return store.state.ticker
    },
    isActive() {
      return this.getFormattedTicker === this.getTicker ? 'active' : '';
    },
    iconPath() {
      const path = `src/assets/icons/coins/${this.getFormattedTicker}.svg`;
      return path;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/button.scss';

span {
  font-size: 10px;
}
</style>
