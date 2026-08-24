const { proxy, remotes } = require('./deployConfig')
const webpack = require('webpack')
exports.mfpPlugins = [new webpack.container.ModuleFederationPlugin({
  remotes: remotes,
  // 加上这个的话，会出现mf组件加载失败，代理获取组件失败，remoreEntry会出现两次加载，猜测是因为这个配置会导致webpack在加载远程组件时，先加载一次共享模块，然后再加载一次远程组件，导致重复加载的问题
  shared: {
    vue: {
      singleton: true,
      eager: true,
      // 升级vue，不升级的话有上下文混乱问题
      version: '^3.5.12'
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