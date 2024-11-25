<template>
  <div class="content">

    <div v-for="puke in allPukes" :key="puke.id" :style="{
           backgroundImage: 'url(' + puke.src + ')',
           left: puke.left,
           zIndex: puke.zIndex,
           opacity: puke.opacity,
           width: pukeWidth + 'px',
           height: pukeHeight + 'px',
           color: getColor(puke.color),
           top: puke.top}" @click="onPukeClick(puke)" :class="['puke', puke.id === chooseId ? 'choose': '']">
      <div class="puke-item">
        <div class="left-top">
          <div class="value">{{ puke.textValue}}</div>
          <div class="type">
            <span v-if="puke.color === '1'">♠</span>
            <span v-else-if="puke.color === '2'">♥</span>
            <span v-else-if="puke.color === '3'">♦</span>
            <span v-else-if="puke.color === '4'">♣</span>
          </div>
        </div>
        <div class="right-bottom">
          <div class="type">
            <span v-if="puke.color === '1'">♠</span>
            <span v-else-if="puke.color === '2'">♥</span>
            <span v-else-if="puke.color === '3'">♦</span>
            <span v-else-if="puke.color === '4'">♣</span>
          </div>
          <div class="value">{{ puke.textValue}}</div>
        </div>
      </div>
    </div>
    <div class="begin" @click="begin">{{ loading ? '请稍后...' : '开始'}}</div>

  </div>

</template>

<script>
  /*eslint-disable*/
  // 窗口大小
  const width = window.screen.width
  const height = window.screen.height
  // 牌的大小
  const pukeWidth = width / (7 + 8 * 0.5)
  const pukeHeight = pukeWidth * 220 / 136
  // 中心牌的坐标
  let centerX = width / 2 - pukeWidth / 2
  let itemDividerW = pukeWidth / 2
  let itemDividerH = (height / 2) / 7

  // 随机生成一组牌
  function makePoker() {
    var poker = []
    var table = {}
    var colors = ['1', '2', '3', '4']

    while (poker.length !== 52) {
      var n = Math.ceil(Math.random() * 13)
      var index = Math.floor(Math.random() * 4)
      var c = colors[index]
      var v = {
        color: c,
        number: n
      }
      if (!table[n + c]) {
        table[n + c] = true
        poker.push(v)
      }
    }
    return poker
  }

  export default {
    data() {
      return {
        pukes: [],
        leftPs: [],
        rightPs: [],
        zIndex: 100,
        chooseId: '',
        chooseIn: -1,
        loading: false,
        pukeWidth: pukeWidth,
        pukeHeight: pukeHeight
      }
    },
    computed: {
      allPukes() {
        let allPukes = []
        this.pukes.forEach(item => {
          allPukes.push(item)
        })
        this.leftPs.forEach(item => {
          allPukes.push(item)
        })
        this.rightPs.forEach(item => {
          allPukes.push(item)
        })
        return allPukes
      }
    },
    methods: {
      getColor(type) {
        if (type === '1' || type === '4') {
          return 'black'
        } else {
          return 'red'
        }
      },
      win(win) {
        if (window.confirm('你赢了，是否再来一局？')) {
          this.begin()
        } else {

        }
      },
      hidePuke(list, id) {
        list.forEach(item => {
          if (item.id === id) {
            item.top = -pukeHeight + 'px'
            item.left = centerX + 'px'
            item.opacity = 0
          }
        })
        let isOver = true
        for (let i = 0; i < this.allPukes.length; i++) {
          if (this.allPukes[i].top > '0px') {
            isOver = false
          }
        }
        if (isOver) {
          setTimeout(() => {
            this.win(true)
          }, 1000)
        }
      },
      onPukeClick(puke) {
        if (puke.position === 1) {
          if (puke.value === 13) {
            this.hidePuke(this.leftPs, puke.id)
            return
          } else {
            if (this.chooseId) {
              let value = parseInt(this.chooseId.split(',')[0])
              if (value + puke.value === 13) {
                if (puke.position === 0) {
                  this.hidePuke(this.pukes, puke.id)
                } else if (puke.position === 1) {
                  this.hidePuke(this.leftPs, puke.id)
                } else if (puke.position === 2) {
                  this.hidePuke(this.rightPs, puke.id)
                }
                if (this.chooseIn === 1) {
                  this.hidePuke(this.leftPs, this.chooseId)
                } else if (this.chooseIn === 2) {
                  this.hidePuke(this.rightPs, this.chooseId)
                } else if (this.chooseIn === 0) {
                  this.hidePuke(this.pukes, this.chooseId)
                }

                this.chooseId = ''
                this.chooseIn = -1
                return
              } else {
                if (this.chooseId !== puke.id) {
                  this.chooseId = puke.id
                  this.chooseIn = 1
                  return
                }
              }
            } else {
              this.chooseId = puke.id
              this.chooseIn = 1
              return
            }
          }

          let thisOnes = this.leftPs.filter(item => {
            if (item.id === puke.id) {
              return item
            }
          })
          this.leftPs.forEach(item => {
            if (item.id === this.chooseId) {
              this.chooseId = ''
              this.chooseIn = -1
            }
          })
          let thisOne = thisOnes[0]
          let index = this.leftPs.indexOf(thisOne)
          if (thisOne.position === 1) {
            thisOne.top = itemDividerH * 1.5 + 'px'
            thisOne.left = width - pukeWidth * 0.4 - pukeWidth + 'px'
            thisOne.zIndex = this.zIndex++
            setTimeout(() => {
              if (index !== -1) {
                this.leftPs.splice(index, 1)
                thisOne.position = 2
                this.rightPs.push(thisOne)
              }
            }, 1000)
          }
        } else if (puke.position === 2) {
          if (puke.value === 13) {
            this.hidePuke(this.rightPs, puke.id)
            return
          } else {
            if (this.chooseId) {
              let value = parseInt(this.chooseId.split(',')[0])
              if (value + puke.value === 13) {
                if (puke.position === 0) {
                  this.hidePuke(this.pukes, puke.id)
                } else if (puke.position === 1) {
                  this.hidePuke(this.leftPs, puke.id)
                } else if (puke.position === 2) {
                  this.hidePuke(this.rightPs, puke.id)
                }
                if (this.chooseIn === 1) {
                  this.hidePuke(this.leftPs, this.chooseId)
                } else if (this.chooseIn === 2) {
                  this.hidePuke(this.rightPs, this.chooseId)
                } else if (this.chooseIn === 0) {
                  this.hidePuke(this.pukes, this.chooseId)
                }
                this.chooseId = ''
                this.chooseIn = -1
                return
              } else {
                if (this.chooseId !== puke.id) {
                  this.chooseId = puke.id
                  this.chooseIn = 2
                  return
                }
              }
            } else {
              this.chooseId = puke.id
              this.chooseIn = 2
              return
            }
          }
          let thisOnes = this.rightPs.filter(item => {
            if (item.id === puke.id) {
              return item
            }
          })
          this.rightPs.forEach(item => {
            if (item.id === this.chooseId) {
              this.chooseId = ''
              this.chooseIn = -1
            }
          })
          let thisOne = thisOnes[0]
          let index = this.rightPs.indexOf(thisOne)
          thisOne.top = itemDividerH * 1.5 + 'px'
          thisOne.left = pukeWidth * 0.4 + 'px'
          thisOne.zIndex = this.zIndex++
          // 左右两边进行交换
          setTimeout(() => {
            if (index !== -1) {
              this.rightPs.splice(index, 1)
              thisOne.position = 1
              this.leftPs.push(thisOne)
            }
          }, 1000)
        } else if (puke.position === 0) {
          if (this.checkPukesCanClick(puke)) {

            if (puke.value === 13) {
              this.hidePuke(this.pukes, puke.id)
            } else {
              if (this.chooseId) {
                let value = parseInt(this.chooseId.split(',')[0])
                if (value + puke.value === 13) {
                  if (puke.position === 0) {
                    this.hidePuke(this.pukes, puke.id)
                  } else if (puke.position === 1) {
                    this.hidePuke(this.leftPs, puke.id)
                  } else if (puke.position === 2) {
                    this.hidePuke(this.rightPs, puke.id)
                  }
                  if (this.chooseIn === 1) {
                    this.hidePuke(this.leftPs, this.chooseId)
                  } else if (this.chooseIn === 2) {
                    this.hidePuke(this.rightPs, this.chooseId)
                  } else if (this.chooseIn === 0) {
                    this.hidePuke(this.pukes, this.chooseId)
                  }
                  this.chooseId = ''
                  this.chooseIn = -1
                } else {
                  if (puke.id === this.chooseId) {
                    this.chooseId = ''
                    this.chooseIn = -1
                  } else {
                    this.chooseId = puke.id
                    this.chooseIn = 0
                  }
                }
              } else {
                this.chooseId = puke.id
                this.chooseIn = 0
              }

            }
          }
        }
      },
      checkPukesCanClick(puke) {
        let maxI = 0
        this.pukes.forEach(item => {
          if (item.i > maxI) {
            maxI = item.i
          }
        })
        if (puke.i === maxI) {
          return true
        } else {
          let lefti = puke.i + 1
          let leftj = puke.j
          let righti = puke.i + 1
          let rightj = puke.j + 1
          let leftE = false
          let rightE = false
          this.pukes.forEach(item => {
            if (item.top > '0px') {
              if (item.i === lefti && item.j === leftj) {
                leftE = true
              }
              if (item.i === righti && item.j === rightj) {
                rightE = true
              }
            }
          })
          if (leftE || rightE) {
            return false
          } else {
            return true
          }
        }
      },
      resetPuke() {
        this.pukes = []
        this.leftPs = []
        this.rightPs = []
        this.zIndex = 100
        this.chooseId = ''
        this.chooseIn = -1
        var dict = {
          1: 'A',
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: '10',
          11: 'J',
          12: 'Q',
          13: 'K'
        }
        let pokers = makePoker()
        let flagPo = {}
        console.log(pokers)
        let index = 0
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < i + 1; j++) {
            let poker = pokers[index++]
            let src = undefined
            try {
              let posi = Math.ceil(Math.random() * 52) + 1
              let v = (('00' + posi)).slice(-2)
              console.log('v', v, flagPo[v])
              while (flagPo[v]) {
                posi = Math.ceil(Math.random() * 52) + 1
                v = (('00' + posi)).slice(-2)
              }
              flagPo[v] = true
              // src = Promise.resolve(require('@/assets/images/pk/pk' + v + '.png').default)
            } catch (e) {
              console.log(e)
            }
            let puke = {
              left: centerX + 'px',
              top: 0 + 'px',
              src: src,
              id: poker.number + ',' + poker.color,
              zIndex: this.zIndex++,
              position: 0,
              value: poker.number,
              textValue: dict[poker.number],
              color: poker.color,
              i: i,
              j: j
            }
            this.pukes.push(puke)
          }
        }
        for (let i = index; i < pokers.length; i++) {
          let poker = pokers[i]
          let src = undefined
          try {
            let posi = Math.ceil(Math.random() * 52) + 1
            let v = (('00' + posi)).slice(-2)
            console.log('v', v, flagPo[v])
            while (flagPo[v]) {
              posi = Math.ceil(Math.random() * 52) + 1
              v = (('00' + posi)).slice(-2)
            }
            flagPo[v] = true
            // src = Promise.resolve(require('@/assets/images/pk/pk' + v + '.png').default)
          } catch (e) {
            console.log(e)
          }
          let pukeLeft = {
            left: centerX + 'px',
            top: 0 + 'px',
            src: src,
            id: poker.number + ',' + poker.color,
            zIndex: this.zIndex++,
            value: poker.number,
            position: 1,
            textValue: dict[poker.number],
            color: poker.color,
          }
          this.leftPs.push(pukeLeft)
        }
      },
      animOneByOne() {
        for (let k = 0; k < this.pukes.length; k++) {
          let item = this.pukes[k]
          setTimeout(() => {
            let i = item.i
            let j = item.j
            let top = (i + 1.5) * itemDividerH
            let left = centerX
            let center = i / 2
            if (j < center) {
              left = centerX + (j - center) * (itemDividerW * 0.5 + pukeWidth)
            } else if (j > center) {
              left = centerX + (j - center) * (itemDividerW * 0.5 + pukeWidth)
            }
            item.left = left + 'px'
            item.top = top + 'px'
          }, k * 30)
        }

        for (let k = 0; k < this.leftPs.length; k++) {
          let item = this.leftPs[k]
          setTimeout(() => {
            item.left = pukeWidth * 0.4 + 'px'
            item.top = itemDividerH * 1.5 + 'px'
          }, (k + this.pukes.length) * 30 + (this.pukes.length - 7) * 30)
        }
      },
      begin() {
        this.loading = true
        this.pukes = []
        this.leftPs = []
        this.rightPs = []
        setTimeout(() => {
          this.resetPuke()
          this.animOneByOne()
          this.loading = false
        }, 500)
      }
    },
    mounted() {
      // document dom树的高度为0，也就是数值高度站100%没有用的原因
      console.log('mounted width---' + document.body.clientWidth)
      console.log('mounted height---' + document.body.clientHeight)
    },
    created() {
      console.log('created width---' + window.screen.width)
      console.log('created height---' + window.screen.height)
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes autoShake {
    0% {
      transform: scale(1)
    }

    70%,
    73% {
      transform: scale(0.98) rotate(-1deg)
    }

    77%,
    83%,
    90%,
    97% {
      transform: scale(1.02) rotate(1deg)
    }

    80%,
    87%,
    93% {
      transform: scale(1.02) rotate(-1deg)
    }

    100% {
      transform: scale(1) rotate(0)
    }
  }

  .begin {
    background: #0f131c;
    background-size: 100%;
    border-radius: 10px;
    transition: all 0.1s ease;
    line-height: 70px;
    text-align: center;
    font-size: 20px;
    color: #ccc;
    top: 0;
    left: calc(50% - 71px);
    position: absolute;
    width: 142px;
    height: 70px;
    cursor: pointer;
    z-index: 300;
  }

  .begin:hover {
    background: #0f131c;
    background-size: 100%;
    transform-origin: 50% 0;
    opacity: 0.99;
    color: gold;
    z-index: 300;
    border-radius: 50%;
    cursor: pointer;
  }

  .puke {
    user-select: none;
    cursor: pointer;
    position: absolute;
    background-size: 80% auto;
    background-position: 20% 75%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    border-radius: 10px;
    /*大于1的值会有回弹效果*/
    transform-origin: 50% 100%;
    transition: 1s cubic-bezier(0.25, 0.1, 0.25, 1.05);
    transition-property: left, top, opacity, color, box-shadow;
    font-weight: bold;
    border: 1px solid grey;
  }

  .puke-item {
    display: inline-block;
    position: relative;
    font-size: 1.8rem;
    height: 100%;
    width: 100%;

    .right-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;

      .value {
        transform: rotate(180deg);
        margin-right: 0.5rem;
      }

      .type {
        transform: rotate(180deg);
        margin-right: 0.5rem;
        text-align: left;
      }
    }

    .left-top {
      .value {
        margin-left: 0.5rem;
      }

      .type {
        margin-left: 0.5rem;
      }
    }
  }

  .choose {
    animation: autoShake 2s both infinite;
    box-shadow: 0px 0px 3px 3px gold;
  }

  .content {
    padding: 0;
    background: #ff8cb5 center no-repeat fixed;
    background-size: 30%;
    position: relative;
    width: 100%;
    height: 100vh;
  }
</style>
