<template>
  <div class="page-container">

    <group-card title="字符串处理">
      <button class="button" @click="testStrOp">测试字符串split操作</button>
      <button class="button" @click="strIndex">js字符串截取</button>
      <button class="button" @click="strReplace" title="replaceAll不是全部浏览器支持">字符串替换</button>
      <button class="button" @click="testStart">判断是以某段开头</button>
      <button class="button" @click="testReg()">去点数字前面的0</button>
      <button class="button" @click="testTeshu">判断是否包含特殊字符</button>
    </group-card>

    <group-card title="json字符串处理">
      <button class="button" @click="JsonFormat">自定义son字符串格式化</button>
      <button class="button" @click="jsEmptyToJson">js空串转json</button>
    </group-card>

    <group-card title="url处理">
      <button class="button" @click="testUrlDecode">url转义</button>
    </group-card>

    <group-card title="JS除与取模" inline>
      <pre>
        在js中 1/2 = {{ 1 / 2 }}
        在js中 2/4 = {{ 2 / 4 }}
        在js中 3/4 = {{ 3 / 4 }}
        在js中 4/4 = {{ 4 / 4 }}
        取余数1 % 3 = {{ 1 % 3 }}
        取余数2 % 3 = {{ 2 % 3 }}
        取余数3 % 3 = {{ 3 % 3 }}
        取余数4 % 3 = {{ 4 % 3 }}
        取余数5 % 3 = {{ 5 % 3 }}
      </pre>
    </group-card>


    <group-card title="undefined与null以及特殊点" inline>
      <pre>
        undefined + 1 = {{ undefined + 1 }}
        1 + undefined = {{ 1 + undefined }}
        null + 1 = {{ null + 1 }}
        1 / 0 = {{ 1 / 0 }}
        '123' + 123 = {{ "123" + 123 }}
        0.1 + 0.2 = {{ 0.1 + 0.2 }}
        0.1 + 0.7 = {{ 0.1 + 0.7 }}
        +0 == -0 = {{ +0 == -0 }}
        +0 === -0 = {{ +0 === -0 }}

        +'123' = {{ +'123' }}
        12345678912345671 === 12345678912345672 {{ 12345678912345671 === 12345678912345672 }}
        12345678912345671 == 12345678912345672 {{ 12345678912345671 == 12345678912345672 }}
        '1' == 1 = {{ '1' == 1 }}
        ' ' == '' = {{ ' ' == '' }}
        ' ' == 0 = {{ ' ' == 0 }}
        'x' == 0 = {{ 'x' == 0 }}
        true == 0 = {{ true == 0 }}
        false == 0 = {{ false == 0 }}
      </pre>
    </group-card>

    <group-card title="||与&&运算符" inline>
      <pre>
        <span>||与()</span>
        <span>||运算 undefined || 1 - undefined || 2 = {{ undefined || 1 - undefined || 2 }}</span>
        <span>||运算 (undefined || 1) - (undefined || 2) = {{ (undefined || 1) - (undefined || 2) }}</span>
        undefined && 1 = {{ undefined && 1 }}
        1 && 2 = {{ 1 && 2 }}
      </pre>
    </group-card>

    <group-card title="特殊值进行比较" inline>
      <pre>
        浮点数与0 0.00 == 0 = {{ 0.0 == 0 }}
        浮点数与0 0.000 === 0 = {{ 0.0 === 0 }}
        <span class="highlight">undefined == null =  {{ undefined == null }}</span>
        undefined === null = {{ undefined === null }}
        <span>null == NaN = {{ null == NaN }}</span>
        null === NaN = {{ null === NaN }}
        undefined == NaN = {{ undefined == NaN }}
        undefined === NaN = {{ undefined === NaN }}
        <span class="highlight">NaN == NaN = {{ NaN == NaN }}</span>
        <span class="highlight">NaN === NaN = {{ NaN === NaN }}</span>
        Infinity == Infinity = {{ Infinity == Infinity }}
        Infinity === Infinity = {{ Infinity === Infinity }}
      </pre>
    </group-card>

    <group-card title="千分位处理" inline>
      <pre>
        千分位展示数据 123 = {{ numberFormat(123, 2, ".", ",") }}
        千分位展示数据 123.45 = {{ numberFormat(123.45, 2, ".", ",") }}
        千分位展示数据 1123.45 = {{ numberFormat(1123.45, 2, ".", ",") }}
        千分位展示数据 112133.4567 = {{ numberFormat(112133.4567, 2, ".", ",") }}
      </pre>
    </group-card>

    <div>
      <span class="tag" style="margin-left: 16px;" @click="random">{{ number }}</span>
    </div>

  </div>
</template>
<script setup>
import { numberFormat } from '@/utils/dataFormat';
import { ref, computed } from 'vue';
const testUrlDecode = () => {
  console.log(
    "decodeURIComponent =",
    encodeURIComponent("测 试&文件转义.pdf"),
    "decodeURI =",
    encodeURI("测 试&文件转义.pdf")
  );
  console.log(
    "decodeURIComponent =",
    encodeURIComponent("xx.docx"),
    "decodeURI =",
    encodeURI("xx.docx")
  );
}
const testTeshu = () => {
  const str = "12345&6123&qwe";
  let index = str.lastIndexOf("&");
  console.log(str.indexOf("&") !== -1, index, str.substring(0, index));
}
const testStart = () => {
  const str = "http://asdasdasdasd";
  console.log(str.startsWith("http"));
}
const strReplace = () => {
  const str = " 1 2 3 4 ";
  console.log("str---" + str.replace(/\s/g, ""));

  const str1 = " 1:2:3 4 ";
  console.log("str---" + str1.replace(/:/g, "-"));

  const str3 = " 1/2/3/4 ";
  console.log("str---" + str3.replace(/\//g, "*"));

  const str4 = "2022-12-12 12:12:12";
  console.log("str---" + str4.replace(/-/g, "/"));

  // replaceAll not all browser supported
  console.log("str---" + ' 1/2/3/4 '.replaceAll('/', "*"));
}
const jsEmptyToJson = () => {
  const str = "";
  console.log("--- " + JSON.stringify(str));
}
const strIndex = () => {
  const str = "123.jpg";
  const index = str.lastIndexOf(".");
  const newstr = str.substring(index, str.length);
  console.log("---newstr---" + newstr);
}
const testReg = () => {
  const s = "00012";
  console.log(s.replace(/\b(0+)/gi, ""));
}
const testStrOp = () => {
  const str = "1__";
  console.log("---拆分---" + str.split("_"));
  console.log("---拆分后的长度---" + str.split("_").length);
}
const methods = {

  JsonFormat() {
    const value = {
      v1: undefined,
      v2: null,
      v3: "",
      v4: 123,
      v5: "tianlin"
    };

    function rep(key, value) {
      console.log(key, value);
      if (value === null) {
        return undefined;
      } else if (value === "") {
        return undefined;
      } else {
        return value;
      }
    }
    console.log(JSON.stringify(value, rep));
  },
  random() {
    number.value = Math.ceil(Math.random() * 8888 + 1000);
  }
}

const { JsonFormat, random } = methods
const number = ref(0)
const value = computed(() => 1 / 2)
random()

</script>
<style scoped="scope">
div>div {}
</style>
