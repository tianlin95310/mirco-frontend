<template>
  <div class="dashboard page-container">
    <h2>测试下载文件</h2>
    <a class="download-a" href="/apk/app-dev-debug.apk" download="app-dev-debug.apk">下载public文件夹二进制文件</a>
    <a class="download-a" :href="href1" download="logo.png">下载assets文件下图片</a>
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
