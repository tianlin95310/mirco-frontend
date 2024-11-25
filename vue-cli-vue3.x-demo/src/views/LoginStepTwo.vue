<template>
  <div class="login">
    <!-- margin折叠问题 -->
    <!-- 解决办法：
    1、父元素或者子元素使用浮动或者绝对定位。
    2、父级设置overflow:hidden
    3、父级设置padding（破坏非空白的折叠条件）
    4、父级设置border -->

    <div class="top">
      <div class="row1">头部块</div>
      <img src="../assets/logo.png" style="width: 100px;">
    </div>
    <div class="login-b">
      <input v-model="userName">
      <button class="button" @click="login">登录</button>
    </div>
  </div>
</template>

<script setup>
import { setToken } from '@/cookies/Cookies.js'
import { ref } from 'vue'
const userName = ref('')
const login = () => {
  setToken('DE112334343242342341123123123')
  this.$router.push('/')
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  position: relative;
  height: 100vh;
  // padding: 1px;
  margin-top: 16px;
  background: greenyellow;

  .top {
    margin-top: 16px;
    // padding: 1px;
    margin-top: 32px;
    text-align: center;
    background: blueviolet;

    .row1 {
      background: firebrick;
      margin-top: 48px;
      height: 16px;
      line-height: 16px;
      font-weight: 800;
      color: white;
    }
  }

  .login-b {
    width: 200px;
    height: 200px;
    left: calc(50% - 100px);
    top: calc(50% - 100px);
    position: absolute;
    background-color: #34465C;
    text-align: center;
    border-radius: 16px;

    button {
      margin-top: 70px;
      width: 80px;
      height: 40px;
    }
  }
}
</style>
