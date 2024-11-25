<script setup lang="ts">
console.log('import.meta',  import.meta)
console.log('import.meta', import.meta.__proto__, import.meta instanceof Object)
// console.log('progress', process)
</script>
<template>
  <RouterView></RouterView>
</template>
<style scoped></style>
