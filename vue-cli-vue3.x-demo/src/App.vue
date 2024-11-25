<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import device from './utils/Device.js'
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'
console.log('%c App setup---', 'color: red', this)
onBeforeMount(() => {
  console.log('%c App onBeforeMount---', 'color: red', this)
})
onMounted(() => {
  function resetFont() {
    let size = '14px'
    if (device.isPC()) {
      const width = document.body.clientWidth
      size = width / (1600 / 14) + 'px'
    } else {
      const width = document.body.clientWidth
      size = width / (375 / 14) + 'px'
    }
    document.getElementById('app').style.fontSize = size
    console.log('%c App is Pc =', 'color: red', device.isPC(), 'document.style.fontSize =', size)
  }
  resetFont()
  // 全局事件
  window.onresize = resetFont
  console.log('%c App onMounted', 'color: red', 'clientWidth =', document.body.clientWidth, 'clientHeight =', document.body.clientHeight, 'screen.width =', screen.width, 'screen.height =', screen.height)
})
onBeforeUpdate(() => {
  console.log('%c App onBeforeUpdate', 'color: red')
})
onUpdated(() => {
  console.log('%c App onUpdated', 'color: red')
})
onBeforeUnmount(() => {
  console.log('%c App onBeforeUnmount', 'color: red')
})
onUnmounted(() => {
  console.log('%c App onUnmounted', 'color: red')
})
onErrorCaptured(() => {
  console.log('%c App onErrorCaptured', 'color: red')
})
onRenderTracked(() => {
  console.log('%c App onRenderTracked', 'color: red')
})
onRenderTriggered(() => {
  console.log('%c App onRenderTriggered', 'color: red')
})
</script>
<style lang="scss">
@import "assets/css/theme";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
