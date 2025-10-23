// 人物执行顺序
export function q1() {
  console.log('同步任务开始')
  setTimeout(() => {
    console.log('setTimeout, setInterval, setImmediate，requestAnimationFrame宏任务开始')
    new Promise(function (reslove, reject) {
      console.log('宏任务中微任务构建')
      reslove('宏任务中微任务构建返回')
    }).then(res => {
      console.log('宏任务中微任务执行then', res)
      queueMicrotask(() => {
        console.log('queueMicrotask任务执行3')
      })
    }).finally(() => {
      console.log('宏任务中微任务执行finally')
    })
    console.log('宏任务结束')
  }, 0)

  requestAnimationFrame((time) => {
    console.log('requestAnimationFrame宏任务开始', time)
    new Promise(function (reslove, reject) {
      console.log('requestAnimationFrame宏任务中微任务构建')
      reslove('requestAnimationFrame宏任务中微任务构建返回')
    }).then(res => {
      console.log('requestAnimationFrame宏任务中微任务执行then', res)
      queueMicrotask(() => {
        console.log('queueMicrotask任务执行4')
      })
    }).finally(() => {
      console.log('requestAnimationFrame宏任务中微任务执行finally')
    })
    console.log('requestAnimationFrame宏任务结束')
  })

  new Promise(function (reslove, reject) {
    console.log('微任务构建')
    reslove('微任务构建返回')
  }).then(res => {
    console.log('微任务执行then', res)
    queueMicrotask(() => {
      console.log('queueMicrotask任务执行1')
    })
  }).finally(() => {
    console.log('微任务执行finally')
  })

  queueMicrotask(() => {
    console.log('queueMicrotask任务执行2')
  })
  console.log('同步任务结束')
}

export function q2() {
  const functionFactor = function(a, b) {
    return function(c) {
      return a * b + c
    }
  }
  const fun1 = functionFactor(2, 5)
  const fun2 = functionFactor(3, 4)
}
function deepClone(target, map = new WeakMap()) {
  // 处理原始类型和函数
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }

  // 处理 Date 和 RegExp
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  // 处理 Map 和 Set
  if (target instanceof Map) {
    const clone = new Map();
    map.set(target, clone);
    target.forEach((value, key) => {
      clone.set(deepClone(key, map), deepClone(value, map));
    });
    return clone;
  }
  if (target instanceof Set) {
    const clone = new Set();
    map.set(target, clone);
    target.forEach(value => {
      clone.add(deepClone(value, map));
    });
    return clone;
  }

  // 处理数组和普通对象
  const clone = Array.isArray(target) ? [] : {};
  map.set(target, clone);

  // 使用 Reflect.ownKeys 获取所有自身键（包括 Symbol）
  Reflect.ownKeys(target).forEach(key => {
    clone[key] = deepClone(target[key], map);
  });

  return clone;
}

export function cloneDeep(obj, map = new WeakMap()) {
  if (typeof obj === 'object') {
    if (obj === null) {
      return obj
    }
    if (map.has(obj)) {
      return map.get(obj)
    }
    const clone = obj instanceof Array ? [] : {}
    map.set(obj, clone)
    for (let key in obj) {
      clone[key] = cloneDeep(obj[key], map)
    }
    return clone
  } else if (obj === 'function') {
    return obj
  } else {
    return obj
  }
}

export function q9() {
  const obj = {
    1: 2,
    2: {
      1: 1
    }
  }
  obj.next = obj
  console.log('cloneDeep', cloneDeep(1))
  console.log('cloneDeep', cloneDeep(null))
  console.log('cloneDeep', cloneDeep(() => { }))
  console.log('cloneDeep', cloneDeep(obj))

  console.log('deepClone', deepClone(1))
  console.log('deepClone', deepClone(null))
  console.log('deepClone', deepClone(() => { }))
  console.log('deepClone', deepClone(obj))
}

function getType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  console.log('getType type', type)
  return type
}

export function q11() {
  // 测试
  getType(42); // 'number'
  getType('hello'); // 'string'
  getType(null); // 'null'
  getType(undefined); // 'undefined'
  getType([]); // 'array'
  getType({}); // 'object'
  getType(new Date()); // 'date'
  getType(/abc/); // 'regexp'
  getType(new Map()); // 'map'
  getType(Promise.resolve()); // 'promise'
}

function jishengzuhe_extend() {
  function Parent(age) {
    this.age = age
    this.colors = [1,2]
    this.listColor = function()  {
      console.log('listColor', this.colors)
    }
  }
  Parent.prototype.myAge = function() {
    console.log('myAge', this.age)
  }
  function Child(age, name) {
    Parent.call(this, age)
    this.name = name
  }
  Child.prototype = Object.create(Parent.prototype)
  // 修补子对象的原型的构造函数指向，不修复的话对象的constructor指向的是Parent
  // Child.prototype.constructor = Child
  Child.prototype.myName = function() {
    console.log('myName', this.name)
  }
  function Sun(age, name) {
    Child.call(this, age, name)
  }
  Sun.prototype = Object.create(Child.prototype)
  const child1 = new Child(12, 'lili')
  child1.myAge()
  child1.myName()
  child1.colors.push(3)
  child1.listColor()
  
  const child2 = new Child(15, 'kangkang')
  child2.myAge()
  child2.myName()
  child2.listColor()

  const sun = new Sun(1, 'sunsun')
  console.log('sun', sun)
  sun.myAge()
  sun.myName()
  sun.listColor()

  console.log('Object.getPrototypeOf(sun) === Sun.prototype', Object.getPrototypeOf(sun) === Sun.prototype)
  console.log('Object.getPrototypeOf(child1) === Child.prototype', Object.getPrototypeOf(child1) === Child.prototype)
  console.log('Object.getPrototypeOf(Child.prototype) === Parent.prototype', Object.getPrototypeOf(Child.prototype) === Parent.prototype)
  console.log('Object.getPrototypeOf(Parent.prototype) === Object.prototype', Object.getPrototypeOf(Parent.prototype) === Object.prototype)
  console.log('sun instanceof Sun', sun instanceof Sun, sun.constructor, Sun.constructor)
  console.log('sun instanceof Child', sun instanceof Child)
  console.log('sun instanceof Parent', sun instanceof Parent)

  console.log('child1 instanceof Child', child1 instanceof Child, child1.constructor)
  console.log('child1 instanceof Parent', child1 instanceof Parent, Parent.prototype)
}

export function q13() {
  jishengzuhe_extend()
}