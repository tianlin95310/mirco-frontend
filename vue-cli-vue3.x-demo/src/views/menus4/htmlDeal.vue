<template>
  <div class="html-deal page-container">
    <group-card title="判断是否为纯数字，最多两位小数(n.2)" style="display: inline-block;">
      <div>
        <div>
          <div>原值</div>
          <input v-model="number1" />
          {{ number1 }}
        </div>
        <div>
          <div>oninput替换value</div>
          <input v-model="number2" type="text" oninput="value = value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" />
          {{ number2 }}
        </div>
        <div>
          <div>oninput替换value</div>
          <input v-model="number3" type="text" oninput="value=value.replace(/[^\d.]/g, '')" />
          {{ number3 }}
        </div>
        <div>
          <div>oninput替换v-model</div>
          <input v-model="number5" type="text" @input="number5 = number5.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" />{{ number5 }}
        </div>
        <div>
          <div>自定义指令页面内</div>
          <input v-model="number4" type="text" v-pnumber />{{ number4 }}
        </div>
        <div>
          <div>自定义指令全局</div>
          <input v-model="number6" type="text" v-number />{{ number6 }}
        </div>
        <div>
          <div>.number修饰符 仅替换数据类型</div>
          <input v-model.number="number7" />{{ number7 }}
        </div>
        <div>
          用number会超过16位的限制,可以输入1，js的最长精度 Number.prototype.toPrecision双精度浮点数的有效尾数是16位，在js中有效位数是17位，超过10位会截取
          可以理解为JS引擎会默认保留最多17位的有效小数Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2
        </div>
        <div>
          <div>type=number</div>
          <input v-model="number8" type="number" />{{ number8 }}
        </div>
        <div>
          <div>支持大数据</div>
          <input v-model="number9" v-decimal="2" :maxlength="30" />{{ number9 }}
        </div>
        <button @click="show" class="button">展示实际值</button>
      </div>
    </group-card>

    <group-card title="js如何准确的四舍五入保留2位小数" inline>
      <pre>
        function roundToTwo(num) {
          return Math.round((num + Number.EPSILON) * 100) / 100;
        }
      </pre>
    </group-card>

    <group-card title="判断是否为纯数字，最多两位小数(n.2)" inline>
      <input v-model="v1" /> {{ decimal }}
    </group-card>

  </div>

</template>

<script setup>
import { reactive, toRefs, ref, computed } from 'vue';

const state = reactive({
  number1: "",
  number2: "",
  number3: "",
  number4: "",
  number5: "",
  number6: "1234",
  number7: null,
  number8: null,
  number9: null
})
const { number1, number2, number3, number4, number5, number6, number7, number8, number9 } = toRefs(state)

const vPnumber = {
  mounted(el, binding) {
    binding.extraEvent = function (v) {
      const reg = /^[0-9]+\.?[0-9]{0,2}$/;
      if (v.target.value && !reg.test(v.target.value)) {
        v.target.value = v.target.value.replace(
          /^\D*(\d*(?:\.\d{0,2})?).*$/g,
          "$1"
        );
        el.dispatchEvent(new Event("input"));
      }
    };
    el.addEventListener("input", binding.extraEvent);
    // console.log('mounted', el, binding.extraEvent)
  },
  unmounted(el, binding) {
    // console.log('unmounted', el, binding.extraEvent)
    el.removeEventListener("input", binding.extraEvent);
  }
}
const onInput = (e) => {
  console.log(e);
}
const show = () => {
  alert(
    `${number1.value || null}\n${number2.value || null}\n${number3.value || null}\n${number5.value || null}\n${number4.value || null}\n${number6.value || null}\n${number7.value || null}\n${number8.value || null}\n${number9.value || null}`
  );
}

const v1 = ref('')
const decimal = computed(() => {
  if (!v1.value) {
    return 'empty'
  }
  const reg = /^[0-9]+\.?[0-9]{0,2}$/
  if (reg.test(v1.value)) {
    return 'is'
  } else {
    return 'no'
  }
})
</script>

<style lang="scss" scoped>
.html-deal {
  div {
    margin-top: 10px;

    input {
      width: 440px;
    }
  }
}
</style>
