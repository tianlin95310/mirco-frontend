/* eslint-disable */
import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";
import Error from './error.vue'
export function loadAsyncComponent(component, { suspensible = false } = {}) {
  return defineAsyncComponent({
    loader: component,
    loadingComponent: Loading,
    errorComponent: Error,
    // Vue 3.2.25 之后的版本不再直接支持 delay 选项。delay结束前不会展示Loadding
    delay: 500,
    timeout: 4000,
    suspensible: suspensible,
    onError: (err, retry, fail, attempts) => {
      console.log("defineAsyncComponent err", err, retry, fail, attempts);
    }
  })
}

export async function delay(duration) {
  return new Promise(function(reslove){
    setTimeout(() => {
      reslove(true)
    }, duration)
  })
}