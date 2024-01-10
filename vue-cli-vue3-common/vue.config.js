const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  devServer: {
    port: 8081
  },
  configureWebpack: {
    optimization: {
      // vue3 js加载失败时
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'lib_common_vue3',
        filename: 'remoteEntry.js',
        exposes: {
          './BaseTextVue3.vue': './src/components/BaseTextVue3.vue',
          './BaseText.vue': './src/components/BaseText.vue',
        },
        shared: {
          vue: {
            singleton: true,
            // eager: true
          },
        },
      }),
    ],
  },
  
})
