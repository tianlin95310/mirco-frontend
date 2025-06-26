<template>
  <div class="page-container test-event">
   <div>
    父parent
     <div class="parent" @click="parEvent">
       <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
       <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
       <div class="child" @click.capture="childEvent">.capture</div>
       <div class="child" @click.self="childEvent">.self</div>
       <div class="child" @click.once="childEvent">.once</div>
       <div class="child" @click.passive="childEvent">.passive</div>
       <div class="child" @click.left="childEvent">.left</div>
       <div class="child" @click.right="childEvent">.right</div>
     </div>
   </div>
    <div>
     <!-- 只有点击自己的部分才会触发事件，被覆盖的内容被点击不响应，child会响应自己的事件 -->
     父parent.self
      <div class="parent" @click.self="parEvent">
        <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
        <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
        <div class="child" @click.capture="childEvent">.capture</div>
        <div class="child" @click.self="childEvent">.self</div>
        <div class="child" @click.once="childEvent">.once</div>
        <div class="child" @click.passive="childEvent">.passive</div>
        <div class="child" @click.left="childEvent">.left</div>
        <div class="child" @click.right="childEvent">.right</div>
      </div>
    </div>

    <div>
      父parent.stop
      <div class="parent" @click.stop="parEvent">
        <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
        <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
        <div class="child" @click.capture="childEvent">.capture</div>
        <div class="child" @click.self="childEvent">.self</div>
        <div class="child" @click.once="childEvent">.once</div>
        <div class="child" @click.passive="childEvent">.passive</div>
        <div class="child" @click.left="childEvent">.left</div>
        <div class="child" @click.right="childEvent">.right</div>
      </div>
    </div>

    <div>
      父parent.capture
      <div class="parent" @click.capture="parEvent">
        <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
        <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
        <div class="child" @click.capture="childEvent">.capture</div>
        <div class="child" @click.self="childEvent">.self</div>
        <div class="child" @click.once="childEvent">.once</div>
        <div class="child" @click.passive="childEvent">.passive</div>
        <div class="child" @click.left="childEvent">.left</div>
        <div class="child" @click.right="childEvent">.right</div>
      </div>
    </div>

    <div>
      父parent.prevent
      <div class="parent" @click.prevent="parEvent">
        <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
        <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
        <div class="child" @click.capture="childEvent">.capture</div>
        <div class="child" @click.self="childEvent">.self</div>
        <div class="child" @click.once="childEvent">.once</div>
        <div class="child" @click.passive="childEvent">.passive</div>
        <div class="child" @click.left="childEvent">.left</div>
        <div class="child" @click.right="childEvent">.right</div>
      </div>
    </div>

    <div>
      父parent.once
      <div class="parent" @click.once="parEvent">
        <div class="child" @click.stop="childEvent">.stop 阻止透传，当前消费</div>
        <div class="child" @click.prevent="childEvent">.prevent 阻止默认事件</div>
        <div class="child" @click.capture="childEvent">.capture</div>
        <div class="child" @click.self="childEvent">.self</div>
        <div class="child" @click.once="childEvent">.once</div>
        <div class="child" @click.passive="childEvent">.passive</div>
        <div class="child" @click.left="childEvent">.left</div>
        <div class="child" @click.right="childEvent">.right</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TestEvent',
    methods: {
      parEvent() {
        console.log('parEvent')
      },
      childEvent() {
        console.log('childEvent')
      }
    }
  }
</script>

<style lang="scss" scoped>
.test-event {
  >div {
    display: inline-block;
    margin-left: 16px;
  }
  .parent {
    width: 300px;
    height: 300px;
    background-color: #42b983;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .child {
      box-sizing: border-box;
      background-color: #D42D00;
      cursor: pointer;
      width: 100px;
      height: 100px;
      padding: 10px;
      text-align: center;
      white-space: normal;
    }
  }
}
</style>
