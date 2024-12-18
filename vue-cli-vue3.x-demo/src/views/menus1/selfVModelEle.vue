<template>
  <div class="self-model-ele page-container">
    <h4>自定义一个能使用v-model指令的可编辑div,能带格式复制内容,max {{ maxLength }}</h4>
    <div style="height: 100px">
      <edit-div v-model="text" :canEdit="canEdit" @change="onChange" @input="onInput" />
    </div>
    <div style="height: 100px">
      <edit-div v-model="text2" :canEdit="false" />
    </div>
    <div style="white-space: normal;word-break: break-word;width: 100%;" @click="text = '';canEdit = true">输入框的内容：{{ text }}</div>
  </div>
</template>
<script setup>
import EditDiv from '@/components/EditDiv'
import { reactive, ref } from 'vue'
const text = ref('')
const text2 = 'you can\'t edit me'
const maxLength = 50
// 使用reactive创建的基本变量时非相应式的
// let canEdit = reactive(true)
const canEdit = ref(true) 
const onInput = (value) => {
  console.log('onInput', value)
  if (value.length > 50) {
    canEdit.value = false
  }
}
const onChange = (value) => {
  console.log('onInput', value)
}
</script>

<style lang="scss" scoped>
.self-model-ele {
  width: 100%;

  button {
    margin-top: 16px;
  }
}
</style>
