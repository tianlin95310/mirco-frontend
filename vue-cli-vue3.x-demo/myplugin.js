class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // 在生成资源到 output 目录之前执行逻辑
      console.log('Webpack build is about to finish!', compilation)
      callback()
    })
  }
}

module.exports = MyPlugin