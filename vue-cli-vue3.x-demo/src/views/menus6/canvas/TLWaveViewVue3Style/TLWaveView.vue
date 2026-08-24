<template>
  <div :ref="setContainerRef" :style="{ width: width + 'px', height: height + 'px' }" class="tl-wave-view">
    <canvas ref="canvasRef" class="canvas" :width="width" :height="height" :style="styleObj" @vue:mounted="onMyComponentMounted" />
  </div>
</template>
<script setup>
import { onMounted, watch, defineOptions, reactive, nextTick, ref, useTemplateRef, getCurrentInstance } from 'vue'

defineOptions({
  name: 'TLWaveViewVue3Style'
})
console.log('Vue version:', typeof useTemplateRef)
const context = getCurrentInstance()
const container = ref(null)
console.log('context setup', context)

const canvasRef = ref(null)

const props = defineProps({
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
})

// ✅ 使用回调函数方式绑定 ref（最可靠）
const setContainerRef = (el) => {
  console.log('回调 ref 被调用，el:', el)
  container.value = el
}
const state = reactive({
  context: null,
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
})

function PointF(x, y) {
  this.x = x
  this.y = y
}

const { onDraw, setCycleShape, initCanvas, initPoint, updatePotinsValue, beginAnim, createLinearInterpolatorAnim } = {
  onDraw() {
    state.context.fillStyle = props.waveColor
    state.context.strokeStyle = 'transparent'
    state.context.clearRect(0, 0, props.width, props.height)
    state.context.beginPath()
    state.context.moveTo(state.mLeft1.x, state.mLeft1.y)
    state.context.quadraticCurveTo(state.mControlLeft1.x, state.mControlLeft1.y, state.mLeft2.x, state.mLeft2.y)
    state.context.quadraticCurveTo(state.mControlLeft2.x, state.mControlLeft2.y, state.mCenter.x, state.mCenter.y)
    state.context.quadraticCurveTo(state.mControlRight1.x, state.mControlRight1.y, state.mRight1.x, state.mRight1.y)
    state.context.quadraticCurveTo(state.mControlRight2.x, state.mControlRight2.y, state.mRight2.x, state.mRight2.y)
    state.context.lineTo(props.width, props.height)
    state.context.lineTo(0, props.height)
    state.context.closePath()
    state.context.stroke()
    state.context.fill()
    if (props.isCycle && props.width === props.height) {
      setCycleShape()
    }
  },
  setCycleShape() {
    state.context.fillStyle = props.bgColor
    state.context.beginPath()
    state.context.moveTo(0, 0)
    state.context.lineTo(0, props.width)
    state.context.lineTo(props.width, props.height)
    state.context.lineTo(props.height, 0)
    state.context.lineTo(0, 0)
    state.context.arc(props.width / 2, props.height / 2, props.width / 2, 0, Math.PI * 2)
    state.context.closePath()
    state.context.fill()
  },
  initCanvas() {
    // 通过api获取元素的style
    // console.log('container style', window.getComputedStyle(this.$refs.container))
    canvasRef.value.width = props.width
    canvasRef.value.height = props.height
    const context = canvasRef.value.getContext('2d')
    state.context = context
    state.context.antialias = true
    initPoint()
  },
  initPoint() {
    const width = props.width
    const height = props.height
    const waveHeight = props.waveHeight
    const waveAmplitude = props.waveAmplitude

    state.mLeftStart = new PointF(-width, height - waveHeight)
    state.mLeft1 = new PointF(-width, height - waveHeight)
    state.mLeft2 = new PointF(-width / 2, height - waveHeight)
    state.mCenter = new PointF(0, height - waveHeight)
    state.mRight1 = new PointF(width / 2, height - waveHeight)
    state.mRight2 = new PointF(width, height - waveHeight)

    state.mControlLeft1 = new PointF(state.mLeft1.x + width / 4, state.mLeft1.y + waveAmplitude)
    state.mControlLeft2 = new PointF(state.mLeft2.x + width / 4, state.mLeft2.y - waveAmplitude)
    state.mControlRight1 = new PointF(state.mCenter.x + width / 4, state.mCenter.y + waveAmplitude)
    state.mControlRight2 = new PointF(state.mRight1.x + width / 4, state.mCenter.y - waveAmplitude)
  },
  updatePotinsValue(value) {
    const width = props.width
    const height = props.height
    const waveHeight = props.waveHeight
    const waveAmplitude = props.waveAmplitude

    state.mLeft1.x = value
    state.mLeft1.y = height - waveHeight
    state.mLeft2.x = state.mLeft1.x + width / 2
    state.mLeft2.y = height - waveHeight
    state.mCenter.x = state.mLeft2.x + width / 2
    state.mCenter.y = height - waveHeight
    state.mRight1.x = state.mCenter.x + width / 2
    state.mRight1.y = height - waveHeight
    state.mRight2.x = state.mRight1.x + width / 2
    state.mRight2.y = height - waveHeight

    state.mControlLeft1.x = state.mLeft1.x + width / 4
    state.mControlLeft1.y = state.mLeft1.y + waveAmplitude
    state.mControlLeft2.x = state.mLeft2.x + width / 4
    state.mControlLeft2.y = state.mLeft2.y - waveAmplitude
    state.mControlRight1.x = state.mCenter.x + width / 4
    state.mControlRight1.y = state.mCenter.y + waveAmplitude
    state.mControlRight2.x = state.mRight1.x + width / 4
    state.mControlRight2.y = state.mRight1.y - waveAmplitude

    onDraw()
  },
  beginAnim() {
    const obj = {}
    obj.call = (value) => {
      updatePotinsValue(value)
    }
    createLinearInterpolatorAnim(obj, state.mLeftStart.x, 0)
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
            createLinearInterpolatorAnim(obj, startValue, endValue)
          } else {
            clearInterval(obj.timer)
          }
        }
      } else {
        if (currentValue >= endValue) {
          if (loop) {
            createLinearInterpolatorAnim(obj, startValue, endValue)
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
}
watch(() => props.waveAmplitude, () => {
  onDraw()
})
onMounted(() => {
  console.log('containerRef onMounted', container.value, context, props)

  nextTick(() => {
    console.log('containerRef nextTick', container.value, context.refs)
    // initCanvas()
    // beginAnim()
  })
})

const onMyComponentMounted = (el) => {
  console.info('onMyComponentMounted canvasRef', canvasRef.value, el)
  canvasRef.value = el.el
  initCanvas()
  beginAnim()
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
