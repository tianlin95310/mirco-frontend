<template>
  <div class="bom-about page-container">
    <button class="button primary">{{ timer }}</button>
    <iframe src="http://localhost:9527/app3/pukegame1" class="frame1" resize></iframe>
    <!-- iframe也是存在跨域问题的 -->
    <iframe src="https://www.baidu.com/" width="480" height="270"></iframe>

    <div class="card">
      <h2>html内置对象以及属性</h2>
      <div>location.origin = {{ locationOrigin() }}</div>
      <div>location.port = {{ location.port }}</div>
      <div>location.href = {{ location.href }}</div>
      <div>location.hash = {{ location.hash }}</div>
      <div>location.search = {{ location.search }}</div>
      <div>location.hostname = {{ location.hostname }}</div>
      <!-- location.hash模拟路由变化 -->
      <div>
        <button class="button" @click="prePage(false)">上一个</button>
        <button class="button" @click="prePage">下一个</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onActivated, onDeactivated, onUnmounted, onBeforeMount, onBeforeUnmount, computed, watch, onBeforeUpdate, onUpdated } from 'vue'
const timer = ref(0)
let innerval = null
let index = 1
if (!innerval) {
  innerval = setInterval(() => {
    console.log('计时器', timer.value)
    timer.value++
  }, 1000)
}
const location = computed(() => window.location)
const locationOrigin = () => {
  return location.value.origin
}
const prePage = (add = true) => {
  window.location.hash = `#page${add ? index++ : index--}`
}
// 监听hash变化
watch(() => location.value.hash, (newV, oldV) => {
  console.log('hash changed', newV, oldV)
})
onBeforeMount(() => {
  console.log('bomAbout onBeforeMount')
})
onMounted(() => {
  console.log('bomAbout onMounted')
})
onBeforeUnmount(() => {
  console.log('bomAbout onBeforeUnmount')
})
onUnmounted(() => {
  console.log('bomAbout onUnmounted')
  clearInterval(innerval)
})
onActivated(() => {
  console.log('bomAbout onActivated')
})
onDeactivated(() => {
  console.log('bomAbout onDeactivated')
})
// onBeforeUpdate(() => {
//   console.log('bomAbout onBeforeUpdate')
// })
// onUpdated(() => {
//   console.log('bomAbout onUpdated')
// })
// 页面获取焦点
window.onblur = () => {
  console.log('window.onblur')
}
// 页面是去焦点
window.onfocus = () => {
  console.log('window.onfocus')
}
// 界面可见性
document.addEventListener('visibilitychange', () => {
  console.log('document.hidden', document.hidden)
})
window.onbeforeunload = (e) => {
  console.log('window.onbeforeunload', e)
  e = window.event || e
  e.returnValue = '确认关闭界面吗?'
}
</script>

<style>
.bom-about {
  background-color: blueviolet;
}

.frame1 {
  width: 480px;
  height: 270px;
}
</style>
