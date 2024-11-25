import number from './number.js'
import decimal from './decimal.js'
const vRandomcolor = {
  mounted: function (el) {
    const random = () => {
      return Math.ceil(Math.random() * 0xffffff)
    }
    el.style.color = '#' + random().toString(16)
    el.style.backgroundColor = '#' + random().toString(16)
  }
}
export default {
  install(Vue) {
    Vue.directive('number', number)
    Vue.directive('decimal', decimal)
    Vue.directive('randomcolor', vRandomcolor)
  }
}
