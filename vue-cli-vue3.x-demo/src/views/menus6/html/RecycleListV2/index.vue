<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, watch } from 'vue'
const initBegin = 0
const recycleCount = 20

const itemHeight = 100
const page = ref(0)
const state = reactive({
  list: Array.from({ length: 1000 }, (_, index) => index + 1),
  reuseItems: []
})

const containerRef = ref(null)
const bodyMatch = ref(null)
state.reuseItems = state.list.slice(initBegin, recycleCount)

const lastScrollTop = ref(0)

const renderList = (begin, end) => {
  state.reuseItems = state.list.slice(begin, end)
}

const onScrollFun = (event) => {
  // console.log('event', event)
  const scrollTop = event.target.scrollTop
  page.value = Math.floor(scrollTop / (itemHeight * recycleCount / 2))
}
watch(page, (newV, oldV) => {
  console.log('newV', newV)
  if (newV >= 1) {
    const start = newV * recycleCount / 2
    const end = (newV + 2) * recycleCount / 2
    renderList(start, end)
    lastScrollTop.value = start * itemHeight
  } else {
    renderList(initBegin, recycleCount)
    lastScrollTop.value = 0
  }
  console.log('lastScrollTop', lastScrollTop.value)
})

onMounted(() => {
  const container = containerRef.value
  bodyMatch.value.style.height = state.list.length * itemHeight + 'px'
  container.addEventListener('scroll', onScrollFun)
})

onBeforeUnmount(() => {
  containerRef.value.removeEventListener('scroll', onScrollFun)
})
</script>

<template>
  <div ref="containerRef" class="recycle-list">
    <div ref="bodyMatch" id="body-match" class="body-match"></div>
    <div id="items" class="items" :style="{transform: `translateY(${lastScrollTop}px)`}">
      <div v-randomcolor v-for="(item, index) in state.reuseItems" :key="index" class="item"
        :style="{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px` }">
        index{{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recycle-list {
  width: 200px;
  height: 500px;
  border: 1px solid gainsboro;
  overflow: auto;
  position: relative;

  .body-match {
    width: 100%;
  }

  .items {
    position: absolute;
    width: 100%;
    // left: 0;
    top: 0;
  }

  .item {
    width: 100%;
    // height: 50px;
    // line-height: 50px;
    text-align: center;
    border-bottom: 1px solid goldenrod;
  }
}
</style>
