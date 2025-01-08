<template>
  <div>A Base Text(Vue3) from lib_common_vue3 {{ Math.round(+new Date() / 1000) }}</div>
</template>
<script setup>
async function delay(duration) {
  return new Promise(function(reslove){
    setTimeout(() => {
      reslove(true)
    }, duration)
  })
}
await delay(4000)
</script>