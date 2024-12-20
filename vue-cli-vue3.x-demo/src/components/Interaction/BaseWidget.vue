<template>
  <component ref="component" :is="props.option.widgetName" v-bind="{ ...props.option, ...attrs, ...interParams }" @updateInterData="updateInterData">
  </component>
  
</template>
<script setup>
import { useAttrs, useTemplateRef, onMounted } from 'vue'
import { useInter } from './interMixin';
import { useStore } from 'vuex';
const store = useStore()
// Getting a value from the `props` in root scope of `<script setup>` will cause the value to lose reactivity
// props与attrs的值存在性互斥
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  },
})

const component = useTemplateRef('component')
const attrs = useAttrs()
const broadcast = attrs.broadcast
const interParams = {}
let latestState = {}
console.log('props', props, 'attrs', attrs)
const fetchData = () => {
  return new Promise(function(reslove) {
    setTimeout(() => {
      reslove(true)
    }, Math.round(Math.random() * 3) * 1000);
  })
}
const data = await fetchData()
const updateInterData = (state) => {
  if (!state) {
    state = latestState
  } else {
    latestState = state
  }
  Object.keys(state).forEach(key => {
    store.commit('setBroadcastData', { id: props.option.id, key, value: state[key] })
  })
  if (broadcast && broadcast.length) {
    broadcast.forEach(element => {
      element.params.forEach(item => {
        store.commit('setBroadcastData', { id: element.to, key: item.key, value: state[item.key] })
      })
    });
  }
}

defineExpose({
  updateInterData
})

onMounted(() => {
  useInter(store, props.option.id, component.value.getInterData)
})

</script>