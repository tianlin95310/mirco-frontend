<template>
  <div class="sync-content">
    Sync Component {{ Math.round(+new Date() / 1000) }}
  </div>
</template>

<script>
  export default {
    name: 'AsyncContent',
    setup() {
      console.log('AsyncContent setup')
    }
  }
</script>

<style>
  .sync-content {
    line-height: 100px;
    background-color: #ccc;
  }
</style>
