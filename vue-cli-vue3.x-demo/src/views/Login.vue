<template>
  <div class="login">
    <!-- margin折叠问题 -->
    <!-- 解决办法：
    1、父元素或者子元素使用浮动或者绝对定位。
    2、父级设置overflow:hidden
    3、父级设置padding（破坏非空白的折叠条件）
    4、父级设置border -->

    <!--    margin 合并-->
    <!--    在垂直方向上的两个盒子，他们的 margin 会发生合并（会取最大的值），比如上边盒子设置margin-bottom:20px，下边盒子设置margin-top:30px;，那么两个盒子间的间距只有30px，不会是50px-->
    <!--    解决 margin 合并，我们可以给其中一个盒子套上一个父盒子，给父盒子设置 BFC-->
    <!--    margin 塌陷-->
    <!--    效果： 一个父盒子中有一个子盒子，我们给子盒子设置margin-top:xxpx结果发现会带着父盒子一起移动（就效果和父盒子设置margin-top:xxpx的效果一样）-->
    <!--    解决： 1、给父盒子设置 border，例如设置border:1px solid red; 2、给父盒子设置 BFC-->

    <!--    BFC-->
    <!--    块级格式化上下文 (block format context)-->
    <!--    1,BFC 的布局规则 *-->
    <!--    内部的 Box 会在垂直方向，一个接一个地放置。-->
    <!--    Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。-->
    <!--    每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。-->
    <!--    BFC 的区域不会与 float box 重叠。-->
    <!--    BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。-->
    <!--    计算 BFC 的高度时，浮动元素也参与计算。-->
    <!--    2,触发 BFC 的条件 *-->
    <!--    根元素 html-->
    <!--    float 的值不是 none。-->
    <!--    position 的值 absoute、fixed-->
    <!--    display 的值是 inline-block、table-cell、flex、table-caption 或者 inline-flex-->
    <!--    overflow 的值不是 visible-->

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
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const userName = ref('')
const router = useRouter()
const login = () => {
  setToken('DE112334343242342341123123123')
  router.push('/')
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
    padding-top: 16px;
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
