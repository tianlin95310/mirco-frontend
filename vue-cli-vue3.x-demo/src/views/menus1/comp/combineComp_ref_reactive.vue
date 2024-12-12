<template>
  <div class="combine-comp-ref">
    combine-comp-ref
    <button class="button" @click="ref1++">ref1</button>
    <button class="button" @click="refObj.v1++">refObj</button>
  </div>
</template>

<script setup>
import { computed, isReactive, isRef, reactive, ref, watch } from 'vue'

const ref1 = ref(1)
// warning value cannot be made reactive: 1
const reactive1 = reactive(1)

// ref传入object时，.value是一个Proxy
const refObj = ref({
  v1: 1,
  v2: 'vue',
  v3: [],
  v4: ref([]),
  v5: {
    type: 'vue',
    version: '3.x'
  }
})
const reactiveObj = reactive({
  v1: 1,
  v2: 'vue',
  v3: [],
  v4: ref([]),
  v5: {
    type: 'vue',
    version: '3.x'
  }
})

const c1 = computed(() => 1)
const c2 = computed(() => ref1.value)
watch(() => c2, (newV, oldV) => {
  console.log('watch c2', newV, oldV)
})
watch(c2, (newV, oldV) => {
  console.log('watch c2', newV, oldV)
})
watch(() => ref1, (newV, oldV) => {
  console.log('watch ref1', newV, oldV)
})
watch(ref1, (newV, oldV) => {
  console.log('watch ref1', newV, oldV, c2.value)
})

watch(refObj, (newV, oldV) => {
  console.log('watch refObj', newV, oldV)
}, { deep: true})

console.log('combineComp_ref_reactive', 'ref1', ref1, 'reactive1', reactive1, 'refObj', refObj, 'reactiveObj', reactiveObj)
console.log('combineComp_ref_reactive', 'c1', c1, 'c2', c2, isRef(c1), isRef(c2))
refObj.value.v1++
reactiveObj.v1++
</script>

<style>
.combine-comp-ref {
  background-color: aquamarine;
}
</style>
