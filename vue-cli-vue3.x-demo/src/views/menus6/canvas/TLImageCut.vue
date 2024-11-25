<template>
  <div class="tl-image-cut" @mousedown.stop="onDown" @mousemove.stop="onMove" @mouseup="onUp">
    <canvas ref="canvas" :width="size" :height="size" />
  </div>

</template>

<script>
  export default {
    name: 'TLImageCut',
    data() {
      return {
        size: 300,
        canvas: null,
        radius: 100,
        sx: 0,
        sy: 0,
        x: 0,
        y: 0,
        isDown: false
      }
    },
    mounted() {
      this.initCanvas()
      this.onDraw()
    },
    methods: {
      onDown(event) {
        this.isDown = true
        this.sx = event.offsetX
        this.sy = event.offsetY
        console.log('onDown', event, this.sx, this.sy)
      },
      onMove(event) {
        if (!this.isDown) {
          return
        }
        const dx = event.offsetX - this.sx
        const dy = event.offsetY - this.sy
        // console.log('onMove', event.offsetX, event.offsetY, dx, dy)
        this.x += dx
        this.y += dy
        // console.log('onMove', this.x, this.y)
        this.sx = event.offsetX
        this.sy = event.offsetY
        this.onDraw()
      },
      onUp() {
        this.isDown = false
      },
      onDraw() {
        const canvas = this.canvas
        canvas.clearRect(0, 0, this.size, this.size)
        canvas.fillStyle = 'rgba(123, 123, 123, 0.7)'
        canvas.beginPath()
        canvas.moveTo(0, 0)
        canvas.lineTo(0, this.size)
        canvas.lineTo(this.size, this.size)
        canvas.lineTo(this.size, 0)
        canvas.lineTo(0, 0)
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        canvas.closePath()
        canvas.fill()
      },
      initCanvas() {
        const canvasContext = this.$refs.canvas
        const canvas = canvasContext.getContext('2d')
        canvas.antialias = true
        this.canvas = canvas
        this.radius = this.size / 2 / 3
        this.x = this.size / 2
        this.y = this.size / 2
      }
    }
  }
</script>

<style lang="scss" scoped>
.tl-image-cut {
  display: inline-block;
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
