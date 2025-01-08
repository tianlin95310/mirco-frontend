const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const { mfpPlugins, mfpProxy } = require('./src/mfp/mfConfig')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  // 设置auto之后本地刷新会报404，不设置auto联邦使用时报错
  publicPath: process.env.VUE_APP_MF ? 'auto' : '/',
  productionSourceMap: false,
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
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
      }
    },
    plugins: [
      ...mfpPlugins
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
        comp: resolve('src/components')
      }
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 9527,
    proxy: {
      '/bpi': {
        target: 'https://aip.baidubce.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bpi': ''
        },
      },
      ...mfpProxy
    }
  }
})
