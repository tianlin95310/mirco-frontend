const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  publicPath: '/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'biz_vue3',
        filename: 'remoteEntry.js',
        remotes: {
          lib_common_vue2: 'lib_common_vue2@http://localhost:8080/remoteEntry.js',
          lib_common_vue3: 'lib_common_vue3@http://localhost:8081/remoteEntry.js',
        },
        shared: {
          vue: {
            singleton: true,
          }
        }
      })
    ]
  },
  transpileDependencies: true,
})
