<script setup>
import { ref, defineProps, defineOptions, useAttrs, defineEmits, reactive } from 'vue';
import { useStore } from 'vuex'
const store = useStore()
const attrs = useAttrs()
const emit = defineEmits(['updateInterData'])
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})
const extra = attrs.extra
const state = {
  v1: 1,
  v2: 'a'
}
emit('updateInterData', state)
console.log('sender props', props, attrs)
const updateValue = () => {
  state.v1 = Math.round(Math.random() * 9999)
  emit('updateInterData', state)
}
defineOptions({
  name: 'Sender'
})
</script>

<template>
  <div class="sender">
    <div v-for="(value, key, index) in extra" :key="index">
      [ {{ index }} ] {{ key }}: {{ value }}
    </div>
    <div>
      <button @click="updateValue" class="button">更新</button>
    </div>
  </div>
</template>

<style>
.sender {
  width: 200px;
  height: 200px;
  border: 1px solid gainsboro;
  font-size: 14px;
}
</style>