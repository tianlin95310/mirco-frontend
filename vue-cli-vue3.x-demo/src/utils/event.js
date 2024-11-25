export function swapEvent(event, el) { // 定义事件对象标准化函数
  if (!event) { // 兼容IE浏览器
    event = window.event
    event.target = event.srcElement
    event.layerX = event.offsetX
    event.layerY = event.offsetY
  }
  // 计算鼠标指针的x,y轴距离
  if (el) {
    event.mx = (event.pageX || event.clientX) + el.scrollLeft
    event.my = (event.pageY || event.clientY) + el.scrollTop
  }
  return event
}
