<template>
  <div class="vue-child">
    <i class="child">i am vue3.x child component</i>
    <button class="button" @click="testCompFun">测试methods定义的函数</button>

    <button class="button" @click="callOuterFun">调用组件内的顶层函数</button>

    <div ref="childDiv"></div>
  </div>
</template>

<script>
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
function outter() {
  console.log('组件全局函数的this---', this)
}
export default {
  setup(prop, context) {
    onBeforeMount(() => {
      console.log('child3.x onBeforeMount', prop, context)
    })
    onMounted(() => {
      console.log('child3.x onMounted')
    })
    onBeforeUpdate(() => {
      console.log('child3.x onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('child3.x onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('child3.x onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('child3.x onUnmounted')
    })
    onErrorCaptured(() => {
      console.log('child3.x onErrorCaptured')
    })
    onRenderTracked(() => {
      console.log('child3.x onRenderTracked')
    })
    onRenderTriggered(() => {
      console.log('child3.x onRenderTriggered')
    })
  },
  methods: {
    testCompFun() {
      console.log('组件的this---', this)
      setTimeout(() => {
        console.log('组件内的函数的this1---', this)
      })
      const fun2 = () => {
        console.log('组件内的函数的this2---', this)
      }
      const fun3 = function () {
        console.log('组件内的函数的this3---', this)
      }
      fun2()
      fun3()
    },
    callOuterFun() {
      outter()
    }
  },
  activated() {
    console.log('child activated')
  },
  // keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
  deactivated() {
    console.log('child deactivated')
  }
}
</script>

<style>
.vue-child {
  margin: 16px;
}

.vue-child>button {
  display: block;
  margin-top: 10px;
}

.child {
  display: block;

}
</style>
