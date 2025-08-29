<template>
  <div class="data-structure">
    <h5>数组</h5>
    <button class="button">插入</button>
    <button class="button">删除</button>

    <h5>链表</h5>
    <button class="button" @click="visitLinkedList">遍历</button>
    <button class="button">插入</button>
    <button class="button">删除</button>
    <button class="button" @click="combineLinkedList">合并</button>
  </div>
</template>
<script setup>
const array = [1,3,5,7,9,8,6,4,2,9,7,5,3,1]
class Node {
  constructor(info, next) {
    this.info = info
    this.next = next
  }
  visitLinkedList() {
    console.log('Node', this.info)
    this.next && this.next.visitLinkedList()
  }
}

const node1 = new Node('张三', new Node('李四', new Node('王五')))
let p1 = new Node(2, new Node(4, new Node(6, new Node(8))))
let p2 = new Node(1, new Node(3, new Node(5, new Node(7, new Node(9)))))
const visitLinkedList = () => {
  node1.visitLinkedList()
}
const combineLinkedList = () => {
  const combine = (p1, p2) => {
    let p = p1
    while(p2) {
      const temp = p2.next
      while (p1) {
        const temp = p1.next 
        if (p1.next ? p2.info > p1.info && p2.info < p1.next.info : p2.info > p1.info) {
          break
        } else if (p2.info < p1.info){
          break
        }
        p1 = temp
      }
      p2 = temp
    }
    return p
  }
  const p = combine(p1, p2)
  p.visitLinkedList()
  console.log('---------------------')
  p1.visitLinkedList()
  console.log('---------------------')
  p2.visitLinkedList()
}

</script>