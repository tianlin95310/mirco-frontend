<template>
  <div class="page-container">
    <group-card title="...运算符的用法">
      <button class="button" @click="test1">解析数组，类似于可变数组</button>
      <button class="button" @click="test2">作为形参传递，数组类型参数</button>
      <button class="button" @click="testKeiban">数组传递到可变参数</button>
      <button class="button" @click="test3">取对象key对应的值 并直接初始化给变量</button>
      <button class="button" @click="test4">作为数组可变参数传递，解析字符串成数组</button>
    </group-card>

    <group-card title="对象克隆">
      <button class="button" @click="test6">
        多层对象的克隆（复杂对象，无法克隆）
      </button>
      <button class="button" @click="test5">单层对象的克隆（简单对象）</button>
      <button class="button" @click="deepclone">手动实现深克隆</button>
    </group-card>

    <group-card title="运算符与方法">
      <button class="button" @click="newKeyWord">新的运算符...， ?., ??</button>

      <button class="button" @click="inAndis">in, Object.is(),</button>

      <button class="button" @click="var_let">var与let的区别</button>

      <button class="button" @click="var_let_value">var和闭包</button>
    </group-card>

    <group-card title="闭包">
      <button class="button" @click="closure">闭包closure</button>
    </group-card>

    <group-card title="trycatch">
      <button class="button" @click="trycatch">测试catch里返回数据</button>
    </group-card>

    <group-card title="最新特性">
      <button class="button" @click="groupBy">Object.groupBy</button>
    </group-card>

  </div>
</template>
<script>
/*eslint-disable*/
import { cloneDeep } from './qus2025/qus2025'
export default {
  data() {
    return {
      abc: "asdasd"
    };
  },
  methods: {
    groupBy() {
      const a = [{ g: 1, b: 'b' }, { g: 2, b: 'd' }, { g: 1 }, { g: 3 }]
      const group = Object.groupBy(a, ({ g }) => g)
      console.log('group', group)
    },
    deepclone() {
      // let a = [1,2,3,4]
      // let b = deepClone(a)
      // a.push(5)
      // console.log(a, b)

      let a = {
        a: 1,
        b: {
          c: 1,
          d: 2
        }
      };
      let b = cloneDeep(a);
      a["e"] = "100";
      console.log(a, b);
    },
    closure() {
      function factory(x) {
        return function (y) {
          return x + y;
        };
      }
      // factory属于工厂函数，调用时会产生一个闭包环境，环境内包含x和函数定义，funA和funB彼此是独立的，他们是两个函数，即使让x的值一样
      let funA = factory(10);

      let funB = factory(100);
      console.log(funA(1), funB(1), funA == funB, funA === funB);
    },
    var_let_value() {
      for (let i = 0; i <= 5; i++) {
        document.addEventListener("click", () => {
          console.log(i);
        });
      }
      // var会有变量提升，不是局部变量，会提升为函数变量
      for (var i = 0; i <= 5; i++) {
        document.addEventListener("click", () => {
          console.log(i);
        });
      }
      for (var i = 0; i <= 5; i++) {
        document.addEventListener("click", () => {
          console.log(i);
        });
      }
      var a;
      var a;
      // var可重复定义，let相同作用区域内，不能重复定义
      let b;
      // let b;
      console.log("a", a);
    },
    var_let() {
      {
        var a = 10; // 代码块内var变量可以提升
        let b = 20;
      }
      console.log(a);
      // console.log(b)
      function test() {
        var c = 100;
        let d = 200;
        console.log(c);
        console.log(d);
      }
      test();
      console.log(c); // c is not defined，var在相同函数内能进行变量提升，超出函数则不行，但是编译阶段不报错
      console.log(d);
    },
    inAndis() {
      let obj = {
        a: 100
      };
      let a = "hasOwnProperty";
      let b = "toString";
      let c = "a";
      let d = "d";

      console.log(a in obj, b in obj, c in obj, d in obj);
      {
        console.log(Object.is("1", 1));
        // Expected output: false

        console.log(Object.is(NaN, NaN));
        // Expected output: true

        console.log(Object.is(-0, 0));
        // Expected output: false

        const obj = { a: 1 };
        console.log(Object.is(obj, { a: 1 }), Object.is(obj, obj));
        // Expected output: false
      }
      console.log('---------');
      {
        console.log("1" == 1);
        console.log(NaN == NaN);
        console.log(-0 == 0);
        const obj = { a: 1 };
        console.log(obj == { a: 1 });
      }
      console.log('---------');
      {
        console.log("1" === 1);
        console.log(NaN === NaN);
        console.log(-0 === 0);
        const obj = { a: 1 };
        console.log('obj === {a: 1}', obj === { a: 1 });
      }
    },
    newKeyWord() {
      const a = undefined ?? 1;
      console.log(a);

      const b = {
        key: "value"
      };
      console.log(b?.key);
      const c = undefined;
      console.log(c?.key);
      console.log(c.key);
    },
    test6() {
      const map1 = {
        v1: {
          a: 1,
          b: "2"
        },
        v2: [1, 2, 3],
        v3: 11
      };
      const map2 = { ...map1 };
      map2.v1.a = 10;
      map2.v3 = 22;
      console.log("map1---", map1);
      console.log("map2---", map2);
      console.log("===", map1 === map2);
    },
    test5() {
      const b = {
        key: "key",
        value: "value"
      };
      // 用在对象上实现对象的克隆
      console.log("---b---", b);
      const bb = {
        ...b
      };
      console.log("---bb---", bb);
      b.key = "change";
      console.log("---b---", b);
      console.log("---bb---", bb);
      console.log("===", b === bb);
    },
    test4() {
      const a = [1, 2, 3];
      // 作为数组输出
      console.log(a);
      // 此种写法错误
      // const aa = ...a
      // 单个匹配输出
      console.log(...a);
      // 解析为数组
      const c = "tianlin";
      const cc = [...c];
      console.log(cc);
    },
    test3() {
      const data = {
        name: "asasdas",
        age: 23,
        list: [14, 56]
      };
      const { name, age, list: score } = data;
      console.log(name, age, score);
    },
    // 可变长度参数
    fun2(array, ...args) {
      console.log(args.length, args);
    },
    fun1([a, b, c]) {
      console.log(a, b, c);
    },
    testKeiban() {
      const a = [1, 2, 3];
      this.fun2(a, 1, "str", []);
    },
    test2() {
      const a = [1, 2, 3];
      this.fun1(a);
    },
    test1() {
      const [a, ...b] = [1, 2, 3, 4];
      console.log(a, b);
      // 后面的2,3,4会被解析成数组b
    },
    async testtrycatchretrun() {
      try {
        throw Error(123)
        // return [1, 2, 3]
      } catch (err) {
        return ['a', 'b', 'c']
      }
    },
    async trycatch() {
      const res = await methods.testtrycatchretrun()
      console.log('res', res)
    },
  }
};
</script>

<style lang="scss" scoped>
div>div {
  margin-top: 10px;
}
</style>
