<template>
  <div class="page-container">
    <h2>测试Transition动画</h2>

    <div class="linearlayout">
      <div class="left">
        <div>
          <img src="../../assets/logo.png" :class="imgAnim1" />
        </div>
        <button class="button" @click="onClick(1)">缩放动画(通过元素的尺寸，会增大块空间)</button>

        <div>
          <img src="../../assets/logo.png" :class="imgAnim2" />
        </div>
        <button class="button" @click="onClick(2)">平移动画（平移的偏移量）</button>

        <div>
          <img src="../../assets/logo.png" :class="imgAnim3" />
        </div>
        <button class="button" @click="onClick(3)">旋转动画</button>

        <div>
          <img src="../../assets/logo.png" :class="imgAnim4" />
        </div>
        <button class="button" @click="onClick(4)">透明度动画（通过opacity）</button>

        <div>
          <img src="../../assets/logo.png" :class="imgAnim5" />
        </div>
        <button class="button" @click="onClick(5)">缩放动画(通过Scale,不增大块空间)</button>
      </div>

      <div class="right">
        <div class="one-text" :class="{'one-text-hide': bookShow}" @click="bookShow = !bookShow">
          静夜思 <span style="font-size: 12px;">唐-李白</span>
          床前明月光，
          疑是地上霜。
          举头望明月，
          低头思故乡。
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imgAnim1: 'imgAnim1',
      isChange1: false,
      imgAnim2: 'imgAnim2',
      isChange2: false,
      imgAnim3: 'imgAnim3',
      isChange3: false,
      imgAnim4: 'imgAnim4',
      isChange4: false,
      imgAnim5: 'imgAnim5',
      isChange5: false,

      bookShow: false
    }
  },
  methods: {
    onClick(index) {
      if (index === 1) {
        if (this.isChange1) {
          this.imgAnim1 = 'imgAnim1'
        } else {
          this.imgAnim1 = 'imgAnim1End'
        }
        this.isChange1 = !this.isChange1
      }
      if (index === 2) {
        if (this.isChange2) {
          this.imgAnim2 = 'imgAnim2'
        } else {
          this.imgAnim2 = 'imgAnim2End'
        }
        this.isChange2 = !this.isChange2
      }
      if (index === 3) {
        if (this.isChange3) {
          this.imgAnim3 = 'imgAnim3'
        } else {
          this.imgAnim3 = 'imgAnim3End'
        }
        this.isChange3 = !this.isChange3
      }
      if (index === 4) {
        if (this.isChange4) {
          this.imgAnim4 = 'imgAnim4'
        } else {
          this.imgAnim4 = 'imgAnim4End'
        }
        this.isChange4 = !this.isChange4
      }
      if (index === 5) {
        if (this.isChange5) {
          this.imgAnim5 = 'imgAnim5'
        } else {
          this.imgAnim5 = 'imgAnim5End'
        }
        this.isChange5 = !this.isChange5
      }
    }
  }
}
</script>

<style scoped>
.linearlayout {
  display: flex;
  flex-direction: row;
  .right {
    flex: 1;
    .one-text {
      width: 150px;
      white-space: pre-line;
      word-break: keep-all;
      text-align: center;
      transition: all 1s ease-in;
      cursor: pointer;
      line-height: 40px;

      height: 200px;
      border-radius: 1px;
      background-color: burlywood;
      color: #000;
      transform: rotateZ(0);
      font-weight: 800;
    }
    .one-text-hide {
      overflow-y: hidden;
      overflow-wrap: break-word;

      height: 36px;
      border-radius: 8px;
      background-color: rgb(224, 140, 29);
      color: white;
      transform: rotateZ(15deg);
      font-weight: 300;
    }
  }
  .left {
    flex: 1;
  }
}

.imgAnim5 {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim5End {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  transform: scale(2, 2);
  -ms-transform: scale(2, 2);
  /* IE 9 */
  -webkit-transform: scale(2, 2);
  /* Safari 和 Chrome */
  -o-transform: scale(2, 2);
  /* Opera */
  -moz-transform: scale(2, 2);
  /* Firefox */

  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim4 {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  opacity: 1;
  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim4End {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  opacity: 0.5;
  transition: opacity 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim3 {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim3End {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  /* IE 9 */
  -webkit-transform: rotate(90deg);
  /* Safari and Chrome */
  -o-transform: rotate(90deg);
  /* Opera */
  -moz-transform: rotate(90deg);
  /* Firefox */

  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */

}

.imgAnim2 {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;
  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim2End {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;

  transform: translate(50px, 0px);
  -ms-transform: translate(50px, 0px);
  /* IE 9 */
  -webkit-transform: translate(50px, 0px);
  /* Safari and Chrome */
  -o-transform: translate(50px, 0px);
  /* Opera */
  -moz-transform: translate(50px, 0px);
  /* Firefox */

  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim1 {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

/*
  自动转换样式
  */
.imgAnim1:hover {
  display: block;
  margin: 0 auto;
  width: 150px;
  height: 150px;
  /*
  在那个样式里添加了过渡后，当样式切换到该样式的时候就会有过渡效果
  */
  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.imgAnim1End {
  display: block;
  margin: 0 auto;
  width: 150px;
  height: 150px;
  transition: all 2s;
  -moz-transition: all 2s;
  /* Firefox 4 */
  -webkit-transition: all 2s;
  /* Safari and Chrome */
  -o-transition: all 2s;
  /* Opera */
}

.buttons {
  margin-top: 40px;
  width: 100%;
}

.buttons button {
  width: 20%;
}
</style>
