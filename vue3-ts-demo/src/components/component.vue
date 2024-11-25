<script setup lang="ts">
const delay = function (delay: number) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
}
await delay(2000)
const err0r = new Error('error')
</script>
<template>
  <h1>i am a async component</h1>
</template>
