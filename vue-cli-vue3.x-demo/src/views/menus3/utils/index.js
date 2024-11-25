const throttleS = function(func, delay) {
  var prev = Date.now() - delay
  return function() {
    var context = this
    var args = arguments
    var now = Date.now()
    // console.log('prev == ', prev, 'now == ', now, now - prev)
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

// 自实现防抖函数
const debounceS = function(callback, delay) {
  var timer = null
  return function() {
    const _this = this
    const args = arguments
    // console.log('timer', timer)
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
