<template>
  <div ref="container" :style="{width: width + 'px', height: height + 'px'}" class="cylinder-progress">
    <canvas ref="canvas" class="canvas" :width="width" :height="height" />
  </div>
</template>
<script>
  export default {
    name: 'CylinderProgress',
    props: {
      percent: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 400
      },
      cylinderHeight: {
        type: Number,
        default: 50
      },
      invisableDashed: {
        type: Boolean,
        default: false
      },
      containerColor: {
        type: String,
        default: 'blue'
      },
      progressColor: {
        type: String,
        default: 'rgba(0, 156, 156, 0.5)'
      }
    },
    data() {
      return {
        canvas: null
      }
    },
    watch: {
      percent() {
        this.onDraw(this.canvas)
      },
      cylinderHeight() {
        this.onDraw(this.canvas)
      }
    },
    methods: {
      onDraw(canvas) {
        canvas.clearRect(0, 0, this.width, this.height)

        canvas.strokeStyle = this.containerColor
        canvas.fillStyle = this.containerColor

        // 绘制左边竖线
        const offsetH = 0
        canvas.beginPath()
        canvas.moveTo(0, this.cylinderHeight + offsetH)
        canvas.lineTo(0, this.height - this.cylinderHeight - offsetH)
        canvas.stroke()
        canvas.closePath()

        // 绘制右边竖线
        canvas.beginPath()
        canvas.moveTo(this.width, this.cylinderHeight)
        canvas.lineTo(this.width, this.height - this.cylinderHeight)
        canvas.stroke()
        canvas.closePath()

        // 绘制底部
        canvas.save()
        canvas.beginPath()
        canvas.ellipse(this.width / 2, this.height - this.cylinderHeight, this.width / 2, this.cylinderHeight, 0, Math.PI, Math.PI * 2)
        if (this.invisableDashed) {
          canvas.setLineDash([6, 6])
        }
        canvas.stroke()
        canvas.closePath()
        canvas.restore()
        canvas.beginPath()
        canvas.ellipse(this.width / 2, this.height - this.cylinderHeight, this.width / 2, this.cylinderHeight, 0, 0, Math.PI)
        canvas.stroke()
        canvas.closePath()

        // 绘制当前进度
        if (this.percent >= 0.01) {
          const total = this.height - this.cylinderHeight - this.cylinderHeight
          const current = total * Math.min(this.percent, 1)
          canvas.beginPath()
          canvas.strokeStyle = this.progressColor
          canvas.fillStyle = this.progressColor
          canvas.ellipse(this.width / 2, this.height - this.cylinderHeight - current, this.width / 2, this.cylinderHeight, 0, 0, Math.PI * 2)
          canvas.stroke()
          canvas.fill()
          canvas.closePath()

          // 填充
          canvas.beginPath()
          canvas.moveTo(this.width, this.height - this.cylinderHeight - current)
          canvas.ellipse(this.width / 2, this.height - this.cylinderHeight - current, this.width / 2, this.cylinderHeight, 0, 0, Math.PI)
          canvas.lineTo(0, this.height - this.cylinderHeight)
          canvas.ellipse(this.width / 2, this.height - this.cylinderHeight, this.width / 2, this.cylinderHeight, 0, -Math.PI, 0, true)
          canvas.lineTo(this.width, this.height - this.cylinderHeight - current)
          canvas.fill()
          // 便于查看测试填充路径
          // canvas.strokeStyle = 'red'
          // canvas.stroke()
          canvas.closePath()
        }

        // 绘制顶部的口
        canvas.strokeStyle = this.containerColor
        canvas.fillStyle = this.containerColor
        canvas.beginPath()
        canvas.ellipse(this.width / 2, this.cylinderHeight, this.width / 2, this.cylinderHeight, 0, 0, Math.PI * 2)
        canvas.stroke()
        canvas.closePath()
      },
      initCanvas() {
        const canvas = this.$refs.canvas
        // 通过api获取元素的style
        // console.log('container style', window.getComputedStyle(this.$refs.container))
        canvas.width = this.width
        canvas.height = this.height
        const context = canvas.getContext('2d')
        this.canvas = context
      }
    },
    mounted() {
      this.initCanvas()
      this.onDraw(this.canvas)
    }
  }
</script>

<style lang="scss" scoped>
  .cylinder-progress {
    display: inline-block;
    width: 100%;
    height: 100%;
    .canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
