<template>
  <div class="tab">
    <button @click="toggleInput">
      <MagnifyingGlassIcon class="icon" />
    </button>
    <v-text-field density="compact" focused placeholder="Search coins" v-show="this.search"></v-text-field>
    <button @click="toggleConfiguration">
      <Cog6ToothIcon class="icon" />
    </button>
  </div>
</template>

<script>
import store from '../../store'
import { Cog6ToothIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

export default {
  components: {
    Cog6ToothIcon,
    MagnifyingGlassIcon
  },
  props: {
    ticker: String,
  },
  data() {
    return {
      search: false
    }
  },
  methods: {
    toggleConfiguration() {
      this.$store.commit('toggleConfiguration')
    },
    // Move this to search component (single responsability)
    toggleInput() {
      this.search = !this.search
    },
  },
  computed: {
    configuration() {
      return store.state.configuration.show
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/button.scss';

.tab {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

input {
  width: 100%;
}
</style>
