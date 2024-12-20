<template>
  <div class="loadding-container">{{ tip }}</div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      tip: {
        type: String,
        default: 'Loading...'
      }
    },
    setup() {
     console.log('loading setup')
    }
  }
</script>

<style>
.loadding-container {
  height: 100px;
  line-height: 100px;
}
</style>
