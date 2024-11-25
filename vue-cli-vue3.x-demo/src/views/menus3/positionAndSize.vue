<template>
  <div class="position-and-size" @mousemove="onMouseMove">

    <div id="block1" ref="block1" class="block1"></div>

    <div id="block2" ref="block2" class="block2">
      <div :id="`id${item}`" v-for="item in 10" :key="item" class="item">
        {{ item }}
      </div>
    </div>

    <div class="bottom-buttons">
      <button class="button" @click="getStyleProperty">获取元素style</button>
      <button class="button" @click="getPosition">获取元素位置</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.getNodePosition('block1')
    this.getNodePosition('block2')
    this.getNodePosition('id2')
  },
  methods: {
    getStyleProperty() {
      this.getStyle('block1')
      this.getStyle('block2')
      this.getStyle('id2')
    },
    getStyle(block) {
      const blockNode = document.getElementById(block)
      console.log('getStyle', blockNode.style.left, blockNode.style.top)
    },
    getBoundingClientRect(block) {
      const blockNode = document.getElementById(block)
      const domRect = blockNode.getBoundingClientRect()
      const clientRect = blockNode.getClientRects()
      console.log('getBoundingClientRect', domRect, clientRect)
    },
    getPosition() {
      this.getBoundingClientRect('block1')
      this.getBoundingClientRect('block2')
      this.getBoundingClientRect('id2')
    },
    getNodePosition(block) {
      const blockNode = document.getElementById(block)
      // 1,clientWidth与offsetWidth的区别是border，滚动条等空间的差异
      console.log('clientWidth,clientHeight,offsetWidth,offsetHeight', blockNode.clientWidth, blockNode.clientHeight, blockNode.offsetWidth, blockNode.offsetHeight)
      console.log('clientLeft,clientTop,offsetLeft,offsetTop', blockNode.clientLeft, blockNode.clientTop, blockNode.offsetLeft, blockNode.offsetTop)
      console.log('scrollLeft,scrollTop,scrollWidth,scrollHeight', blockNode.scrollLeft, blockNode.scrollTop, blockNode.scrollWidth, blockNode.scrollHeight)
      console.log('blockNode1', blockNode.style.left, blockNode.style.top)
      this.$nextTick(() => {
        console.log('blockNode2', blockNode.style.left, blockNode.style.top)
        const style = getComputedStyle(blockNode)
        console.log('blockNode3', style.left, style.top)
      })
      // 可以滚动
      if (blockNode.scrollHeight > blockNode.offsetHeight) {
        console.log(block, '可以滚动')
      }
      console.log('----------')
    },
    onMouseMove(event) {
      // console.log(
      //   '文档宽高',
      //   document.documentElement.clientWidth,
      //   document.documentElement.clientHeight,
      //   '相对坐标',
      //   event.offsetX,
      //   event.offsetY,
      //   '屏幕坐标',
      //   event.screenX,
      //   event.screenY,
      //   '可视区域',
      //   event.clientX,
      //   event.clientY,
      //   '文档坐标',
      //   event.mx,
      //   event.my
      // )
    }
  }
}
</script>
<style>
.bottom-buttons {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.item {
  width: 100%;
  height: 150px;
  background-color: white;
  text-align: center;
  line-height: 150px;
  border-bottom: 1px solid gainsboro;
}

.block2 {
  width: 200px;
  height: 400px;
  position: absolute;
  left: 400px;
  top: 0;
  background-color: rebeccapurple;
  overflow: auto;
}

.block1 {
  width: 200px;
  height: 200px;
  position: relative;
  left: 100px;
  top: 50px;
  background-color: aqua;
}

.position-and-size {
  background-color: antiquewhite;
  position: relative;
}
</style>
