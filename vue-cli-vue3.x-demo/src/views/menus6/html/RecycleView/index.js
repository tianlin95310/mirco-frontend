class RecycleView {
  /**
   * @param {HTMLElement} container - 列表容器元素
   * @param {Object} options - 配置选项
   * @param {number} options.itemHeight - 每一项的高度（固定高度）
   * @param {number} options.bufferSize - 缓冲区大小（可见项之外的预渲染项数）
   * @param {Function} options.renderItem - 渲染单项的函数 (data, index) => HTMLElement
   * @param {Function} options.updateItem - 更新单项的函数 (element, data, index) => void
   */
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.data = [];
    this.visibleItems = [];
    this.firstVisibleIndex = 0;
    this.lastVisibleIndex = 0;
    
    // 创建滚动容器
    this.scrollContainer = document.createElement('div');
    this.scrollContent = document.createElement('div');
    this.scrollContainer.style.overflow = 'auto';
    this.scrollContent.style.position = 'relative';
    this.scrollContent.style.height = '100%';
    
    this.scrollContent.style.minHeight = '100%';
    this.scrollContent.style.width = '100%';
    
    this.scrollContent.classList.add('recycle-view-content');
    this.scrollContainer.classList.add('recycle-view-container');
    
    this.scrollContainer.appendChild(this.scrollContent);
    this.container.appendChild(this.scrollContainer);
    
    // 绑定事件
    this.scrollHandler = this.handleScroll.bind(this);
    this.scrollContainer.addEventListener('scroll', this.scrollHandler);
    
    // 初始渲染
    this.updateContainerHeight();
  }
  
  // 设置数据
  setData(data) {
    this.data = data || [];
    this.updateContainerHeight();
    this.recycleItems();
  }
  
  // 更新容器高度
  updateContainerHeight() {
    const totalHeight = this.data.length * this.options.itemHeight;
    this.scrollContent.style.height = `${totalHeight}px`;
  }
  
  // 处理滚动事件
  handleScroll() {
    this.recycleItems();
  }
  
  // 回收和复用项
  recycleItems() {
    const scrollTop = this.scrollContainer.scrollTop;
    const containerHeight = this.scrollContainer.clientHeight;
    
    // 计算可见范围
    const firstVisibleIndex = Math.max(
      0,
      Math.floor(scrollTop / this.options.itemHeight) - this.options.bufferSize
    );
    
    const lastVisibleIndex = Math.min(
      this.data.length - 1,
      Math.ceil((scrollTop + containerHeight) / this.options.itemHeight) + this.options.bufferSize
    );
    
    // 如果可见范围没有变化，则不需要更新
    if (this.firstVisibleIndex === firstVisibleIndex && 
        this.lastVisibleIndex === lastVisibleIndex) {
      return;
    }
    
    this.firstVisibleIndex = firstVisibleIndex;
    this.lastVisibleIndex = lastVisibleIndex;
    
    // 回收不再可见的项
    const itemsToRecycle = [];
    this.visibleItems = this.visibleItems.filter(item => {
      if (item.index < firstVisibleIndex || item.index > lastVisibleIndex) {
        itemsToRecycle.push(item.element);
        return false;
      }
      return true;
    });
    
    // 复用回收的项
    const recycledItems = itemsToRecycle;
    
    // 渲染新可见的项
    for (let i = firstVisibleIndex; i <= lastVisibleIndex; i++) {
      // 检查是否已经渲染
      const alreadyRendered = this.visibleItems.some(item => item.index === i);
      if (alreadyRendered) continue;
      
      // 获取或创建元素
      let element;
      if (recycledItems.length > 0) {
        element = recycledItems.pop();
        this.options.updateItem(element, this.data[i], i);
      } else {
        element = this.options.renderItem(this.data[i], i);
      }
      
      // 设置位置
      element.style.position = 'absolute';
      element.style.top = `${i * this.options.itemHeight}px`;
      element.style.width = '100%';
      element.style.height = `${this.options.itemHeight}px`;
      
      // 添加到DOM和可见项列表
      if (!element.parentNode) {
        this.scrollContent.appendChild(element);
      }
      
      this.visibleItems.push({
        element,
        index: i
      });
    }
  }
  
  // 销毁
  destroy() {
    this.scrollContainer.removeEventListener('scroll', this.scrollHandler);
    this.container.removeChild(this.scrollContainer);
    this.visibleItems = [];
  }
}

export default RecycleView;