<template>
  <Suspense>
    <template #default>
      <!-- 默认插槽 -->
      <slot>
        <!-- 默认内容 -->
        Default
      </slot>
    </template>

    <template #fallback>
      <Loading tip="Suspense Container Loadding..." />
    </template>
  </Suspense>
</template>
<script setup>
import Loading from './loading.vue'
</script>
