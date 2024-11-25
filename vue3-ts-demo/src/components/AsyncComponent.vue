<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import ComponentError from './componentError.vue'
import ComponentLoadding from './componentLoading.vue'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./component.vue'),
  loadingComponent: ComponentLoadding,
  delay: 200,
  errorComponent: ComponentError,
  timeout: 2000,
  onError: (e) => {
    console.log('onError', e)
  }
})
</script>

<template>
  <AsyncComponent></AsyncComponent>
</template>