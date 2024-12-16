import router from './router'
import { getToken } from '@/cookies/Cookies.js'
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

export default router