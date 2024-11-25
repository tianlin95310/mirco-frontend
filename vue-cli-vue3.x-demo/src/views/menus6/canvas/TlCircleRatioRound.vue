<template>
  <div class="tl-circle-ratio">
    <canvas ref="canvas" class="canvas" :width="size" :height="size" />
  </div>
</template>
<script>
  /*eslint-disable*/
  import gradientColors from '../utils/color.js'
  export default {
    name: 'TlCircleRatioRound',
    props: {
      percent: {
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
      }
    },
    watch: {
      percent() {
        this.onDraw()
      }
    },
    methods: {
      onDraw() {
        let canvas = this.canvas

        canvas.clearRect(0, 0, this.size, this.size)

        // 绘制背景进度
        canvas.beginPath()
        canvas.strokeStyle = '#EBEBEB'
        canvas.arc(this.center, this.center, this.radius, 0, 2 * Math.PI)
        canvas.stroke()

        // 获取当前渐变颜色
        let progress = Math.floor(this.percent * 100);
        let color = gradientColors('#00ff00', '#0000ff', 100, progress == 0 ? 0 : progress - 1)
        // console.log('progress', this.percent, progress, color)

        // 弧形颜色渐变，js不支持， 获取圆上某点坐标endX， endY
        let startX = this.center;
        let startY = this.center - this.radius;
        let hudu = (this.percent * 360 * Math.PI) / 180
        let endX = this.center + this.radius * Math.sin(hudu)
        let endY = this.center - this.radius * Math.cos(hudu)

        canvas.beginPath()
        canvas.strokeStyle = color
        canvas.arc(startX, startY, 30, 0, Math.PI * 2, false)
        canvas.fill()

        canvas.beginPath()
        canvas.fillStyle = color
        canvas.arc(endX, endY, 30, 0, Math.PI * 2, false)
        canvas.fill()

        // let gradient = canvas.createLinearGradient(startX, startY, endX, endY);
        // gradient.addColorStop(0, '#00ff00');
        // gradient.addColorStop(1, color);
        // canvas.strokeStyle = gradient;

        // 绘制前景进度
        canvas.beginPath()
        // 弧线的角度
        canvas.strokeStyle = color
        const end = Math.PI * 2 * this.percent
        canvas.arc(this.center, this.center, this.radius, -Math.PI / 2, end - Math.PI / 2, false)
        canvas.stroke()

        // 绘制文字进度
        canvas.beginPath()
        canvas.font = '136px Helvetica'
        canvas.fillStyle = color
        canvas.textAlign = 'center'
        canvas.textBaseline = 'middle'
        canvas.fillText(Math.ceil(this.percent * 100) + '%', this.center, this.center)
      },
      initCanvas() {
        const canvasContext = this.$refs.canvas
        const canvas = canvasContext.getContext('2d')
        this.canvas = canvas
        this.canvas.antialias = true

        this.radius = this.size / 2 - 60
        this.center = this.size / 2
        this.canvas.lineWidth = 60
        // this.canvas.translate(this.center, this.center)
        // this.canvas.rotate(Math.PI / 2)
        // this.canvas.translate(0, 0)
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
