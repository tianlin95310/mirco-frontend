<template>
  <div class="draw-puke page-container">
    <div class="puke" v-for="(item, index) in pukes" :key="index" :style="{color: getColor(item.type)}">
      <div class="left-top">
        <div class="value">{{ item.value}}</div>
        <div class="type">
          <span v-if="item.type === '1'">♠</span>
          <span v-else-if="item.type === '2'">♥</span>
          <span v-else-if="item.type === '3'">♦</span>
          <span v-else-if="item.type === '4'">♣</span>
        </div>
      </div>
      <div class="right-bottom">
        <div class="type">
          <span v-if="item.type === '1'">♠</span>
          <span v-else-if="item.type === '2'">♥</span>
          <span v-else-if="item.type === '3'">♦</span>
          <span v-else-if="item.type === '4'">♣</span>
        </div>
        <div class="value">{{ item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const pukes = []
      const types = ['1', '2', '3', '4']
      const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
      values.forEach(value => {
        types.forEach(type => {
          const puke = {}
          puke.type = type
          puke.value = value
          pukes.push(puke)
        })
      })
      return {
        pukes: pukes
      }
    },
    methods: {
      getColor(type) {
        if (type === '1' || type === '4') {
          return 'black'
        } else {
          return 'red'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .draw-puke {
    width: 100%;

    .puke {
      margin: 2px;
      border: 1px solid black;
      width: 18vw;
      height: 28vw;
      display: inline-block;
      position: relative;

      .right-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;

        .value {
          font-size: 2.8rem;
          transform: rotate(180deg);
          margin-right: 16px;
        }

        .type {
          transform: rotate(180deg);
          margin-right: 18px;
          text-align: left;
          font-size: 2.8rem;
        }
      }

      .left-top {

        .value {
          font-size: 2.8rem;
          margin-left: 16px;
        }

        .type {
          font-size: 2.8rem;
          margin-left: 18px;
        }
      }
    }
  }
</style>
