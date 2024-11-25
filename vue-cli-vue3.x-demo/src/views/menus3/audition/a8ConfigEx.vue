<template>
  <t-l-collapse title="8,常见配置举例">
    <template v-slot:content>
      <pre>
        1，nginx配置
          root distDir;
          1，主页搜寻
          location / {
            index index.html;
            try_files $uri /index.html;
          }
          2，添加header
          location = /index.html {
            add_header X-Frame-Options DENY;
            add_header Cache-Control "no-cache, no-store";
          }
          3，添加资源缓存配置(资源扩展名匹配)
          location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|apk|tar.gz|ico|woff|svg|map|)$ {
            expires 30d;
          }
          4，禁止访问
          location ~ ^/(WEB_INF)/ {
            deny all;
          }
          5，配置代理
          location /api {
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://host:port
          }

        2，Vi编辑模式
          i,a 等进入到开始编辑的insert模式
          dd 删除光标行
          Esc进入命令行模式
          :是命令前缀，w是保存，q是退出，！表示强制
          
        3，通过http参数实现代理的设置
          服务端设置 Access-Control-Allow-Origin 即可，前端无须设置，若要带cookie 请求，前后端都需要设置。
      </pre>
    </template>
  </t-l-collapse>
</template>

<script>
  import TLCollapse from '@/components/TLCollapse.vue'
  export default {
    name: 'a8ConfigEx',
    components: {
      TLCollapse
    }
  }
</script>

<style>
</style>
