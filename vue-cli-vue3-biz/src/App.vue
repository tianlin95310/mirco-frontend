<template>
  <div class="home">
    <div class="item">
      <h4>BaseTextLocal:</h4>
      <BaseTextLocal />
    </div>

    <div class="item">
      <h4>BaseText:</h4>
      <BaseText />
    </div>

    <div class="item">
      <h4>BaseTextVue2T:</h4>
      <div id="vue22Button">
        <BaseTextVue2T />
      </div>
      <!-- 导入的vue2组件不能直接使用，会报错无法渲染，需要翻译成vue3组件 -->
      <!-- <BaseTextVue2 /> -->
    </div>
    <div class="item">
      <h4>BaseTextVue3:</h4>
      <AsynComponent>
        <BaseTextVue3 />
      </AsynComponent>
    </div>

    <div class="item">
      <h4>BaseTextVue3Vue:</h4>
      <AsynComponent :state="state">
        <BaseTextVue3Vue />
      </AsynComponent>
    </div>

    <div class="item">
      <h4>TLWaveView:</h4>
      <AsynComponent>
        <TLWaveView :waveAmplitude="waveAmplitude" :waveHeight="waveHeight" :width="200" :height="200" bgColor="gainsboro" :isCycle="true"
          :styleObj="{ border: '1px solid white', borderRadius: '50%' }" waveColor="rgba(0, 255, 255, 255)"></TLWaveView>
      </AsynComponent>
    </div>

  </div>
</template>

<script setup>
/* eslint-disable */
// 项目内部的组件直接使用
import BaseTextLocal from "@/components/BaseTextLocal.vue"
// 项目内部的组件直接使用，如果有同名的其他包的插件会被覆盖
import BaseText from "@/components/BaseText.vue";
import AsynComponent from './async/AsynComponent.vue'
import { loadAsyncComponent } from './async/loadAsync'
import { vue2ToVue3 } from './utils'
import { delay } from "./async/loadAsync";
import { onErrorCaptured, ref } from "vue";
// vue2的插件引入进来，先直接导入，再用vue2ToVue3转化才能渲染
const BaseTextVue2T = loadAsyncComponent(async () => {
  await delay(2000)
  const view = await import("lib_common_vue2/BaseText.vue")
  return Promise.resolve(vue2ToVue3(view.default, 'vue22Button'))
})
const waveAmplitude = 10
const waveHeight = 100

const BaseTextVue3 = loadAsyncComponent(() => import("lib_common_vue3/BaseText.vue"))

// if 8081 was offline, suspensible set true, no end status to the Suspense, is always show the fallback slot
const BaseTextVue3Vue = loadAsyncComponent(async () => import("lib_common_vue3/BaseTextVue3.vue"), { suspensible: true })
const state = ref('')
// onErrorCaptured(err => {
//   console.log('err', err)
//   state.value = 'timeout'
// })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
  margin-top: 60px;
}

.home {
  h4 {
    margin: 0;
    margin-top: 10px;
  }
}

.item {
  div {
    display: inline-block;
  }
}
</style>
