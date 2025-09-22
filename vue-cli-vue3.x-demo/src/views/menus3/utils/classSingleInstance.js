function People() {
  this.name = '张三'
}
// 闭包实现单例
People.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new People()
    }
    return instance
  }
})()

// 静态成员实现单例
class User {
  constructor(name) {
    this.name = name
    return '123'
  }

  static getInstance(name) {
    if (!User._instance) {
      User._instance = new User(name)
    }
    return User._instance
  }
}

export {
  People, User
}
