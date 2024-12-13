<template>
  <div class="bom-about page-container">
    <button class="button primary">测试定时器{{ timer }}</button>
    <iframe src="http://localhost:9527/app3/pukegame1" class="frame1" resize></iframe>
    <!-- iframe也是存在跨域问题的 -->
    <iframe src="https://www.baidu.com/" class="frame1"></iframe>

    <div class="card">
      <h2>错误日志</h2>
      <button class="button" @click="createError1">产生异常1</button>
      <button class="button" @click="createError2">产生异常2</button>
      <button class="button" @click="createError3">产生异常3</button>
    </div>

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
const createError1 = () => {
  console.log('createError1')
  throw new Error('error1')
}
const createError2 = () => {
  console.log('createError2')
  Promise.reject('error2')
  // Promise.reject(new Error('error2'))
}
const createError3 = () => {
  console.log('createError3')
  window.callUnkownFun()
}
</script>

<style>
.bom-about {
  background-color: blueviolet;
}

.frame1 {
  width: 270px;
  height: 480px;
  border: none;
  border-radius: 40px;
  padding: 12px 14px;
  margin-left: 12px;

  background: url(data:image/webp;base64,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);
  background-size: 101% 101%;
  background-position: center;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-clip: border-box;
}
</style>
