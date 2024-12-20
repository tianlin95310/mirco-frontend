<template>
  <Suspense>
    <slot name="child"></slot>
    <template #fallback>
      <Loading tip="Suspense Container Loadding..." />
    </template>
  </Suspense>
</template>
<script setup>
import Loading from './loading.vue'
</script>
