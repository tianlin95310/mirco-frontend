<template>
  <div class="draw-puke" ref="parent">
    <!--$event包含有当前点击的是哪个元素，event.target可以拿到-->

    <!--:ref="canvas.ref"动态绑定ref，需要用this.$refs[]获取，得到的是一个数组，需要获取第一个-->
    <canvas width="270" height="440" v-for="(puke, index) in [1, 2, 3, 4]" :key="index" class="puke" :ref="getRef" @click="show($event, puke)">
    </canvas>
  </div>
</template>

<script>
  const pukes = []
  const types = ['♠', '♥', '♦', '♣']
  const values = ['A']
  let index = 0
  values.forEach(value => {
    types.forEach(type => {
      const puke = {}
      puke.type = type
      puke.value = value
      // puke.ref = puke.value + puke.type
      pukes.push(puke)
    })
  })
  export default {
    data() {
      return {
        pukes: pukes
      }
    },
    methods: {
      getRef(el) {
        console.log('getRef', el)
        const puke = this.pukes[index++]
        if (puke) {
          puke.ref = el
        }
      },
      show(event, item) {
        const canvas = event.target
        const ctx = canvas.getContext('2d')
        console.log(event, canvas, ctx, item)
      }
    },
    mounted() {
      console.log('draw puke in canvas mounted')
      this.pukes.forEach(item => {
        const ref = item.ref
        const ctx = ref.getContext('2d')
        console.log(ctx)
        ctx.width = 270
        ctx.height = 440
        ctx.font = '18px Arial'
        ctx.strokeStyle = '#ff0000'
        ctx.fillStyle = '#ff0000'
        ctx.arc(50, 50, 50, 0, 180)
        ctx.lineWidth = 5
        ctx.stroke()
        // ctx.translate(270, 440)
        // ctx.rotate(Math.PI)
        // ctx.restore()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .draw-puke {
    width: 100%;

    .puke {
      margin: 2px;
      border: 1px solid grey;
      width: 270px;
      height: 440px;
      display: inline-block;
      position: relative;

    }
  }
</style>
