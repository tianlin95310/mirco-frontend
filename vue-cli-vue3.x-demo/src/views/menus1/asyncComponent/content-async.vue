<template>
  <div class="async-content">
    Async Components With Promise Setup
  </div>
</template>

<script>
  export default {
    name: 'AsyncContent',
    async setup() {
      const loadData = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(111)
          }, 2000)
        })
      }
      await loadData()
      console.log('AsyncContent setup')
    }
  }
</script>

<style>
  .async-content {
    line-height: 100px;
    background-color: #bbb;
  }
</style>
