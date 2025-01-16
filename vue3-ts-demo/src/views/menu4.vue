<script setup lang="ts">
import { ref, reactive, readonly, shallowRef, shallowReactive } from 'vue'
import VModelChild1 from '@/components/VModelChild1.vue'
import AsyncComponent from '@/components/AsyncComponent.vue'
let v1 = 100
let v2 = ref(100)
let v3 = reactive({
  v31: 100,
  v32: ref(100),
  v33: [1, 2, 3],
  v34: ref([1, 2, 3])
})

// 如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。
const v4 = ref({
  v41: 100,
  v42: ref(100)
})
const v5 = shallowRef({
  v51: 100,
  v52: ref(100)
})

const v6 = shallowReactive({
  v61: 100,
  v62: ref(100)
})
const change = (type: any) => {
  if (type >= 1) {
    v1++
  }
  if (type >= 2) {
    v2.value++
  }
  if (type >= 3) {
    v3.v31++
    v3.v32++
    v3.v33.push(1)
    v3.v34.push(1)
  }
  if (type >= 4) {
    v4.value.v41++
    v4.value.v42++
  }
  if (type >= 5) {
    // 不在模板里不会解包
    v5.value.v51++
    v5.value.v52.value++
  }
  if (type >= 6) {
    // Reactive会解包，但是深层不解包
    v6.v61++
    v6.v62.value++
  }
}
const inputValue = ref(0)

const $ = function (id: string) {
  return document.getElementById(id)
}
// 代码块
const vue2Value = {
  v1: 100
}
{
  const witcher = {
  w1: () => {
    if ($('vue2')) {
      $('vue2')!.innerHTML = String(vue2Value.v1)
    }
  }
}
Object.defineProperty(vue2Value, 'v2', {
  // configurable: true,
  enumerable: true,
  get() {
    console.log('get')
    witcher.w1()
    return this.v1
  },
  set(v) {
    console.log('set')
    this.v1 = v
  }
})
}
const vue2 = () => {
  vue2Value.v2++
}

const obj3 = {
  a: 10
}
// 副作用
const effets: object = {}

const track = (target: any, key: string | symbol) => {
  effets[`$target$key`] = () => {
    if ($('vue3')) {
      $('vue3')!.innerHTML = String(vue3Obj.a)
    }
    if ($('vue3ref')) {
      $('vue3ref')!.innerHTML = String(vue3Obj2.value)
    }
  }
}
const trigger = (target: any, key: string | symbol) => {
  effets[`$target$key`]();
}
const vue3Obj = new Proxy(obj3, {
  get (target: any, key) {
    track(target, key)
    return target[key]
  },
  set (target: any, key: string | symbol, value: any, receiver: any) : boolean {
    target[key] = value
    trigger(target, key)
    return true
  }
})
// Proxy.revocable
const myRef = function(value: any) {
  const refObj = {
    get value() {
      track(refObj, 'value')
      return value
    },
    set value(newValue: any) {
      // this.value会触发get，
      console.log('set value 1', this.value);
      // 用这种方式巧妙的避免了递归赋值
      value = newValue
      // this.value = newValue
      console.log('set value 2', this.value);
      trigger(refObj, 'value')
    }
  }
  return refObj;
}
const vue3Obj2 = myRef(100);

const vue3 = () => {
  vue3Obj.a++
}
const vue3Ref = () => {
  vue3Obj2.value++;
}
</script>
<template>
  <div class="menu4" @click="change">
    <div>
      <h4>选项式API</h4>
      <div @click="change(1)">single v1 = {{ v1 }}</div>
      <div @click="change(2)">single v2 = {{ v2 }}</div>
      <div @click="change(3)">
        single v3 = {{ v3 }}, v3.v31 = {{ v3.v31 }}, v3.v32 = {{ v3.v32 }}, v3.v33 = {{ v3.v33 }},
        v3.v34 = {{ v3.v34 }}
      </div>

      <div @click="change(4)">
        single v4 = {{ v4 }}, v4.v41 = {{ v4.v41 }}, v4.v42 = {{ v4.v42 }}
      </div>

      <!-- v52不会深层解包,即使在模板里,v5能解包 -->
      <div @click="change(5)">
        single v5 = {{ v5 }}, v5.v51 = {{ v5.v51 }}, v5.v52 = {{ v5.v52 }}
      </div>

      <div @click="change(6)">
        single v6 = {{ v6 }}, v6.v61 = {{ v6.v61 }}, v6.v62 = {{ v6.v62 }}
      </div>
    </div>

    <div class="row">
      <div class="card">
        <h4 v-randomColor>V-model</h4>
        <div>
          <div>input value is: {{ inputValue }}</div>
          <VModelChild1 v-model="inputValue"></VModelChild1>
        </div>
      </div>

      <div class="card">
        <h4>异步组件</h4>
        <Suspense>
          <AsyncComponent></AsyncComponent>
          <template #fallback> Suspense loadding... </template>
        </Suspense>
      </div>

      <div class="card">
        <button class="btn btn-info" @click="vue2">Vue2响应性模拟</button>
        <span id="vue2"></span>
      </div>

      <div class="card">
        <button class="btn btn-info" @click="vue3">Vue3响应性模拟 Reactive</button>
        <span id="vue3"></span>
      </div>

      <div class="card">
        <button class="btn btn-info" @click="vue3Ref">Vue3响应性模拟 ref</button>
        <span id="vue3ref"></span>
      </div>
    </div>
  </div>
</template>

<style>
</style>
