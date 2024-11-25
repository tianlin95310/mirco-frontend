<template>
  <div class="page-container">
    <div>
      <h2>判断是否为纯数字，最多两位小数(n.2)</h2>
      <input v-model="v1"/> {{ decimal }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        v1: ''
      }
    },
    computed: {
      decimal() {
        if (!this.v1) {
          return 'empty'
        }
        const reg = /^[0-9]+\.?[0-9]{0,2}$/
        if (reg.test(this.v1)) {
          return 'is'
        } else {
          return 'no'
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  div>div {
    margin-top: 10px;
  }
</style>
