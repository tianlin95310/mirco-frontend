const { proxy, remotes } = require('./deployConfig')
const webpack = require('webpack')
exports.mfpPlugins = [new webpack.container.ModuleFederationPlugin({
  remotes: remotes,
  shared: {
    vue: {
      singleton: true,
      eager: true,
      // 升级vue，不升级的话有上下文混乱问题
      requiredVersion: '^3.2.13'
    }
  }
})]

const mfpProxy = {}
Object.entries(proxy).forEach(item => {
  const obj = {}
  obj[item[0]] = ''
  mfpProxy[item[0]] = {
    target: item[1],
    changeOrigin: true,
    ws: false,
    secure: false,
    pathRewrite: obj
  }
})
exports.mfpProxy = mfpProxy