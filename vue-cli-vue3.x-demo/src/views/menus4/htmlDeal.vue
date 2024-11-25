<template>
  <div class="html-deal page-container">
    <h2>输入框的处理</h2>
    <div>
      <div>原值</div>
      <input v-model="number1" />
      {{ number1 }}
    </div>
    <div>
      <div>oninput替换value</div>
      <input
        v-model="number2"
        type="text"
        oninput="value = value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
      />
      {{ number2 }}
    </div>
    <div>
      <div>oninput替换value</div>
      <input
        v-model="number3"
        type="text"
        oninput="value=value.replace(/[^\d.]/g, '')"
      />
      {{ number3 }}
    </div>
    <div>
      <div>oninput替换v-model</div>
      <input
        v-model="number5"
        type="text"
        @input="number5 = number5.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
      />{{ number5 }}
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
      用number会超过16位的限制,可以输入1，js的最长精度 Number.prototype.toPrecision
      双精度浮点数的有效尾数是16位，在js中有效位数是17位，超过10位会截取
      可以理解为JS引擎会默认保留最多17位的有效小数 
      Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2
    </div>
    <div>
      <div>type=number</div>
      <input v-model="number8" type="number" />{{ number8 }}
    </div>
    <div>
      <div>支持大数据</div>
      <input v-model="number9" v-decimal="2" :maxlength="30" />{{ number9 }}
    </div>
    <button @click="show" class="button">显示记录的实际值</button>
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  data() {
    return {
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      number5: "",
      number6: "1234",
      number7: null,
      number8: null,
      number9: null
    };
  },
  directives: {
    pnumber: {
      mounted(el, binding) {
        binding.extraEvent = function(v) {
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
  },
  created() {
    // 同步的回调,单线程执行
  },
  methods: {
    onInput(e) {
      console.log(e);
    },
    show() {
      alert(
        `${this.number1 || null}\n${this.number2 || null}\n${this.number3 || null}\n${this.number5 || null}\n${this.number4 || null}\n${this.number6 || null}\n${this.number7 || null}\n${this.number8 || null}\n${this.number9 || null}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.html-deal {
  div {
    margin-top: 10px;
    div {
      display: inline-block;
      width: 190px;
    }
    input {
      width: 440px;
    }
  }
}
</style>
