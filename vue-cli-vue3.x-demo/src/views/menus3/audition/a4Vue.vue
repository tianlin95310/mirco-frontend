<template>
  <t-l-collapse title="4,Vue技术的问题">
    <template v-slot:content>
      <pre>
        1，Vue2.0和Vue3.0为了实现响应式的区别和采用的api的区别
          .1 Vue2.0会遍历对象所有的属性，然后通过Object.defineProperty()来设置setter、getter，
          每个组件实例都有对应的观察者，对于数组的支持有限，如仅改变数组长度是无法监听到的
          .2 Vue3.x 使用代理Proxy实现响应式方案，Proxy 是在 ES6 中引入的，它使 Vue 3 避免了 Vue 早期版本中存在的一些响应性问题。
          Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。我们这样使用它：new Proxy(target, handler)
        2，Vue3的优化
          1，生成block tree，vue2的动态刷新是以组件为单位的，组件越大，速度越慢，vue3中组件的刷新只和动态模板的数量有关
          2，slot优化，vue2中父组件的刷新会导致slot刷新，vue3中非动态的slot不会刷新
          3，diff算法优化
          4，静态提升，组件复用，对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用。
          5，事件侦听器缓存
        3，v-if和v-show
          v-if控制是否在文档上，v-show控制display属性
        4，vue2的.sync修饰符
          key.sync="key"用于处理数据双向绑定的,是update:key的一种缩写，.sync在vue3已被当作过时api，使用v-model:key代替
      </pre>
      <pre>
      三、 Vue 框架深度篇 (45题) - 核心重点
      考察核心：原理、源码、组合式 API、生态、性能

      Vue 核心原理 (15题)
      1 Vue 2 响应式原理：详细阐述 Object.defineProperty 如何进行数据劫持，并说明其无法监听数组和对象新增属性的缺陷以及 Vue 2 的补救方案（$set）。
      答案：
      Vue 2 的响应式核心是通过 Object.defineProperty 递归地将一个普通 JavaScript 对象的属性转换为 getter/setter。
      数据劫持 (Data Observation)：在初始化阶段，Vue 会遍历 data 函数返回对象的所有属性，使用 Object.defineProperty 为每个属性定义 getter 和 setter。当组件渲染时（即执行 render 函数），
      会读取（get） 数据属性，从而将当前的渲染副作用（一个称为 Watcher 的依赖）收集起来。当数据发生变化时，会设置（set） 属性值，从而触发 setter 函数，通知所有之前收集的依赖进行
      更新（重新渲染组件）。
      缺陷与补救：
      无法检测对象属性的添加或删除：Object.defineProperty 只能劫持已存在的属性。解决方法是使用 Vue.set(object, propertyName, value) 或 this.$set 来添加新属性，使用 Vue.delete 来删除属性。
      无法监听数组索引和长度的变化：Vue 2 通过重写数组的 7 个变更方法（push, pop, shift, unshift, splice, sort, reverse）来解决。当这些方法被调用时，Vue 除了执行原有的数组操作外，
      还会额外触发视图更新。对于直接通过索引设置值（arr[index] = newValue）或修改 length，仍需使用 Vue.set 或 splice 方法。

      2 Vue 3 响应式原理：详细阐述 Proxy 和 Reflect 是如何实现响应式的，对比 Object.defineProperty 的优势。

      ref 与 reactive：详细说明两者的区别、适用场景以及实现原理（ref 如何对原始值进行响应式包装）。
      答案：
      reactive：
      作用：接收一个对象，返回该对象的响应式代理（基于 Proxy）。
      限制：只能用于对象类型（Object, Array, Map, Set）。对于原始值（string, number, boolean）无效。
      访问：直接访问和修改属性即可。

      ref：
      作用：接收一个内部值（可以是原始值或对象），返回一个响应式的、可变的 ref 对象。该对象只有一个 .value 属性。
      实现：即使传入的是原始值，ref 也会创建一个包装对象。这样，在 JavaScript 中，对 .value 的访问和修改就可以被拦截（通过自定义的 getter/setter，而非 Proxy）。如果传入的是对象，
      内部会调用 reactive 进行深层转换。
      访问：在 JavaScript 中需要通过 .value 来访问和修改其值；在模板中会自动“解包”，无需 .value。

      区别与选择：
      使用 reactive 处理对象或数组。
      使用 ref 处理原始值，或在逻辑中需要用一个引用来持有某个值（可能在未来被整个替换）时。在组合式函数中返回响应式状态时，通常也使用 refs，以便在使用处能够解构而不丢失响应性。

      4 依赖收集与派发更新：详细描述 effect, track, trigger 函数在整个响应式系统中的工作流程。
      答案：
      这是 Vue 3 响应式系统的核心三部曲，对应 effect, track, trigger 三个函数。
      effect (副作用)：任何会引起副作用的函数，例如组件的渲染函数、computed 的计算函数、用户的 watch 回调。Vue 会用 effect 函数包装它们，创建一个响应式副作用。当这个 effect 运行时，
        Vue 会将其设置为“当前活跃的 effect”。
      track (跟踪/依赖收集)：在响应式代理的 get track中调用。它建立了三层关系：
      target -> key -> effect (依赖)
      它用一个全局的 WeakMap 数据结构来记录：WeakMap&lt;target, Map&lt;key, Set&lt;effect&gt;&gt;&gt;。当读取 (get) 一个响应式对象的属性时，track 函数会找到当前活跃的 effect，
      并将其添加到这个属性对应的依赖集合 (Set) 中。trigger (触发/派发更新)：在响应式代理的 set 或 deleteProperty 等track中调用。当修改 (set) 一个属性时，trigger 函数会根据 target 和 key，
      去之前建立的 WeakMap 中找到这个属性对应的所有依赖 effect，然后依次执行这些 effect。如果是渲染函数的 effect，就会重新执行渲染函数，生成新的 VNode，进而进行 patch 更新 DOM。

      5 虚拟 DOM 与 Diff 算法：Vue 的虚拟 DOM 是什么？Vue 2 和 Vue 3 在 Diff 算法上分别做了哪些优化（Vue3 的 PatchFlags, staticHoisting, blockTree）？
      答案：
      虚拟 DOM (Virtual DOM)：它是一个用 JavaScript 对象（VNode）来描述真实 DOM 结构和属性的树状结构。它的优势在于：
      抽象：为渲染过程提供了抽象层，使得 Vue 可以渲染到非 DOM 环境（如 SSR, Weex, Canvas）。
      性能：直接操作 DOM 成本高昂。通过对比新旧 VNode，可以计算出最少需要更新的 DOM 操作，然后批量执行，提高性能。
      Diff 算法 (差异化算法)：当组件更新时，会生成新的 VNode 树，与旧的 VNode 树进行对比（diff），找出差异。
      Vue 2 的 Diff：是标准的“双端比较”算法。同时从新旧孩子的头尾两端开始比较，试图复用节点。时间复杂度 O(n)。
      Vue 3 的优化：
      Patch Flags (静态标记)：在编译阶段，Vue 会分析模板并给动态节点（绑定了响应式数据的节点）打上不同的标记（如 TEXT, CLASS, PROPS）。在运行时，Diff 算法可以直接根据这些标记知道该
      节点哪些地方需要更新，无需全量对比，极大提升了 Diff 效率。
      静态提升 (Static Hoisting)：模板中的静态节点或静态属性会被提升到渲染函数之外，只在应用初始化时创建一次。后续更新时直接复用，无需重新创建 VNode 和进行 Diff。
      Block Tree (区块树)：Vue 3 将模板划分为“动态区块”。一个区块（Block）是一个内部有动态节点的父节点。Diff 时，Vue 会跳过静态的父节点，直接对比动态区块，减少了需要对比的节点数量。

      6 模板编译：描述 .vue 文件中的 template 是如何被编译成 render 函数的。
      答案：
      Vue 的模板编译是一个将 .vue 文件中的 template 或模板字符串转换为 JavaScript 渲染函数 (render function) 的过程。它主要分为三个步骤：
      解析 (Parse)：使用一个解析器（包含 HTML、CSS 选择器等规则）将模板字符串解析成一个抽象语法树 (AST)。AST 是模板的 JavaScript 对象表示，描述了标签、属性、指令、文本等节点信息。
      转换 (Transform)：对 AST 进行深度遍历和修改。这是进行优化的关键阶段。例如：
      静态节点提升：标记出纯静态的节点和子树。
      Patch Flags 标记：给动态节点打上优化的标记。
      处理指令（如 v-if, v-for），将其转换为对应的 JavaScript 逻辑。
      生成 (Code Generation)：将优化后的 AST 递归地拼接成字符串代码，最终生成一个 render 函数。这个 render 函数执行后会返回一个 VNode 树。例如，msg 会被编译成类似
       _createVNode("div", null, _toDisplayString(_ctx.msg)) 的代码。

      7 NextTick 原理：作用是什么？其内部实现机制是怎样的（优先使用微任务 Promise.then）？
      答案：
      作用：nextTick 是一个用于延迟执行回调函数的工具方法。它的核心应用场景是：在下一次 DOM 更新循环结束之后执行延迟回调。在修改了响应式数据后，DOM 并不会立即更新，而是异步地执行更新。
      此时如果立即访问 DOM，得到的是旧的状态。使用 nextTick 可以确保在 DOM 更新完成后才执行回调，从而访问到最新的 DOM。
      实现原理：Vue 内部维护了一个回调队列。当调用 nextTick(callback) 时，Vue 并不会立即执行 callback，而是将其推入这个队列。然后，它尝试用一个异步延迟函数去清空并执行这个队列中的所有回调。
      优先级：Vue 会优先使用微任务 (MicroTask) 来实现这个异步延迟（如 Promise.then, MutationObserver），如果环境不支持则降级为宏任务 (MacroTask)（如 setImmediate, setTimeout）。
      与更新的关系：组件的异步更新也是通过这个队列机制实现的。数据变化触发的 effect（渲染 watcher）会被推入一个队列，并通过 nextTick 的异步机制进行批处理更新。因此，在数据变化后立即
      调用 nextTick，其回调会在所有组件的 DOM 更新完成后被执行。

      8 Computed 实现原理：阐述其惰性求值和缓存机制是如何实现的。
      答案：
      computed 的本质是一个惰性的、具有缓存机制的响应式副作用。
      惰性求值：computed 返回的是一个 ref 对象。只有在其他 effect（如渲染函数）读取这个 ref 的 .value 时，它的计算函数才会首次运行。
      依赖收集：计算函数运行时，会读取它所依赖的响应式数据。这会触发这些数据的 get track，从而将当前这个计算属性的 effect 收集为依赖。
      缓存机制：计算函数执行完毕后，其结果会被缓存起来，并标记为“脏 (dirty)”状态为 false。后续多次访问 .value，只要其依赖的数据没有变化（“脏”状态仍为 false），
      就会直接返回缓存的结果，而不会重新计算，性能极高。
      重新计算：当计算属性所依赖的响应式数据发生变化时，会触发 set track。这会通知计算属性的 effect：标记自身为“脏” (dirty = true)，但不会立即重新计算。只有当下一次
      有 effect（如渲染函数）再次读取这个计算属性的 .value 时，发现它是“脏”的，才会重新执行计算函数，更新缓存的值并返回。

      9 Watch 实现原理：阐述其如何监听响应式数据的变化，并说明 deep 和 flush 选项的原理。
      答案：
      watch 的本质是监听一个或多个响应式数据源，并在其变化时执行用户提供的回调函数。
      创建 getter：Vue 会根据你传入的监听源（一个 ref、一个 reactive 对象、一个 getter 函数、或一个数组），创建一个用于“获取值”的 getter 函数。
      创建 effect：Vue 会用一个 effect 来包裹这个 getter 函数，并配置调度器 (scheduler)。这个 effect 会立即执行一次，运行 getter 函数来获取初始值，并在这个过程中收集依赖。
      触发回调：
      当监听源发生变化时，会触发这个 effect 的重新执行（即再次运行 getter 函数获取新值）。
      但是，effect 的重新执行并不会直接调用用户的回调，而是会触发其配置的调度器函数 (scheduler)。
      在调度器中，Vue 会拿到新值 (newValue) 和旧值 (oldValue)，然后异步地（默认情况下）执行用户传入的回调函数，并将新、旧值作为参数传入。
      flush 选项：flush: 'post' 等选项控制了调度器执行的时机。例如，'post' 会让回调被推进一个队列，并通过 nextTick 延迟执行，确保在 DOM 更新后触发。
      deep 选项：当 deep: true 时，Vue 会递归地遍历监听源的所有嵌套属性，并对每一个属性都进行依赖收集。这样，任何嵌套属性的变化都会触发回调。

      10 生命周期：详细说明 Vue 2 和 Vue 3 (Composition API) 的生命周期钩子，以及每个钩子的适用场景。

      11 组件渲染流程：描述一个组件从 new Vue() 开始到挂载到页面的完整过程。
      答案：
      从 new Vue() 或 createApp() 开始：
      初始化 & 选项合并：合并全局配置和组件自身的配置（如 mixins）。
      建立响应式：调用 setup 函数（如果存在），并应用 reactive, ref 等 API 建立数据的响应式连接。
      创建渲染上下文：对于 Options API，将 data, props, methods 等挂载到组件实例上；对于 Composition API，setup 的返回值将被暴露给模板。
      编译模板 (如果未预编译)：如果使用运行时+编译器的版本，会将模板编译成 render 函数。
      beforeCreate & created：触发相应的生命周期钩子。
      调用 render 函数：执行 render 函数，在这个过程中会读取响应式数据，触发 getter 进行依赖收集。render 函数返回一个虚拟 DOM 树 (VNode Tree)。
      beforeMount：触发 beforeMount 钩子。
      Patch / Mount：将 render 函数返回的 VNode 树与旧的 VNode 树（首次为 null）进行 Diff 比较，计算出需要进行的 DOM 操作，并执行它们，将真实 DOM 挂载到页面上。
      mounted：触发 mounted 钩子，此时实例已挂载完毕。
      更新阶段：当响应式数据发生变化时，触发 setter，通知渲染 effect 异步地重新执行 render 函数，生成新的 VNode 树，然后与旧的 VNode 树进行 Diff，并最小化地更新真实 DOM。
      在更新前后会触发 beforeUpdate 和 updated 钩子。
      卸载阶段：当组件被销毁时（如 v-if 为 false，路由切换），会触发 beforeUnmount 钩子，然后卸载组件对应的 DOM 节点、移除所有的事件监听器、销毁所有子组件实例、断开响应式连接，
      最后触发 unmounted 钩子。

      12 编译器优化：Vue 3 在编译阶段做了哪些静态优化？这些优化对运行时性能有何帮助？
      答案：
      Vue 3 的编译器在将模板编译成 render 函数时，会进行以下关键优化（参考第 5 题）：
      Patch Flags：对动态节点打上标记，运行时 Diff 时只需对比有标记的节点，跳过静态内容。
      静态提升 (Static Hoisting)：将静态节点和子树提升到渲染函数之外，避免重复创建 VNode。
      树结构打平 (Tree Flattening / Block Tree)：将模板划分为动态区块（Block），每个 Block 追踪其内部的动态后代节点。Diff 时只需对比 Block 内的动态节点列表，大幅减少需要遍历的节点数量。
      缓存内联事件处理函数：为内联事件处理函数生成缓存，避免每次渲染都创建新的函数，减少子组件的不必要更新。
      这些优化使得 Vue 3 的运行时 Diff 效率极高，即使模板很大，每次更新也只需要检查很少量的动态绑定。

      13 手写实现：尝试实现一个极简版的 reactive 或 ref 函数。

      14 手写实现：实现一个极简版的 watch 函数。

      15 手写实现：实现一个极简版的 computed 函数。

      Composition API & 新特性 (15题)
      1 Composition API 设计动机：解决了 Options API 的哪些痛点？（逻辑复用、代码组织、TypeScript 支持）

      2 script setup：这个语法糖带来了哪些便利？defineProps, defineEmits, defineExpose 如何使用？

      3 逻辑复用：如何使用 Composition API（自定义 Hook）封装一个 useMousePosition 或 useLocalStorage？

      4 Vue 3 生态：为什么 Vuex 被 Pinia 取代？Pinia 的核心优势和用法是什么？

      5 Teleport 组件：作用是什么？实现原理？典型应用场景（模态框、Toast）？

      6 Suspense 组件：作用是什么？如何在异步组件和 async setup() 中使用？

      7 Fragment 组件：Vue 3 支持多根节点组件的原理是什么？
      答案：
      Vue 2 中，每个组件必须有且只有一个根元素。Vue 3 通过引入 Fragment 的概念支持多根节点组件。
      原理：在 Vue 3 的虚拟 DOM 实现中，组件的模板可以被表示为一个片段（Fragment），这个片段是一个特殊的 VNode，它本身不渲染任何元素，而只包含子节点。在 patch 过程中，Vue 会直接
      处理这个片段的子节点，而无需一个额外的包裹元素。
      好处：减少了不必要的 DOM 元素嵌套，使最终渲染的 DOM 结构更清晰。对于需要特定 DOM 结构的场景（如 CSS Flex/Grid 布局的直系子元素）非常有用。

      8 自定义渲染器：概念是什么？如何实现一个自定义渲染器（如渲染到 Canvas）？
      答案：
      概念：Vue 的核心 (@vue/runtime-core) 只包含了渲染器的抽象 API 和响应式系统，它与平台无关。我们日常使用的 DOM 渲染是由 @vue/runtime-dom 这个针对浏览器的渲染器实现的。自定义
      渲染器允许你利用 Vue 的核心响应式系统和组件模型，但将渲染目标定位到非 DOM 环境，如 Canvas、Native Mobile、WebGL 等。
      实现思路：你需要实现一个渲染器，该渲染器提供一系列节点操作接口（如 createElement, insert, patchProp），Vue 在运行时调用这些接口来构建和更新你的目标平台（如 Canvas）的UI。
      简单示例（概念性）：
      javascript
      import { createRenderer } from '@vue/runtime-core';
      const { createApp } = createRenderer({
        createElement(type) { /* 在 Canvas 中创建一个图形对象 */ },
        insert(el, parent) { /* 将图形对象添加到画布或父图形中 */ },
        patchProp(el, key, prevValue, nextValue) { /* 更新图形对象的属性 */ },
        // ... 其他必要方法，如 remove, setElementText 等
      });
      const app = createApp(MyVueComponent);
      // 挂载到 Canvas 上下文，而不是一个 DOM 选择器
      app.mount(myCanvasContext);

      9 Vue 3 与 TypeScript：defineComponent 的作用？如何为 Props 和 Emits 提供完整的类型推导？
      答案：
      defineComponent 的作用：
      类型推导：它为 Vue 组件提供 TypeScript 类型推导。没有它，Vue 组件选项对象的类型会是 any，失去类型检查和建议。
      兼容 Options API：在 Composition API 下不是必须的（script setup 中不需要），但在使用 Options API 时至关重要。

      10 响应式 API 进阶：shallowRef, shallowReactive, toRaw, markRaw 的作用和适用场景。

      11 Effect Scope：effectScope API 是用来解决什么问题的？

      12 VueUse 库：是否了解或使用过？它体现了 Composition API 的哪些优势？

      13 v-model 的进化：Vue 3 中 v-model 相对于 Vue 2 有何变化？如何在自定义组件上使用多个 v-model？

      14 指令生命周期：自定义指令的钩子函数在 Vue 2 和 Vue 3 中的变化。

      15 渲染函数 & JSX：在 Vue 中如何使用 JSX？它的适用场景是什么？

      工程实践 & 性能优化 (15题)
      1 Vue Router：路由模式（Hash vs History）的原理和区别？导航守卫的使用场景和流程？
      Hash：使用#后面的内容模型路由，不会导致浏览器像服务器发请求
      History：利用html5的History Interface 中新增的 pushState() 和 replaceState()实现路由切换，且不导致浏览器向服务器发请求，但是刷新时和输入会重新请求，仍需要服务器端支持返回
      统一的入口，主要是nginx配置

      导航守卫：
      主要使用的是beforeRouteLeave，beforeEach，afterEach

      2 状态管理选型：在什么情况下才需要使用 Pinia？什么时候用 provide/inject 就够了？

      3 组件设计：如何设计和实现一个高复用性、可维护性好的业务组件或基础UI组件？
      1，定义清晰类型以及语义的props，2定义通用的event，3，使用v-model双向绑定，4，支持样式重写与样式隔离，5，提供插槽可扩展性，6，再封装时，$attr,$listener透传

      4 权限系统：在前端如何实现路由级别和按钮级别的权限控制？

      5 Vue 应用性能优化：
        打包优化（Tree-shaking, 代码分割，异步组件）。
        运行时优化（v-once, v-memo, 虚拟滚动，减少大型响应式对象）。
        优化更新性能（合理的组件拆分，避免不必要的子组件重新渲染）。

      6 错误处理：如何全局捕获和处理 Vue 组件渲染函数、生命周期钩子、watch 中的错误？

      7 服务端渲染 (SSR)：Nuxt.js 的核心原理是什么？SSR 和 CSR 的优劣对比？为什么要用 SSR？

      8 静态站点生成 (SSG)：什么是 SSG？它和 SSR 的区别？VuePress, VitePress 是基于什么原理？

      9 单元测试：如何为 Vue 组件编写单元测试（Vitest + Vue Test Utils）？测试的重点是什么？

      10 E2E 测试：如何为 Vue 应用做端到端测试（Cypress, Playwright）？

      11 微前端：如何将 Vue 应用接入微前端架构（qiankun, Module Federation）？需要处理哪些问题（样式隔离、JS 沙箱、数据通信）？

      12 Vue 2 到 Vue 3 的迁移：迁移策略和主要注意事项有哪些？

      13 项目配置：如何通过 vue.config.js 或 Vite 配置进行 Webpack 优化（别名 alias、代理 proxy、自定义 Loader/Plugin）？

      14 代码规范：如何在团队中统一代码风格（ESLint, Prettier, Stylelint）？如何通过 Git Hooks 在提交前进行校验？

      15 部署：Docker 容器化部署 Vue 项目的流程是怎样的？
      </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a4Vue',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
