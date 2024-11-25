<template>
  <div class="third-api">
    <div>
      <img :src="image" alt="image">
    </div>
    <div>
      <input v-model="input">
      <input type="radio" name="1" label="0" :value="0" @click="onValue(0)">chartEB
      <input type="radio" name="1" label="1" :value="1" @click="onValue(1)">chartEBT
      <input type="radio" name="1" label="2" :value="2" @click="onValue(2)">chartB7B

      <pre style="white-space: pre-wrap;">{{ result }}</pre>
    </div>
    <button class="button" style="height: 40px;" @click="ask">ask</button>
  </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue';
import { getImg, chartEB, chartEBT, chartB7B } from './api.js'

const state = reactive({
  image: '',
  result: '',
  input: '',
  methods: [
    chartEB,
    chartEBT,
    chartB7B
  ],
  apiIndex: 0
})

const onValue = (value) => {
  console.log('onValue', value)
  state.apiIndex = value
}
const ask = () => {
  callApi(state.input)
}
const callApi = (input) => {
  state.methods[state.apiIndex]({
    messages: [{
      role: 'user', content: input
    }]
  }).then(({ data }) => {
    state.result = data.result
  })
}
const getImgFun = () => {
  getImg({
    taskId: '16604822'
  }).then(({ data }) => {
    data = data.data
    state.image = data.img
  }).catch(e => {
  })
}
{
  getImgFun()
}

</script>

<style lang="scss" scoped>
.third-api {

  img {
    width: 200px;
  }
}
</style>
