// 自定义节流函数
const throttleS = function(func, delay) {
  let prev = Date.now() - delay
  return function() {
    let context = this
    let args = arguments
    let now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

// 自实现防抖函数
const debounceS = function(callback, delay) {
  let timer = null
  return function() {
    const _this = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function() {
      // console.log('called timer', timer)
      callback.apply(_this, args)
    }, delay)
  }
}

export {
  throttleS,
  debounceS
}
