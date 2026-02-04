<template>
  <div class="dashboard page-container">
    <h2>测试下载文件</h2>
    <a class="download-a" href="/apk/app-dev-debug.apk" download="app-dev-debug.apk">下载public文件夹二进制文件</a>
    <a class="download-a" :href="href1" download="logo.png">下载assets文件下图片</a>

    <div>
      1，手写promise
      2，手写vue的基本响应逻辑
      3，手写cloneDeep
      
      4，模块联邦开发环境代理设置
      5，通过js添加vue组件到
      6，封装一个包含网络请求管理的功能，包括，自动取消，缓存，防抖
      7，封装一层带有异步组件功能的基础组件
      8，模块联邦加载顺序影响
      9，多入口页面使用

      *，Vite+ESBuild
      *，服务端渲染-SSR和SSG，Vite.js，Nuxt.js
      *，Node.js中间件的使用，了解插件的编写，服务器端编程
      *，JS Worker的使用
      *，indexedDB的使用

      *，数据结构和算法
      *，leetcode算法练习

      面试题进度6/9
    </div>
  </div>
</template>
<script setup>
const href1 = require('@/assets/logo.png')
console.log('process.env.NODE_ENV', process.env, process.env.NODE_ENV)
console.log('process.env.VUE_APP_BASE_URL', process.env.VUE_APP_BASE_URL)
</script>
<style lang="scss" scoped>
.dashboard {
  .todo {
    background-color: antiquewhite;
    text-align: center;
    padding: 16px;
  }
}
</style>
