<template>
  <div class="tag-select">
    <ul class="tag-list">
      <li v-for="(item, index) in items" :key="index">
        <div class="tag-item">
          <input :type="type" v-model="currentValue" :disabled="disabled" :id="`${name}` + index" :value="item.value || item" @change="onValueChange">
          <label :for="`${name}` + index">{{ item.label || item }}</label>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { toRef } from 'vue'
const $emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: null
  },
  name: {
    type: String,
    default: 'tag'
  },
  type: {
    type: String,
    default: 'checkbox'
  },
  items: {
    type: Array,
    default() {
      return []
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const currentValue = toRef(props.modelValue)
const onValueChange = () => {
  $emit('update:modelValue', currentValue.value)
}
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none
}

.tag-select {
  user-select: none;
  box-sizing: border-box;

  :deep(input) {
    outline: none;
    border: none;
    appearance: none;
  }

  .tag-list {
    padding: 9px 0;
    overflow: hidden;

    li {
      width: 33.33%;
      float: left;
      text-align: center;
      padding: 0 6px;
      margin-bottom: 9px;

      .tag-item {
        width: 100%;
        height: 44px;
        line-height: 44px;
        position: relative;

        input {
          width: 100%;
          height: 100%;
          position: relative;

          // 设置0.5px border
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 200%;
            height: 200%;
            transform-origin: 0 0;
            transform: scale(0.5, 0.5);
            border: 1px solid #DEDEDE;
            // add a border-radius can solve a render bug
            border-radius: 4px;
          }

          &:checked {
            border: none;
            background-color: #e0f4ff59;

            &:before {
              box-sizing: content-box;
              border: 1px solid #008FFE;
            }
          }

          &:checked+label {
            color: #008FFE
          }

          &:disabled {
            border: none;

            // background-color: #F5F5F5;
            &:before {
              border: 1px solid #CCC;
            }
          }

          &:disabled+label {
            color: #CCC
          }
        }

        label {
          position: absolute;
          z-index: 10;
          width: 100%;
          left: 0;
          top: 0;
          color: #666;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
