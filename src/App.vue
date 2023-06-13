<script>
import Grid from './components/Grid.vue'
import WebFont from 'webfontloader'

export default {
  // import { Cog6ToothIcon } from '@heroicons/vue/24/solid'
  components: {
    Grid
  },
  mounted() {
    WebFont.load({
      google: {
        families: ['Roboto Mono:100,200,300,400']
      }
    })
  }
}
</script>

<template>
  <div>
    <Grid />>
  </div>
</template>

<style>
</style>
