<template>
  <div class="tl-index-view" :style="{ width: vWidth }">
    <div v-for="(item, index) in items" :key="index" @click="onIndexClick(item)" :style="{
      color: vColor,
      height: (100 / items.length) + '%',
    }" class="index-item">
      {{ item }}
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, defineEmits } from 'vue';
const props = defineProps({
  vColor: {
    type: String,
    default: 'grey'
  },
  vWidth: {
    type: String,
    default: '40px'
  }
})
const $emit = defineEmits(['onIndexClick'])
const items = ref([
  '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'W', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
])

console.log('---tl-index-view created---', props.vWidth)
const onIndexClick = (item) => {
  $emit('onIndexClick', item)
}
</script>

<style lang="scss" scoped>
.tl-index-view {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);

  .index-item {
    user-select: none;
    text-align: center;
    text-decoration: solid;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .index-item:hover {
    background: var(--primiryColor) !important;
    color: white !important;
  }
}
</style>
