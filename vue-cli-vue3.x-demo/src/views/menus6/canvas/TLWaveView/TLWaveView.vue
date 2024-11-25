<template>
  <div ref="container" :style="{width: width + 'px', height: height + 'px'}" class="tl-wave-view">
    <canvas ref="canvas" class="canvas" :width="width" :height="height" :style="styleObj" />
  </div>
</template>
<script>
  function PointF(x, y) {
    this.x = x
    this.y = y
  }
  export default {
    name: 'TLWaveView',
    props: {
      styleObj: {
        type: Object,
        default() {
          return null
        }
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 200
      },
      /**
       * 振幅
       */
      waveAmplitude: {
        type: Number,
        default: 30
      },
      waveHeight: {
        type: Number,
        default: 120
      },
      waveColor: {
        type: String,
        default: 'rgba(0, 0, 255, 200)'
      },
      bgColor: {
        type: String,
        default: 'white'
      },
      isCycle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        canvas: null,
        mLeftStart: null,
        mLeft1: null,
        mLeft2: null,
        mCenter: null,
        mRight1: null,
        mRight2: null,
        mControlLeft1: null,
        mControlLeft2: null,
        mControlRight1: null,
        mControlRight2: null
      }
    },
    watch: {
      waveAmplitude() {
        this.onDraw(this.canvas)
      }
    },
    methods: {
      onDraw(canvas) {
        canvas.fillStyle = this.waveColor
        canvas.strokeStyle = 'transparent'
        canvas.clearRect(0, 0, this.width, this.height)
        canvas.beginPath()
        canvas.moveTo(this.mLeft1.x, this.mLeft1.y)
        canvas.quadraticCurveTo(this.mControlLeft1.x, this.mControlLeft1.y, this.mLeft2.x, this.mLeft2.y)
        canvas.quadraticCurveTo(this.mControlLeft2.x, this.mControlLeft2.y, this.mCenter.x, this.mCenter.y)
        canvas.quadraticCurveTo(this.mControlRight1.x, this.mControlRight1.y, this.mRight1.x, this.mRight1.y)
        canvas.quadraticCurveTo(this.mControlRight2.x, this.mControlRight2.y, this.mRight2.x, this.mRight2.y)
        canvas.lineTo(this.width, this.height)
        canvas.lineTo(0, this.height)
        canvas.closePath()
        canvas.stroke()
        canvas.fill()
        if (this.isCycle && this.width === this.height) {
          this.setCycleShape(canvas)
        }
      },
      setCycleShape(canvas) {
        canvas.fillStyle = this.bgColor
        canvas.beginPath()
        canvas.moveTo(0, 0)
        canvas.lineTo(0, this.width)
        canvas.lineTo(this.width, this.height)
        canvas.lineTo(this.height, 0)
        canvas.lineTo(0, 0)
        canvas.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2)
        canvas.closePath()
        canvas.fill()
      },
      initCanvas() {
        const canvas = this.$refs.canvas
        // 通过api获取元素的style
        // console.log('container style', window.getComputedStyle(this.$refs.container))
        canvas.width = this.width
        canvas.height = this.height
        const context = canvas.getContext('2d')
        this.canvas = context
        this.canvas.antialias = true
        this.initPoint()
      },
      initPoint() {
        const width = this.width
        const height = this.height
        const waveHeight = this.waveHeight
        const waveAmplitude = this.waveAmplitude

        this.mLeftStart = new PointF(-width, height - waveHeight)
        this.mLeft1 = new PointF(-width, height - waveHeight)
        this.mLeft2 = new PointF(-width / 2, height - waveHeight)
        this.mCenter = new PointF(0, height - waveHeight)
        this.mRight1 = new PointF(width / 2, height - waveHeight)
        this.mRight2 = new PointF(width, height - waveHeight)

        this.mControlLeft1 = new PointF(this.mLeft1.x + width / 4, this.mLeft1.y + waveAmplitude)
        this.mControlLeft2 = new PointF(this.mLeft2.x + width / 4, this.mLeft2.y - waveAmplitude)
        this.mControlRight1 = new PointF(this.mCenter.x + width / 4, this.mCenter.y + waveAmplitude)
        this.mControlRight2 = new PointF(this.mRight1.x + width / 4, this.mCenter.y - waveAmplitude)
      },
      updatePotinsValue(value) {
        const width = this.width
        const height = this.height
        const waveHeight = this.waveHeight
        const waveAmplitude = this.waveAmplitude

        this.mLeft1.x = value
        this.mLeft1.y = height - waveHeight
        this.mLeft2.x = this.mLeft1.x + width / 2
        this.mLeft2.y = height - waveHeight
        this.mCenter.x = this.mLeft2.x + width / 2
        this.mCenter.y = height - waveHeight
        this.mRight1.x = this.mCenter.x + width / 2
        this.mRight1.y = height - waveHeight
        this.mRight2.x = this.mRight1.x + width / 2
        this.mRight2.y = height - waveHeight

        this.mControlLeft1.x = this.mLeft1.x + width / 4
        this.mControlLeft1.y = this.mLeft1.y + waveAmplitude
        this.mControlLeft2.x = this.mLeft2.x + width / 4
        this.mControlLeft2.y = this.mLeft2.y - waveAmplitude
        this.mControlRight1.x = this.mCenter.x + width / 4
        this.mControlRight1.y = this.mCenter.y + waveAmplitude
        this.mControlRight2.x = this.mRight1.x + width / 4
        this.mControlRight2.y = this.mRight1.y - waveAmplitude

        this.onDraw(this.canvas)
      },
      beginAnim() {
        const obj = {}
        obj.call = (value) => {
          this.updatePotinsValue(value)
        }
        this.createLinearInterpolatorAnim(obj, this.mLeftStart.x, 0)
      },
      createLinearInterpolatorAnim(obj, startValue, endValue, totalTime = 500, loop = true) {
        if (obj.timer) {
          clearInterval(obj.timer)
        }
        let currentValue = startValue
        const totalDiff = endValue - startValue
        // 10ms a frame
        const diffTime = 10
        const stepDiff = totalDiff / (totalTime / diffTime)
        obj.timer = setInterval(() => {
          currentValue += stepDiff
          if (endValue < startValue) {
            if (currentValue <= endValue) {
              if (loop) {
                this.createLinearInterpolatorAnim(obj, startValue, endValue)
              } else {
                clearInterval(obj.timer)
              }
            }
          } else {
            if (currentValue >= endValue) {
              if (loop) {
                this.createLinearInterpolatorAnim(obj, startValue, endValue)
              } else {
                clearInterval(obj.timer)
              }
            }
          }
          if (obj.call) {
            obj.call(currentValue)
          }
        }, diffTime)
      }
    },
    mounted() {
      this.initCanvas()
      this.beginAnim()
      // this.onDraw(this.canvas)
    }
  }
</script>

<style scoped>
.tl-wave-view {
  width: 100%;
  height: 100%;
}
.tl-wave-view .canvas {
  width: 100%;
  height: 100%;
}
</style>
