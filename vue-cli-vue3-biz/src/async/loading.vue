<template>
  <div class="loadding-container">{{ tip }}</div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'Loading',
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
