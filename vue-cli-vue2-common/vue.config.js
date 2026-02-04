const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  productionSourceMap: false,
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
        exposes: {
          './vue2': './node_modules/vue/dist/vue',
          './BaseText.vue': './src/components/BaseText.vue',
        },
        shared: {
          vue: {
            singleton: true,
            eager: true
          },
        },
      })
    ]
  }
})
