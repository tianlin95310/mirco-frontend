<template>
  <div class="vue-life-cycle page-container">
    <h2>测试vue的生命周期方法，以及调用组件的方法，混入验证</h2>
    <!-- <h3 style="margin: 16px 0;">{{ 1 | testFilter('111') }}</h3> -->
    <child />
    <child3X />

    <div class="card">
      <div class="title">测试v-if和v-show的区别</div>
      <div>
        <button class="button" @click="show = !show">v-if与v-show</button>
      </div>
      <button class="button" v-if="show" title="v-if会直接删除，会不停的进行创建">v-if</button>
      <button class="button" v-show="show" title="v-show只是改变元素的display属性，不会删除">v-show</button>
    </div>

    <div class="card">
      <div class="title">混入测试</div>
      <div>
        <button class="button" @click="showSameProperty">同名属性</button>
        <button class="button" @click="funA">同名方法</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onUnmounted, onUpdated, watch, nextTick } from 'vue'
import child from './comp/childCompLife.vue'
import child3X from './comp/childCompLife3.x.vue'
import { useOverride } from '@/mixins/mixinOverride.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const v1 = 123
const str = 'parent value'
const show = false
watch(() => route, (newV, oldV) => {
  console.log('watch $route', newV, oldV)
})
// 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
// 比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
const showSameProperty = () => {
  console.log('showSameProperty', str)
}
// 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
const funA = () => {
  console.log('parent fun A called:', 'str =', str)
}

// 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
console.log('parent created', 'v1 =', v1, 'str =', str)
funA()

onBeforeMount(() => {
  console.log('parent onBeforeMount')
})
onMounted(() => {
  // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在dom内
  console.log('parent onMounted')
  nextTick(function () {
    console.log('parent onMounted $nextTick')
  })
})
useOverride()
onBeforeUpdate(() => {
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
  console.log('parent onBeforeUpdate')
})
onUpdated(() => {
  console.log('parent onUpdated')
})

onActivated(() => {
  // keep-alive 组件激活时调用,该钩子在服务器端渲染期间不被调用
  console.log('parent onActivated')
})

onDeactivated(() => {
  // keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
  console.log('parent onDeactivated')
})

onBeforeUnmount(() => {
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  console.log('parent onBeforeUnmount')
})

onUnmounted(() => {
  console.log('parent onUnmounted')
})

onErrorCaptured(() => {
  console.log('parent onErrorCaptured')
  return false
})
// export default {
//   mixins: [mixinOverride],
// }
</script>

<style lang="scss" scoped>
.vue-life-cycle {
  width: 100%;

  div {
    margin-top: 16px;
  }
}
</style>
