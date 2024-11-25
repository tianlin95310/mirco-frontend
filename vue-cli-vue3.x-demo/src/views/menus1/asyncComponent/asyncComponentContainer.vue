<template>
  <Suspense>
    <slot name="child"></slot>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
<script setup>
import Loading from './loading.vue'
</script>
