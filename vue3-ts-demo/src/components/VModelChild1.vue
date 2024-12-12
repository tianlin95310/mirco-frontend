<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const $emit = defineEmits(['update:modelValue'])

const value = computed({
  set(value) {
    return $emit('update:modelValue', value)
  },
  get() {
    return props.modelValue
  }
})
</script>

<template>
  <input :value="value" @input="$emit('update:modelValue', $event?.target?.value)" />
</template>
