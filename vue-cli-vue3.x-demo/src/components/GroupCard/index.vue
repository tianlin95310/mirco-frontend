<template>
  <div class="border-card">
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
  }
})
</script>
