export function trimPrefixZero(input) {
  if (!input) {
    return ''
  }
  if (input === '-') {
    return ''
  }
  const allZero = /^-?[0]+$/
  if (allZero.test(input)) {
    return '0'
  }
  if (input.startsWith('-')) {
    if (input.indexOf('.') > -1 && BigInt(input.split('.')[0]) > BigInt(-1)) {
      input = input.replace(/^-?[0]+/, '-0')
    } else {
      input = input.replace(/^-?[0]+/, '-')
    }
  } else {
    if (input.indexOf('.') > -1 && BigInt(input.split('.')[0]) < BigInt(1)) {
      input = input.replace(/^[0]+/, '0')
    } else {
      input = input.replace(/^[0]+/, '')
    }
  }
  return input.replace(/\.$/, '')
}

const decimal = {
  mounted(el, binding) {
    binding.inputEvent = function(v) {
      console.error('decimal input', el, binding)
      const value = binding.value
      const reg = /^\d+\.?\d{0,2}$/
      if (v.target.value && !reg.test(v.target.value)) {
        v.target.value = v.target.value.replace(/[^-\d]*(-?\d*(?:\.\d{0,2})?).*$/g, '$1')
      }
    }
    binding.blurEvent = function(v) {
      console.log('decimal blur', v.target.value)
      v.target.value = trimPrefixZero(v.target.value)
      // 重新触发输入事件，更新实际值
      el.dispatchEvent(new Event('input'))
    }
    el.addEventListener('input', binding.inputEvent)
    el.addEventListener('blur', binding.blurEvent)
    // console.log('mounted', el, binding.inputEvent)
  },
  unmounted(el, binding) {
    // console.log('unmounted', el, binding.inputEvent)
    el.removeEventListener('input', binding.inputEvent)
    el.removeEventListener('blur', binding.blurEvent)
  }
}

export default decimal
