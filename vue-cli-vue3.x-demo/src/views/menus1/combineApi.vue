<template>
  <div class="combine-api page-container">

    <div class="flex-ver-center-wrap" style="align-items: flex-start;">
      <div style="flex: 1;">
        <h1>{{ title }}</h1>
        <div v-for="(item, index) in listData" :key="index">{{ item.key }}</div>
        <div @click="d1++">
          d1 = {{ d1 }}
        </div>
        <div @click="d2++">
          d2 = {{ d2 }}
        </div>
        <div @click="d22++">
          d22 = {{ d22 }}
        </div>
        <div>
          d3 = <span @click="d3.d31++">{{ d3.d31 }}</span>──<span @click="d3.d32++">{{ d3.d32 }}</span>──<span @click="d3.d33 += 'a'">{{ d3.d33 }}</span>
        </div>
        <div @click="d4++">
          d4 = {{ d4 }}
        </div>
        <div>
          d5 = <span @click="d5.d31.value++">{{ d5.d31 }}</span>──<span @click="d5.d32++">{{ d5.d32 }}</span>──<span @click="d5.d33 += 'a'">{{ d5.d33 }}</span>
        </div>
        <div>
          ...d5 = <span @click="d31++">{{ d31 }}</span>──<span @click="d32++">{{ d32 }}</span>──<span @click="d33 += 'a'">{{ d33 }}</span>
        </div>
        <div>
          d6 = <span @click="d6.d61.d611++">{{ d6.d61.d611 }}</span>──<span @click="d6.d62++">{{ d6.d62 }}</span>
        </div>
        <div>
          props = {{ prop1 }} {{ prop2 }}
        </div>

      </div>

      <div style="flex: 1">

        <button class="button" @click="callChildFun">调用子组件方法1</button>

        <button class="button" @click="callChildFunction">调用子组件示方法2</button>
        <CombineComp ref="combineComp" :d3="d3" :d31="d31" :d32="d32" :d33="d33" @parFun="parFun"></CombineComp>

        <CombineCompSetup ref="combineCompSetup" @parFun="parFun"></CombineCompSetup>

        <CombineCompcRefReactive></CombineCompcRefReactive>
      </div>
    </div>
  </div>
</template>
<script>
import {
  onBeforeMount,
  onMounted,
  ref,
  reactive,
  toRefs,
  toRef,
  isReactive,
  isReadonly,
  isRef,
  isProxy,
  isRuntimeOnly,
  shallowReactive,
  getCurrentInstance
} from 'vue'
import {
  getListData
} from '@/http/api'

import CombineComp from './comp/combineComp.vue'
import CombineCompSetup from './comp/combineComp_setup.vue'
import CombineCompcRefReactive from './comp/combineComp_ref_reactive.vue'
export default {
  name: 'CombineApi',
  components: {
    CombineComp,
    CombineCompSetup,
    CombineCompcRefReactive
  },
  props: {
    prop1: {
      type: String,
      default: '123'
    },
    prop2: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, {
    emit,
    expose
  }) {
    // vue3 ref的使用方式1
    const combineComp = ref(null)
    const d1 = 111
    // 基本类型的响应式通过ref创建,在顶层时自动解包
    const d2 = ref(222)
    // reactive 无法创建基本类型的响应式,只能创建对象类的响应式，并且是深层次的，深层的基本类型也能是响应式的，如d31
    const d22 = reactive(222)
    const d3 = reactive({
      d31: 31,
      d32: ref(32),
      d33: String('haha')
    })
    // 得到d3的d31的ref对象，改变d3.d31会影响d4,改变d4也会影响到d3的d31，属于是拿到一个对象响应式属性的副本，而不会破坏d3的响应性
    const d4 = toRef(d3, 'd31')
    // const d4 = d3

    // toRefs会将对象所有已有属性的响应式对象赋给一个新的普通对象，该对象在模板代码不会自动解包(因为当前响应式对象不是顶层对象)，解构该对象不会失去向响应性,内部的每个对象都是Ref
    const d5 = toRefs(d3)

    // shallowReactive不会产生深层次的响应性
    const d6 = shallowReactive({
      d61: {
        d611: 100
      },
      d62: 100
    })
    const context = getCurrentInstance()
    console.log('combineApi context', context, combineComp)
    // onMounted后才能调用此方法
    // context.refs.combineComp.click()
    // context.refs.combineCompSetup.click()

    console.log('d1 ', d1, 'isReactive =', isReactive(d1), 'isReadonly =', isReadonly(d1), 'isRef =', isRef(d1), 'isProxy =', isProxy(d1))
    console.log('d2 ', d2, 'isReactive =', isReactive(d2), 'isReadonly =', isReadonly(d2), 'isRef =', isRef(d2), 'isProxy =', isProxy(d2))
    console.log('d22 ', d22, 'isReactive =', isReactive(d22), 'isReadonly =', isReadonly(d22), 'isRef =', isRef(d22), 'isProxy =', isProxy(d22))

    console.log('d3 ', d3, 'isReactive =', isReactive(d3), 'isReadonly =', isReadonly(d3), 'isRef =', isRef(d3), 'isProxy =', isProxy(d3))
    console.log('d31 ', d3.d31, 'isReactive =', isReactive(d3.d31), 'isReadonly =', isReadonly(d3.d31), 'isRef =', isRef(d3.d31), 'isProxy =', isProxy(d3.d31))
    console.log('d32 ', d3.d32, 'isReactive =', isReactive(d3.d32), 'isReadonly =', isReadonly(d3.d32), 'isRef =', isRef(d3.d32), 'isProxy =', isProxy(d3.d32))

    console.log('d4 ', d4, 'isReactive =', isReactive(d4), 'isReadonly =', isReadonly(d4), 'isRef =', isRef(d4), 'isProxy =', isProxy(d4))
    console.log('d5 ', d5, 'isReactive =', isReactive(d5), 'isReadonly =', isReadonly(d5), 'isRef =', isRef(d5), 'isProxy =', isProxy(d5))
    console.log('d5.d31 ', d5.d31, 'isReactive =', isReactive(d5.d31), 'isReadonly =', isReadonly(d5.d31), 'isRef =', isRef(d5.d31), 'isProxy =', isProxy(d5.d31))
    console.log('d5.d32 ', d5.d32, 'isReactive =', isReactive(d5.d32), 'isReadonly =', isReadonly(d5.d32), 'isRef =', isRef(d5.d32), 'isProxy =', isProxy(d5.d32))

    console.log('d6 ', d6, 'isReactive =', isReactive(d6), 'isReadonly =', isReadonly(d6), 'isRef =', isRef(d6), 'isProxy =', isProxy(d6))
    console.log('d6.d61 ', 'isReactive =', d6.d61, isReactive(d6.d61), 'isReadonly =', isReadonly(d6.d61), 'isRef =', isRef(d6.d61), 'isProxy =', isProxy(d6.d61))
    console.log('d6.d61.d611 ', 'isReactive =', d6.d61.d611, isReactive(d6.d61.d611), 'isReadonly =', isReadonly(d6.d61.d611), 'isRef =', isRef(d6.d61.d611), 'isProxy =', isProxy(d6.d61.d611))

    console.log('props ', props, 'isReactive =', isReactive(props), 'isReadonly =', isReadonly(props), 'isRef =', isRef(props), 'isProxy =', isProxy(props))
    console.log('prop1 ', props.prop1, 'isReactive =', isReactive(props.prop1), 'isReadonly =', isReadonly(props.prop1), 'isRef =', isRef(props.prop1), 'isProxy =', isProxy(props.prop1))
    const parFun = () => {
      console.log('parFun called')
      d3.d31++
    }
    const callChildFun = () => {
      // vue3 ref的使用方式1
      combineComp.value.childFun(-1)
    }

    const callChildFunction = () => {
      console.log('context.refs.combineComp', context.refs.combineComp)
      // vue3 ref的使用方式2
      context.refs.combineComp.click()
      context.refs.combineCompSetup.click()
    }

    const state = reactive({
      listData: [],
      title: ref('组合式API'),
      parFun,
      callChildFun,
      combineComp,
      callChildFunction
    })
    getListData().then(res => {
      console.log('setup getListData', res)
      state.listData = res
    })

    onMounted(() => {
      // this.listData = [{ key: 100 }, { key: 200 }]
      console.log('combineApi onMounted')
      state.listData = [{
        key: 'onMounted'
      }]
      // context.refs.combineComp.click()
      // context.refs.combineCompSetup.click()
    })
    onBeforeMount(() => {
      console.log('combineApi onBeforeMount')
      state.listData = [{
        key: 'onBeforeMount'
      }]
    })
    return {
      ...toRefs(state),
      d1,
      d2,
      d22,
      d3,
      d4,
      d5,
      ...d5, // 结构对象不会失去响应性，每个单独对象保留响应性
      d6
    }
  }
}
</script>

<style lang="scss" scoped>
.combine-api {
  font-size: 1.2em;
  line-height: 1.5;

  // scoped会影响子组件的span样式
  span {
    cursor: pointer;
  }
}
</style>
