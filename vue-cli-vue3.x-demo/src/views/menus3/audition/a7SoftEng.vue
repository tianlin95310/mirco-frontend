<template>
  <t-l-collapse title="7,软件工程问题">
    <template v-slot:content>
      <pre>
        1，观察者模式和发布订阅模式
          被关注的对象的属性发生变化后，通过发送通知给到所有的订阅者，订阅者就能所处相应
      </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a7SoftEng',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
