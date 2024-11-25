<template>
  <div class="tl-circle-ratio">
    <canvas ref="canvas" class="canvas" :width="size" :height="size" />
  </div>
</template>
<script>
/*eslint-disable*/
  export default {
    name: 'TlRoundCountDown',
    props: {
      progress: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        size: 800,
        canvas: undefined,
        center: 0,
        radius: 0,
        timer: undefined,
        percent: 0
      }
    },
    watch: {
      progress() {
        this.onDraw()
      }
    },
    methods: {
      onDraw() {
        let canvas = this.canvas
        canvas.clearRect(0, 0, this.size, this.size)
        this.percent = (60 - this.progress) / 60
        // 绘制背景进度
        canvas.beginPath()
        canvas.strokeStyle = 'rgba(255,255,255,0.1)'
        canvas.arc(this.center, this.center, this.radius, 0, 2 * Math.PI)
        canvas.stroke()

        canvas.fillStyle = '#FFFFFF'
        canvas.strokeStyle = '#FFFFFF'
        let startX = this.center;
        let startY = this.center - this.radius;
        let hudu = (this.percent * 360 * Math.PI) / 180
        let endX = this.center + this.radius * Math.sin(hudu)
        let endY = this.center - this.radius * Math.cos(hudu)

        canvas.beginPath()
        canvas.arc(startX, startY, 15, 0, Math.PI * 2, false)
        canvas.fill()

        canvas.beginPath()
        canvas.arc(endX, endY, 15, 0, Math.PI * 2, false)
        canvas.fill()

        // 绘制前景进度
        canvas.beginPath()
        const end = Math.PI * 2 * this.percent
        canvas.arc(this.center, this.center, this.radius, -Math.PI / 2, end - Math.PI / 2, false)
        canvas.stroke()

        // 绘制文字进度
        canvas.beginPath()
        canvas.font = '172px Helvetica'
        canvas.textAlign = 'center'
        canvas.textBaseline = 'middle'
        canvas.fillText(`00:${String(60 - this.progress).padStart(2, '0')}`, this.center, this.center)
      },
      initCanvas() {
        const canvasContext = this.$refs.canvas
        const canvas = canvasContext.getContext('2d')
        this.canvas = canvas
        this.canvas.antialias = true

        this.radius = this.size / 2 - 30
        this.center = this.size / 2
        this.canvas.lineWidth = 30
      }
    },
    mounted() {
      // console.log(this.size)
      this.initCanvas()
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
