<script setup>
import Keyboard from './components/keyboard/Keyboard.vue'
import Content from './components/content/Content.vue'
// import { Cog6ToothIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="device">
    <Content />
    <Keyboard />
  </div>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
  background-color: #1a1a1a;
}

.device {
  width: 360px;
  height: 800px;
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a;
}
</style>
