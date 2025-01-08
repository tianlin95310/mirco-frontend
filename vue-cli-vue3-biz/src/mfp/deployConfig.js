module.exports = {
  remotes: {
    vue3DemoPlugin: 'vue3DemoPlugin@/vue3-demo-plugin/vue3DemoPlugin.js'
  },
  proxy: {
    // '/vue3-demo-plugin': 'http://localhost:9527/',
    '/vue3-demo-plugin': process.env.NODE_ENV === 'production' ? 'http://127.0.0.1/vue3climf' : 'http://10.0.36.124:9527/'
  }
}