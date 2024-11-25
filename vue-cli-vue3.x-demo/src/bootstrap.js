import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getToken } from '@/cookies/Cookies.js'
import directives from './directives/index.js'
import selfComps from '@/components'

const whiteList = ['/login', '/login2']

router.beforeEach((to, from, next) => {
  console.log('%c---beforeEach---', 'color: green', from.path, to.path, getToken())
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

createApp(App)
  .use(store)
  .use(router)
  .use(directives)
  .use(selfComps)
  .mount('#app')
