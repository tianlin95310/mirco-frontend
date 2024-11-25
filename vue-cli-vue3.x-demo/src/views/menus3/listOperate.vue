<template>
  <div class="page-container">
    <h2>集合的常见操作</h2>
    <div>
      <button class="button" @click="sort">测试数组排序</button>

      <button class="button" @click="reduceQuchong">reduce方式去重</button>

      <button class="button" @click="testAddListEle">push list[0]</button>
    </div>
    <div>
      <button class="button" @click="splice">splice(1, 1)</button>
      <button class="button" @click="spliceNo">splice(0，0)</button>
    </div>
    <div>
      <button class="button" @click="SetArray">不重复的集合Set</button>
    </div>
    <div>
      <button class="button" @click="flatApi">数组扁平化操作api</button>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  function customCompareASC(propertyName) {
    return function(object1, object2) {
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
  export default {
    data() {
      return {}
    },
    methods: {
      testAddListEle() {
        const o1 = {
          str: 'o1'
        }
        const list = [{ str: 'o2'}, o1]
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
        let array = [[1, 4, 7], 2, [2, 3, 8], [7], [4, ,6]]
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
        const list = [
          {
            name: '12'
          },
          {
            name: 'AB'
          },
          {
            name: 'Cd'
          },
          {
            name: '34'
          },
          {
            name: ''
          }
        ]
        console.log(list.sort(customCompareASC('name')).map((item) => item.name))
      }
    }
  }
</script>

<style scoped>
  div>div {
    margin-top: 10px;
  }
</style>
