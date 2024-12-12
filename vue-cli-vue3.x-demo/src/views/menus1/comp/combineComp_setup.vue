<script setup>
import { ref, reactive, toRefs } from 'vue'
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

console.log('combineComp_setup', 'state', state, 'state.name', state.name, 'state.age', state.age, 'state.height', state.height, 'nameV3', nameV3)
console.log('combineComp_setup', 'name', name, 'age', age, 'height', height, 'unp', unp)
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
