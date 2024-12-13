<template>
  <div class="page-container">
    <div>
      <h2>判断是否为纯数字，最多两位小数(n.2)</h2>
      <input v-model="v1" /> {{ decimal }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const v1 = ref('')
const decimal = computed(() => {
  if (!v1.value) {
    return 'empty'
  }
  const reg = /^[0-9]+\.?[0-9]{0,2}$/
  if (reg.test(v1.value)) {
    return 'is'
  } else {
    return 'no'
  }
})
</script>

<style scoped>
div>div {
  margin-top: 10px;
}
</style>
