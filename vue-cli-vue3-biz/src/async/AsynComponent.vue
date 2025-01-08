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
      <Error v-if="props.state === 'timeout'"></Error>
      <Loadding v-else tip="Suspense Loadding..."></Loadding>
    </template>
  </Suspense>
</template>
<script setup>
/* eslint-disable */
import Loadding from './loading.vue'
import Error from './error.vue';
const props = defineProps({
  state: {
    type: String,
    default: 'idle'
  }
})
</script>
