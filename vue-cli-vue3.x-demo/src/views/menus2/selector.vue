<template>
  <div class="selector page-container test-class">
    <h2>特殊的选择器</h2>
    <a>链接1</a>
    <a target>链接2</a>
    <a target="_self">链接3</a>
  </div>

</template>

<script>
  export default {
    name: 'Selector',
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

 .test-class {
    background-color: blue;
  }
  // 不支持苹果上的属性的话,就采用自定义的其他属性
  @supports((not (bottom: constant(safe-area-inset-bottom))) and (not (top: constant(safe-area-inset-top)))) {
    .test-class {
      background-color: rgb(241, 168, 168);
    }
  }

.selector {
  a[target] {
    color: #42b983;
  }
  a[target="_self"] {
    color: white;
  }
}
</style>
