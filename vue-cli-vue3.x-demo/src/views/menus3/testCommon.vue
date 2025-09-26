<template>
  <div class="page-container">
    <h2>测试js中的数据和Map(控制台查看)</h2>
    <div class="border-card">
      <span>Object的用法</span>
      <div>
        <button class="button btn btn-danger" @click="obj_fun">Object的用法</button>
        <button class="button btn btn-warning" @click="testeqcommon">常见的==比较</button>
        <button class="button" @click="testeq">==操作符配合toString()</button>

        <button class="button" @click="testNull">测试空的判断</button>

        <button class="button" @click="fun6">类型判断(type of, instance of)</button>
      </div>
    </div>

    <div class="border-card">
      <span>Array的用法</span>
      <div>
        <button class="button btn btn-primary" @click="array_fun">Array基本用法</button>
        <button class="button" @click="sort">测试数组排序</button>

        <button class="button" @click="reduceQuchong">reduce方式去重</button>

        <button class="button" @click="testAddListEle">push list[0]</button>

        <button class="button" @click="splice">splice(1, 1)</button>
        <button class="button" @click="spliceNo">splice(0，0)</button>

        <button class="button" @click="flatApi">数组扁平化操作api</button>
      </div>
    </div>

    <div class="border-card">
      <span>Set的用法</span>
      <div>
        <button class="button" @click="SetArray">不重复的集合Set</button>
      </div>
    </div>

    <div class="border-card">
      <span>Map的用法</span>
      <div>
        <button class="button btn btn-info" @click="map_fun">Map的用法</button>
      </div>
    </div>

    <div class="border-card">
      <span>特殊点</span>
      <div>
        <button class="button" @click="stringAndString">
          string,String的区别
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/*eslint-disable*/
function customCompareASC(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    if (value1 > value2) {
      return 1
    } else if (value1 < value2) {
      return -1
    } else {
      return 0
    }
  }
}

const stringAndString = () => {
  let index = 1
  console.log(toString(), '1'.toString(), index.toString());
  console.log(
    String("1") === '1',
    String("1") == '1',
    String("1") === 1,
    String("1") == 1,
    '1' === 1,
    '1' == 1,
    new String("1") == new String("1"),
    new String("1") === new String("1")
  );
}

const { map_fun } = {
  map_fun: () => {
    console.clear();
    var obj = {
      key: "我是key"
    };
    const map = new Map();
    map.set(1, "我是第一个value");
    map.set("2", {
      value: "我是第二个value"
    });
    map.set(obj, "我是第三个value");
    console.log(map.size);
    console.log(map.has(obj));
    map.forEach((k, v) => {
      console.log(k + " = " + v);
    });
    console.log("operate map");
    map.delete(obj);
    console.log(map.has(obj));
    map.forEach((k, v) => {
      console.log(k + " = " + v);
    });
  }
}
const { obj_fun, testeqcommon, testeq, testNull, fun6 } = {
  obj_fun: () => {
    // 对于数组
    var obj = {};
    // 自定义的属性，可以用.直接访问
    obj.id = 1;
    // 以字符串为key的形式只能用[str名]访问
    // obj['name'] = 'tianlin'
    // Nan为key既可以用.来访问，也可以用[]访问
    obj[NaN] = "nan";
    // 以object为key只能用[]访问
    obj[obj] = "obj为key";
    // 输出所有的key,实际都会转化为String
    console.log(obj.id + ", " + obj[NaN] + ", " + obj[obj]);
    console.log(Object.getOwnPropertyDescriptors(obj))
    console.log(Object.getOwnPropertyNames(obj))
    console.log(Object.keys(obj))
  },
  testeqcommon: () => {
    console.log("' ' == 0", " " == 0);
    console.log("' ' == ''", " " == "");
    console.log("undefined == null", undefined == null);
    console.log("undefined === null", undefined === null);
    // == 两边有字符串是会强转为字符串，有数字是会强转为数字，有object时，则会调用内部的toPrimitive再进行比较
  },
  testeq: () => {
    var a = {
      value: 1,
      // [Symbol.toString]() {
      //   return a.value++
      // },
      toString() {
        return a.value++;
      }
    };
    console.log(a == 1 && a == 2 && a == 3);
  },
  testNull: () => {
    let test1;
    if (test1) {
      console.log("test1 is true value");
    } else {
      console.log("test1 is false value");
    }
    const test2 = "";
    console.log("test2 = " + test2);
    if (test2) {
      console.log("test2 is true value");
    } else {
      console.log("test2 is false value");
    }
    const test3 = '""';
    console.log("test3 = " + test3);
    if (test3) {
      console.log("test3 is true value");
    } else {
      console.log("test3 is false value");
    }
    const val4 = NaN;
    if (val4) {
      console.log("val4 is true value");
    } else {
      console.log("val4 is false value");
    }
    const v5 = [];
    if (v5) {
      console.log("v5 is true value");
    } else {
      console.log("v5 is false value");
    }
  },
  fun6: () => {
    const a = "123";
    console.log("a instanceof String", a instanceof String);
    console.log("typeof a === 'string'", typeof a === "string");
    console.log("------------------------");
    const b = String("123");
    console.log("b", b instanceof String);
    console.log(typeof b === "string");
    console.log("------------------------");
    const c = {};
    console.log("c", c instanceof Object);
    console.log(typeof c === "object");
    console.log("------------------------");
    const d = Symbol("sum");
    console.log("d", d instanceof Object);
    console.log(typeof d, typeof d === "object");
    console.log("------------------------");
    const e = new Date();
    console.log("e", e instanceof Date);
    console.log(typeof e === "object");
    console.log("------------------------");
    const f = null;
    console.log(f instanceof Object);
    console.log(typeof f, typeof f === "object");
    console.log("------------------------");
  }
}

const { testAddListEle, reduceQuchong, flatApi, SetArray, spliceNo, splice, sort, array_fun } = {
  testAddListEle() {
    const o1 = {
      str: 'o1'
    }
    const list = [{ str: 'o2' }, o1]
    console.log('list', JSON.stringify(list))
    list.push(list[1])
    console.log('list', JSON.stringify(list))
    o1.str = 'oo1'
    console.log('list', JSON.stringify(list))
    list[1].str = 'oo2'
    console.log('list', JSON.stringify(list))
  },
  reduceQuchong() {
    let array = [1, 2, 3, 4, 5, 4, 3, 2, 7, 8, 9]
    // console.log(array.reverse())
    // 第二个参数为pre的初始值
    // 求和
    let res = array.reduce((pre, current, index, array) => {
      console.log(pre, current, index, array)
      return pre + current
    }, 0)
    console.log('reduce res', res)

    // 去重
    let newArray = array.reduce((pre, current) => {
      if (!pre.includes(current)) {
        return pre.concat(current)
      } else {
        return pre
      }
    }, [])
    console.log('reduce newArray', newArray)
  },
  flatApi() {
    let array = [[1, 4, 7], 2, [2, 3, 8], [7], [4, , 6]]
    console.log(array.flat())
  },
  SetArray() {
    let set = new Set()
    set.add(12)
    set.add(78)
    set.add(12)
    set.add(34)
    set.add(12)
    set.add(34)
    console.log(set)

    let set2 = new Set()
    set2.add({
      a: 1
    })
    set2.add({
      a: 2
    })
    set2.add({
      a: 1
    })
    console.log(set2)
  },
  spliceNo() {
    const array = [1, 2]
    array.splice(0, 0)
    console.log(array)
  },
  splice() {
    const array = [1, 2, 3]
    array.splice(1, 1)
    console.log(array)
  },
  sort() {
    const list = [{
      name: '12'
    }, {
      name: 'AB'
    }, {
      name: 'Cd'
    }, {
      name: '34'
    }, {
      name: ''
    }]
    console.log(list.sort(customCompareASC('name')).map((item) => item.name))
  },
  array_fun: () => {
    // 不推荐使用new Array的用法
    var array = [];
    // 赋值方式1
    //      for (let i = 0; i < 10; i++) {
    //        array[i] = i
    //      }
    // 赋值方式2
    for (let i = 0; i < 10; i++) {
      array.push(i);
    }
    // 数组的长度
    console.log(array.length);
    // 数组的遍历
    array.forEach(item => {
      console.log(item);
    });
  }
}
</script>

<style scoped></style>
