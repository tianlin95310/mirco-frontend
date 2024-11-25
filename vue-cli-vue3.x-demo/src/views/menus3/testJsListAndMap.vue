<template>
  <div class="page-container">
    <h2>测试js中的数据和Map(控制台查看)</h2>
    <div>
      <button class="btn btn-primary" @click="array_fun">Array基本用法</button>
      <button class="btn btn-info" @click="map_fun">Map的用法</button>
      <button class="btn btn-danger" @click="obj_fun">Object的用法</button>
      <button class="btn btn-warning" @click="testeqcommon">
        常见的==比较
      </button>
    </div>
    <div>
      <button class="button" @click="testeq">==操作符特殊用法</button>

      <button class="button" @click="testNull">测试空的判断</button>
    </div>

    <div>
      <button class="button" @click="fun6">
        类型判断(type of, instance of)
      </button>

      <button class="button" @click="stringAndString">
        string,String的区别
      </button>

      <pre>
        原始值数据类型
        undefined,null,string,number,bool,object,Symbol,BigInt
        特殊数字
        +-Infinity,+-0,Nan
        基本类型包装类
        Undefined,Null,String,Number,Boolean,Object,Symbol,BigInt

        **typeof**
        - `typeof`一般用来判断原始值数据类型，**除了判断 null 会输出"object"，其它都是正确的**
        - `typeof`判断引用数据类型时，**除了判断函数会输出"function",其它都是输出"object"**
        **instanceof**
        - Instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的`prototype`属性是否在某
          个实例对象的原型链上， 不能判断基本数据类型
      </pre>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  methods: {
    stringAndString() {
      let index = 1
      console.log(toString("1"), '1'.toString(), index.toString());
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
    },
    /**
     * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
     * 用于判断引用类型
     */
    fun6() {
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
    },
    testNull() {
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
    array_fun() {
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
    },
    map_fun() {
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
    },
    testeqcommon() {
      console.log("' ' == 0", " " == 0);
      console.log("' ' == ''", " " == "");
      console.log("undefined == null", undefined == null);
      console.log("undefined === null", undefined === null);
      // == 两边有字符串是会强转为字符串，有数字是会强转为数字，有object时，则会调用内部的toPrimitive再进行比较
    },
    testeq() {
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
    obj_fun() {
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
      // 输出所有的key
      console.log(obj.id + ", " + obj[NaN] + ", " + obj[obj]);
      console.log(Object.getOwnPropertyDescriptors(obj))
      console.log(Object.getOwnPropertyNames(obj))
    }
  }
};
</script>

<style scoped></style>
