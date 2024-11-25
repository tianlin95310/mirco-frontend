<template>
  <a class="this-a" target="_blank" :href="href">{{ title }}</a>
</template>

<script setup>
import { defineProps } from 'vue'
const name = 'ALink'
defineProps({
  href: {
    type: String,
    default: 'https://www.baidu.com'
  },
  title: {
    type: String,
    default: '跳转'
  }
})
</script>

<style>
.this-a {
  display: inline-block;
  margin-right: 8px;
}
</style>
