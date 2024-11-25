<template>
  <div class="item">
    <!--这里我们不可以直接绑定value，但我们可以绑定value的属性，以此来直接改变父组件的数据-->
    <input v-model="cvalue.value" />

  </div>

</template>
<script>
  export default {
    props: {
      value: {}
    },
    data() {
      return {
        cvalue: this.value
      }
    }
  }
</script>

<style scoped>
  .item {
    margin-top: 20px;
  }
</style>
