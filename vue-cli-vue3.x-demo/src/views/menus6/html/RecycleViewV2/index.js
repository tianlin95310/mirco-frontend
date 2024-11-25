function RecycleView(containerSelector, renderItemCallback) {
  this.container = document.querySelector(containerSelector)
  this.renderItemCallback = renderItemCallback
  this.visibleItems = []

  this.container.addEventListener('scroll', (e) => {
    const scrollTop = e.target.scrollTop
    console.log('scrollTop', scrollTop)
    if (scrollTop > 200) {
      this.recycle()
    }
  })
}

RecycleView.prototype.recycle = function () {
  const { container, visibleItems, renderItemCallback } = this
  const viewHeight = container.offsetHeight
  const viewTop = container.scrollTop
  const viewBottom = viewTop + viewHeight

  // 移除视图外的项目
  visibleItems.forEach((item, index) => {
    if (item.element.offsetTop < viewTop) {
      container.removeChild(item.element)
      this.visibleItems.splice(index, 1)
      this.renderItem(item.data, this.container, 0)
    }
  })

  // 渲染新的项目
  for (let i = this.visibleItems.length; i < this.data.length; i++) {
    const data = this.data[i]
    const element = this.renderItem(data, this.container, i)
    if (element.offsetTop + element.offsetHeight > viewBottom) {
      break
    }
  }
}

RecycleView.prototype.renderItem = function (data, parent, index) {
  const element = this.renderItemCallback(data, parent, index)
  this.visibleItems.push({ data, element })
  return element
}

RecycleView.prototype.setData = function (data) {
  this.data = data
  this.visibleItems = []
  this.container.innerHTML = '' // 清空旧的项目
  data.forEach((item, index) => {
    this.renderItem(item, this.container, index)
  })
}

export default RecycleView
