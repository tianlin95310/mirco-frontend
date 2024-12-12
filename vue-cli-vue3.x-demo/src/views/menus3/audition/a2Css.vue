<template>
  <t-l-collapse title="2,css问题">
    <template v-slot:content>
      <pre>
        1，IFrame的缺点
          加载会阻塞主线程onload事件，影响页面加载速度，并且不利于<span class="highlight">SEO</span>，存在跨域问题

        2，防抖和节流本质是不一样的。防抖是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
          .1 防抖(debounce):
          防抖触发高频率事件时n秒后只会执行一次,如果n秒内再次触发,则会重新计算。
          概述:每次触发时都会取消之前的延时调用,即最后一次有效
          ,2 节流(thorttle):
          高频事件触发,每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法。
          概述:每次触发事件时都会判断是否等待执行的延时函数。
          区别:降低回调执行频率,节省计算资源。
          
          函数防抖一定时间连续触发的事件, 只在最后触发时执行一次, 而函数节流一段时间内只执行一次。
          <RLink title="查看代码实现" to="/menu3/func" />

        3，重排与重绘，CSS哪些属性会引起重排
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
        .4 具体实现
          transform代替top等位移
          使用visibility（不刷新布局）代替display： none
          避免使用table布局
          
          尽可能在dom树的末端改变class
          写元素时style，class遵循一定的顺序
          对于多次重排的元素，适应绝对定位，脱离文档流

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
          类似于ps的蒙版

        12，relative布局也是可以使用位置属性的

        13，visibility和display: none
        visibility消失时不展示在界面，但是占据空间，不会响应事件，display在文档上，不占据空间

        14，元素监听
          使用ResizeObserver监听元素

        15，元素的各个位置
        <ALink href="https://cloud.tencent.com/developer/article/1015641" title="搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop"/>

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
