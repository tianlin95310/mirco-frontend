<template>
  <div class="algorithm page-container">
    <div class="scroll-bar" style="height: 200px;overflow: auto;">
      <h2>列表得到笛卡尔积（组合）</h2>
      {{ combine() }}
    </div>

    <div class="scroll-bar" style="height: 200px;overflow: auto;">
      <h2>列表数据得到树形数据</h2>
      {{ treeData() }}
    </div>

    <div>
      <h2>数字的装换</h2>
      {{ NumberToText(123456789.123456) }}
    </div>
    <div>
      <h2>表达式解析出表达式里的规则</h2>
      {{ getRulesInExp('{50 - #11 + #1 + 100 > 10} and #2 or {#3 / 2 > #4} and {#1 > #2}') }}
    </div>

    <div>
      <h2>计算表达式</h2>
      <input v-model="calcExp" @input="beginCalcExpValue">={{ calcRes }}
      <button @click="beginCalcExpValue">计算表达式</button>
    </div>

    <div>
      <h2>计算children最大层级</h2>
      {{ calculationLevelFun() }}
    </div>
  </div>
</template>
<script setup>
import { Cartesian } from './util/Algorithm'
import { treeDataTranslate } from './util/TreeData'
import NumberToText from './util/NumberToText.js'
import { calculationLevel } from './util/Deepth.js'
import { ref } from 'vue';

const orderMap = {
  '*': 1,
  '/': 1,
  '+': 2,
  '-': 2
}
const calcExp = ref('1+2 * 3 + 4 / 2+5-4+2*3')
const calcRes = ref('')

const beginCalcExpValue = () => {
  calcRes.value = calcExpValue(calcExp.value)
}
const calcFun = new Function('p1', 'p2', 'calc', 'const exp = `${p1} ${calc} ${p2}`; console.log(\'执行运算\', exp); return eval(exp)')

const calcExpValue = (exp) => {
  exp = exp.replace(/ /g, '')
  console.log('calcExpValue', exp)
  const calcsReg = /[+|\-|*|/]/g
  const calcNumers = exp.split(calcsReg)
  const calcs = exp.match(calcsReg) || []
  console.log('calcNumers', calcNumers, calcs)
  if (calcNumers.filter(item => !!item).length !== calcs.length + 1) {
    return false
  }
  if (calcs.length <= 1) {
    const result = calcFun(calcNumers[0], calcNumers[1], calcs[0])
    console.log('result', result)
    return result
  } else {
    const calcsMap = calcs.map((item, index) => ({
      operate: item,
      index
    }))
    // const calcSortMap = calcsMap.sort((a, b) => orderMap[a.operate] - orderMap[b.operate])
    // const calc = calcSortMap[0]
    let calc = calcsMap[0]
    calcsMap.forEach(element => {
      if (orderMap[element.operate] < orderMap[calc.operate]) {
        calc = element
      }
    })
    const originIndex = calc.index
    const p1 = calcNumers[originIndex]
    const p2 = calcNumers[originIndex + 1]
    const midValue = calcFun(Number(p1), Number(p2), calc.operate)
    const expNew = exp.replace(`${p1}${calc.operate}${p2}`, midValue)
    return calcExpValue(expNew)
  }

}
const calculationLevelFun = () => {
  const array = [{
    value: 1,
    children: [{
      value: 1,
      children: [{
        value: 1
      }]
    }]
  }, {
    value: 1,
    children: [{
      value: 1,
      children: [{
        value: 1,
        children: [{
          value: 1
        }]
      }]
    }]
  }, {
    value: 1
  }]
  return calculationLevel(array)
}
const getRulesInExp = (exp) => {
  // g包围可以进行全局匹配，即可以匹配多个
  const reg = /#[\d]+/g
  console.log(reg.test(exp))
  console.log(exp.match(reg))
}
const treeData = () => {
  const array = [
    {
      id: 1,
      parentId: '0'
    },
    {
      id: 2,
      parentId: '0'
    },
    {
      id: 3,
      parentId: '0'
    },
    {
      id: 4,
      parentId: '2'
    },
    {
      id: 5,
      parentId: '2'
    },
    {
      id: 6,
      parentId: '3'
    }
  ]
  return treeDataTranslate(array)
}
const combine = () => {
  const array = [
    ['a', 'b'],
    [1, 2, 3],
    ['x', 'y']
  ]
  return Cartesian(array)
}
</script>

<style lang="scss" scoped>
.algorithm {
  >div {
    vertical-align: top;
    display: inline-block;
    width: 33%;
    white-space: pre;
    word-break: break-all;
  }
}
</style>
