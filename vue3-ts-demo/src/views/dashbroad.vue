<template>
  <pre>
    Hello Vite
  </pre>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue';

watchEffect((value) => {
  console.log('watchEffect', value)
})

</script>