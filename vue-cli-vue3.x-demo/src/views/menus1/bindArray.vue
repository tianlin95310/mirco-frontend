<template>
  <div class="bind-array">
    <div v-for="(tab, index) in attr" :key="index" class="attr-item">
      <div @click="onFClick(index)">{{ tab.attrName }} - {{ tab.selected }}</div>
      <div>
        <span v-for="(value, childIndex) in tab.attrValue" :key="childIndex"
          :style="{ background: (childIndex === tab.selected ? '#377A4F' : 'white'), color: (childIndex === tab.selected ? 'white' : 'grey') }" class="tag"
          @click="onAttrChoose(index, childIndex)">
          {{ value.name }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  attr: [{
    attrName: 'attrName1',
    selected: 0,
    attrValue: [{
      name: 'name1'
    },
    {
      name: 'name2,'
    },
    {
      name: 'name3'
    }]
  }, {
    attrName: 'attrName2',
    selected: 0,
    attrValue: [{
      name: 'name1'
    },
    {
      name: 'name2,'
    },
    {
      name: 'name3'
    }]
  }]
})
const { attr } = toRefs(state)

const onFClick = (index) => {
  console.log(index)
  state.attr[index].attrName += 'a'
}
const onAttrChoose = (index, childIndex) => {
  console.log(index, childIndex)
  state.attr[index].selected = childIndex
}
</script>

<style lang="scss" scoped>
.bind-array {
  .attr-item {
    div {
      margin-top: 10px;
      user-select: none;

      &:first-child {
        cursor: pointer;
      }

      span {
        margin-left: 10px;
      }
    }

  }
}
</style>
