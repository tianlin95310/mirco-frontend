<template>
  <div class="canvas-view page-container" @mousemove="onMouseMove">
    <div>
      <div>点的屏幕坐标：{{ eventPo.mx }}, {{ eventPo.my }}</div>
      <div>
        相对右侧坐标：{{ eventPo.mx - leftWidth }},
        {{ eventPo.my - 40 }}
      </div>
    </div>

    <div>
      <div class="ib-vm" style="width: 100px;height: 100px;" title="普通的原型百分比">
        <tl-circle-ratio :percent="percent" />
      </div>
      <div class="ib-vm" style="width: 100px;height: 100px;" title="渐变色的原型百分比">
        <tl-circle-ratio-round :percent="percent" />
      </div>
      <button class="button" @click="showDialog">图片裁剪</button>

      <div class="ib-vm" style="width: 200px;height: 200px;background: #D42D00">
        <tl-round-count-down :progress="progress" />
      </div>

      <div class="ib-vm">
        <CylinderProgress :percent="percent2" :cylinderHeight="cylinderHeight" :width="150" :height="300">
        </CylinderProgress>
      </div>

      <div class="ib-vm">
        <div>
          <button class="button" @click="cylinderHeight += 1">加一点</button>
          倾斜度：{{ cylinderHeight }}
          <button class="button" @click="cylinderHeight -= 1">减一点</button>
        </div>
        <div>
          <button class="button" @click="percent2 += 0.1">加一点</button>
          进度：{{ percent2.toFixed(1) }}
          <button class="button" @click="percent2 -= 0.1">减一点</button>
        </div>
      </div>

      <div class="ib-vm">
        <CylinderProgress :percent="percent" :cylinderHeight="100 / 6" :invisableDashed="true" containerColor="gold" progressColor="rgba(156, 156, 0, 0.5)"
          :width="100" :height="200">
        </CylinderProgress>
      </div>

      <div class="ib-vm">
        <TLWaveView :waveAmplitude="waveAmplitude" :waveHeight="waveHeight" :width="200" :height="200" bgColor="gainsboro" :isCycle="true"
          :styleObj="{ border: '1px solid white', borderRadius: '50%' }" waveColor="rgba(0, 255, 255, 255)"></TLWaveView>
      </div>

      <div class="ib-vm">
        <div>
          <button class="button" @click="waveAmplitude += 5">加一点</button>
          振幅：{{ waveAmplitude }}
          <button class="button" @click="waveAmplitude -= 5">减一点</button>
        </div>
        <div>
          <button class="button" @click="waveHeight += 5">加一点</button>
          高度：{{ waveHeight }}
          <button class="button" @click="waveHeight -= 5">减一点</button>
        </div>
      </div>

      <div class="ib-vm">
        <TLChart style="width: 320px;height: 180px;" />
      </div>
    </div>

    <t-l-dialog v-model="visible">
      <template v-slot:content>
        <div class="dialog-content">
          <div>
            <input type="file" class="button" @change="onFileChange" />
          </div>
          <div class="img-content">
            <div class="img-div">
              <img :src="currentImg" :style="styleObj" class="img" />
            </div>
            <div class="img-cut" style="width: 300px;height: 300px;">
              <t-l-image-cut style="z-index: 210" />
            </div>
          </div>
        </div>
      </template>
    </t-l-dialog>
  </div>
</template>
<script setup name="CanvasView">
import { swapEvent } from "@/utils/event.js";
import TlCircleRatio from "./canvas/TlCircleRatio";
import TlCircleRatioRound from "./canvas/TlCircleRatioRound.vue";
import TLChart from "./canvas/TLChart.vue";
import TLDialog from "@/components/TLDialog";
import TLImageCut from "./canvas/TLImageCut";
import TlRoundCountDown from "./canvas/TlRoundCountDown.vue";
// import TLWaveView from './canvas/TLWaveView'
import TLWaveView from "vue-waveview";
import "vue-waveview/vue-waveview.css";

import CylinderProgress from './canvas/CylinderProgress'
import { onActivated, onMounted, reactive, toRefs, defineOptions } from "vue";
// import CylinderProgress from "vue-cylinder-progress";
// import "vue-cylinder-progress/vue-cylinder-progress.css";

defineOptions({
  name: 'CanvasView'
})
const state = reactive({
  eventPo: {},
  leftWidth: 0,
  isDone: false,
  isDone2: false,
  visible: false,
  currentImg: null,
  styleObj: {
    height: "300px",
    width: "auto"
  },
  progress: 60,
  percent: 0.0,
  percent2: 0.5,
  cylinderHeight: 30,
  waveAmplitude: 10,
  waveHeight: 100
})
const { eventPo, leftWidth, isDone, isDone2, visible, currentImg, styleObj, progress, percent, percent2, cylinderHeight, waveAmplitude, waveHeight } = toRefs(state)
onMounted(() => {
  state.leftWidth = Math.floor((18 * document.documentElement.clientWidth) / 100);
})

onActivated(() => {
  console.log("canvasView activated---");
  if (!state.isDone) {
    state.isDone = true;
    const timer = setInterval(() => {
      // console.log('setInterval', this.percent)
      state.percent += 0.01;
      state.percent = parseFloat(state.percent.toFixed(2));
      if (state.percent >= 1) {
        if (timer) {
          clearInterval(timer);
        }
      }
    }, 200);
  }
  if (!state.isDone2) {
    state.isDone2 = true;
    const timer2 = setInterval(() => {
      state.progress--;
      if (state.progress <= 0) {
        if (timer2) {
          clearInterval(timer2);
        }
      }
    }, 1000);
  }
})
const onFileChange = (event) => {
  console.log("onFileChange", event);
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  state.currentImg = URL.createObjectURL(file);
  const image = new Image();
  image.src = state.currentImg;
  image.onload = function () {
    console.log(this.naturalWidth, this.naturalHeight);
    if (this.naturalWidth > this.naturalHeight) {
      state.styleObj = {
        height: "auto",
        width: "300px"
      };
    } else {
      state.styleObj = {
        height: "300px",
        width: "auto"
      };
    }
  };
}
const showDialog = () => {
  state.visible = true;
}
const onMouseMove = (event) => {
  event = swapEvent(event, document.getElementById("main-content"));
  state.eventPo = event;
  console.log(
    // event,
    "文档宽高",
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    "相对坐标",
    event.offsetX,
    event.offsetY,
    "屏幕坐标",
    event.screenX,
    event.screenY,
    "可视区域",
    event.clientX,
    event.clientY,
    "文档坐标",
    event.mx,
    event.my
  );
}
</script>

<style lang="scss" scoped>
.dialog-content {
  .img-content {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .img-div {
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 200;
    }

    .img-cut {
      z-index: 210;
      text-align: center;
      margin: 0 auto;
    }
  }
}

.canvas-view {
  font-size: 14px;
  position: relative;
}
</style>
