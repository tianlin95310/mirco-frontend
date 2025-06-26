<script setup lang="ts">
// 外部木块
import AModule from 'AModule'
// 引用内部模块
import { Request } from '../module/moduleRaw.js'
// 扩展内部模块
import('../module/moduleExt')

// interface定义简单类型
interface XiaoXuesheng {
  name: string;
  age: number;
}
// XiaoXueshengA和XiaoXueshengC自动实现了XiaoXueshengC
class XiaoXueshengA {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.age = age
    this.name = name
  }
}
class XiaoXueshengB {
  name: string;
  age: number;
  constructor(obj: XiaoXuesheng) {
    this.age = obj.age
    this.name = obj.name
  }
}
class XiaoXueshengC {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.age = age
    this.name = name
  }
}

const objectAsAinterface = () => {
  // XiaoXuesheng和XiaoXueshengA的属性相同，认定为同一类型
  const xxs3: XiaoXuesheng = new XiaoXueshengA('xiaoming', 11)
  const xxs2: XiaoXueshengA = new XiaoXueshengA('xiaoming', 11)
  const xxs1: XiaoXueshengC = new XiaoXueshengC('tianlin', 10)
  // XiaoXueshengA可以作为XiaoXuesheng传给XiaoXueshengB的构造函数
  const xxs4: XiaoXueshengB = new XiaoXueshengB(xxs2)
  // 对象的结构相同认定为同一个类型
  const xxs5: XiaoXueshengB = new XiaoXueshengB({
    age: 13,
    name: 'tian'
  })
  console.log('xxs1', xxs1, 'xxs2', xxs2, 'xxs3', xxs3, 'xxs4', xxs4, 'xxs5', xxs5)
}

// type定义组合类型
type booleanType = true | false

type jsEnum = 1 | 3 | 5 | 7 | 9
// 类型组合
type StringOrNumber = number | string | booleanType
// 定义泛型相关
type NumberArray = Array<string>
const typeUse = () => {
  // a的值类型只能取 true | false
  // const a:booleanType = 1
  const a: booleanType = true

  // const b:jsEnum = 2
  const b: jsEnum = 5

  const c: StringOrNumber = '123'

  // const d:NumberArray = [1, 3, 5, '7']
  const d: NumberArray = ['1', '3', '5', '7']
  console.log('a', a, 'b', b, 'c', c, 'd', d)
}
declare var a: number;

const moduleUse = () => {
  const a: AModule.Request = {
    url: 'haha'
  }
  const b: Request = new Request('www://')
  b.hello()
  console.log('a', a, 'b', b)
}

interface Canvas {
}
// 作为接口层实现
interface Component {
  onDraw(canvas: Canvas): void
}
class RectComponent implements Component {
  onDraw(canvas: Canvas) {
    console.log('我是RectComponent', canvas)
  }
}
const interfaceClass = () => {
  const component1: Component = new RectComponent()
  component1.onDraw({})
}

// 关于泛型函数定义
type TypeOrUndefined<T> = T | undefined
type PromiseOr<T> = TypeOrUndefined<T> | Promise<TypeOrUndefined<T>>

function onLoad<V>(params: Map<string, V>): PromiseOr<V> {
  if (params.has('key')) {
    return params.get('key')
  } else {
    const value: TypeOrUndefined<V> = params.get('reslove')
    return Promise.resolve(value)
  }
}

const funUsecase = () => {
  const map = new Map()
  map.set('key', 'hello')
  const a = onLoad(map)
  map.set('key', true)
  const b = onLoad(map)
  map.delete('key')
  map.set('reslove', 'tianlin')
  const c = onLoad(map)
  console.log('a', a, 'b', b, 'c', c)
  const array = []
  array.push(a, b, c)
  array.forEach(item => {
    if (item instanceof Promise) {
      item.then(console.log)
    } else {
      console.log('item', item)
    }
  })
}

</script>

<template>
  <pre>
    1，ts类型没有具体运行时含义，一个obj可以同属于其他的类型
    2，能使用interface尽量使用interface，需要使用复杂数据才使用type
    3，只要给出的对象属性满足需要的对象的属性，ts就会认为类型兼容，可以增加属性，相当于对父类的扩充
  </pre>

  <div class="about">
    <button class="btn btn-primary" @click="objectAsAinterface">interface定义类型</button>
    <button class="btn btn-primary" @click="typeUse">type的使用</button>
    <button class="btn btn-primary" @click="moduleUse">模块的使用</button>
    <button class="btn btn-primary" @click="interfaceClass">interface定义接口</button>
    <button class="btn btn-primary" @click="funUsecase">泛型函数</button>

  </div>
</template>

<style></style>
