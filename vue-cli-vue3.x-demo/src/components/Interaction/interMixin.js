import { computed, toRaw, watch } from "vue";
export function useInter(store, id, callback) {
  const broadcastData = computed(() => store.getters.broadcastData)
  const currentIdData = broadcastData.value[id]
  // console.log('useInter broadcastData', id, broadcastData, currentIdData)
  // watch(broadcastData, (newV, oldV) => {
  //   console.log('watch broadcastData', newV, oldV)
  // }, { deep: true })
  watch(
    () => currentIdData,
    (newV, oldV) => {
      callback && callback(newV, oldV)
    },
    { immediate: true, deep: true })
  return currentIdData
}