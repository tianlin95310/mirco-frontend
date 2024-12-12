<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <div v-if="!isPc && isShowMask" class="nav-mask" @click="$refs.content.collapse()" />
    </transition>
    <div :class="['nav-div', isPc ? '' : 'is-mobile']" :style="{ width: navWidth, left: navLeft }">
      <div class="logo" @click="onLogoClick">
        <div>{{ tip1 }}</div>
      </div>
      <ul class="nav-con scroll-bar-menus">
        <li v-for="(menu, index) in menus" :key="index" class="menu-item">
          <div class="menu-item-title" @click="show(menu)" :title="menu.menuTitle">
            <span :class="[menu.isOpen ? 'menu-selected' : '']">[{{ index + 1 }}] {{ menu.menuTitle }}</span>
            <span :class="['fa', menu.isOpen ? 'fa-open' : 'fa-close']">﹀</span>
          </div>

          <ul class="sub-menu-ul">
            <li v-for="(subMenu, index) in menu.subMenus" :key="index"
              :class="['menu-item-common', menu.isOpen ? 'sub-menu-item-open' : 'sub-menu-item-close', subMenu.isOpen ? 'menu-selected' : '']"
              @click="onNavClick(subMenu)" :title="subMenu.menuTitle">
              {{ subMenu.menuTitle }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <RightContent ref="content" :style="{ paddingLeft: contentPaddingLeft }" class="level1-route" @collapse="collapse" />
  </div>

</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import RightContent from './RightContent.vue'
import { MENUS } from './menus'

const route = useRoute()
const store = useStore()
const router = useRouter()
const isPc = computed(() => store.getters.isPc)

// getCurrentInstance不推荐使用属于内部api
const CONTEXT = getCurrentInstance()
console.log('Layout setup CONTEXT', CONTEXT, CONTEXT.refs.content)
const tip1 = 'Vue3.x Demo @TianLin'
const menus = ref(MENUS)
const menuPath = ref('')
const isShowMask = isPc.value ? ref(true) : ref(false)
const navWidth = ref('18vw')
const navLeft = ref('-60vw')
const contentPaddingLeft = ref('18vw')

const updateDir = () => {
  menus.value.forEach((menu) => {
    if (menuPath.value === menu.path) {
      menu.isOpen = !menu.isOpen
    }
  })
}
const updateFlag = () => {
  console.log('Layout menuPath', menuPath.value)
  menus.value.forEach((menu) => {
    menu.subMenus.forEach((subMenu) => {
      if (menuPath.value === subMenu.path) {
        menu.isOpen = true
        subMenu.isOpen = true
      } else {
        subMenu.isOpen = false
      }
    })
  })
}
const collapse = (isShow) => {
  isShowMask.value = isShow
  if (isPc.value) {
    if (isShow) {
      navWidth.value = '18vw'
      navLeft.value = '0'
      contentPaddingLeft.value = '18vw'
    } else {
      navWidth.value = '12vw'
      navLeft.value = '0'
      contentPaddingLeft.value = '12vw'
    }
  } else {
    if (isShow) {
      navWidth.value = '60vw'
      navLeft.value = '0'
      contentPaddingLeft.value = '0'
    } else {
      navWidth.value = '60vw'
      navLeft.value = '-60vw'
      contentPaddingLeft.value = '0'
    }
  }
}
const onNavClick = (obj) => {
  console.log('onNavClick', obj)
  if (obj.path && obj.path !== '') {
    router.push(`${obj.path}${obj.query ?? ''}`)
  }
  menuPath.value = obj.path
  updateFlag()
  if (!isPc.value) {
    collapseChild()
  }
}
const show = (menu) => {
  menuPath.value = menu.path
  updateDir()
}

const onLogoClick = () => {
  router.push('/dashboard')
  collapseChild()
}

const collapseChild = () => {
  const { proxy } = CONTEXT
  proxy.$refs.content.collapse()
}
// setup body
{
  if (isPc.value) {
    navWidth.value = '18vw'
    navLeft.value = '0'
    contentPaddingLeft.value = '18vw'
  } else {
    navWidth.value = '60vw'
    navLeft.value = '-60vw'
    contentPaddingLeft.value = '0'
  }
  onMounted(() => {
    console.log('Layout mounted CONTEXT', CONTEXT.refs.content, route.path)
    menuPath.value = route.path
    updateFlag()
  })
}
</script>

<style lang="scss">
@import "../../assets/css/anim.css";

.home {
  width: 100%;
  height: 100vh;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .level1-route {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: padding-left 0.5s ease;
  }

  .nav-mask {
    z-index: 200;
    transition: opacity 0.3s ease;
    background: rgba(12, 12, 12, 0.5);
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  .is-mobile {
    position: fixed;
  }

  .nav-div {
    height: 100%;
    position: fixed;
    z-index: 201;
    transition: all 0.5s ease;
    background-color: white;

    .logo {
      height: 40px;
      font-size: 14px;
      text-align: center;
      color: white;
      line-height: 40px;
      background-color: #545C64;
      border-bottom: 1px solid grey;
      cursor: pointer;
      overflow: hidden;
    }

    .nav-con {
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 40px);
      border-right: 1px solid whitesmoke;

      .menu-item {

        .sub-menu-ul {}

        .menu-item-common {
          cursor: pointer;
          padding-left: 16px;
          line-height: 40px;
          transition: all 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.9rem;
        }

        .menu-item-common:hover {
          background-color: gainsboro;
          font-size: .91rem;
        }

        .sub-menu-item-open {
          height: 40px;
          background-color: white;
        }

        /*对于li元素高度为0是，如果文字还是出现并且重叠时，说明是overflow为可见时，这时需要将隐藏*/
        .sub-menu-item-close {
          height: 0px;
        }

        .menu-selected {
          color: #42b983;
        }

        .menu-item-title {
          display: block;
          height: 40px;
          line-height: 40px;
          padding-left: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu-item-title:hover {
          background-color: gainsboro;
        }

      }
    }
  }
}

.fa {
  float: right;
  margin-right: 8px;
  line-height: 40px;
  transition: all 0.3s ease-in;
  transform-origin: center center;
}

.fa-open {
  transform: rotate(0deg) scale(0.9)
}

.fa-close {
  transform: rotate(-90deg) scale(0.8);
}
</style>
