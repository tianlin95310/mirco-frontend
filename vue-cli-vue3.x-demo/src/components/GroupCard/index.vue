<template>
  <div class="border-card" :style="{display: inline ? 'inline-block' : 'block'}">
    <span>{{ prop.title }}</span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const prop = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  inline: {
    type: Boolean,
    default: false
  }
})
</script>
