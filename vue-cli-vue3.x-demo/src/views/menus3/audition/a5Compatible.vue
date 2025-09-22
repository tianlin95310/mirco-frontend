<template>
  <t-l-collapse title="5,兼容性问题">
    <template v-slot:content>
      <pre>
        1，Doctype的作用
          严格模式：表示采用浏览器的最高编辑来排版
          混杂模式：表示浏览器向下兼容，支持老版本

        2，苹果的适配区域
          .1，刘海屏隔离，底部横线隔离
            @supports 隔离兼容样式，safe-area 顶部和底部的安全区域
          .2，苹果ios的软键盘淡出后页面上移，软键盘关闭后，页面不回弹，
            记录滚动距离，手动让他回单
          .3，ios滚动添加下fixed失效的问题
            采用类似于Android原生的布局方式，滚动控件自己滚动，不随body滚动
          .4，dpi适配
            -webkit-min-device-pixel-ratio: 3

        4，移动端列表太长如何优化
          动态展示可显示区域的内容，不可见区域的内容不展示

        5，滑动穿透现象怎么解决
          给body添加fixed样式，使用js记录并还原滚动位置

        6，css兼容，添加属性解决
          上下拉动滚动条时卡顿、慢：
          body {
            -webkit-overflow-scrolling:touch;
            overflow-scrolling: touch;
          }
          默认阴影：
          -webkit-appearance: none;
          出现半透明灰色遮罩 ：
          -webkit-tap-higtlight-color: transparent;
          长按闪退：
          -webkit-touch-callout: none

        7，移动端点击事件延迟300ms的问题
          1，禁用移动端的缩放功能
          2，使用touchend事件模拟点击事件，并取消系统300ms的事件
          点击穿透现象，移动端事件的执行顺序是touchstart-touchend-click，

        8，active激活条件
          需要给body/html增加touchstart事件

        9，1px解决方案
          用 transfrom： scale（0.5）缩小为元素 dpr 倍数
          在 meta 标签中设定 scale 缩小dpr倍数

        10，伪类使用顺序
          link-visited-hover-active

        11，前端优化
          加载方面，减少http请求量，做缓存，懒加载，资源压缩合并，Gzip资源请求，按需加载，分包，服务端渲染SSR
          js/css方面，使用transform代替定位，频繁更新dom的操作脱离文档流，避免内联样式和css表达式，
          css方面，避免使用空的src，防抖，减少重排重绘，减少位置,大小尺寸,相对定位等属性的操作
        12，前端性能
          通过performance对象可以获取

        13，MutationObserver的用法

      </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a5Compatible',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
