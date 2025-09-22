<template>
  <t-l-collapse title="6,插件和项目优化">
    <template v-slot:content>
      <pre>
        1，前端优化？
          减少http请求数量，请求资源压缩（minify / gzip），资源合并，页面懒加载，资源懒加载
          预解析DNS，CND分发，减少域名数
          Http资源缓存，大数据使用本地缓存
          JS/Css（属性编写顺序，尽量少用行内样式，少用行内变量）优化，服务器端渲染，减少页面重排重绘，防抖和节流

        2，SSR和CSR 概念？
          SSR(Server Side Rendering) ：传统的渲染方式，由服务端把渲染的完整的页面吐给客户端。这样减少了一次客户端到服务端的一次http请求，
          加快相应速度，一般用于首屏的性能优化，拥有更高的核心Web指标分，能更好的SEO，统一的开发语言。
          CSR(Client Side Rendering)：是一种目前流行的渲染方式，它依赖的是运行在客户端的JS，用户首次发送请求只能得到小部分的指引性HTML代码。
          第二次请求将会请求更多包含HTML字符串的JS文件。
          简而言之，就是数据拼接HTML字符串这件事放在服务端还是客户端造成了两者区别。

          两者有何不同
          服务器端渲染的优势在于首屏渲染速度块，简单来讲它不需要来回多次往返于客户端和服务端。但是其性能等众多因素会影响用户体验，
          比如说：网速，在线活跃人数，服务器的物理位置等等。而客户端渲染则和服务端渲染相反，因为多次和服务器的交互导致首屏加载速度慢。
          但一旦这些请求完成之后，用户和页面之间的交互时用户体验就会好很多。用一个现实生活的例子来看：假如从超市买东西吃，
          以SSR的角度来看，你每次在超市买完随即吃完再走，每次饿了都需要出发去超市。而从CSR的角度来看，就是你从超市购买许多原材料
          拿回家去自己煮，多了能放冰箱，这样每次肚子饿了就不需要每次都往超市跑，唯一麻烦一点在于你得花时间挑选食材。
          简而言之，SSR强在首屏渲染。而CSR强在用户和页面多交互的场景。

        3，babel的功能,内置webpack
          .1语法转换，代码替换
          .2对目标环境进行polyfill
          .3按需引入，基于webpack
          .4代码翻译，翻译ES6以上代码到ES5
          @babel/preset-env 预设的代码转换方案
          语法转换分为三个阶段，
          解析-将代码生成AST
          转换-通过babel-traverse对AST做增删改操作
          生成-通过babel-generator将变换后的AST重新生成js代码
          <ALink href="https://astexplorer.net/" title="AST的结构"></ALink>

        4，webpack的功能
          .1提供页面入口
          .2静态资源服务
          .3按模块打包
          .4资源压缩
          devtools
          .1代码热更新
          .2本地开发提供跨域代理

        5，Webpack和gulp两种打包器的区别
        gulp 强调的是前端开发的工作流程，我们可以通过配置一系列的 task，定义 task 处理的事务（例如文件压缩合并、雪碧图、启动 server、版本控制等），然后定义执行
        顺序，来让 gulp 执行这些 task，从而构建项目的整个前端开发流程。
        webpack 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）
        对资源进行处理，打包成符合生产环境部署的前端资源。

        6，Nuxt.js
          主要是用作服务端渲染SSR的
          截至目前，Google 和 Bing 可以很好地对同步 JavaScript 应用进行索引。这里的“同步”是关键词。如果你的应用以一个 loading 动画开始，然后通过 Ajax 获取内容，
          爬虫并不会等到内容加载完成再抓取。也就是说，如果 SEO 对你的页面至关重要，而你的内容又是异步获取的，那么 SSR 可能是必需的。
          开发中的限制。浏览器端特定的代码只能在某些生命周期钩子中使用；一些外部库可能需要特殊处理才能在服务端渲染的应用中运行。
          更多的与构建配置和部署相关的要求。服务端渲染的应用需要一个能让 Node.js 服务器运行的环境，不像完全静态的 SPA 那样可以部署在任意的静态文件服务器上。
          更高的服务端负载。在 Node.js 中渲染一个完整的应用要比仅仅托管静态文件更加占用 CPU 资源，因此如果你预期有高流量，请为相应的服务器负载做好准备，并采用合理的缓存策略。

          SSG
          静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，是另一种流行的构建快速网站的技术。如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，
          那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。
          SSG 保留了和 SSR 应用相同的性能表现：它带来了优秀的首屏加载性能。同时，它比 SSR 应用的花销更小，也更容易部署，因为它输出的是静态 HTML 和资源文件。
          这里的关键词是静态：SSG 仅可以用于消费静态数据的页面，即数据在构建期间就是已知的，并且在多次部署期间不会改变。每当数据变化时，都需要重新部署。
          如果你调研 SSR 只是为了优化为数不多的营销页面的 SEO (例如 /、/about 和 /contact 等)，那么你可能需要 SSG 而不是 SSR。
          SSG 也非常适合构建基于内容的网站，比如文档站点或者博客。事实上，你现在正在阅读的这个网站就是使用 <span class="highlight">VitePress</span> 静态生成的，它是一个由 Vue 驱动的静态站点生成器。
        
        7，关于Vite
          依赖预构建仅适用于开发模式，并使用 esbuild 将依赖项转换为 ES 模块。在生产构建中，将使用 @rollup/plugin-commonjs。
          基于js模块越来越多，通过向webpack这种模块化的处理也会越来越慢，影响开发相率，通过

        8，关于jQuery
          <ALink href="https://blog.csdn.net/webot123456/article/details/115251630" title="jquery的常见用法"></ALink>

        9，关于CommonJS，AMD，CMD，UMD，ES6 Module模块
          CommonJS是js模块化的规范，Node.js的默认实现，通过export.default和require操作，偏向于服务器端，采用同步加载
          AMD和CMD和ES Module偏向客户端，require.js实现了AMD规范，sea.js实现了CMD规范，AMD是加载依赖推崇前置加载，提前加载所需模块，CMD则是懒加载，需要的时候才加载
          UMD是通用模块，判断是否支持define函数还是支持exports，区分开AMD/CMD以及common.js 
          ES6 Module，ES旨在推出一个解决模块化的通用规范，导出的是值的引用，可以只加载某个值，而不是整个模块加载，称为编译时加载，而Common.js导出的是值的拷贝，运行时加载
          <ALink href="https://zhuanlan.zhihu.com/p/467991875" title="模块化参考"></ALink>
      </pre>
    </template>
  </t-l-collapse>

</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a6Plugin',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
