<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="item">
      BaseText:
      <div>
        <BaseText />
      </div>
    </div>

    <div class="item">
      BaseTextLocal:
      <div>
        <BaseTextLocal />
      </div>
    </div>

    <div class="item">
      BaseTextVue2T:
      <div>
        <div id="vue22Button">
          <BaseTextVue2T />
        </div>
        <!-- 导入的vue2组件不能直接使用 -->
        <!-- <BaseTextVue2 /> -->
      </div>
    </div>
    <div class="item">
      BaseTextVue3:
      <div>
        <BaseTextVue3 />
      </div>
    </div>

    <div class="item">
      BaseTextVue3Vue:
      <div>
        <BaseTextVue3Vue />
      </div>
    </div>

    <div class="item">
      TLWaveView:
      <div>
        <TLWaveView :waveAmplitude="waveAmplitude" :waveHeight="waveHeight" :width="200" :height="200" bgColor="gainsboro" :isCycle="true"
          :styleObj="{ border: '1px solid white', borderRadius: '50%' }" waveColor="rgba(0, 255, 255, 255)"></TLWaveView>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from "./components/HelloWorld.vue";
import BaseText from "@/components/BaseText.vue";
import BaseTextLocal from "./components/BaseTextLocal.vue";
import { defineAsyncComponent } from "vue";
// import { vue2ToVue3 } from './utils';
const waveAmplitude = 10
const waveHeight = 100
// 此种方式无法读取vue2组件
const BaseTextVue2 = defineAsyncComponent(() =>
  import("lib_common_vue2/BaseText.vue").catch(e => { }).finally(() => {
    // isLoadingComponent.value = false;
  })
);
const BaseTextVue3 = defineAsyncComponent(() =>
  import("lib_common_vue3/BaseText.vue").catch(e => { }).finally(() => {
    // isLoadingComponent.value = false;
  })
);
const BaseTextVue3Vue = defineAsyncComponent(() =>
  import("lib_common_vue3/BaseTextVue3.vue").catch(e => { }).finally(() => {
    // isLoadingComponent.value = false;
  })
);

export default {
  name: "App",
  components: {
    HelloWorld,
    BaseText,
    BaseTextLocal,
    // BaseTextVue2T: vue2ToVue3(BaseTextVue2, 'vue22Button'),
    BaseTextVue2,
    BaseTextVue3,
    BaseTextVue3Vue
  },
};
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

.item {
  div {
    display: inline-block;
  }
}
</style>
