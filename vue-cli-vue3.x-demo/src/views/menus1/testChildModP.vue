<template>
  <div class="test-child-mod page-container">

    <div class="border-card">
      <span>测试子组件更改父组件的data数据，测试更改父组件数据的方式</span>
      <div>
        <div>
          <span class="tag">value1 = {{ value1.value }}</span>
        </div>
        <div>
          <span class="tag">value2 = {{ value2.value }}</span>
        </div>
        <v-model-child v-bind:value="value1" />
        <not-v-model-child v-bind:value="value2" @change="change" />
      </div>
    </div>

    <div class="border-card">
      <span>父子组件传参，在子组件里需要nextTick才能获取</span>
      <div>
        <updateBindValue ref="updateBindValue" :bindName1="bindName1" />
        <button class="button" @click="changeProp1">更新props值</button>
      </div>
    </div>

  </div>
</template>

<script>
import notVModelChild from './comp/notVModelChild.vue'
import vModelChild from './comp/vModelChild.vue'
import updateBindValue from './comp/updateBindValue'

export default {
  components: {
    notVModelChild,
    vModelChild,
    updateBindValue
  },
  methods: {
    show() {
      alert(this.value1.value + ',' + this.value2.value)
    },
    change() {
      this.value2.value = this.value2.value + '111'
    },
    changeProp1() {
      this.bindName1 = 'update value'
      this.$nextTick(() => {
        this.$refs.updateBindValue.showName()
      })
      this.$refs.updateBindValue.showName()
    },
    changeParentAttri() {
      console.log('changeParentAttri', this.bindName2)
      this.$nextTick(() => {
        console.log('changeParentAttri', this.bindName2)
      })
    }
  },
  data() {
    return {
      value1: {
        value: 'value1'
      },
      value2: {
        value: 'value2'
      },
      bindName1: 'init valve',
      bindName2: 'parent init value'
    }
  }
}
</script>

<style scoped lang="scss">
.test-child-mod {
  width: 100%;

  .bt {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  div {
    margin-top: 16px;
  }
}
</style>
