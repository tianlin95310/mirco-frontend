<template>
  <div class="component-inter" ref="parent">
    <div>
      <button class="button" @click="addComp">添加组件</button>
    </div>
    <BaseWidget v-for="(item, index) in widgets" :key="index" :option="item.option" :extra="item.extra" :broadcast="item.broadcast" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const widgets = ref([
  {
    option: {
      widgetName: 'Sender',
      id: 'Sender1',
    },
    extra: {
      key1: 'value1',
      tian: 'lin'
    },
    broadcast: [{
      to: 'Receiver1',
      params: [{
        key: 'v1'
      }, {
        key: 'v2'
      }]
    }, {
      to: 'Receiver2',
      params: [{
        key: 'v1'
      }]
    }, {
      to: 'Receiver4',
      params: [{
        key: 'v2'
      }]
    }]
  }, {
    option: {
      widgetName: 'Receiver',
      id: 'Receiver1',
    },
    extra: {
      name: 'tianlin'
    }
  }, {
    option: {
      widgetName: 'Receiver',
      id: 'Receiver2',
    },
    extra: {
      name: 'lin'
    }
  }, {
    option: {
      widgetName: 'Receiver',
      id: 'Receiver3',
    },
    extra: {
      name: 'tian'
    }
  }
])
let count = 3
const addComp = () => {
  const id = `Receiver${++count}`
  widgets.value[0].broadcast.push({
    to: id,
    params: [{
      key: 'v' + Math.random() > 0.5 ? 1 : 2
    }]
  })
  widgets.value.push({
    option: {
      widgetName: 'Receiver',
      id: id,
    },
    extra: {
      name: 'name' + count
    }
  })
}
</script>

<style lang="scss" scoped>
.component-inter {
  width: 100%;
}
</style>
