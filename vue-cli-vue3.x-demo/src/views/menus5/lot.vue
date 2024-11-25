<template>
  <div class="page-container lot">
    <div class="img-container">
      <img :src="src" class="img" :style="{transform: `rotate(${degree}deg)`}"/>

      <img :src="srcBtn" class="btn" @click="begin(0)">
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  export default {
    name: 'Lot',
    data() {
      return {
        src: require('@/assets/imgs/lot.png'),
        srcBtn: require('@/assets/imgs/btn-lot.png'),
        degree: 0,
        lotSpeed: 180,
        initLotTime: 3 * 1000,
        timer: null,
      }
    },
    methods: {
      begin(aimIndex) {
        if (this.timer) {
          return
        }
        this.lotSpeed = 45
        this.degree = 0
        this.initLotTime = 3 * 1000
        this.timer = setInterval(() => {
          const indexF = (this.degree % 360) / (360 / 11)
          const intI = Math.floor(indexF)
          console.log('setInterval', this.lotSpeed.toFixed(2), this.degree.toFixed(2), (this.degree % 360).toFixed(2), indexF, intI)
          this.degree += this.lotSpeed
          if (this.initLotTime > 0) {
            this.initLotTime -= 20
          } else {
            this.initLotTime = 0
            if (this.lotSpeed <= 0.1) {
              this.lotSpeed = 0.1
            } else if (this.lotSpeed <= 0.5) {
              if (intI === aimIndex) {
                this.lotSpeed = 0.1
              } else {
                this.lotSpeed = 0.5
              }
            } else {
              this.lotSpeed -= this.lotSpeed / 45 / 1.5
            }
          }
          if (this.initLotTime <= 0 && this.lotSpeed <= 0.1) {
            if (this.timer) {
              clearInterval(this.timer)
              this.timer = null
            }
          }
        }, 20)
      }
    }
  }
</script>

<style lang="scss" scoped>

.lot {
  .img-container {
    width: 360px;
    height: 360px;
    position: relative;
    .btn {
      width: 100px;
      height: 100px;
      top: 130px;
      left: 130px;
      position: absolute;
      transition: transform 0.2s ease-in;
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
