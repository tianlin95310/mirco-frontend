<template>
  <div class="page-container">
    <div>
      <button class="button" @click="testStrOp">测试字符串split操作</button>
      <button class="button" @click="strIndex">js字符串截取</button>
      <button class="button" @click="strReplace" title="replaceAll不是全部浏览器支持">字符串替换</button>
      <button class="button" @click="testStart">判断是以某段开头</button>
      <button class="button" @click="testReg()">去点数字前面的0</button>
      <button class="button" @click="testTeshu">判断是否包含特殊字符</button>
    </div>
    <div>
      <button class="button" @click="jsEmptyToJson">js空串转json</button>
      <button class="button" @click="testUrlDecode">url转义</button>
    </div>

    <h5>千分位展示数据 123 = {{ numberFormat(123, 2, ".", ",") }}</h5>
    <h5>千分位展示数据 123.45 = {{ numberFormat(123.45, 2, ".", ",") }}</h5>
    <h5>千分位展示数据 1123.45 = {{ numberFormat(1123.45, 2, ".", ",") }}</h5>
    <h5>
      千分位展示数据 112133.4567 = {{ numberFormat(112133.4567, 2, ".", ",") }}
    </h5>

  </div>
</template>
<script setup>
import { numberFormat } from '@/utils/dataFormat';
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
</script>
<style scoped="scope">
div>div {
  margin-top: 10px;
}
</style>
