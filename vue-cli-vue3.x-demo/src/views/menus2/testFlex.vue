<template>
  <div class="test-flex page-container">
    <div class="left1">
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
    <div class="grid-container" style="background: #D42D00">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
      <div class="grid-item">10</div>
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

    .grid-container {
      width: 300px;
      height: 300px;
      background: #532d3a;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, calc(100% / 3));
      .grid-item {
        border: 1px solid gainsboro;
        text-align: center;
        line-height: 100%;
      }
    }

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
