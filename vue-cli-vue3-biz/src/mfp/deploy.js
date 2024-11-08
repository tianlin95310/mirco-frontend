const { proxy, remotes } = require('./deployConfig')
const webpack = require('webpack')
exports.mfpPlugins = [new webpack.container.ModuleFederationPlugin({remotes})]
exports.mfpRemotes = remotes

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