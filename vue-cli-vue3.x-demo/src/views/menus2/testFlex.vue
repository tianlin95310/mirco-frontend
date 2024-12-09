<template>
  <div class="test-flex page-container">
    <div class="left1">
      <h2>测试flex布局，特别是在竖直方向上</h2>
      <div class="top">
        我是top内容，我占剩下的空间
      </div>
      <div class="bottom">
        我是底部内容，我占100px
      </div>
    </div>
    <div class="col2">
      <div style="background: #D42D00">Flex实现Div居中</div>
    </div>
  </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
  .test-flex {
    color: white;
    background-color: var(--colorAccent);
    display: flex;
    flex-direction: row;
    /*想让flex竖直方向占满需要使用height: 100vh;*/

    .col2 {
      width: 25%;
      height: 300px;
      background: #ff8cb5;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .left1 {
      left: 0;
      top: 0;
      width: 30%;
      display: flex;
      height: 100%;
      flex-direction: column;
      .top {
        flex: 1;
        background-color: var(--primiryColorDark);
      }
      .bottom {
        background-color: var(--primiryColor);
        height: 100px;
      }
    }

  }
</style>
