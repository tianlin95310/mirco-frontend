const webpack = require('webpack')
// 这里属于编译阶段，采用node后端语言
exports.mfpPlugins = [new webpack.container.ModuleFederationPlugin({
  name: 'vue3DemoPlugin',
  filename: 'vue3DemoPlugin.js',
  exposes: {
    '.': './src/mfp/index.js'
  },
  shared: {
    vue: {
      singleton: true
    }
  }
})]

exports.mfpProxy = {}