import loadAllComponentsProd from './indexProd'
import loadAllComponentsDev from './indexDev'
import { loadAsyncComponent } from '@/async/loadAsync'

export async function loadJs(src) {
  return new Promise((reslove, reject) => {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        reslove('success')
      } else {
        reject(new Error(`load script[${src}] failed`))
      }
    }
    script.onerror = reject
    script.src = src
    head.appendChild(script)
  })
}

export const installAllComponents = (app, components) => {
  components.forEach(element => {
    app.component(element.attrs.name, loadAsyncComponent(element.component))
  })
}

export async function loadAllComponents() {
  const components = process.env.NODE_ENV === 'production' ? loadAllComponentsProd() : loadAllComponentsDev()
  return components
}