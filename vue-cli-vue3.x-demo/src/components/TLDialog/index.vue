<template>
  <div v-show="modelValue" class="tl-dialog-mask" @click="onMaskClick"></div>

  <div v-show="modelValue" class="tl-dialog-wrapper" v-draggable>
    <div class="tl-dialog-title">
      <span>{{ tableTitle }}</span>
    </div>
    <slot name="content" />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
const $emit = defineEmits(['update:modelValue'])
const vDraggable = {
  mounted(el, binding) {
    console.log('draggable mounted', el, binding)
    const dialogWrapper = el.querySelector('.tl-dialog-wrapper') || el
    const dialogHeader = el.querySelector('.tl-dialog-title')
    console.log(dialogWrapper.style, dialogHeader.style)
    dialogHeader.style.cursor = 'move'
    const wrapperStyle = dialogWrapper.__style || window.getComputedStyle(dialogWrapper, null)

    const clientWidth = document.body.clientWidth
    const clientHeight = document.body.clientHeight

    const moveDown = e => {
      const startX = e.clientX
      const startY = e.clientY
      console.log('startX', startX, 'startY', startY)

      const getCurrentPosition = (wrapperStyle) => {
        let currentX, currentY
        if (wrapperStyle.left.includes('%')) {
          currentX = (clientWidth * +wrapperStyle.left.replace(/\\%/g, '')) / 100
          currentY = (clientHeight * +wrapperStyle.top.replace(/\\%/g, '')) / 100
        } else {
          currentX = +wrapperStyle.left.replace(/\px/g, '')
          currentY = +wrapperStyle.top.replace(/\px/g, '')
        }
        console.log('currentX', currentX, 'currentY', currentY, wrapperStyle.left, wrapperStyle.top)
        return {
          currentX,
          currentY
        }
      }

      let { currentX, currentY } = getCurrentPosition(wrapperStyle)

      document.onmousemove = function (e) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        const newX = Math.min(clientWidth - dialogWrapper.clientWidth, Math.max(0, currentX + dx))
        const newY = Math.min(clientHeight - dialogWrapper.clientHeight, Math.max(0, currentY + dy))
        console.log('dx', dx, 'dy', dy, 'newX', newX, 'newY', newY)
        dialogWrapper.style.left = `${newX}px`
        dialogWrapper.style.top = `${newY}px`
      }
      const onCancel = function () {
        document.onmousemove = null
        document.onmouseup = null
        document.onmouseout = null
      }
      document.onmouseup = onCancel
      // document.onmouseout = onCancel
    }
    dialogHeader.onmousedown = moveDown
  },
  unmounted() { }
}
const props = defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  },
  tableTitle: {
    type: String,
    default: '标题'
  },
  appendToBody: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  if (props.appendToBody) {
    nextTick(() => {
      appendToBodyM()
    })
  }
})

const appendToBodyM = () => {
  const domDialogMask = document.querySelector('.tl-dialog-mask')
  const domDialogBody = document.querySelector('.tl-dialog-wrapper')
  console.log('domDialogMask', domDialogMask, domDialogBody)
  if (domDialogMask && domDialogBody) {
    domDialogMask.parentElement.removeChild(domDialogMask)
    domDialogBody.parentElement.removeChild(domDialogBody)
    document.body.append(domDialogMask)
    document.body.append(domDialogBody)
  }
}

const onMaskClick = () => {
  console.log('onMaskClick')
  $emit('update:modelValue', false)
}
</script>

<style scoped>
.tl-dialog-title {
  height: 50px;
  width: 100%;
  text-align: left;
  line-height: 50px;
  user-select: none;
  background-color: aquamarine;
}

.tl-dialog-mask {
  z-index: 3000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(116, 113, 113, 0.71);
}

.tl-dialog-wrapper {
  z-index: 3001;
  position: fixed;
  background: white;
  width: 50%;
  height: auto;
  top: 15vh;
  left: 25%;
  text-align: center;
}
</style>
