<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import ComponentError from './componentError.vue'
import ComponentLoadding from './componentLoading.vue'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./component.vue'),
  loadingComponent: ComponentLoadding,
  errorComponent: ComponentError,
  delay: 2000,
  timeout: 5000,
  onError: (e) => {
    console.log('onError', e)
  }
})
</script>

<template>
  <AsyncComponent></AsyncComponent>
</template>