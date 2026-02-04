const { defineConfig } = require('@vue/cli-service')
const { mfpPlugins, mfpProxy } = require('./src/mfp/deploy')
console.log('mfpPlugins', mfpPlugins, 'mfpProxy', mfpProxy)
module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  publicPath: '/vue3clibiz',
  configureWebpack: {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 9999,
      proxy: {
        ...mfpProxy
      }
    },
    plugins: [
      ...mfpPlugins
    ]
  },
  transpileDependencies: true,
})
