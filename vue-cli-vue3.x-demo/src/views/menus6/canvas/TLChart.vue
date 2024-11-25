<template>
  <div id="tl-chart" class="tl-chart" @mousemove.stop="onMouseMove" @mouseout.stop="positionX = null">
    <canvas class="canvas" :width="canvasW" :height="canvasH" ref="canvas" />
  </div>
</template>

<script>
  /*eslint-disable*/
  import { swapEvent } from '@/utils/event.js'
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return [121, 151, 116, 181, 141, 131, 191, 139, 215, 314, 211, 310]
        }
      }
    },
    data() {
      return {
        padding: 60,
        canvasW: 960,
        canvasH: 540,
        canvas: undefined,
        itemWidth: 0,
        positionX: null
      }
    },
    watch: {
      positionX(newV, oldV) {
        this.onDraw()
      }
    },
    mounted() {
      this.initCanvas()
      this.initItemWidth()
      this.onDraw()
    },
    methods: {
      onMouseMove(event) {
        // event = swapEvent(event, document.getElementById('tl-chart'))
        console.log(event, event.offsetX, event.offsetY)
        // 样式尺寸乘以画布密度等于实际在画布上的像素位置
        this.positionX = event.offsetX * (960 / 320)
      },
      onDraw() {
        let canvas = this.canvas
        canvas.clearRect(0, 0, this.canvasW, this.canvasH)
        // 绘制x轴
        canvas.strokeStyle = 'black'
        canvas.fillStyle = 'black'
        canvas.font = '28px Helvetica'
        canvas.textAlign = 'center'
        canvas.textBaseline = 'middle'
        canvas.beginPath()
        canvas.moveTo(this.padding, this.canvasH - this.padding)
        canvas.lineTo(this.canvasW, this.canvasH - this.padding)
        canvas.stroke()
        // 绘制X刻度
        for (let i = 0; i < this.list.length; i++) {
          let left = (2 * (i + 1) - 1) * this.itemWidth + this.padding
          let bottom = this.canvasH
          canvas.fillText(`${i + 1}`, left + this.itemWidth / 2, bottom - this.padding / 2, this.itemWidth)
        }
        // 绘制圆点
        canvas.fillText('0', this.padding / 2, this.canvasH - this.padding / 2)

        // 绘制y轴
        let yAxis = []
        let min = this.list[0]
        let max = this.list[0]
        this.list.forEach(item => {
          if (item < min) {
            min = item
          }
          if (item > max) {
            max = item
          }
        })
        let axisItem = (max - min) / 4
        for (let i = 0; i < 5; i++) {
          yAxis.push((min + axisItem * i).toFixed(0))
        }
        canvas.beginPath()
        canvas.moveTo(this.padding, this.canvasH - this.padding)
        canvas.lineTo(this.padding, 0)
        canvas.stroke()

        let yItem = (this.canvasH - this.padding * 2) / yAxis.length
        // 绘制Y刻度
        canvas.setLineDash([10])
        canvas.font = '24px Helvetica'
        for (let i = 0; i < yAxis.length; i++) {
          let left = this.padding / 2
          let bottom = this.canvasH - this.padding - (i + 1) * yItem
          // 绘制刻度虚线
          canvas.fillText(`${yAxis[i]}`, left, bottom)
          canvas.beginPath()
          canvas.moveTo(this.padding, bottom)
          canvas.lineTo(this.canvasW, bottom)
          canvas.stroke()
        }
        canvas.setLineDash([])

        // 绘制中心数据
        for (let i = 0; i < this.list.length; i++) {
          let left = (2 * (i + 1) - 1) * this.itemWidth + this.padding
          let right = 2 * (i + 1) * this.itemWidth + this.padding
          let top = this.canvasH - this.padding - ((this.list[i] - min) / axisItem + 1) * yItem
          let bottom = this.canvasH - this.padding

          let gnt1 = canvas.createLinearGradient(left, top, right, bottom)
          gnt1.addColorStop(0, '#009AE7')
          gnt1.addColorStop(1, '#13ECD9')
          canvas.fillStyle = gnt1
          canvas.fillRect(left, top, right - left, bottom - top)

          canvas.textBaseline = 'bottom'
          if (this.positionX > left && this.positionX < right) {
            canvas.fillStyle = 'rgba(0, 222, 222, 0.2)'
            canvas.fillRect(left - this.itemWidth / 2, 0, right + this.itemWidth - left, bottom)
            canvas.fillStyle = gnt1
          } else {
            canvas.fillStyle = 'black'
          }

          canvas.fillText(`${this.list[i]}`, left + this.itemWidth / 2, top, this.itemWidth)
        }
      },
      initCanvas() {
        const canvasContext = this.$refs.canvas
        const canvas = canvasContext.getContext('2d')
        this.canvas = canvas
        canvas.antialias = true
        // console.log(canvas)
      },
      initItemWidth() {
        this.itemWidth = (this.canvasW - this.padding) / (this.list.length * 2 + 1)
        // console.log('itemWidth', this.itemWidth)
      }
    }
  }
</script>

<style lang="css">
  .tl-chart {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px solid gainsboro;
  }
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
