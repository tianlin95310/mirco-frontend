<template>
  <div class="edit-div" :contenteditable="canEdit" v-html="innerHTML" placeholder="请输入内容..." @input="changeText" @blur="unFocus" />
</template>
<script setup>
import { toRef, watch } from 'vue'
const props = defineProps({
  modelValue: String,
  canEdit: {
    type: Boolean,
    default: true
  }
})
const $emit = defineEmits(['update:modelValue', 'change', 'input'])
const innerHTML = toRef(props.modelValue)

watch(() => props.modelValue, (newV) => {
  console.log('props.modelValue', props.modelValue, newV)
  if (!newV) {
    innerHTML.value = newV
  }
})
const changeText = (value) => {
  $emit('update:modelValue', value.target.innerHTML)
  // 替换默认的input事件，否则input事件的参数为InputEvent,而不是value
  $emit('input', value.target.innerHTML)
}
const unFocus = (value) => {
  $emit('change', value.target.innerHTML)
}
</script>
<style lang="scss" scoped>
.edit-div {
  width: 100%;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  white-space: pre-wrap;
  outline: none;
  user-select: text;
  text-align: left;
  font-size: 1.5rem;
  border: 1px solid greenyellow;
  padding: 6px 10px;

  /*内容可读写，但粘贴内容中的富文本格式（如文本的颜色、大小，图片等）会丢失*/
  /*attr(placeholder)可以取属性内容，通常用于content*/
  &[contenteditable=true] {
    // user-modify: read-write-plaintext-only;
    -webkit-user-modify: read-write-plaintext-only;

    &:empty:before {
      content: attr(placeholder);
      font-size: 0.9em;
      display: block;
      color: #ccc;
    }
  }

  &[contenteditable=false] {
    cursor: not-allowed;
    color: #ccc;
  }
}
</style>
