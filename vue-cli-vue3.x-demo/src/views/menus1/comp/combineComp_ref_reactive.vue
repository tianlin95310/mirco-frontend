<template>
  <div class="combine-comp-ref">
    combine-comp-ref
  </div>
</template>

<script setup>
import { isReactive, isRef, reactive, ref } from 'vue'

const ref1 = ref(1)
// warning value cannot be made reactive: 1
const reactive1 = reactive(1)

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

console.log('ref1---', isReactive(ref1), isRef(ref1))
console.log('reactive1---', isReactive(reactive1), isRef(reactive1))
console.log('refObj---', isReactive(refObj), isRef(refObj))
console.log('reactiveObj---', isReactive(reactiveObj), isRef(reactiveObj))

refObj.value.v1++
reactiveObj.v1++
</script>

<style>
.combine-comp-ref {
  background-color: aquamarine;
}
</style>
