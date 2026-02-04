const webpack = require('webpack')
// 这里属于编译阶段，采用node后端语言
exports.mfpPlugins = [new webpack.container.ModuleFederationPlugin({
  name: 'vue3DemoPlugin',
  filename: 'vue3DemoPlugin.js',
  exposes: {
    '.': './src/mfp/index.js',
    './components': './src/mfp/components.js',
    './TLWaveView': './src/views/menus6/canvas/TLWaveView/TLWaveView.vue'
  },
  shared: {
    vue: {
      singleton: true,
      eager: true
    },
  },
})
]

exports.mfpProxy = {}