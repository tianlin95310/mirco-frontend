<template>
  <div class="page-container html-view">
    <tl-rating :score="score" size="1.8em" @update="update" />
    <span class="lbig">KeepAlive </span><input v-model="actived">
    <tl-index-view :items="items" class="index" />
    <div style="display: inline-block;width: 33%;">
      <TagSelect name="v1" v-model="v1" :items="['AAA', 'BBB', 'CCC', 'DDD']"></TagSelect>
    </div>

    <div style="display: inline-block;width: 33%;">
      <TagSelect name="v2" v-model="v2" :colCount="4" :items="['AAA', 'BBB', 'CCC', 'DDD']" type="radio"></TagSelect>
    </div>

    <div style="display: inline-block;width: 33%;">
      <TagSelect name="v3" v-model="v3" :items="['AAA', 'BBB', 'CCC', 'DDD']" type="radio" :disabled="true">
      </TagSelect>
    </div>

    <div>
      <button class="button" @click="showDialog = true">可拖拽弹窗</button>
    </div>

    <div class="list-view">
      <div class="card">
        <RecycleList :random="true"></RecycleList>
      </div>
      <div class="card">
        <RecycleList></RecycleList>
      </div>
      <div id="recycleView" class="card" style="width: 200px;height: 400px;overflow: hidden;">
      </div>
      <div id="recycleView2" class="card" style="width: 200px;height: 400px;overflow: hidden;">
      </div>
    </div>

    <div>
      <button class="button" @click="addData">添加数据级</button>
    </div>

    <t-l-dialog v-model="showDialog" tableTitle="a fixed Table with draggable" :appendToBody="true">
      <template v-slot:content>
        <div style="height: 100px;background-color: #cccccc">我是谁</div>
      </template>
    </t-l-dialog>

  </div>
</template>
<script setup name="HtmlView">
// <!-- script 设置name无效，可以使用文件名以及defineOptions -->
import { ref, watch, reactive, toRefs, onActivated, onMounted, defineOptions, defineCustomElement, onDeactivated } from 'vue'
import TLDialog from 'comp/TLDialog'
import TlIndexView from './html/TLIndexView'
import TlRating from './html/TlRating'
import TagSelect from './html/TagSelect'
import RecycleList from './html/RecycleList'
import RecycleView from './html/RecycleView'
import './html/RecycleView/index.css'
import ListItem from './html/list-item.ce.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// script 设置name无效，可以使用文件名以及defineOptions
defineOptions({
  name: 'HtmlView'
})
// 使用自定义元素，包裹Vue模板组件
const MyListItem = defineCustomElement(ListItem)
customElements.define('my-list-item', MyListItem)
// 会创建shadow root元素快包裹ListItem
const actived = ref('')
const state = reactive({
  score: ref(3),
  items: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'W', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ],
  v1: [],
  v2: null,
  v3: 'AAA',
  showDialog: false,
  recycleView: null,
  recycleView2: null
})

// 模板免state前缀
const { v1, v2, v3, items, score, showDialog } = toRefs(state)

watch(() => state.v1, (newV, oldV) => {
  console.log('watch v1', newV)
})

onMounted(() => {
  // 初始化RecycleView
  const recycleView = new RecycleView(document.getElementById('recycleView'), {
    itemHeight: 100, // 每个项高度100px
    bufferSize: 10,  // 缓冲区10个项
    renderItem: (data, index) => {
      // 创建新项
      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
      <div class="item-index">${index}</div>
      <div class="item-content">${data.title}</div>`;
      return item;
    },
    updateItem: (element, data, index) => {
      // 更新现有项
      element.querySelector('.item-index').textContent = index;
      element.querySelector('.item-content').textContent = data.title;
    }
  });

  const recycleView2 = new RecycleView(document.getElementById('recycleView2'), {
    itemHeight: 100, // 每个项高度100px
    bufferSize: 10,  // 缓冲区10个项
    renderItem: (data, index) => {
      const item = new MyListItem({
        index: index,
        name: data.title
      })
      return item;
    },
    updateItem: (element, data, index) => {
      // 更新现有项
      const shadowRoot = element.shadowRoot
      shadowRoot.querySelector('.item-index').textContent = index;
      shadowRoot.querySelector('.item-name').textContent = data.title;
    }
  });

  // 设置数据
  const mockData = Array(100000).fill(0).map((_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is item ${i + 1} description`
  }));

  recycleView.setData(mockData);
  recycleView2.setData(mockData);
  state.recycleView = recycleView
  state.recycleView2 = recycleView2
})

onActivated(() => {
  console.log('this.$route.query', route.query)
  console.log('this.$route.query.v1', route.query.v1)
  console.log('this.$route.query.v2', route.query.v2)
  console.log('this.$route.query.v2 == undefined', route.query.v2 === undefined)
  state.recycleView?.onActivated()
  state.recycleView2?.onActivated()
})

onDeactivated(() => {
  state.recycleView?.onDeactivated()
  state.recycleView2?.onDeactivated()
})
const addData = () => {
}
const update = (v) => {
  state.score = v
}
const onIndexClick = (item) => {
  console.log('---onIndexClick---', item)
  this.$refs[item][0].scrollIntoView({
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.html-view {
  width: 100%;
  background-color: white;

  .list-view {}

  .index {
    position: fixed;
    right: 17px;
    top: 40px;
    height: calc(100% - 40px);
  }
}
</style>
