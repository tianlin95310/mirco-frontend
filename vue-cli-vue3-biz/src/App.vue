<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  BaseText:<BaseText />
  BaseTextLocal:<BaseTextLocal />
  <div id="vue2Button"></div>
  BaseTextVue2:<BaseTextVue2 />
  BaseTextVue3:<BaseTextVue3 />
  BaseTextVue3Vue:<BaseTextVue3Vue />
</template>

<script>
/* eslint-disable */
import HelloWorld from "./components/HelloWorld.vue";
import BaseText from "@/components/BaseText.vue";
import BaseTextLocal from "./components/BaseTextLocal.vue";
import { defineAsyncComponent } from "vue";
import { vue2ToVue3 } from './utils';
import BaseTextVue2 from 'lib_common_vue2/BaseText.vue';

// 无法读取
// const BaseTextVue2 = defineAsyncComponent(() =>
//   import("lib_common_vue2/BaseText.vue").finally(() => {
//     // isLoadingComponent.value = false;
//   })
// );
const BaseTextVue3 = defineAsyncComponent(() =>
  import("lib_common_vue3/BaseText.vue").finally(() => {
    // isLoadingComponent.value = false;
  })
);
const BaseTextVue3Vue = defineAsyncComponent(() =>
  import("lib_common_vue3/BaseTextVue3.vue").finally(() => {
    // isLoadingComponent.value = false;
  })
);

export default {
  name: "App",
  components: {
    HelloWorld,
    BaseText,
    BaseTextLocal,
    BaseTextVue2: vue2ToVue3(BaseTextVue2, 'vue2Button'),
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
