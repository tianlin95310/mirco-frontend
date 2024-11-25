<template>
  <div class="tl-circle-ratio">
    <canvas ref="canvas" class="canvas" width="400" height="400" />
  </div>
</template>
<script>
  export default {
    name: 'TlCircleRatio',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        size: 400
      }
    },
    watch: {
      percent() {
        this.onDraw()
      }
    },
    methods: {
      onDraw() {
        const canvas = this.$refs.canvas
        canvas.width = this.size
        canvas.height = this.size
        const ctx = canvas.getContext('2d')
        ctx.antialias = true
        const radius = this.size / 2 * 0.9
        const center = this.size / 2
        const lineWidth = this.size / 2 / 5
        ctx.lineWidth = lineWidth
        ctx.clearRect(0, 0, this.size, this.size)

        // draw background
        // stroke，用于绘制边框，fill用于填充
        ctx.beginPath()
        ctx.strokeStyle = '#EBEBEB'
        ctx.arc(center, center, radius, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = '#FBD990'
        const end = Math.PI * 2 * this.percent - Math.PI / 2
        ctx.arc(center, center, radius, -Math.PI / 2, end, false)
        ctx.stroke()
      }
    },
    mounted() {
      // console.log(this.size)
      this.onDraw()
    }
  }
</script>

<style lang="scss" scoped>
  .tl-circle-ratio {
    display: inline-block;
    width: 100%;
    height: 100%;
    .canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
