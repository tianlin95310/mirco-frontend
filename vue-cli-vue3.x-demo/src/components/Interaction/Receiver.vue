<script setup>
import { ref, useAttrs, computed, watch, defineOptions } from 'vue';
import { useStore } from 'vuex'
defineOptions({
  name: 'Receiver'
})
const attrs = useAttrs()
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})
const extra = attrs.extra
const broadcastData = ref(null)
const getInterData = (newV, oldV) => {
  console.log('getInterData', newV, oldV)
  broadcastData.value = newV
}
defineExpose({
  getInterData
})

</script>

<template>
  <div class="receiver">
    <div>extra属性：</div>
    <div v-for="(value, key, index) in extra" :key="index">
      [ {{ index }} ] {{ key }}: {{ value }}
    </div>
    <div>监听值：</div>
    <div v-for="(value, key, index) in broadcastData" :key="index">
      [ {{ index }} ] {{ key }}: {{ value }}
    </div>
  </div>
</template>

<style>
.receiver {
  width: 200px;
  height: 200px;
  border: 1px solid gainsboro;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
}
</style>