// create by tianlin
export default {
  isPC() {
    const userAgentInfo = navigator.userAgent
    const Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    // 判断是否被iframe嵌入
    if (window.self !== window.top) {
      return false
    }
    return flag
  }
}
