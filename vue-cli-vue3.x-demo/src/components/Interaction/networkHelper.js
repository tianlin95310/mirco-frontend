import { onUnmounted, reactive } from 'vue'
export function useNetworkHelper() {
  const _requestObserver = reactive([])
  const addCancelToken = (token) => {
    _requestObserver.push(token)
  }
  const disposeAll = () => {
    _requestObserver.forEach((item) => {
      console.log('useInter onUnmounted', item)
      item.dispose && item.dispose()
    })
  }
  onUnmounted(() => {
    disposeAll()
  })
  return {
    addCancelToken
  }
}