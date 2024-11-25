<template>
  <t-l-collapse title="4,Vue技术的问题">
    <template v-slot:content>
      <pre>
        1，Vue2.0和Vue3.0为了实现响应式的区别和采用的api的区别
          .1 Vue2.0会遍历对象所有的属性，然后通过Object.defineProperty()来设置setter、getter，
          每个组件实例都有对应的观察者，对于数组的支持有限，如仅改变数组长度是无法监听到的
          .2 Vue3.x 使用代理Proxy实现响应式方案，Proxy 是在 ES6 中引入的，它使 Vue 3 避免了 Vue 早期版本中存在的一些响应性问题。
          Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。我们这样使用它：new Proxy(target, handler)
        2，Vue3的优化
          1，生成block tree，vue2的动态刷新是以组件为单位的，组件越大，速度越慢，vue3中组件的刷新只和动态模板的数量有关
          2，slot优化，vue2中父组件的刷新会导致slot刷新，vue3中非动态的slot不会刷新
          3，diff算法优化
          4，静态提升，组件复用，对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用。
          5，事件侦听器缓存
        3，v-if和v-show
          v-if控制是否在文档上，v-show控制display属性
        4，vue2的.sync修饰符
          key.sync="key"用于处理数据双向绑定的,是update:key的一种缩写，.sync在vue3已被当作过时api，使用v-model:key代替
      </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a4Vue',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
