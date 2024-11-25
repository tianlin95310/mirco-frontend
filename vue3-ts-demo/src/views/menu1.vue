<script setup lang="ts">
class Humen {
  name: string
  constructor(shortName: string) {
    this.name = shortName
  }
  say(): void
  say(age: number): void
  // say(age: number = 10): void;

  say(value: void | number): void {
    console.log(`super, my name is ${value}`)
  }
  say2(age: number = 10) {
    console.log(`super, my age is ${age}`)
  }
}
class Men extends Humen {
  constructor(name: string) {
    super(name)
  }
  say(): void {
    super.say()
    console.log(`my name is ${this.name}`)
  }
}
const humen = new Humen('world')
const lili = new Humen('lili')
const onBasic = () => {
  console.log(humen instanceof Humen, Object.getPrototypeOf(humen), Humen.prototype)
  humen.say()
}

/**
 * TS的继承
 */
const onExtends = () => {
  const kangkang = new Men('kangkang')
  console.log(Object.getPrototypeOf(kangkang), Men.prototype)
  console.log(kangkang instanceof Men, kangkang instanceof Humen)
  kangkang.say()
}
const onChongzai = () => {
  humen.say()
  humen.say.call(humen, 23)
  humen.say.apply(humen, [23])
  humen.say.bind(lili)()
  humen.say2(23)
  humen.say2.call(humen, 23)
  humen.say2.apply(humen, [23])
  humen.say2.bind(lili)(24)
}
const onOvervide = () => {
  const kangkang = new Men('kangkang')
  kangkang.say()
}
const onRuntimeType = () => {
  const f = new Humen('father')
  const c = new Men('child')
  f.say()
  c.say()
}

class MyDate extends Date {}
const baiscDate = () => {
  const date = new Date()
  // const date = Object.create(Date.prototype)
  console.log(date, date.constructor)
  console.log(date instanceof Date, Object.getPrototypeOf(date), Date.prototype)
}
const myDate = () => {
  let mydate = new MyDate()
  console.log(mydate, mydate.constructor)
  console.log(Object.getPrototypeOf(mydate), MyDate.prototype)
  console.log(mydate instanceof MyDate, mydate instanceof Date)
}
</script>

<template>
  <main>
    <button class="btn btn-primary" @click="onBasic">基本的类实现</button>
    <button class="btn btn-primary" @click="onExtends">继承</button>
    <button class="btn btn-primary" @click="onChongzai">重载</button>
    <button class="btn btn-primary" @click="onOvervide">重写</button>
    <button class="btn btn-primary" @click="onRuntimeType">多态</button>

    <div>
      <button class="btn btn-info" @click="baiscDate">普通的Date对象</button>
      <button class="btn btn-info" @click="myDate">继承date</button>
    </div>
  </main>
</template>
<style scoped>
.center {
  text-align: center;
  margin-top: 10px;
}
</style>
