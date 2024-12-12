import RLink from './Link/RLink.vue'
import ALink from './Link/ALink.vue'
import BaseWidget from './Interaction/BaseWidget.vue'
import Sender from './Interaction/Sender.vue'
import Receiver from './Interaction/Receiver.vue'

export default {
  install(Vue) {
    console.log('install Component', RLink, Sender)
    Vue.component(RLink.__name, RLink)
    Vue.component(ALink.__name, ALink)
    Vue.component(BaseWidget.__name, BaseWidget)
    Vue.component(Sender.name, Sender)
    Vue.component(Receiver.name, Receiver)
  }
}
