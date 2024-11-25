<template>
  <div class="scroll-info page-container">
    <div ref="table" class="table">
      <div class="content" @click="show = true">
        我是可以滑动的行内容
      </div>
    </div>

    <div ref="customScroll" class="custom-scroll">
      <div ref="scroll" :style="{left: left + 'px'}" class="my-scroll"></div>
    </div>

    <t-l-dialog v-model="show" tableTitle="a fixed Table">
      <template v-slot:content>
        <div style="height: 100px;background-color: #cccccc">我是谁</div>
      </template>
    </t-l-dialog>
  </div>

</template>

<script>
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
  import TLDialog from 'comp/TLDialog'

  export default {
    name: 'Scroll',
    data() {
      return {
        left: 0,
        show: false
      }
    },
    components: {
      TLDialog
    },
    created() {
      console.log('scroll created')
    },
    mounted() {
      const table = this.$refs.table
      const customScroll = this.$refs.customScroll
      const originActScrollWidth = table.clientWidth / (table.scrollWidth / table.clientWidth)
      const maxScroll = table.scrollWidth - table.clientWidth
      console.log('mounted', originActScrollWidth, maxScroll, customScroll.clientWidth)
      table.onscroll = (event) => {
        const scrollPercent = maxScroll / (300 - 100)
        this.left = table.scrollLeft / scrollPercent
      }
    }
  }

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
