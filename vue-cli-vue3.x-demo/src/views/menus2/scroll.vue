<template>
  <div class="scroll-info page-container">
    <div ref="table" class="table">
      <div class="content" @click="show = true">
        我是可以滑动的行内容
      </div>
    </div>

    <div ref="customScroll" class="custom-scroll">
      <div ref="scroll" :style="{ left: left + 'px' }" class="my-scroll"></div>
    </div>

    <t-l-dialog v-model="show" tableTitle="a fixed Table">
      <template v-slot:content>
        <div style="height: 100px;background-color: #cccccc">我是谁</div>
      </template>
    </t-l-dialog>
  </div>

</template>

<script setup>
// let s1 = this.$refs.scrollTop.wrap
// let s2 = this.$refs.multipleTable.bodyWrapper
// let c1 = this.$refs.scrollContent
// let c2 = document.getElementsByClassName('el-table__header')[0]
// this.$nextTick(() => {
//   c1.style.width = c2.style.width
// })
// s1.addEventListener('scroll', function (e) {
//   s2.scrollLeft = s1.scrollLeft
// })
// s2.addEventListener('scroll', function (e) {
//   s1.scrollLeft = s2.scrollLeft
// })
import { onMounted, ref } from 'vue'
import TLDialog from 'comp/TLDialog'
const left = ref(0)
const show = ref(false)
const table = ref(null)
const customScroll = ref(null)
onMounted(() => {
  const originActScrollWidth = table.value.clientWidth / (table.value.scrollWidth / table.value.clientWidth)
  const maxScroll = table.value.scrollWidth - table.value.clientWidth
  console.log('onMounted', originActScrollWidth, maxScroll, customScroll.value.clientWidth)
  table.value.onscroll = (event) => {
    const scrollPercent = maxScroll / (300 - 100)
    left.value = table.value.scrollLeft / scrollPercent
  }
})

</script>

<style lang="scss" scoped>
.scroll-info {
  width: 100%;

  .custom-scroll {
    margin: 16px 0;
    width: 300px;
    background: #6f7a84;
    position: relative;
    height: 10px;
    border-radius: 20px;

    .my-scroll {
      position: absolute;
      height: 100%;
      background: #42b983;
      width: 100px;
      border-radius: 20px;
    }
  }

  .table {
    width: 100%;
    overflow: auto;

    .content {
      width: 2000px;
      height: 2000px;
      background: url("../../assets/logo.png") repeat;
    }
  }

}
</style>
