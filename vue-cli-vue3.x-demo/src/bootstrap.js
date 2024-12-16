import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './premission'
import directives from './directives/index.js'
import selfComps from '@/components'
import webError from './utils/webError'
import { theme1 } from './views/menus5/theme/theme'
import { setTheme } from './views/menus5/theme/themeUtil'
setTheme(theme1)

createApp(App)
  .use(store)
  .use(router)
  .use(directives)
  .use(selfComps)
  .use(webError)
  .mount('#app')
