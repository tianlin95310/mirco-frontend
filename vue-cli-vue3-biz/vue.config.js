const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const { mfpPlugins, mfpRemotes, mfpProxy } = require('./src/mfp/deploy')
console.log('mfpPlugins', mfpPlugins, 'mfpRemotes', mfpRemotes, 'mfpProxy', mfpProxy)
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
      new webpack.container.ModuleFederationPlugin({
        name: 'biz_vue3',
        filename: 'remoteEntry.js',
        remotes: {
          lib_common_vue2: 'lib_common_vue2@http://localhost:8080/remoteEntry.js',
          lib_common_vue3: 'lib_common_vue3@http://localhost:8081/remoteEntry.js',
          // ...mfpRemotes
        },
        shared: {
          vue: {
            singleton: true,
          }
        },
      }),
      ...mfpPlugins
    ]
  },
  transpileDependencies: true,
})
