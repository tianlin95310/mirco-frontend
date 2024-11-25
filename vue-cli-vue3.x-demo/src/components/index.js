import RLink from './Link/RLink.vue'
import ALink from './Link/ALink.vue'
export default {
  install(Vue) {
    console.log('install Component', RLink.__name, ALink.__name)
    Vue.component(RLink.__name, RLink)
    Vue.component(ALink.__name, ALink)
  }
}
