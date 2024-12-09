<template>
  <div class="mobile-page" :style="{ height: height }">
    <img class="img" src="../../assets/bg.jpg">
    <div class="content">
      <div class="scroll-container top-list">
        <div class="login-container">
          <input />
          <button>提交</button>
        </div>
        <div style="height: 1200px;"></div>
        <div class="login-container">
          <input />
          <button>提交</button>
        </div>
      </div>
      <div class="bottom-buttons">底部按钮</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const height = ref('100vh')
window.onresize = function () {
  console.log('onresize', 
  'clientHeight =', document.documentElement.clientHeight, 'clientWidth =', document.documentElement.clientWidth, 
  'document.documentElement.scrollHeight =', document.documentElement.scrollHeight, 
  'innerHeight =', window.innerHeight, 
  'outerHeight =', window.outerHeight)
}
onMounted(() => {
  // height.value = document.documentElement.clientHeight + 'px'
})
</script>

<style lang="scss" scoped>
.scroll-container {
  overflow-x: hidden;
  overflow-y: auto;
}

// 用于背景被软键盘挤压,实测无效
// .mobile-page:before {
//   content: "";
//   position: fixed;
//   z-index: -1;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background: url(../../assets/logo.png) bottom no-repeat;
//   background-size: contain;
// }
.mobile-page {
  background-image: url('../../assets/logo.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100vh;

    .bottom-buttons {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background-color: blue;
      color: white;
      opacity: 0.6;
    }

    .top-list {
      height: calc(100vh - 50px);
    }

    .login-container {
      border-radius: 10px;
      width: 120px;
      height: 100px;
      bottom: 60px;
      margin: 16px auto;
      text-align: center;

      input {
        width: 100%;
      }

      button {
        width: 70%;
      }
    }
  }

  .img {
    width: 100vw;
    height: 100%; // 窗口高度会导致挤压
    position: absolute;
    z-index: 0;
    object-fit: cover;
    bottom: 0;
    left: 0;
    opacity: 0.8;
    overflow: hidden;
  }

}
</style>
