const number = {
  mounted(el, binding) {
    binding.extraEvent = function(v) {
      const reg = /^[0-9]+\.?[0-9]{0,2}$/
      if (v.target.value && !reg.test(v.target.value)) {
        v.target.value = v.target.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
        el.dispatchEvent(new Event('input'))
      }
    }
    el.addEventListener('input', binding.extraEvent)
    // console.log('mounted', el, binding.extraEvent)
  },
  unmounted(el, binding) {
    // console.log('unmounted', el, binding.extraEvent)
    el.removeEventListener('input', binding.extraEvent)
  }
}

export default number
