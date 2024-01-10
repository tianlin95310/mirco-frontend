const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  devServer: {
    port: 8080,
    hot: true,
    compress: true,
  },
  configureWebpack: {
    optimization: {
      minimize: false,
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'lib_common_vue2',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'lib_common_vue2' },
        exposes: {
          './vue2': './node_modules/vue/dist/vue',
          './BaseText.vue': './src/components/BaseText.vue',
        }
      })
    ]
  }
})
