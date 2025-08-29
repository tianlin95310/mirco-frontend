<template>
  <t-l-collapse title="3,JS问题">
    <template v-slot:content>
      <pre>
        1，encodeURIComponent和encodeURI的区别
          使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20。而encodeURIComponent()方法则会使
          用对应的编码替换所有非字母数字字符。这也正是可以对整个URI使用encodeURI()，而只能对附加在现有URI后面的字符串使用
          encodeURIComponent()的原因所在。一般来说,我们使用encodeURIComponent()方法的时候要比使用encodeURI()更多,因为在实践
          中更常见的是对查询字符串参数而不是对基础URL进行编码。

        2，call，apply，bind的区别和用法
          都能改变this的，函数里的this是哪个对象由调用时传的参数决定，不传的话就是调用者自身
          apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即 A 对象应用 B 对象的方法。
          call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即 A 对象调用 B 对象的方法。
          bind 除了返回是函数以外，它的参数和 call 一样。
          构造函数里面也可以这样使用，用于调用构造函数

          1、改变 this 的指向
          2、借用别的对象的方法，保存副本
          3、调用函数，因为 apply，call 方法会使函数立即执行

        5，Object的用法
          1，Object.freeze(obj)可以冻结对象的，防止对象的值被修改如果是大数据量的数据，对于纯展示的大量数据，可以提高效率
          2，Object. entries(),keys(),values() 产生迭代器，方便遍历
          3，var A = Object.create(A.prototype);可以产生以null或者指定的原型为原型对象，可以防止对象被原型级别的篡改
          4，Object.assign(),用给定对象的可枚举属性生成新对象
          5，Object.defineProperty，vue2是借助这个实现的
          6，Object.is（），与==，===的逻辑是不同的，Object.is(Nan, Nan)返回true
          7，Object.preventExtensions()，防止对象的任何扩展
          8，Object.hasOwn()判断某对象是否有自己特有的属性
              原型链方法
              hasOwnProperty()
              toString()
              valueOf()
          9，获取js的属性
            for（let I in obj）该方法依次访问一个对象及其原型链中所有可枚举的类型
            Object.keys:返回一个数组，包括所有可枚举的属性名称
            Object.getOwnPropertyNames:返回一个数组包含不可枚举的属性
            Object.getPrototypeOf() 获取一个对象的原型对象

        12，js的事件机制
          事件捕获阶段
          事件命中阶段
          事件冒泡阶段
          添加事件的3中方式：
          addEventListener,onclick绑定，onclick赋值

        15，js单例模式的实现
          1，使用闭包直接添加方法属性
          2，使用class添加静态方法
          <RLink to="menu3/func" title="详见函数界面" />

        17，js多线程
          web worker，通过postMessage通知，dart里有类似的isolate

        18，object与Object的区别，基本数据类型与包装类的区别
          object和Object两者之间的主要区别在于，object是一种原始数据类型，而Object则是JavaScript中的一个内置对象。此外，我们还可以通过以下几个方面来区分这两者之间的区别：
          object不能调用任何方法，而Object可以调用所有Object.prototype中定义的方法。
          object不能使用new关键字来创建新的实例，而Object可以使用new关键字来创建新的对象。
          object通常是通过字面量形式创建的，而Object通常是通过构造函数来创建的。
          object在JavaScript中表示任何非基本类型数据，包括Function和Array等，而Object是所有对象的基础，
          是因为其他所有的内置对象都是从Object中继承而来的，因此可以通过Object来操作和处理其他内置对象的方法和属性。

        19，function和Function的区别
        JavaScript中的function和Function主要有以下区别‌：
        ‌定义方式‌：
        function是一个关键字，用于声明一个函数。例如：function myFunction(arg) { ... }‌12。
        Function是一个构造函数，用于动态创建函数。例如：var myFunction = new Function("arg", "return arg;");‌13。
        ‌使用场景‌：
        使用function关键字声明的函数是静态的，直接定义在代码中。这种方式定义的函数在执行时效率较高，因为不需要动态解析。
        使用Function构造函数创建的函数是动态的，可以在运行时根据需要创建新的函数。这种方式适用于需要根据某些条件动态生成函数的场景。
        ‌类型和实例‌：
        function是一个关键字，用于声明函数。通过function声明的函数是Function对象的实例。例如：var func = function(arg) { ... }‌12。
        Function是一个构造函数，用于创建函数对象。通过new Function()创建的函数对象与通过function关键字声明的函数在类型上有所不同，前者是Object类型，后者是Function类型‌2。
        ‌性能和灵活性‌：
        使用function关键字声明的函数在编译时就能确定其结构和内容，因此执行效率较高。
        使用Function构造函数创建的函数需要在运行时解析代码字符串，因此执行效率较低，但提供了更高的灵活性和动态性。
        <RLink to="/menu3/func" title="function与Function" />
     </pre>

     <pre>
    一、 JavaScript 深度篇 (25题)
    考察核心：语言特性、异步、内存、新语法
      1，Event Loop：详细说明宏任务与微任务的区别、执行顺序，并分析一段包含 Promise, setTimeout, async/await, queueMicrotask 的复杂代码的输出结果。
      答案：
      入口-宏任务-执行同步代码【分发任务队列】-当前宏任务执行完成-执行完当前队列的所有微任务-下一个宏任务
      同步块 > requestAnimationFrame > setTimeout > 普通微任务 > queueMicrotask > 微任务中新建微任务 > finally
      <button class="button" @click="qus.q1">执行</button>

      2，闭包：阐述其原理、常见应用场景（模块化、柯里化）以及可能引发的内存泄漏问题和排查方法。
      答案：
      原理： 当一个函数可以记住并访问其所在的词法作用域，即使这个函数是在当前词法作用域之外执行的，这就产生了闭包。
      1，成员私有化，参数隔离
      2，柯里化，将多参数函数转化为少参数函数
      3，内存泄漏：闭包会阻止其引用的外部函数作用域中的变量被垃圾回收。如果闭包本身是全局变量或其生命周期很长，那么它引用的变量会一直驻留内存。

      3，this 指向：详细说明默认绑定、隐式绑定、显式绑定（call/apply/bind）、new 绑定、箭头函数这五种规则的优先级和严格模式下的差异。
      答案：
      this 的绑定规则按优先级从低到高如下：
      默认绑定：在严格模式 ('use strict') 下，this 为 undefined；非严格模式下，this 指向全局对象（浏览器中是 window）。
      隐式绑定：函数作为对象的方法调用时，this 指向该对象。
      显式绑定：通过 call, apply, bind 方法直接指定 this。
      new 绑定：使用 new 关键字调用构造函数时，this 指向新创建的对象。
      箭头函数：this 在定义时就已经确定，指向其外层作用域的 this，无法通过上述规则改变。
      优先级： new > 显式 > 隐式 > 默认。箭头函数无 this，不参与比较。

      4，手写 Promise：实现一个符合 Promises/A+ 规范的 Promise，并实现 Promise.all 和 Promise.race 的 polyfill。
        Promise见标签<RLink to="/menu4/promiseUse" title="Promise的使用" />
        <ALink href="https://blog.csdn.net/qq_39370934/article/details/115574212" title="js 迭代器用法"></ALink>

      5，Async/Await 原理：阐述其和 Generator 函数的关系，说明其底层是如何用 Generator + 自动执行器实现的。
      答案：
      Async/Await 是 Generator 函数的语法糖，它提供了更清晰的异步代码编写方式
      底层原理： async 函数会返回一个 Promise 对象。await 后面的表达式相当于 yield，会暂停函数的执行。JS 引擎会用一个自动执行器来处理这个 async 函数，它自动调用 .next() 方法，将 await 后面表达的返回值（或 resolved 的 Promise 值）作为 yield 的结果，并继续执行函数，直到函数结束或抛出错误，最终返回的 Promise 状态随之改变。
      与 Generator 的区别：
      内置执行器：async 函数自带执行器，无需像 co 库那样的额外工具。
      更好的语义：async 和 await 比 * 和 yield 语义更清晰。
      返回值是 Promise：async 函数返回值是 Promise，比 Generator 返回的 Iterator 对象更方便。

      6，ES6+ 核心特性：
          Proxy 与 Reflect 的概念和用途（与 Vue3 响应式关联）。
          Map, Set, WeakMap, WeakSet 的特性及与普通对象的区别。
          箭头函数的特性（无 this, arguments, 不能作为构造函数）。
      答案：
      Proxy/Reflect：
      Proxy：用于创建一个对象的代理，从而实现对基本操作的拦截和自定义（如属性查找、赋值、枚举等）。是 Vue3 响应式系统的核心。
      Reflect：一个内置对象，它提供拦截 JavaScript 操作的方法。这些方法与 Proxy 的方法一一对应，通常与 Proxy 配合使用，用于实现默认行为。

      Map vs Object：
      Map 的键可以是任意类型（对象、函数），Object 的键只能是 String 或 Symbol，所以Map不支持json序列化而Object可以。
      Map的key，Value添加时有顺序的，而Object则没有这个说法。
      Map 的键值对数量可以通过 size 属性轻松获取。
      Map 在频繁增删键值对的场景下性能更好，delete Object属性的效率低
      Map 默认是可迭代的 (iterable)，Map有方便的遍历迭代器API

      Symbol用作来解决Object字符串作为可能出现重复而覆盖的问题，Symbol可以作为Object的key，通过Object.getOwnPropertySymbols可以获取到对应的symbol，Reflect.ownKeys也能获取到，
      Date 和 Symbol 对象是唯一重写 [@@toPrimitive]() 方法的对象。

      Object存在自动排序机制
        1，整数数字属性，按从小到大排序
        2，字符串属性，不进行自动排序。按照写入的顺序排序。
        3，浮点型属性，按照字符串属性方式处理
        4，同时存在整数数字类型和字符串类型时。优先排列整数数字类型。
          > a
          > {1: 1, 2: 2, 3: 3, a: 'a', c: 'c', b: 'b', e: 'e', d: 'd'}
          > JSON.stringify(a)
          > '{"1":1,"2":2,"3":3,"a":"a","c":"c","b":"b","e":"e","d":"d"}'

      Set vs Array：
      Set 成员的值都是唯一的，常用于数组去重。

      WeakMap/WeakSet：
      键必须是对象，且是弱引用。这意味着如果键所指的对象没有被其他地方引用，它会被垃圾回收，相应的键值对也会自动消失。常用于存储私有数据或 DOM 节点元数据，避免内存泄漏。

      箭头函数：
      没有自己的 this，继承自外层作用域。
      没有 arguments 对象，可以使用 rest 参数 (...args)。
      不能用作构造函数，不能用 new 调用。
      没有 prototype 属性。

      7，模块化：ES Modules (import/export) 与 CommonJS (require/module.exports) 的本质区别（值的引用 vs 值的拷贝、静态 vs 动态）。
      答案：
      特性	      ES Modules (ESM)	       CommonJS (CJS)
      加载方式	  静态（编译时）	           动态（运行时）
      引入/导出	  import / export           require() / module.exports
      值类型	    值的引用            	    值的拷贝（导出的是值的副本）
      同步/异步	  异步加载	                同步加载
      Tree Shaking	支持（利于静态分析）	  不支持
      适用环境	  浏览器、现代 Node.js	    Node.js

      8，内存管理：V8 垃圾回收机制（分代假说、新生代 Scavenge、老生代标记-清除/整理），以及如何利用 Chrome DevTools 识别和定位内存泄漏。
        答案：
        V8 垃圾回收 (GC)：
        分代假说：大部分对象生存时间很短。据此，V8 将堆内存分为新生代 (New Space) 和老生代 (Old Space)。
        新生代：使用 Scavenge 算法（Cheney 算法），将空间一分为二（From, To）。垃圾回收时，将存活对象从 From 复制到 To，然后清空 From，最后交换 From 和 To 的角色。复制操作频繁，但速度快。
        老生代：存放存活时间长的对象。使用 标记-清除 (Mark-Sweep) 和 标记-整理 (Mark-Compact) 算法。

        标记-清除：标记所有活动对象，清除未标记的对象。会产生内存碎片。
        标记-整理：标记后，将活动对象向一端移动，然后清理掉边界外的内存。解决碎片问题，但速度慢。
        优化：增量标记 (Incremental Marking) 和并发标记 (Concurrent Marking) 将标记过程拆分成小步骤，与 JS 应用逻辑交替执行或并发执行，减少 GC 带来的停顿时间。

        内存泄漏排查 (Chrome DevTools)：
        Memory 面板 -> Heap Snapshot：拍摄堆快照，可以查看当前所有对象的内存占用，对比多次快照可以发现未被回收的对象。
        Memory 面板 -> Allocation instrumentation on timeline：记录一段时间内的内存分配情况，可以精确看到哪些函数分配了内存且没有被释放。
        关注 Detached DOM tree，表示已从 DOM 树移除但 JS 仍引用的 DOM 节点，是常见的内存泄漏源。

      9，手写代码：实现一个能处理循环引用的深拷贝函数。
      <button class="button" @click="qus.q9">克隆</button>

      10，手写代码：实现防抖（Debounce）和节流（Throttle）函数，并说明应用场景。
        .1 防抖(debounce):
        防抖触发高频率事件时n秒后只会执行一次,如果n秒内再次触发,则会重新计算。
        概述:每次触发时都会取消之前的延时调用,即最后一次有效
        .2 节流(thorttle):
        高频事件触发,短时间只会触发一次
        概述:每次触发事件时都会判断是否等待执行的延时函数。
        区别:降低回调执行频率,节省计算资源。
        
        函数防抖一定时间连续触发的事件, 只在最后触发时执行一次, 而函数节流一段时间内只执行一次。
        <RLink title="查看代码实现" to="/menu3/func" />

      11 类型判断：typeof, instanceof, Object.prototype.toString.call 的区别和原理，如何实现一个完善的类型判断函数？
      <pre>
        定义变量却不赋值，如let a;var b;void 0;等值为undefined
        原始值数据类型
        undefined,null,string,number,bool,object,Symbol,bigInt
        特殊数字
        +-Infinity,+-0,Nan
        基本类型包装类
        undefined,null,String,Number,Boolean,Object,Symbol,BigInt

        typeof：
        原理：基于机器码的低位标记判断。这是 JavaScript 语言底层实现的方式。
        特点：
        对原始类型（undefined, boolean, number, string, symbol, bigint）的判断非常有效，typeof null 是著名的 bug，会返回 "object"。
        对引用类型，除了function会返回"function"，其他都返回"object"（如Array, Date, RegExp），无法进行细分。

        instanceof：
        原理：检查构造函数的 prototype 属性是否出现在对象的原型链上。用于检测对象是哪个构造函数的实例。
        特点：
        主要用于判断自定义对象或原生对象（如 Array, Date）的类型。
        无法判断原始类型。
        如果网页包含多个框架（iframe），则会有多个全局执行环境，同一个构造函数在不同环境下不相等，会导致 instanceof 判断失败。

        Object.prototype.toString.call()：
        原理：调用对象内部的 [[Class]] 属性（在 ES6+ 规范中称为 @@toStringTag）。这是最准确且通用的方法。
        特点：
        可以准确识别所有标准的内置对象类型和原始类型（包括 null 和 undefined）。
        返回值是 [object Type] 格式的字符串，Type 就是具体的类型。
        <button class="button" @click="qus.q11">完美的获取类型的方法</button>
      </pre>

      12 原型与继承：描述原型链，手写一个继承方案（如：组合继承、寄生组合式继承）。
      getPrototypeOf(obj) === obj.__proto__ = true，js里面函数对象和普通对象是有区别的，普通对象没有prototype属性，构造函数（对象）有，函数的原型（对象）包含函数自身(constructor)以及
      函数自己的原型对象，原型对象是用来创建普通对象的，js的继承本质上是一种委托

      原型链是 JavaScript 实现继承的主要机制。每个实例对象都有一个私有属性（__proto__）指向它的构造函数的原型对象（prototype）。这个原型对象也有自己的原型，层层向上直到一个对象的原型为 null。
      null 没有原型，是原型链的终点。

      原型对象相当于一个类的定义（创建对象constructor，为对象赋值提供方法，继承一些方法等操作），Object.getPrototypeOf可以获取某个对象的原型对象，值等于该类名（即构造函数，函数也是一个对象）.prototype，
      对象的原型对象（也即函数的原型prototype）它也是一个对象，也可以通过Object.getPrototypeOf获取当前这个原型对象的原型，此时的值
      应等于父类名.prototype，直到找到Object一级，而Object.getPrototypeOf(Object.prototype) === null

      1，原型链继承：无法实现多继承
      2，构造继承：通过call复用父类的构造方法，只继承父类的属性和方法，没有继承原型的属性和方法，可以实现多继承
      3，组合继承：可以继承父类的属性，也可以继承原型的属性，调用了两次父类构造函数，生成了两次实例
      4，寄生组合继承（原型链继承+构造继承）：通过寄生方式，砍掉父类的实例属性，相当于减少了一次属性和方法的实例化，是最理想的继承方式
      <RLink to="/menu3/func" title="继承实例" /><ALink href="https://blog.csdn.net/ABCFF12333/article/details/118066338" title="继承参考文档" />
      <button class="button" @click="qus.q13">寄生组合继承</button>

      不修复constructor指向会导致以下问题：
      constructor指向错误：实例的constructor属性会指向父类而不是子类
      类型识别错误：依赖于constructor的代码无法正确识别对象类型
      克隆和序列化问题：使用constructor进行对象创建或克隆的代码会创建错误类型的对象
      调试困难：在调试时难以追踪对象的实际构造函数

      13 异步对比：requestAnimationFrame, requestIdleCallback, setTimeout 的区别和适用场景。
      简单比喻：
      setTimeout：闹钟，到点就响，不管你在干什么。
      requestAnimationFrame：导演，喊“开拍”时所有演员（动画）必须就位。
      requestIdleCallback：清洁工，等大家都不忙的时候再来打扫卫生。

      14 ES2025+ 新特性：了解 Promise.try, Array.prototype.groupBy, 或 Temporal 等新提案或特性。

      15 设计模式：观察者模式与发布-订阅模式的区别，并在前端中的应用场景。
      前端应用场景：
      观察者模式：
      Vue 的响应式系统：每个响应式数据（目标）维护一个依赖列表（观察者，即 Effect）。数据变化时，直接通知所有依赖进行更新。
      MutationObserver：直接观察 DOM 节点的变化。
      发布-订阅模式：
      Vue 的 EventBus / Node.js 的 EventEmitter：创建一个全局事件总线，组件 A $emit 发布事件，组件 B $on 订阅事件。
      Vue 组件间的 $emit 和 v-on：子组件发布事件，父组件订阅事件。虽然看起来直接，但其内部机制是通过 Vue 实例这个“通道”实现的，是典型的 Pub-Sub。
      系统事件：addEventListener('click', handler)。浏览器（事件通道）负责在用户点击时调用你的处理函数。

    二、 CSS & HTML 篇 (15题)
    考察核心：布局、渲染机制、响应式

      布局：实现一个圣杯布局或双飞翼布局（两侧固定，中间自适应，中间列优先渲染）。

      Flex 与 Grid：详细对比两者的适用场景，并用两者分别实现一个九宫格布局。

      BFC：什么是 BFC？触发条件？应用场景（清除浮动、防止外边距重叠、自适应两栏布局）？

      CSS 选择器优先级：计算规则（内联 > ID > Class/属性/伪类 > 标签/伪元素）以及 !important 的影响。

      重排与重绘：详细说明两者的区别，哪些操作会触发，以及如何优化（CSS 图层、GPU 加速、读写分离）。

      移动端适配：1px 边框问题、Retina 屏适配、移动端响应式方案的选型（REM/VW+媒体查询）。

      CSS 动画性能：为什么 transform 和 opacity 能高效触发 GPU 渲染？will-change 属性有什么用？

      居中：至少写出 5 种水平垂直居中的方案。

      CSS 变量：如何定义和使用 CSS 变量（--*），它有什么好处？

      HTML 语义化：谈谈你对语义化标签（article, section, nav 等）的理解及其好处（SEO、可访问性、代码结构）。

      'script' 标签：async 和 defer 属性的区别？请画图说明加载和执行时机。

      Web Components：是什么？由哪几个技术组成？与 Vue/React 组件的区别？

      伪类与伪元素：:hover 和 ::before 的根本区别是什么？

      CSS 预处理器：你用过哪些（Sass/Less）？它们提供的核心功能（变量、嵌套、Mixin、函数）有什么好处？

      CSS in JS：谈谈它的优缺点，以及你是否在项目中使用过。

    三、 Vue 框架深度篇 (45题) - 核心重点
    考察核心：原理、源码、组合式 API、生态、性能

      Vue 核心原理 (15题)
      Vue 2 响应式原理：详细阐述 Object.defineProperty 如何进行数据劫持，并说明其无法监听数组和对象新增属性的缺陷以及 Vue 2 的补救方案（$set）。

      Vue 3 响应式原理：详细阐述 Proxy 和 Reflect 是如何实现响应式的，对比 Object.defineProperty 的优势。

      ref 与 reactive：详细说明两者的区别、适用场景以及实现原理（ref 如何对原始值进行响应式包装）。

      依赖收集与派发更新：详细描述 effect, track, trigger 函数在整个响应式系统中的工作流程。

      虚拟 DOM 与 Diff 算法：Vue 的虚拟 DOM 是什么？Vue 2 和 Vue 3 在 Diff 算法上分别做了哪些优化（Vue3 的 PatchFlags, staticHoisting, blockTree）？

      模板编译：描述 .vue 文件中的 template 是如何被编译成 render 函数的。

      NextTick 原理：作用是什么？其内部实现机制是怎样的（优先使用微任务 Promise.then）？

      Computed 实现原理：阐述其惰性求值和缓存机制是如何实现的。

      Watch 实现原理：阐述其如何监听响应式数据的变化，并说明 deep 和 flush 选项的原理。

      生命周期：详细说明 Vue 2 和 Vue 3 (Composition API) 的生命周期钩子，以及每个钩子的适用场景。

      组件渲染流程：描述一个组件从 new Vue() 开始到挂载到页面的完整过程。

      编译器优化：Vue 3 在编译阶段做了哪些静态优化？这些优化对运行时性能有何帮助？

      手写实现：尝试实现一个极简版的 reactive 或 ref 函数。

      手写实现：实现一个极简版的 watch 函数。

      手写实现：实现一个极简版的 computed 函数。

      Composition API & 新特性 (15题)
      Composition API 设计动机：解决了 Options API 的哪些痛点？（逻辑复用、代码组织、TypeScript 支持）

      script setup：这个语法糖带来了哪些便利？defineProps, defineEmits, defineExpose 如何使用？

      逻辑复用：如何使用 Composition API（自定义 Hook）封装一个 useMousePosition 或 useLocalStorage？

      Vue 3 生态：为什么 Vuex 被 Pinia 取代？Pinia 的核心优势和用法是什么？

      Teleport 组件：作用是什么？实现原理？典型应用场景（模态框、Toast）？

      Suspense 组件：作用是什么？如何在异步组件和 async setup() 中使用？

      Fragment 组件：Vue 3 支持多根节点组件的原理是什么？

      自定义渲染器：概念是什么？如何实现一个自定义渲染器（如渲染到 Canvas）？

      Vue 3 与 TypeScript：defineComponent 的作用？如何为 Props 和 Emits 提供完整的类型推导？

      响应式 API 进阶：shallowRef, shallowReactive, toRaw, markRaw 的作用和适用场景。

      Effect Scope：effectScope API 是用来解决什么问题的？

      VueUse 库：是否了解或使用过？它体现了 Composition API 的哪些优势？

      v-model 的进化：Vue 3 中 v-model 相对于 Vue 2 有何变化？如何在自定义组件上使用多个 v-model？

      指令生命周期：自定义指令的钩子函数在 Vue 2 和 Vue 3 中的变化。

      渲染函数 & JSX：在 Vue 中如何使用 JSX？它的适用场景是什么？

      工程实践 & 性能优化 (15题)
      Vue Router：路由模式（Hash vs History）的原理和区别？导航守卫的使用场景和流程？

      状态管理选型：在什么情况下才需要使用 Pinia？什么时候用 provide/inject 就够了？

      组件设计：如何设计和实现一个高复用性、可维护性好的业务组件或基础UI组件？

      权限系统：在前端如何实现路由级别和按钮级别的权限控制？

      Vue 应用性能优化：

      打包优化（Tree-shaking, 代码分割，异步组件）。

      运行时优化（v-once, v-memo, 虚拟滚动，减少大型响应式对象）。

      优化更新性能（合理的组件拆分，避免不必要的子组件重新渲染）。

      错误处理：如何全局捕获和处理 Vue 组件渲染函数、生命周期钩子、watch 中的错误？

      服务端渲染 (SSR)：Nuxt.js 的核心原理是什么？SSR 和 CSR 的优劣对比？为什么要用 SSR？

      静态站点生成 (SSG)：什么是 SSG？它和 SSR 的区别？VuePress, VitePress 是基于什么原理？

      单元测试：如何为 Vue 组件编写单元测试（Vitest + Vue Test Utils）？测试的重点是什么？

      E2E 测试：如何为 Vue 应用做端到端测试（Cypress, Playwright）？

      微前端：如何将 Vue 应用接入微前端架构（qiankun, Module Federation）？需要处理哪些问题（样式隔离、JS 沙箱、数据通信）？

      Vue 2 到 Vue 3 的迁移：迁移策略和主要注意事项有哪些？

      项目配置：如何通过 vue.config.js 或 Vite 配置进行 Webpack 优化（别名 alias、代理 proxy、自定义 Loader/Plugin）？

      代码规范：如何在团队中统一代码风格（ESLint, Prettier, Stylelint）？如何通过 Git Hooks 在提交前进行校验？

      部署：Docker 容器化部署 Vue 项目的流程是怎样的？

      四、 工程化、构建工具与网络 (15题)
      考察核心：自动化、质量、效率、网络

        Webpack 与 Vite：对比两者的构建原理、优势和适用场景。为什么 Vite 开发服务器启动更快？

        Webpack 核心概念：Loader 和 Plugin 的区别？如何编写一个自定义的 Loader 或 Plugin？

        打包优化：什么是 Tree Shaking？它的工作原理是什么？如何确保它生效？

        代码分割：如何配置 Webpack 或 Vite 进行有效的代码分割和懒加载？

        模块联邦 (Module Federation)：是什么？解决了什么问题？如何用它实现微前端？

        Babel：作用和工作原理？如何配置 Babel 来兼容目标浏览器？

        Monorepo：是什么？有什么优势？如何用 pnpm workspace 或 Turborepo 搭建和管理 Monorepo？

        CI/CD：描述一下你之前项目的自动化部署流程（GitLab CI/CD, Jenkins, GitHub Actions）。

        浏览器缓存：详细说明 强缓存（Expires, Cache-Control）和协商缓存（Last-Modified, ETag）的流程和区别。

        HTTP2 与 HTTP1.1：对比主要特性（多路复用、头部压缩、服务器推送）。

        HTTPS：工作原理是什么（SSL/TLS 握手过程）？

        前端安全：XSS、CSRF 的攻击原理和防御手段。

        Web 性能指标：LCP, FID, CLS 分别是什么？如何测量和优化？

        PWA：是什么？如何让 Vue 应用支持 PWA（离线可用、添加到桌面）？

        WebAssembly：是什么？它在前端领域可能的应用场景是什么？
     </pre>
    </template>
  </t-l-collapse>
</template>

<script>
import TLCollapse from '@/components/TLCollapse.vue'
import * as qus from '../qus2025/qus2025.js'
export default {
  name: 'a3JS',
  components: {
    TLCollapse
  },
  data() {
    return {
      qus
    }
  },
  
}
</script>

<style></style>
