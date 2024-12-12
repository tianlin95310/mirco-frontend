<template>
  <div id="main-content" class="main-content">
    <div class='header'>
      <div class="head-content">
        <img :class="['icon-item', 'img-icon', isShow ? 'menu-show' : 'menu']" :style="{ marginLeft: marginLeft }" src="@/assets/svg/ic_collapse.svg"
          @click="collapse">
        <div v-if="isPc" class="right-icon">
          <div class="icon-item text-icon" @click="changeUsername">{{ username }}</div>
          <img class="icon-item img-icon wind-mill" src="@/assets/svg/test_svg.svg" title="莫挨老子" @click="logout">
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }" class="route-content scroll-bar">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits, defineExpose, watch } from 'vue'
import { removeToken } from '@/cookies/Cookies.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const store = useStore()
const $emit = defineEmits(['collapse'])
const isPc = computed(() => store.getters.isPc)
const username = computed(() => store.getters.username)
const cachedViews = computed(() => store.getters.cachedViews)
const isShow = ref(false)
const marginLeft = ref('18vw')
const route = useRoute()

const logout = () => {
  removeToken()
  router.push('/login')
}
const collapse = () => {
  isShow.value = !isShow.value
  if (isPc.value) {
    if (isShow.value) {
      marginLeft.value = '18vw'
    } else {
      marginLeft.value = '12vw'
    }
  } else {
    if (isShow.value) {
      marginLeft.value = '60vw'
    } else {
      marginLeft.value = '0'
    }
  }
  $emit('collapse', isShow.value)
}
watch(route, (newV, oldV) => {
  console.log('路由切换', newV, oldV)
})
const changeUsername = () => {
  store.commit('SET_USERNAME', '李四')
}
// setup body
{
  console.log('cachedViews', cachedViews.value)
  if (isPc.value) {
    marginLeft.value = '18vw'
    isShow.value = true
  } else {
    marginLeft.value = '0'
    isShow.value = false
  }
}
defineExpose({
  collapse
})

</script>

<style lang="scss">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes rotateAll {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

.main-content {
  overflow-x: hidden;
  position: relative;

  .route-content {
    width: 100%;
    margin-top: 40px;
    height: calc(100% - 40px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .header {
    position: fixed;
    left: 0;
    height: 40px;
    width: 100%;
    background-color: #545C64;
    z-index: 100;
    color: white;

    .head-content {
      position: relative;
      height: 100%;
      width: 100%;
      z-index: 211;

      .icon-item {
        display: inline-block;
        padding: 0 12px;
        cursor: pointer;
        transition: 0.5s all;
      }

      .img-icon {
        height: 32px;
        margin: 4px 0;
        padding: 4px 12px;
        vertical-align: middle;
      }

      .text-icon {
        height: 40px;
        line-height: 40px;
      }

      .menu {
        transform: rotate(-90deg);
        float: left;
      }

      .menu-show {
        float: left;
        transform: rotate(-180deg);
      }

      .right-icon {
        float: right;
        height: 100%;
        line-height: 40px;

        .wind-mill {
          animation: rotateAll 1s linear 0s both infinite;
        }

        .wind-mill:hover {
          animation: none;
        }
      }
    }
  }
}
</style>
