<template>
  <div class="page-container">
    <h2>关于函数的一些操作，对象属性操作是"引用"传递的</h2>
    <div>
      <button class="button" @click="change">作为新参传递</button>
      <button class="button" @click="defArg">函数默认参数</button>
    </div>

    <div>
      <button class="button" @click="defineAClass">函数作为类的实现体</button>
      <button class="button" @click="ex5Extends">ES5继承（原型链继承）</button>
      <button class="button" @click="callExtends">ES5继承（构造继承）</button>
      <button class="button" @click="combineExtends">ES5继承（组合寄生继承）</button>
      <button class="button" @click="ex6Extends">ES6继承</button>
    </div>

    <div>
      <button class="button" @click="objectProto">Object的原型</button>
      <button class="button" @click="objectProtoConst">对象的原型对象</button>
      <button class="button" @click="funProto">函数的原型</button>
      <button class="button" @click="FunctionUse">Function与function</button>
    </div>

    <div>
      <button class="button" title="属性上直接添加闭包函数" @click="getInstance">JS单例模式方式1</button>
      <button class="button" title="class添加静态方法" @click="getInstanceStatic">JS单例模式方式2</button>
    </div>

    <div>
      <button class="button" @click="debounce">防抖函数的实现（手动）</button>
      <button class="button" @click="throttle">节流函数的实现（手动）</button>
      <button class="button" @click="debounceAPI">防抖函数的实现（API）</button>
      <button class="button" @click="throttleAPI">节流函数的实现（API）</button>
    </div>
    <div>
      <button class="button" @click="bindcallapply">bindcallapply的区别</button>
      <button class="button" @click="bindcallapplyuse">bindcallapply的细节</button>
      <button class="button" @click="arrowFun">箭头函数</button>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import { throttle, debounce } from 'lodash'
  import { debounceS, throttleS } from './utils'
  import { People, User } from './utils/classSingleInstance.js'

  export default {
    data() {
      return {
        debounceFun: null,
        throttleFun: null,
        debounceSelf: null,
        throttleSelf: null
      }
    },
    created() {
      // api需要用这种function的写法，得到一个函数体，调用的时候都是调用这个函数体对象，保证了是同一个对象
      // 就能进行debounce内部的逻辑判断
      this.debounceFun = debounce(this.callback, 500)
      // trailing不为false的话则会再末尾又执行一次
      this.throttleFun = throttle(this.callback, 2000, {
        trailing: false
      })
      this.debounceSelf = debounceS(this.callback, 500)
      this.throttleSelf = throttleS(this.callback, 2000)
    },
    methods: {
      arrowFun() {
        let a = () => {
          this.a = 100
          console.log(arguments)
          console.log(this)
          debugger
        }
        a.call()
      },
      fun100() {
        console.log('fun100', arguments, this, new.target)
      },
      bindcallapplyuse() {
        console.log(this.fun100, this.fun100.prototype)
        // 直接调用new.target为空
        this.fun100()
        // new调用则是函数自身
        new this.fun100()
      },
      bindcallapply() {
        // this.fun100.call(11, 'aa', 'aaa')
        // this.fun100.bind(22, 'bb', 'bbb')
        // this.fun100.bind(22, 'bb', 'ccc')()
        // this.fun100.apply(33)

        let obj1 = {
          v: 100,
          fun: function() {
            console.log('fun100')
            console.log(arguments)
            console.log(this.v)
            console.log(this)
          }
        }
        let obj2 = {
          v: 10
        }
        obj1.fun.call(obj2, 100, 200)
        obj1.fun.apply(obj2, [100])
        obj1.fun.apply(this)
      },
      FunctionUse() {
        console.log('Function', Function)
        console.log('Function.prototype', Function.prototype)
        console.log('Function.__proto__', Function.__proto__)

        console.log('Object', Object)
        console.log('Object.prototype', Object.prototype)
        console.log('Object.__proto__', Object.__proto__)

        let obj = {}
        console.log('obj', obj)
        console.log('obj.__proto__', obj.__proto__)

        console.log('Function instanceof Object', Function instanceof Object)
        console.log('Object instanceof Function', Object instanceof Function)
        Function.a = '123';

        // Function使用字符串构造成函数
        let funa = new Function('console.log(\'执行字符串代码\');return \'Function\'');
        // 普通函数
        let funb = function() {
          console.log('latest this', this)
          // this.name = 'hello'
          return 'hello'
        }
        // 匿名函数构造对象1
        let func = new (function(){
          this.name = 'hello'
        });
        // 匿名函数构造对象2
        let fund = new function(){
          this.name = 'hello'
        };
        // 匿名函数构造对象3
        let fune = new function(){
          this.name = 'hello'
        }();
        // E函数构造对象
        let funf = new function E(){
          this.name = 'hello'
        };
        let objg = new funb();

        (function() {
          console.log('匿名自执行函数')
        })();
        console.log('funa,funb,func,fund,fune,funf,objg = ', typeof funa, typeof funb, typeof func, typeof fund, typeof fune, typeof funf, typeof objg)
        console.log('funa,funb,func,fund,fune,funf,objg = ', funa(), funb(), func, fund, fune, funf, objg)
      },
      funProto() {
        console.log(Date)
        // 函数对象求原型对象是一个函数
        console.log(Object.getPrototypeOf(Date), Date.__proto__)
        // 函数的原型对象包含constructor和原型对象的原型对象的引用
        console.log(Date.prototype)
        // 函数的原型对象的原型对象是Object的原型对象
        console.log(Date.prototype.__proto__)
        let Afun = () => {
          this.age = 10
        }
        debugger
        console.log(new Afun())
        console.log(Afun.prototype)
      },
      objectProtoConst() {
        let date = new Date()
        console.log(date)
        // getPrototypeOf与__proto__等价，部分浏览器无__proto__
        console.log('Object.getPrototypeOf(date) === date.__proto__', Object.getPrototypeOf(date) === date.__proto__)
        // 对象的原型就是构造函数的原型
        console.log('date.__proto__ === Date.prototype', date.__proto__ === Date.prototype)
        // 对象的原型对象的原型对象等于父类构造函数的原型对象
        console.log('date.__proto__.__proto__ === Object.prototype', date.__proto__.__proto__ === Object.prototype)
        // 对象的原型对象的构造函数是对象的构造函数
        console.log('date.constructor === Date.prototype.constructor', date.constructor === Date.prototype.constructor)
        console.log('普通对象有__proto__原型对象', date.__proto__)
        // 普通对象没有prototype属性
        console.log('普通对象无prototype，只有构造函数对象才有', date.prototype)
      },
      objectProto() {
        let obj = {}
        let o_proto = Object.getPrototypeOf(obj)
        let o_proto_proto = Object.getPrototypeOf(o_proto)
        console.log(obj, o_proto, o_proto_proto)
      },
      combineExtends() {
        function Father(age) {
          this.age = age
        } 
        let Empty = function() {}
        function proxy(photo) {
          Empty.prototype = photo
          let empty = new Empty()
          empty.constructor = Son
          return empty
        }
        function Son(age) {
          Father.call(this, age)
        }
        Son.prototype = proxy(Father.prototype)

        let son = new Son(12)
        console.log(son, son.constructor)
        console.log(son instanceof Son, son instanceof Empty, son instanceof Father)
        console.log(son.__proto__)
      },
      callExtends() {
        // 构造继承
        function Animals(classfiy) {
          this.classfiy = classfiy
        }
        function Humen(name) {
          Animals.call(this, '人类')
          this.name = name
        }
        const men = new Humen('张三')

        console.log(men, men.constructor)
        console.log(men.__proto__, Humen.prototype, Animals.prototype)
        console.log(men instanceof Humen, men instanceof Animals)
      },
      ex5Extends() {
        // 原型链继承
        function Humen(name) {
          this.name = name
        }
        function Men() {}
        
        Men.prototype = new Humen()
        Men.prototype.constructor = Men

        let aMen = new Men('张三')
        let aMen_proto = Object.getPrototypeOf(aMen)  // MEN
        let aMen_proto_proto = Object.getPrototypeOf(aMen_proto)  // HUMEN
        let aMen_proto_proto_proto = Object.getPrototypeOf(aMen_proto_proto) // OBJECT
        let aMen_proto_proto_proto_proto = Object.getPrototypeOf(aMen_proto_proto_proto)

        // console.log(aMen_proto, aMen_proto_proto, aMen_proto_proto_proto, aMen_proto_proto_proto_proto)
        // aMen对象的构造函数就是Men
        // console.log(aMen.constructor, aMen.constructor === Men, aMen.constructor === Humen)
        console.log(aMen, aMen.constructor)
        console.log(aMen.__proto__, Men.prototype, Humen.prototype)
        console.log(aMen instanceof Men, aMen instanceof Humen)
      },
      ex6Extends() {
        // ES6的继承本质上时原型链继承
        class Humen {
          constructor(name) {
            this.name = name
          }
          say() {
            console.log(`my name is ${this.name}`)
          }
        }
        Humen.prototype.dress = function(cloth) {
          console.log(`i dress ${cloth}`)
        }

        class Men extends Humen {
        }
        let aMen = new Men('张三')
        aMen.say()
        aMen.dress('西装')
        // 普通对象没有prototype属性
        console.log(aMen, aMen.constructor)
        console.log(aMen.__proto__, Men.prototype, Humen.prototype)
        console.log(aMen instanceof Men, aMen instanceof Humen)
      },
      throttleAPI() {
        return this.throttleFun()
      },
      debounceAPI() {
        return this.debounceFun()
        // 这样写的话其实每一次都是调用一个新的函数,并不是调用的同一个函数,所以防抖失效
        // debounce(() => {
        //   console.log('debounceAPI')
        // }, 2000)()
      },
      callback() {
        console.log('callback')
      },
      throttle() {
        return this.throttleSelf()
      },
      debounce() {
        return this.debounceSelf()
      },
      getInstanceStatic() {
        console.log(User.getInstance('tianlin'))
      },
      getInstance() {
        console.log(People.getInstance())
      },
      fun(arg = '123', arg2 = 'tianlin') {
        console.log(arg, arg2)
      },
      defineAClass() {
        function AClass(a, b) {
          this.a = a
          this.b = b
        }
        let aclass = new AClass('12', 'bb')
        console.log('aclass', aclass)
        console.log('aclass instanceof', aclass instanceof AClass)
        console.log('aclass prototype', aclass.prototype)
        console.log('aclass toString = ', aclass.toString())
        console.log('aclass getPrototypeOf = ', Object.getPrototypeOf(aclass))

        console.log('AClass prototype = ', AClass.prototype)
        console.log('AClass toString = ', AClass.toString())
        console.log('AClass getPrototypeOf = ', Object.getPrototypeOf(AClass))
        console.log('AClass constructor = ', AClass.constructor)
        console.log('AClass constructor = ', AClass.constructor()())

        console.log('User prototype = ', User.prototype)
        console.log('User toString = ', User.toString())
        console.log('User getPrototypeOf = ', Object.getPrototypeOf(User))
        console.log('User constructor = ', User.constructor)
        console.log('User constructor = ', User.constructor())
      },
      defArg() {
        this.fun()
        this.fun('QQ')
        this.fun('QQ', 'wechat')
        let delay = 200
        let callback = () => {}
        this.CCC(delay, callback, true !== false)
      },
      /**
       * 
       * @param {Number} delay 
       * @param {Boolean} [noTrailing] 
       * @param {Function} callback 
       * @param {Boolean} [debounceMode] 
       */
      CCC(delay, noTrailing, callback, debounceMode) {
        console.log('CCC函数的传参---', delay, noTrailing, callback, debounceMode)
      },
      change() {
        let person = {}
        this.changePerson(person)
        console.log(person)
      },
      changePerson(person) {
        person.name = 'haha' + Math.random()
      }
    }
  }
</script>

<style scoped>
div > div {
  margin-top: 10px;
}
</style>
