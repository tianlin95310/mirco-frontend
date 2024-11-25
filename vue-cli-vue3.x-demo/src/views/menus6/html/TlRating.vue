<template>
  <div class="tl-mini-rating" :style="{ fontSize: size }">
    <span v-for="value in total" :key="value">
      <span v-if="value <= score" :style="{ color: foreColor }" @click="update(value)">★</span>
      <span v-else-if="value > score" :style="{ color: bgColor }" @click="update(value)">☆</span>
    </span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const $emit = defineEmits(['update']) 
defineProps({
  size: {
    default: '1.2em'
  },
  total: {
    default: 5
  },
  score: {
    default: 0
  },
  foreColor: {
    default: '#F44336'
  },
  bgColor: {
    default: '#CCCCCC'
  }
})
const update = (value) => {
  $emit('update', value)
}
</script>

<style lang="scss" scoped>
.tl-mini-rating {
  width: 100%;

  span {
    cursor: pointer;

    >span {
      margin-left: 5px;
      font-weight: 800;
    }
  }
}
</style>
