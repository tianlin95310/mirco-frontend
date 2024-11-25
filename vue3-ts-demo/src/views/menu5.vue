<script setup lang="ts">
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  public get value(): string {
    return this.name
  }
  public set value(name: string) {
    this.name = name
  }
  // 常见Symbol属性
  *[Symbol.iterator]() {
    console.log('this.name', this.name)
    for (let i = 0; i < this.name.length; i++) {
      yield this.name[i];
    }
  }
  // 定义类型转换
  // 返回原始值后，toString，valueOf不再继续调用
  // 通常Date 和 Symbol 对象是唯一重写 [@@toPrimitive]() 方法的对象。
  // [Symbol.toPrimitive](hint: string) {
  //   console.log('Symbol.toPrimitive, hint = ', hint)
  //   if (hint == 'number') {
  //     return 1000
  //   } else if (hint == 'default') {
  //     return -1;
  //   } else {
  //     return this.name + 'toPrimitive';
  //   }
  // }
  
  [Symbol.toStringTag]: string = 'Symbol.toStringTag';

  // toString() {
  //   console.log('222')
  //   return this.name.toString()
  // }
  valueOf() {
    return -100;
  }
}

const symbolInner = () => {
  let p1 = new Person('p1')
  let p2 = new Person('p2')
  console.log('Person[Symbol.hasInstance](p1) === p1 instanceof Person', Person[Symbol.hasInstance](p1), p1 instanceof Person)
  // 转number
  console.log(+p1)
  console.log(p1 + p2)
  console.log(p1 + {}, {} + p1)
  console.log(p1 + '100')
  console.log('100' + p1)
  console.log('p1 = ', p1, p1.toString())
}

const sa = Symbol('name')
const sb = Symbol()

const enObj = {
  name: 'tian',
  [sa]: 'tianlin',
  [sb]: 'lin'
}
// enObj[sa] = '111'
// enObj[sb] = '222'
const symbolUse = () => {
  let sc = Symbol('name')
  console.log('name', enObj.name, enObj[sa], enObj[sb])
  console.log('sc == sa', sc == sa)
}

interface Men {
  name: string,
}
interface Fingers {
  height: number;
  wight: number
}
const map = () => {
  let map = new Map<string, Men>()
  map.set('p1', {
    name: 'tian'
  })
  // map['111'] = {
  //   name: 'tian'
  // }
  map.forEach(console.log)
  console.log('map.keys()', map.keys())
  console.log('map.values()', map.values())
  // Entry作为Map的内置存贮对象
  console.log(map.entries())

  let km2:any = {
    name: 'lisi'
  }
  let map2 = new Map<Men, Fingers>();
  map2.set(km2, {
    height: 180,
    wight: 70
  })
  console.log('map2', map2);
  km2 = null;
  console.log('map2', map2);

  let wap = new WeakMap();
  // weap的key必须是onject
  // wap.set(1, 111);
  let obj = {
    name: 'zhangsan'
  }

  let obj2: any = {}
  wap.set(obj, {
    wight: 60,
    height: 100
  })
  wap.set(obj2, {
    wight: 60,
    height: 100
  })
  console.log(wap, wap.has(obj), wap.has(obj2))
  // obj2 = undefined;
  obj2 = null;
  console.log(wap, wap.has(obj), wap.has(obj2))
}

const objectUse = () => {
  let key = new Date();
  let obj = {
    key: '111'
  }
  // object的key必须是string或者symbol
  // obj的key是无序的
  // console.log(obj[key])
  console.log(obj)

  let v2 = new Object()
  // v2.p1 = 123;
}
</script>

<template>
  <div class="menu5">
    <button class="btn btn-info" @click="symbolUse">Symbol的使用</button>
    <button class="btn btn-info" @click="symbolInner">内置Symbol与js类型转换</button>
    <button class="btn btn-info" @click="map">Map和Weak Map(弱引用)</button>

    <button class="btn btn-info" @click="objectUse">object的用法</button>

  </div>
</template>

<style>
.menu5 {
  width: 100%;
}
</style>
