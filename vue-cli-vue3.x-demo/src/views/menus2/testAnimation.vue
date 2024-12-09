<template>
  <div class="test-animation page-container">
    <h2>测试Animation动画，定义一组的transform</h2>
    <div class="img">
      <img src="../../assets/logo.png" :class="initImg" />

      <!--对于v-bind:style绑定animation的时候，需要将绑定的内容用一个对象包起来-->
      <img src="../../assets/logo.png" class="demo-img" v-bind:style="currentAnim" />

    </div>
    <div>
      <button class="button" @click="begin">开始动画</button>
    </div>

    <div>
      <button class="button" @click="raf">requestAnimationFrame</button>
    </div>

    <ul class="anims scroll-bar">
      <li v-for="(item, index) in anims" :key="index" @click="testAnim(index)">
        [{{ index + 1 }}] {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, toRefs } from 'vue'

const state = reactive({
  anim: false,
  anims: [
    'fadein',
    'fadeinT',
    'fadeinR',
    'fadeinB',
    'fadeinL',
    'fadeout',
    'fadeoutT',
    'fadeoutR',
    'fadeoutB',
    'fadeoutL',
    'bounce',
    'bouncein',
    'bounceinT',
    'bounceinR',
    'bounceinB',
    'bounceinL',
    'bounceout',
    'bounceoutT',
    'bounceoutR',
    'bounceoutB',
    'bounceoutL',
    'rotatein',
    'rotateinLT',
    'rotateinLB',
    'rotateinRT',
    'rotateinRB',
    'rotateout',
    'rotateoutLT',
    'rotateoutLB',
    'rotateoutRT',
    'rotateoutBR',
    'flip',
    'flipinX',
    'flipinY',
    'flipoutX',
    'flipoutY',
    'flash',
    'shake',
    'swing',
    'wobble',
    'ring',
    'showinT',
    'hideinT',
    'autoShake'
  ],
  currentAnim: {
    animation: null
  },
  index: 0,
  zIndex: 1
})
const { currentAnim, anims } = toRefs(state)
const initImg = computed(() => {
  if (state.anim) {
    return 'initImg initImg-active'
  } else {
    return 'initImg'
  }
})
const raf = () => {
  requestAnimationFrame(() => {
    console.log('requestAnimationFrame')
  })
  nextTick(() => {
    console.log('nextTick')
  })
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
}
const testAnim = (index) => {
  state.index = index
  const ca = `${state.anims[state.index]} 1s both`
  console.log('testAnim', ca)
  state.currentAnim = {
    animation: ca
  }
  state.zIndex++
}
const begin = () => {
  state.anim = !state.anim
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/anim.css";

@keyframes autoShake {
  0% {
    transform: scale(1)
  }

  70%,
  73% {
    transform: scale(0.9) rotate(-1deg)
  }

  77%,
  83%,
  90%,
  97% {
    transform: scale(1.1) rotate(1deg)
  }

  80%,
  87%,
  93% {
    transform: scale(1.1) rotate(-1deg)
  }

  100% {
    transform: scale(1) rotate(0)
  }
}

.test-animation {
  position: relative;

  .img {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    img {
      width: 100px;
      height: 100px;
      display: inline-block;

      &:last-child {
        margin-right: 150px;
      }
    }
  }

  .anims {
    border-radius: 10px 0 0 10px;
    position: fixed;
    height: 70%;
    background: var(--colorInfo);
    top: 15%;
    right: 40px;
    list-style: none;
    overflow-y: auto;
    border: 1px solid gainsboro;

    li {
      padding: 8px;
      cursor: pointer;
    }

    li:hover {
      background-color: var(--colorAccent);
    }
  }

  .initImg {
    width: 200px;
    height: 200px;
  }

  .initImg-active {
    animation: autoShake 1s both infinite;
  }
}
</style>
