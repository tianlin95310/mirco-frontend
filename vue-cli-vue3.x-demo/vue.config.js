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
      // 打包优化
      splitChunks: {
        chunks: 'all',
        minSize: 20000, // 小于 20KB 不单独分包
        maxSize: 250000, // 大于 250KB 尝试拆分
        minRemainingSize: 0,
        minChunks: 1, // 被引用次数，被引用多少次才进行合并
        maxAsyncRequests: 10, // 按需加载时的最大并行请求数
        maxInitialRequests: 4, // 入口点的最大并行请求数
        enforceSizeThreshold: 50000,
        // automaticNameDelimiter: '~', // 分隔符
        cacheGroups: {
          // Vue 相关库，enforce优化缓存策略
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex|@vue)[\\/]/,
            priority: 100,
            chunks: 'all',
            enforce: true
          },
          // 剩余 node_modules 合并为一个包
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 40,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          // 自定义组件
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            name: 'chunk-components',
            minChunks: 1,
            priority: 35
          },
          // pages
          views: {
            test: /[\\/]src[\\/]views[\\/]/,
            name: 'chunk-views',
            minChunks: 1,
            priority: 30
          },
          // 公共模块
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 20,
            chunks: 'all',
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        },
      }
    },
    externals: {
      // 通过CDN引入，不打包到bundle中
      'element-ui': 'ELEMENT'
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
