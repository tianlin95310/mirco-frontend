<script setup lang="ts">
const breakForeach = () => {
  let list = [1, 2, 3, 4, 5]
  try {
    list.forEach((item) => {
      if (item == 3) {
        // return;
        throw new Error('break')
      }
      console.log(item)
    })
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="menu2">
    <button class="btn btn-primary" @click="breakForeach">中断Foreach</button>
  </div>
</template>

<style></style>
