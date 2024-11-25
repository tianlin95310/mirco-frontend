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
<script>
/*eslint-disable*/
function numberFormat(number, decimals, decPoint, thousandsSep, roundtag) {
  /*
  console.log(numberFormat(100000.00, 2, '.', ',')) // '100,000.00'
      * 参数说明：
      * number：要格式化的数字
      * decimals：保留几位小数
      * dec_point：小数点符号
      * thousands_sep：千分位符号
      * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
      * */
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  roundtag = roundtag || "ceil"; // 'ceil','floor','round'
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
  var dec = typeof decPoint === "undefined" ? "." : decPoint;
  var s = "";
  var toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);
    console.log();

    return (
      "" +
      parseFloat(
        Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
      ) /
        k
    );
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

export default {
  methods: {
    numberFormat: numberFormat,
    testUrlDecode() {
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
    },
    testTeshu() {
      const str = "12345&6123&qwe";
      let index = str.lastIndexOf("&");
      console.log(str.indexOf("&") !== -1, index, str.substring(0, index));
    },
    testStart() {
      const str = "http://asdasdasdasd";
      console.log(str.startsWith("http"));
    },
    strReplace() {
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
    },
    jsEmptyToJson() {
      const str = "";
      console.log("--- " + JSON.stringify(str));
    },
    strIndex() {
      const str = "123.jpg";
      const index = str.lastIndexOf(".");
      const newstr = str.substring(index, str.length);
      console.log("---newstr---" + newstr);
    },
    testReg() {
      const s = "00012";
      console.log(s.replace(/\b(0+)/gi, ""));
    },
    testStrOp() {
      const str = "1__";
      console.log("---拆分---" + str.split("_"));
      console.log("---拆分后的长度---" + str.split("_").length);
    }
  }
};
</script>
<style scoped="scope">
div > div {
  margin-top: 10px;
}
</style>
