module.exports = {
  remotes: {
    // vue3DemoPlugin: 'vue3DemoPlugin@/vue3-demo-plugin/vue3DemoPlugin.js',
    lib_common_vue2: 'lib_common_vue2@/lib-common-vue2-url/remoteEntry.js',
    lib_common_vue3: 'lib_common_vue3@/lib-common-vue3-url/remoteEntry.js',
    vue3DemoPlugin: 'vue3DemoPlugin@http://localhost:9527/vue3DemoPlugin.js'
  },
  
  proxy: {
    '/vue3-demo-plugin': process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:10001' : 'http://localhost:9527',
    '/lib-common-vue2-url': process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:10002' : 'http://127.0.0.1:10002',
    '/lib-common-vue3-url': process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:10003' : 'http://127.0.0.1:10003'
  },
}