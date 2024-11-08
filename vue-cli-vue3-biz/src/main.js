import { createApp } from 'vue'
import App from './App.vue'
import { loadAllComponents, installAllComponents } from './mfp/util'
loadAllComponents().then(components => {
  const app = createApp(App)
  installAllComponents(app, components)
  app.mount('#app')
})

