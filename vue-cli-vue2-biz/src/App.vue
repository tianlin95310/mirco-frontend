<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <BaseText />
    <AsyncBaseText />
  </div>
</template>

<script>
/*eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
const AsyncComponent = (builder) => () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: builder(),
  // 异步组件加载时使用的组件
  loading: HelloWorld,
  // 加载失败时使用的组件
  error: HelloWorld,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 2000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
export default {
  name: 'App',
  components: {
    HelloWorld: HelloWorld,
    AsyncBaseText: AsyncComponent(() => import('lib_common_vue2/BaseText.vue')),
    BaseText: () => import('lib_common_vue2/BaseText.vue')
  }
}
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
