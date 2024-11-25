<template>
  <div class="update-bind-value">
    <span class="tag">{{ bindName1 }}</span>
    <button class="button" @click="updateParentValue">更新Parent的值</button>
  </div>
  
</template>
<script>
  export default {
    props: {
      bindName1: {
        type: [String, Number],
        default: 'aaa'
      }
    },
    methods: {
      updateParentValue() {
        this.$parent.bindName2 = 'child change parent'
        this.$parent.changeParentAttri()
      },
      showName() {
        console.log('this.bindName', this.bindName1)
      }
    }
  }
</script>
<style>
.update-bind-value {
  border: 1px solid saddlebrown;
}
</style>
