const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'biz_vue2',
        filename: 'remoteEntry.js',
        remotes: {
          lib_common_vue2: 'lib_common_vue2@http://localhost:8080/remoteEntry.js',
        },
      })
    ]
  }
})