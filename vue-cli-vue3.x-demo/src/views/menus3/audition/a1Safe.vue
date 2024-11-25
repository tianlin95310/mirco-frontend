<template>
  <!--    脚本注入安全，对用户输入的内容进行渲染的控件需要特别注意，输入的内容需要进行脚本转义-->
  <!--  javascript:alert(#command#)-->
  <!--  可以注入在浏览器输入框-->
  <!--  https://www.jb51.net/article/92639.htm-->
  <t-l-collapse title="1,安全性问题">
    <template v-slot:content>
      <pre class="scroll-bar">
        1，安全性问题？
          1.1 XSS 攻击: 注入恶意代码
            http请求头设置httpOnly防止访问cookie
            转义页面上的输入内容和输出内容
          1.2 CSRF : 跨站请求伪造
            验证 HTTP Referer 字段
            不被第三方网站访问到用户的cookie
            设置白名单，不被第三方网站请求
            请求自定义header并校验
          <div class="safe-test">
            <div v-html="html" style="width: 200px;height: 100px;background: #42b983" title="通过注入脚本读取隐私信息"></div>
            <p id="p"></p>
            <div>
              <span>输入的脚本内容：</span><input v-model="html" style="width: 88%;font-size: 11px;">
            </div>
          </div>

        2，HTTPS和http协议的区别？
          HTTPS通过SSL实现了传输层加密，能防止被中间人篡改数据传输，但是HTTPS的性能要求更高。https加密采用的是对称加密和非对称加密结合的方式，建立连接生成会话密钥阶段是非对称加密，
          通信阶段是用会话密钥是对称加密
          1，客户端向服务器发送请求，携带ssl/tsl，第一随机数，加密算法到服务器
          2，服务器确认通信支持情况，不支持则中断，并请求ca，ca用自己的私钥处理服务器的公钥并颁发数据证书，生成第二随机数，然后服务器将公钥发送给客户端，发送消息表示发送完毕
          3，客户端收到后，确认数字证书和公钥，没有问题向服务器发送，生成第三随机数并使用公钥进行加密，客户端握手结束
          4，服务器收到后，用私钥对第三随机数进行解密，然后服务端通过三个随机数生成会话密钥
          5，客户端也计算出了会话密钥，服务端确认握手结束
          <ALink href="https://blog.csdn.net/m0_46672151/article/details/123744429" title="https加密过程"></ALink>
          TCP三次握手的作用
          1，S端可以确认可以收到C端的报文
          2，C端可以收到S端的报文，并能确认S端能收到自己的报文
          3，S端确认C端可以收到自己的报文

          TCP和UDP的区别
          uap无需建立连接，不可靠，支持1对多

        3，开源框架的LICENSE安全性问题？
          MIT协议
          GPL协议
          ISC协议

        4，cookie和session的区别？
          cookie存储在浏览器客户端，不安全，考虑到可以使用session，session存储在服务器，但是量大时会影响服务器性能，cookie的大小限制在4k

        5，常见错误码？
          100 客户端应继续其请求
          200 请求成功
          204 请求成功，但是没有返回内容
          205 重置内容，客户端应重置页面内容
          300 请求的资源包含多个位置
          301 请求的内容被移动，永久重定向
          302 临时重定向
          304 缓存命中
          400 错误请求，参数类型不匹配
          401 未授权的请求
          402 保留，将来使用
          403 服务器收到请求，但禁止访问
          404 服务器没有找到对应的请求资源
          405 请求方式不支持
          500 服务器内部错误
          502 网关错误
          503 暂时无法访问
          504 网关超时

        6，http缓存策略
          协商缓存：浏览器发出请求，有缓存且没有过期直接读取，没有缓存时查看Etag，有的话向服务器询问If-none-match，没有的话查看Last-modified,如果是的话向服务器
          咨询If-modified-since，服务器决定是返回200还是304，Last-modified否的话请求Web服务器获取资源。
          强缓存：根据cache-control和Expire控制
          Get请求适合做缓存，post接口不适合做缓存
          cache-control： private、no-cache、max-age、must-revalidate
        
        7，fetch请求发送两次请求的原因
          第一次是发送options请求，确认服务器请求支持情况，支持的话发送真正的请求

        8，常见网络请求
          get请求的参数限制通常由浏览器决定

        9，Hash与History路由
          Hash路由不会算在请求里面，属于纯浏览器端的逻辑，对服务端无任何影响
          history利用了H5 history Interface中新增的pushState()和replaceState()方法。（需要特定浏览器支持）这两个方法应用于浏览器的历史记录栈，
          在当前已有的back、forward、go的基础上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的Url，但是浏览器不会立即向后端发送请求。
     </pre>
    </template>
  </t-l-collapse>
</template>

<script>
import TLCollapse from '@/components/TLCollapse.vue'
export default {
  name: 'a1Safe',
  components: {
    TLCollapse
  },
  data() {
    return {
      html: '<form id="test"></form><button form="test" class="button" formaction="javascript:alert(document.getElementById(\'p\').innerHTML = document.cookie)">用户注入的脚本</button>'
    }
  }
}
</script>

<style>
.safe-test {
  background: yellow;
  white-space: nowrap;
}

button {
  margin: 16px;
}
</style>
