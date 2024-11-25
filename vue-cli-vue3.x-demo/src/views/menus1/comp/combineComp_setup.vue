<script setup>
import { ref, reactive, toRefs, isRef, isReactive, isProxy, defineExpose, defineEmits } from 'vue'
const state = reactive({
  name: 'tl',
  age: ref(22),
  height: 170
})
const emit = defineEmits(['parFun'])
const nameV3 = ref('tl')

const { name, age, height } = toRefs(state)

// 用了reactive会自动解包
const unp = reactive({ height })

console.log('isProxy', isProxy(state), isProxy(state.name), isProxy(state.age), isProxy(name), isProxy(nameV3))
console.log('isRef', isRef(state), isRef(state.name), isRef(state.age), isRef(name), isRef(nameV3))
console.log('isReactive', isReactive(state), isReactive(state.name), isReactive(state.age), isReactive(name), isReactive(nameV3))
console.log('isRef', isRef(height), isRef(state.height))
const onNameClick = () => {
  console.log('onNameClick', state.name)
  // ref不会自动解包，返回顶层对象才会自动解包
  state.name += 'Y'
  state.height++
  state.age++

  name.value += 'X'
  age.value++
  height.value++

  unp.height++
  nameV3.value += 'X'
}
const click = () => {
  alert('combineComp_setup')
}
const callParFun = () => {
  emit('parFun')
} 
defineExpose({
  click
})
</script>

<template>
  <div class="combine-comp-setup">
    <div>
      <button class="button" @click="callParFun">调用父组件方法</button>
    </div>
    <div>state.name: {{ name }} state.age: {{ age }} state.height: {{ height }}</div>
    <div>name: {{ name }} age: {{ age }} height: {{ height }}</div>
    <button class="button" @click="onNameClick">{{ nameV3 }}</button>
  </div>
</template>

<style>
.combine-comp-setup {
  background-color: gold
}
</style>
