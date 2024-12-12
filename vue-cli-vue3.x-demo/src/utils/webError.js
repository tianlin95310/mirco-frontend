function webLogger(errorInfo, type) {
  window.webErrors = window.webErrors || []
  window.webErrors.unshift({
    type,
    timestamp: +new Date(),
    errorInfo
  })
  window.webErrors.splice(20)
}
// message：错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
// source：发生错误的脚本URL（字符串）
// lineno：发生错误的行号（数字）
// colno：发生错误的列号（数字）
// error：Error对象
window.onerror = function(msg, src, lineno, colno, error) {
  console.log('window.onerror', msg, src, lineno, colno, error)
  webLogger({ msg, src, lineno, colno, error }, 'window.onerror')
  return true
}
// onrejectionhandled表示已处理的reject
// window.onrejectionhandled
window.addEventListener('unhandledrejection', function (event) {
  console.log('unhandledrejection', event)
  // ‌preventDefault‌是JavaScript中的一个方法，用于阻止事件的默认行为。当某个事件发生时，浏览器通常会执行一些默认的操作，例如点击链接时跳转到新的页面、提交表单时刷新页面等。使用preventDefault方法可以阻止这些默认行为，从而允许开发者自定义事件处理逻辑。
  webLogger(event, 'unhandledrejection')
  event.preventDefault()
})
export default {
  install(app) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('app', app)
      app.config.errorHandler = (err, wm, info) => {
        console.log('errorHandler', err, wm, info)
        webLogger({ err, wm, info }, 'errorHandler')
      }
    }
  }
}