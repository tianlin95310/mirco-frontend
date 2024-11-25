<template>
  <div class="vue-transition page-container">

    <h2>测试vue的transition标签动画</h2>
    <button class="button" v-on:click="toggleClick">
      Toggle
    </button>

    <transition name="fade" mode="out-in">
      <h3 v-show="show">{{ value }}</h3>
    </transition>

    <transition name="fade" mode="out-in">
      <h3 v-if="show">{{ value }}</h3>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'

const value1 = '田林'
const value2 = 'tianlin'
const show = ref(true)
let { value } = toRefs(reactive({
  value: '田林'
}))
const toggleClick = () => {
  show.value = !show.value
  value = show.value ? value1 : value2
}
</script>

<style lang="scss" scoped>
.vue-transition {

  button {
    margin-top: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
