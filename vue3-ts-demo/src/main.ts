import './assets/normalize.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import directive from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(directive)

app.mount('#app')
