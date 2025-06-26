<template>
  <div class="item">
    <span class="item-index">{{ index }}</span>
    <span class="item-name">{{ name }}</span>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    index: {
      type: Number,
    },
    name: {
      type: String
    }
  }
})
</script>
<style>
.item {
  top: 0 !important;
  text-align: center;
  height: 100px;
  line-height: 100px;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rebeccapurple;
}
.item span {
  margin-right: 10px;
}
</style>