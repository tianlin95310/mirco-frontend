import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import device from '@/utils/Device.js'
export default createStore({
  state: {
    username: Cookies.get('username') || '张三',
    cachedViews: ['CanvasView', 'HtmlView', 'HtmlSafety'],
    isPc: device.isPC()
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
      Cookies.set('username', username)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    username: state => state.username,
    cachedViews: state => state.cachedViews,
    isPc: state => state.isPc
  }
})
