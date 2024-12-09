<template>
  <div class="test-css-style page-container">
    <div>
      <h2>测试css的属性</h2>
      <div class="parent">
        <span style="visibility: hidden;" @click="testBefore">我的visibility</span>
        <p class="test">我在父块的右下角</p>
      </div>

      <div class="test-before" @click="testBefore">
        line-height竖直居中
      </div>

      <div style="background: white;display: inline-block;width: 300px;height: 200px;vertical-align: middle;text-align: center">
        <div style="background: #D42D00;width: 50%;text-align: center;margin: 0 auto;">div水平居中</div>
      </div>

      <div style="background: white;display: inline-block;width: 300px;height: 200px;vertical-align: middle;text-align: center">
        <div>0.5px边框</div>
        <div class="line-t-e line-b-e">sss</div>
      </div>
    </div>

    <!--    margin 塌陷导致垂直居中失效-->
    <div style="background: gray;width: 200px;height: 200px;">
      <div style="background: #D42D00;height: 50%;width: 50%;margin: 50px 0;">已知父高度和自身高度实现竖直居中</div>
    </div>

    <!--    通过子元素display: inline-block设置BFC解决问题-->
    <div style="background: white;width: 200px;height: 200px;display: inline-block">
      <div style="background: #D42D00;height: 50%;width: 50%;margin: 50px 0;">已知父高度和自身高度实现竖直居中</div>
    </div>
    <!--    ·可以为父元素定义上边框。-->
    <!--    ·可以为父元素定义上内边距-->
    <!--    ·可以为父元素添加overflow:hidden, auto等，不能为visable。-->
    <div style="background: whitesmoke;width: 200px;height: 200px;overflow: hidden">
      <div style="background: #D42D00;height: 50%;width: 50%;margin: 50px 0;">已知父高度和自身高度实现竖直居中</div>
    </div>

    <div>
      <div style="width: 39%;background: red;display: inline-block">我占39%</div>
      <div style="width: 70%;background: blue;display: inline-block">我占70%</div>
    </div>

    <!--width: 50% 各种50%却换行的问题，是因为两个字div出现了空白间隙-->
    <!--原理：多出来的其实是换行符，所以将字体设置为0，那么换行符就是0px不会显示了。但是如果将HTML标签写成一行的话，就没有换行符了。-->
    <div style="width: 100%;">
      <div style="width: 50%;background: red;display: inline-block;font-size: 12px">我占50%</div>
      <div style="width: 50%;background: blue;display: inline-block;font-size: 12px">我占50%</div>
    </div>

    <div style="border: 1px solid;height: 100px;position: static;left: 100px;">我是static元素</div>

    <div style="border: 1px solid;height: 100px;position: relative;left: 50px;">我是relative元素</div>

    <div style="border: 1px solid;height: 100px;position: absolute;left: 100px;">我是absolute元素</div>

    <div id="float1" class="test-float" style="overflow: hidden;">
      <div style="float: left;">没有overflow: hidden(BFC)的话float1的高度为0，无法支持起来</div>
      <img src="../../assets/bg.jpg" style="float: right;height: 160px;">
    </div>

    <div id="float2" class="test-float">
      <div style="float: left;">没有使用div clearfix的话float2的高度为0，无法支持起来</div>
      <img src="../../assets/bg.jpg" style="float: right;height: 160px;">
      <div class="clearfix" />
    </div>

    <div id="float3" class="test-float clearfix-after">
      <div style="float: left;">没有使用clearfix-after的话float3的高度为0，无法支持起来</div>
      <img src="../../assets/bg.jpg" style="float: right;height: 160px;">
    </div>

    <div id="float4" class="test-float clearfix-before">
      <div style="float: left;">只使用clearfix-before的话float4的高度为0，无法支持起来</div>
      <img src="../../assets/bg.jpg" style="float: right;height: 160px;">
    </div>

  </div>
</template>

<script setup>
const testBefore = () => {
  alert('window testBefore')
}
</script>
<style lang="scss">
.test-css-style {
  background-color: var(--primiryColor);
  color: black;
  position: relative;
  left: 100px;
  // relative元素可为自身设置相对位置

  .test-float {
    border: 1px solid;
    margin-top: 10px;

    .overflow {
      overflow: hidden;
    }

    div {
      background: #D42D00;
      margin-top: 10px;
    }

    .left {
      float: left;
      color: black;
    }

    .right {
      float: right;
      color: black;
    }
  }

  .test-before {
    display: inline-block;
    height: 120px;
    width: 160px;
    position: relative;
    line-height: 120px;
    background: lightgrey;
  }

  /*::after不在dom上，不能响应事件, 但能增加元素本身的点击面积*/
  .test-before::after {
    content: '\2715';
    position: absolute;
    cursor: pointer;
    right: -6px;
    line-height: 0px;
  }
}

.parent {
  position: relative;
  width: 200px;
  height: 100px;
  display: inline-block;
  background: yellow;
  font-size: 0.7rem;
  vertical-align: middle;

  .test {
    color: #0f131c;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
  }

}
</style>
