import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import device from '@/utils/Device.js'
import { ref } from 'vue'
export default createStore({
  state: {
    username: Cookies.get('username') || '张三',
    cachedViews: ['CanvasView', 'HtmlView', 'HtmlSafety'],
    isPc: device.isPC(),
    broadcastData: {}
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
      Cookies.set('username', username)
    },
    setBroadcastData(state, { id, key, value }) {
      console.log('setBroadcastData', state.broadcastData, id, key, value)
      if (!state.broadcastData[id]) {
        const idData = {}
        idData[key] = value
        state.broadcastData[id] = idData
      } else {
        const idData = state.broadcastData[id]
        idData[key] = value
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    username: state => state.username,
    cachedViews: state => state.cachedViews,
    isPc: state => state.isPc,
    broadcastData: state => state.broadcastData
  }
})
