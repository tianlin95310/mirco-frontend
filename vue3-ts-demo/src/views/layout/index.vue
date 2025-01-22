<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '../../stores/counter'
const store = useCounterStore()
const router = useRouter()
const route = useRoute()
const onItemClick = (item: any) => {
  console.log('route', route.path)
  router.push(item.path)
}
const state = reactive({
  menus: [
    {
      path: 'menu1',
      name: '继承，重载，多态/重写'
    },
    {
      path: 'menu2',
      name: 'interface和type'
    },
    {
      path: 'menu3',
      name: '特殊用法'
    },
    {
      path: 'menu4',
      name: 'Vue3的属性探索'
    },
    {
      path: 'menu5',
      name: 'ES6新特性'
    },
    {
      path: 'menu6',
      name: '案例'
    }
  ],
  showMenu: ref(true),
  clickCount: 0
})

watch(
  () => route,
  (newV, oldV) => {
    console.log('newV', newV.path, 'oldV', oldV?.path)
  },
  {
    immediate: true,
    deep: true
  }
)

const closeOrShow = () => {
  state.showMenu = !state.showMenu
}
// onBeforeMount((i) = {})
const refreshToken = () => {
  store.setToken(String(Math.ceil(Math.random() * 9999)))
}

const gotoHome = () => {
  router.push('/')
  state.clickCount++
}
</script>

<template>
  <div class="app-content">
    <aside class="aside" :class="[state.showMenu ? 'show-menu' : 'hide-menu']">
      <div v-randomColor class="logo" @click="gotoHome">
        Vite + Vue3 + TS-{{ state.clickCount }}
      </div>
      <ul>
        <li v-for="(item, index) in state.menus" :key="index" @click="onItemClick(item)">
          <p>【{{ index + 1 }}】{{ item.name }}</p>
        </li>
      </ul>
      <div class="close" :class="{ closed: !state.showMenu }" @click="closeOrShow"></div>
    </aside>
    <main class="main-container" :class="{ 'full-size': !state.showMenu }">
      <header class="header">
        <div v-randomColor class="header-content clearfix-after">
          <span class="item left item-text" @click="refreshToken">pinia token:{{ store.token }}</span>
          <span class="item item-text">我是一个header</span>
        </div>
      </header>
      <nav class="nav">
        <strong>首页{{ route.path }}</strong>
      </nav>
      <main class="main-content">
        <RouterView></RouterView>
      </main>
    </main>
  </div>
</template>
<style lang="less" scoped>
.clearfix-after {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
}
.main-container {
  width: 100%;
  height: 100vh;
  padding-left: 240px;
  transition: padding 0.5s ease-in;

  &.full-size {
    padding-left: 0;
  }

  .main-content {
    padding: 16px;
  }
  .nav {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid gainsboro;
  }
  .header {
    height: 36px;
    line-height: 36px;
    background-color: cornflowerblue;
    position: relative;
    .header-content {
      height: 100%;
    }
    .item {
      float: right;
      width: 36px;
      height: 100%;
      cursor: pointer;
    }
    .left {
      float: left;
    }
    .item-text {
      width: 120px;
      text-align: center;
    }
  }
}
.app-content {
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

.app-content .aside {
  position: fixed;
  top: 0;
  left: 240px;
  height: 100%;
  background-color: whitesmoke;
  width: 240px;
  transition: left 0.5s ease-in-out;

  &.show-menu {
    left: 0;
  }

  &.hide-menu {
    left: -240px;
  }

  .close {
    position: absolute;
    right: 0px;
    top: calc(50% - 40px);
    width: 30px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    // background-color: rgba(0, 255, 255, 0.63);
    font-size: 20px;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid blueviolet;
    border-left: 0 solid transparent;
    transition: border 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform-origin: left;
    box-shadow: gainsboro 1px 1px 1px 1px;
    cursor: pointer;

    &.closed {
      right: -30px;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-right: 0 solid transparent;
      border-left: 30px solid rgba(137, 43, 226, 0.8);
    }
  }

  .logo {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: white;
    background-color: cornflowerblue;
  }

  ul {
    list-style: none;
    height: 40px;
    border-bottom: 1px solid whitesmoke;
    text-align: start;
    width: 100%;
    padding-inline: 0;

    li {
      line-height: 40px;
      list-style: none;
      width: 100%;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
      background-color: white;

      p {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    li:hover {
      background-color: rgba(75, 150, 150, 0.445);
    }
  }
}
</style>
