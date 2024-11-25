<template>
  <div v-loadmore="loadMore" load-more-immediate="true" load-more-distance="20" class="loadmore-cotantainer scroll-bar">
    <slot ref="body" name="content"></slot>
    <div v-show="showLoading" class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, reactive, computed } from 'vue'
import vLoadmore from './loadmore'
defineProps({
  showLoading: {
    type: Boolean,
    default: true
  }
})
const state = reactive({
  loading: false,
  error: false,
  isDone: false
})

const $emit = defineEmits(['loadMore'])
const loadingText = computed(() => {
  if (state.loading) {
    return '加载中...'
  } else if (state.error) {
    return '点击重试...'
  } else if (state.isDone) {
    return '每日更多了...'
  } else {
    return '加载中...'
  }
})
const loadMore = () => {
  if (state.loading) {
    return false
  }
  state.loading = true
  $emit('loadMore')
}
const loadFinished = () => {
  state.loading = false
}
defineExpose({
  loadFinished
})
</script>

<style>
.loadmore-cotantainer {
  border: 1px solid goldenrod;
  overflow: auto;
  height: 100%;
}

.loading {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
