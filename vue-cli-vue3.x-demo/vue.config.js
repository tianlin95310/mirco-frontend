const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const { mfpPlugins, mfpProxy } = require('./src/mfp/mfConfig')

const MyPlugin = require('./myplugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  // 设置auto之后本地刷新会报404，不设置auto联邦使用时报错
  publicPath: process.env.VUE_APP_MF ? 'auto' : '/',
  productionSourceMap: false,
  transpileDependencies: true,
  chainWebpack: (config) => {
    // console.log('config', config.plugins)

    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.optimization.minimizer('terser').tap(options => {
        options[0].terserOptions.compress.pure_funcs = ['console.log', 'console.error']
        return options
      })
    })
    config.module
      .rule('custom-loader')
      .test(/\.custom-loader$/)
      .use('my-loader')
      .loader(path.resolve(__dirname, './myloader.js'))
      .options({
        prefix: 'PREFIX: ',
        suffix: ' :SUFFIX'
      })
      .end()
    // 保留vue-router的空白
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions.preserveWhitespace = true
    //     return options
    //   })
    //   .end()
  },
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
    plugins: process.env.VUE_APP_MF ? [
      ...mfpPlugins
    ] : [new MyPlugin()],
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
