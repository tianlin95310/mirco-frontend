<template>
  <t-l-collapse title="2,css问题">
    <template v-slot:content>
      <pre>
        1，IFrame的缺点
          加载会阻塞主线程onload事件，影响页面加载速度，并且不利于<span class="highlight">SEO</span>，存在跨域问题，和应用方处于不同的js运行环境中

        4，伪元素和伪类的区别
          伪类是虚拟行为的样式类别，作为样式选择器，伪元素是添加到元素的元素，不影响dom的元素

        5，清除浮动的含义和实现
          当容器的高度为auto，且容器的内容中有浮动（float为left或right）的元素，在这种情况下，容器的高度不能自动伸长
          以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象
          的出现而进行的CSS处理，就叫CSS清除浮动。
          <RLink to="/menu2/testCssStyle" title="清除浮动样例" />

        6，display: table和table元素的区别？
          在布局上能实现类似效果，不过div+css的代码量更少，更精简，效果更高，因为table是整体加载完成才会渲染，而div是逐行渲染

        7，属性选择器和伪类选择器优先级？css中@layer的用法
          两者优先级相同
          内联 > id > class = 属性 = 伪类 > 标签 > 通配符 、功能伪类
          
        8，Z-index生效条件
          1，position 为relative, fixed, abslolute才会生效
          2，会继承父亲的z-index
          3，不设置时并不是默认为0，而是不处于堆叠上下文中
          <ALink href="https://blog.csdn.net/qq_39643546/article/details/124729278" title="Z-index的用法实例"></ALink>

        9，em单位
          html根元素的em单位是会以浏览器的字体大小为基准的

        10，百分比布局的特性
          width 和 height 相对于父元素的 width 和 height，而 margin、padding 不管垂直还是水平方向都相对比父元素的宽度、
          border-radius 则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

        11，mask属性
          类似于ps的蒙版，本意时遮罩，最图像处理的

        12，relative布局也是可以使用位置属性的

        13，visibility和display: none
        visibility消失时不展示在界面，但是占据空间，不会响应事件，display: none在文档上，不占据空间

        14，元素监听
          使用ResizeObserver监听元素

        15，元素的各个位置
        <ALink href="https://cloud.tencent.com/developer/article/1015641" title="搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop"/>

     </pre>
     <pre>
      二、 CSS & HTML 篇 (15题)
      考察核心：布局、渲染机制、响应式
      1，布局：实现一个圣杯布局或双飞翼布局（两侧固定，中间自适应，中间列优先渲染）。

      2，Flex 与 Grid：详细对比两者的适用场景，并用两者分别实现一个九宫格布局。
      <RLink to="/menu2/testFlex" title="flex布局" />

      3，BFC：什么是 BFC？触发条件？应用场景（清除浮动、防止外边距重叠、自适应两栏布局）？
        根元素 (html)
        浮动元素 (float 不为 none)
        绝对定位元素 (position 为 absolute 或 fixed)
        display 为 inline-block, table-cell, table-caption, flex, inline-flex, grid, inline-grid
        overflow 不为 visible 的块元素 (hidden, auto, scroll)
        contain 值为 layout, content, paint 的元素

        清除内部浮动：防止父容器高度塌陷。
        防止外边距重叠 (Margin Collapse)：同一个BFC内的相邻块级元素垂直外边距会合并。将元素放入不同BFC可避免。
        阻止元素被浮动元素覆盖（自适应两栏布局）。

      4，CSS 选择器优先级：计算规则（内联 > ID > Class/属性/伪类 > 标签/伪元素）以及 !important 的影响。

      5，重排与重绘：详细说明两者的区别，哪些操作会触发，以及如何优化（CSS 图层、GPU 加速、读写分离）。
        .1 介绍
          当改变元素的尺寸和位置时，会重新触发样式计算-布局-绘制和所有其他流程，称之为重排
          当只改变原色颜色类属性时，会触发样式计算-绘制，称之为重绘
          重排和重绘都会占用JS主线程，和JS主线程抢占时间
          dom解析-css解析（样式计算）-布局-绘制是浏览器运行的方式
        .2 触发因素
          首次渲染
          浏览器-resize
          元素的位置和尺寸变化
          可见元素的增删
          内容发生变化
          字体font发生变化
          伪类激活
        .3 优化
          transform 属性不会重排与重绘
        .4 优化策略：
          *，GPU 加速：使用 transform 和 opacity 来实现动画。这些属性由 GPU 处理，跳过重排和重绘阶段（只会触发 Composite 合成阶段）。
          *，使用visibility（不刷新布局）代替display： none
          *，避免使用table布局
          *，尽可能在dom树的末端改变class
          *，对于多次重排的元素，适应绝对定位，脱离文档流
          *，集中改变样式：使用 class 或 cssText 一次性修改多个属性，减少 DOM 操作次数。
          *，脱离文档流：对复杂动画使用绝对定位 (position: absolute/fixed)，使其脱离文档流，这样它的变化不会引起其他元素的重排。
          *，避免频繁读取会触发重排的属性（如 offsetTop）。如果需要多次读取，将其缓存到一个变量中。
          *，批量 DOM 操作：使用 document.createDocumentFragment() 进行离线 DOM 操作，再一次性插入。
          *，先隐藏元素 (display: none)，进行多次修改，然后再显示。

      6，移动端适配：1px 边框问题、Retina 屏适配、移动端响应式方案的选型（REM/VW+媒体查询）。

      7，CSS 动画性能：为什么 transform 和 opacity 能高效触发 GPU 渲染？will-change 属性有什么用？

      8，居中：至少写出 5 种水平垂直居中的方案。

      9，CSS 变量：如何定义和使用 CSS 变量（--*），它有什么好处？

      10，HTML 语义化：谈谈你对语义化标签（article, section, nav 等）的理解及其好处（SEO、可访问性、代码结构）。

      11，'script' 标签：async 和 defer 属性的区别？请画图说明加载和执行时机。
      无属性 (script src="...")：同步加载和执行。HTML 解析会暂停，等待脚本下载并执行完成，然后再继续解析 HTML。
      async (script async src="...")：异步加载。脚本的加载与 HTML 解析并行进行。一旦脚本加载完成，会立即执行，同时 HTML 解析暂停。多个 async 脚本的执行顺序不确定（谁先加载完谁先执行）。
      defer (script defer src="...")：延迟执行。脚本的加载与 HTML 解析并行进行。但脚本的执行会等到整个 HTML 文档解析完成之后，在 DOMContentLoaded 事件之前按它们在文档中出现的顺序依次执行。

      12，Web Components：是什么？由哪几个技术组成？与 Vue/React 组件的区别？
      Web Components：是一套浏览器原生支持的组件化技术，允许创建可重用的自定义元素，功能封装在代码中，与外部代码隔离。
      四大技术：
      1，Custom Elements (自定义元素)：定义新的HTML标签的API。class MyElement extends HTMLElement { ... }; customElements.define('my-element', MyElement);
      2，Shadow DOM (影子DOM)：提供了一种将组件的结构、样式和行为封装起来，与主文档的DOM保持分离的方法，实现真正的样式和DOM隔离。this.attachShadow({mode: 'open'});
      3，HTML Templates (模板)：template 和 slot 元素，用于声明不会被立即渲染的标记模板，可以在运行时实例化。
      4，HTML Imports (已废弃)：原本用于打包组件，现已被 ES Modules 取代。

      13，伪类与伪元素：:hover 和 ::before 的根本区别是什么？
      伪类 (:)：用于选择处于特定状态的元素。它选择的是已有的元素。
      例如：:hover, :active, :focus, :first-child, :nth-child(), :checked, :not()。
      伪元素 (::)：用于创建并样式化不在文档树中的元素（虚拟元素）。它相当于“创建”了一个新元素。
      例如：::before, ::after, ::first-line, ::first-letter, ::selection。
      语法：CSS3 规范建议使用双冒号 :: 来区分伪元素和伪类，但单冒号 : 对于伪元素仍然有效。

      14，CSS 预处理器：你用过哪些（Sass/Less）？它们提供的核心功能（变量、嵌套、Mixin、函数）有什么好处？

      15，CSS in JS：谈谈它的优缺点，以及你是否在项目中使用过。
     </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a2Css',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
