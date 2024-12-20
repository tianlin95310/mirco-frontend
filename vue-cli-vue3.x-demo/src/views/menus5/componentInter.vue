<template>
  <div class="component-inter" ref="parent" :key="refreshKey">
    <div>
      <button class="button" @click="addComponent">添加组件</button>
      <button class="button" @click="delComponent">删除组件</button>
    </div>
    <Suspense>
      <BaseWidget v-for="(item, index) in widgets" :ref="el => setItemRef(index, el)" :key="index" :option="item.option" :extra="item.extra"
        :broadcast="item.broadcast" />
      <template #fallback>
        加载中。。。
      </template>
    </Suspense>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const refreshKey = ref(0)
const parent = ref(null)
const widgets = ref([
  {
    option: {
      widgetName: 'Sender',
      id: 'Sender1',
    },
    extra: {
      pro: 'Sender',
      name: 'lin'
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
const itemRefs = ref([]);
let count = 3
onMounted(() => {

})
// 循环获取ref
const setItemRef = (index, el) => {
  if (el) {
    itemRefs.value[index] = el;
  }
}
const addComponent = () => {
  const id = `Receiver${++count}`
  widgets.value[0].broadcast.push({
    to: id,
    params: [{
      key: 'v' + (Math.random() > 0.5 ? 1 : 2)
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
  console.log('widgets', widgets.value)
  // 刷新整个组件
  // refreshKey.value++;
  updateAllInterData()
}

const delComponent = () => {
  widgets.value.splice(widgets.value.length - 1, 1)
}

// 刷新数据
const updateAllInterData = () => {
  itemRefs.value.forEach(item => {
    item.updateInterData && item.updateInterData()
  })
}
</script>

<style lang="scss" scoped>
.component-inter {
  width: 100%;
}
</style>
