<script setup lang="ts">
interface Men {
  name: string
  age: number
}
</script>

<template>
  <pre>
    1，ts类型没有具体运行时含义，一个obj可以同属于其他的类型
    2，能使用interface尽量使用interface，需要使用复杂数据才使用type
    3，只要给出的对象属性满足需要的对象的属性，ts就会认为类型兼容，可以增加属性，相当于对父类的扩充
  </pre>

  <div class="about">
    <button class="btn btn-primary" @click="objectAsAinterface">ts的面向对象语言的差别</button>
    <button class="btn btn-primary" @click="objTointerface">interface定义对象</button>

    <button class="btn btn-primary" @click="typeUse">type的用法</button>
    <button class="btn btn-primary" @click="interfaceGenerice">interface定义泛型</button>

    <button class="btn btn-primary" @click="classUse">定义class</button>
  </div>
</template>

<style></style>
