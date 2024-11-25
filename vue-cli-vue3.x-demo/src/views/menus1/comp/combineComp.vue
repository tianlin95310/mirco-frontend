<template>
  <div class="combine-comp">
    <div>
      <button class="button" @click="callParFun">调用父组件方法</button>
    </div>
    <span>{{ d3 }}──</span>
    <span>{{ d31 }}</span>──
    <span>{{ d32 }}</span>──
    <span>{{ d33 }}</span>──
    <span @click="d32Copy++">{{ d32Copy }}</span>──
    <span @click="d33Copy += 'a'">{{ d33Copy }}</span>
  </div>
</template>

<script>
import { toRef, ref, watch } from 'vue'
export default {
  name: 'CombineComp',
  props: {
    d3: {
      type: Object,
      default() {
        return {
          d31: null,
          d32: null,
          d33: null
        }
      }
    },
    d31: {
      type: Number,
      default: 100
    },
    d32: {
      type: Number,
      default: 100
    },
    d33: {
      type: String,
      default: '100'
    }
  },
  setup(props, { emit, expose }) {
    // let
    const callParFun = () => {
      console.log('childOnSpan1Click')
      emit('parFun')
    }
    // props's d33 is readonly
    const d33Copy = toRef(props, 'd33')

    const d32Copy = toRef(props.d3, 'd32')
    // 这样取值会丢失掉props中d3的响应性
    // const d33C2 = props.d3.d32

    const childFun = (val) => {
      console.log('childFun', val)
      d32Copy.value++
    }

    const click = () => {
      alert('combineComp')
    }

    expose({
      childFun,
      click
    })
    watch([() => props.d32], ([d32]) => {
      console.log('watch d32 changed', d32)
    })
    return {
      callParFun,
      d33Copy,
      d32Copy
    }
  }
}

</script>

<style>
.combine-comp {
  background-color: aquamarine;
}
</style>
