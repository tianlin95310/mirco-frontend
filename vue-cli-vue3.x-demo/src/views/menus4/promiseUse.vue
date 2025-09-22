<template>
  <div class="promise-use page-container">

    <div class="border-card">
      <span>Promise的基本用法</span>
      <div>
        <button class="button" @click="funTest1">调用普通方法测试（不用await）</button>
        <button class="button" @click="funTest2">调用方法测试（全部用await）</button>
        <button class="button" @click="funTest3">调用方法测试（最后一步不用await）</button>
        <button class="button" @click="funTest4">调用方法测试（第一个不用await）</button>
        <button class="button" @click="defaultPromise">Promise的基本用法</button>

        <button class="button" @click="useWithAwait">Promise与async和await的结合使用</button>
      </div>
    </div>

    <div class="border-card">
      <span>Generator的基本用法</span>
      <div>
        <button class="button" @click="generator">generator用法</button>

        <button class="button" @click="generatorToArray">generatorToArray</button>

        <button class="button" @click="awaitFor">js await For</button>
      </div>
    </div>

    <div class="border-card">
      <span>Promise Api的基本用法</span>
      <div>
        <button class="button" @click="PromiseAll" title="有一个发生错误那么就会走reject状态">Promise.all</button>

        <button class="button" @click="PromiseAny" title="任意一个成功resolve">Promise.any</button>

        <button class="button" @click="PromiseRace" title="任意一个先走完取哪个值">Promise.race</button>
        <button class="button" @click="PromiseTry" title="同步异步统一错误处理">Promise.try</button>

        <button class="button" @click="PromiseAllSettled">Promise.AllSettled</button>
      </div>
    </div>

    <div class="border-card">
      <span>Promise的特殊用法</span>
      <div>
        <button class="button" @click="testSetTimeOut">各代码块执行顺序</button>
        <button class="button" @click="awaitAErrorPromise">await Promise Error</button>
        <button class="button" @click="NoReturnPromise" title="无返回Promise">无返回Promise</button>
        <button class="button" @click="selfPromise">自定义Promise</button>
      </div>
    </div>

  </div>
</template>
<script>
import { generatorToArray } from './utils/extentions.js'
export default {
  data() {
    return {
    }
  },
  created() {
    this.awaitFor()
  },
  methods: {
    selfPromise() {

    },
    async awaitFor() {
      const iterator = this.getgenerator3()
      let item
      do {
        item = iterator.next()
        if (item.value) {
          if (item.value instanceof Promise) {
            await item.value.then(console.log)
          } else {
            console.log(item.value)
          }
        }
        // console.log('item', item)
      } while (item && !item.done)
    },
    generatorToArray() {
      const items = generatorToArray(this.getgenerator3())
      console.log('generatorToArray items', items)
    },
    async getgenerator0(delay) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(1000)
        }, delay)
      })
    },
    async getgenerator1() {
      return 111
    },
    // async和*配合的作用时让Generator的每一步都返回的时Promise
    async * getgenerator2() {
      yield 222
      yield this.getgenerator1()
    },
    * getgenerator3() {
      yield 333
      yield this.getgenerator1()
      yield this.getgenerator1()
      yield this.getgenerator0(1000)
      yield 444
    },
    generator() {
      const promise1 = this.getgenerator1()
      const asyncgenerator2 = this.getgenerator2()
      const generator3 = this.getgenerator3()
      console.log('promise1', promise1, 'asyncgenerator2', asyncgenerator2, 'generator3', generator3)
      promise1.then(res => {
        console.log('promise1 then', res)
      })
      asyncgenerator2.next().then(res => {
        console.log('asyncgenerator2 next1', res)
      })
      asyncgenerator2.next().then(res => {
        console.log('asyncgenerator2 next2', res)
      })
      console.log('asyncgenerator2 1', asyncgenerator2.next())
      console.log('asyncgenerator2 2', asyncgenerator2.next())
      console.log('asyncgenerator2 3', asyncgenerator2.next())

      console.log('generator3 1', generator3.next())
      console.log('generator3 2', generator3.next())
      console.log('generator3 3', generator3.next())
      console.log('generator3 4', generator3.next())
      console.log('generator3 5', generator3.next())
      console.log('generator3 6', generator3.next())
    },
    async aNoReturnPromise() {
      const res = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('aNoReturnPromise')
        }, 1000)
      })
      return res
      // if not return res, the function will return underfined in sync thread
    },
    async NoReturnPromise() {
      this.aNoReturnPromise().then(res => {
        console.log('NoReturnPromise', res)
      })
      // await 非promise对象没有意义，
      const aw1 = (await 1000)
      console.log('aw1', aw1)
      await this.aNoReturnPromise().then(res => {
        console.log('NoReturnPromise', res)
      })
      const aw2 = await 2000
      console.log('aw2', aw2)
    },
    async awaitAErrorPromise() {
      try {
        const res = await this.promiseFun2()
        console.log('awaitAErrorPromise try', res)
      } catch (e) {
        console.log('e', e)
      }
      const res = await this.promiseFun2()
      // 代码终端
      console.log('awaitAErrorPromise uncatch', res)
    },
    PromiseTry() {
      const fun = () => {
        throw new Error('123')
      }
      Promise.try(fun).catch(err => {
        console.log(err)
      })
    },
    PromiseRace() {
      Promise.race([this.promiseFun1(), this.promiseFun2()]).then(res => {
        console.log('PromiseRace res', res)
      })
    },
    PromiseAny() {
      Promise.any([this.promiseFun1(), this.promiseFun2()]).then(res => {
        console.log('PromiseAny', res)
      })
    },
    promiseFun1() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(111)
        }, 2000)
      })
    },
    promiseFun2() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          reject(new Error('222'))
        }, 1000)
      })
    },
    PromiseAll() {
      Promise.all([this.promiseFun1(), this.promiseFun2()]).then(res => {
        console.log('PromiseAll res', res)
      })
    },
    PromiseAllSettled() {
      Promise.allSettled([this.promiseFun1(), this.promiseFun2()]).then(res => {
        console.log('PromiseAll res', res)
      })
    },
    testSetTimeOut() {
      console.log('testSetTimeOut start')
      process.nextTick(() => {
        console.log('process $nextTick 3')
      })
      new Promise(function (resolve, reject) {
        console.log('Promise1 pending')
        resolve('Promise1 resolve')
      }).then(res => {
        console.log('Promise1 then', res)
      })
      new Promise(function (resolve, reject) {
        console.log('Promise2 pending')
        setTimeout(() => {
          resolve('Promise2 resolve')
        }, 1000)
      }).then(res => {
        console.log('Promise2 then', res)
      })
      Promise.resolve(123).then(res => {
        console.log('Promise3 then', res)
      })
      console.log(process.env)
      setTimeout(() => {
        console.log('setTimeout handler 0 a')
      }, 0)
      process.nextTick(() => {
        console.log('process $nextTick 1')
      })
      setTimeout(() => {
        console.log('setTimeout handler 0 b')
      }, 0)
      setTimeout(() => {
        console.log('setTimeout handler 10')
      }, 10)
      process.nextTick(() => {
        console.log('process $nextTick 2')
      })
      console.log('testSetTimeOut end')
    },

    step1() {
      return new Promise(function (resolve, reject) {
        // 模拟延时
        setTimeout(() => {
          resolve('步骤1')
        }, 1000)
      })
    },
    // async will return a promise
    async useWithAwait() {
      const v1 = await this.step1()
      console.log(v1)

      const v2 = await this.step2()
      console.log(v2)
    },
    step2() {
      return new Promise(function (resolve, reject) {
        resolve('步骤2')
      })
    },
    fun() {
      return new Promise(function (resolve, reject) {
        const random = Math.ceil(Math.random() * 3)
        console.log(random)
        if (random === 1) {
          resolve('111')
        } else if (random === 2) {
          reject(Error('222'))
        } else {
          reject(Error('000'))
          // 没有调用resolve，reject时，函数就结束了，后面的then和catch都不会执行
        }
      })
    },
    defaultPromise() {
      this.fun()
        .then(res => {
          console.log('---defaultPromise then---', JSON.stringify(res))
        })
        .catch(res => {
          console.log('---defaultPromise catch---', JSON.stringify(res))
        })
    },
    async fun1() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('fun1')
        }, 1000)
      })
    },
    async fun2() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('fun2')
        }, 2000)
      })
    },
    async fun3() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('fun3')
        }, 2000)
      })
    },
    async funTest4() {
      // 此时不在等待3执行完，2会立马进度队列，会和fun2先后执行
      const value3 = this.fun3()
      value3.then(res => {
        console.log(res)
      })
      const value2 = await this.fun2()
      console.log(value2)
      const value1 = await this.fun1()
      console.log(value1)
    },
    async funTest3() {
      const value3 = await this.fun3()
      console.log(value3)
      const value2 = await this.fun2()
      console.log(value2)
      // 这种还是得等待
      const value1 = this.fun1()
      value1.then(res => {
        console.log(res)
      })
    },
    async funTest2() {
      // await这样的就是一个一个执行的，前面的执行完了，才到后面的
      const value3 = await this.fun3()
      console.log(value3)
      const value2 = await this.fun2()
      console.log(value2)
      const value1 = await this.fun1()
      console.log(value1)
    },
    funTest1() {
      const value3 = this.fun3()
      value3.then(res => {
        console.log(res)
      })
      const value2 = this.fun2()
      value2.then(res => {
        console.log(res)
      })
      const value1 = this.fun1()
      value1.then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.promise-use {}
</style>
