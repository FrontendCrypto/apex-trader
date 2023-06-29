<template>
  <div>
    <select v-model="selectedTimeframe" @change="handleChange">
      <option v-for="option in timeframeOptions" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      selectedTimeframe: '1w',
      timeframeOptions: ['1d', '1w', '1m'],
    };
  },
  methods: {
    ...mapMutations(['updateTimeframe']),
    handleChange() {
      this.updateTimeframe(this.selectedTimeframe);
    },
  },
};
</script>
