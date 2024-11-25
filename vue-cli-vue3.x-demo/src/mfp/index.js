import { defineAsyncComponent, h } from "vue"
import components from "./components"
const asyncInstall = app => {
  components.forEach(element => {
    app.component(element.attrs.name, defineAsyncComponent({
      loader: element.component,
      loadingComponent: () => h('div', { innerHTML: 'loading' }),
      errorComponent: () => h('div', { innerHTML: 'error' }),
      delay: 2000,
      timeout: 10000,
      onError: (err) => {
        console.log('defineAsyncComponent', err)
      }
    }))
  })
}

const install = app => {
  components.forEach(element => {
    app.component(element.attrs.name, element.component)
  })
}

export default {
  install,
  asyncInstall,
  components
}