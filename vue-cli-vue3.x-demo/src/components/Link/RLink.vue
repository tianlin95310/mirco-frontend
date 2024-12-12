<template>
  <router-link class="highlight link-inline" :to="to">{{ title }}</router-link>
</template>

<script setup>
const name = 'RLink'
defineProps({
  to: {
    type: String,
    default: '/'
  },
  title: {
    type: String,
    default: '首页'
  }
})
</script>

<style>
.link-inline {
  display: inline-block;
  font-size: 14px;
  margin-right: 8px;
}
</style>
