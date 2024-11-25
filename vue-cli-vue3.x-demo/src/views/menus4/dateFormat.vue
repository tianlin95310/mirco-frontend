<template>
  <div class="date-format page-container">
    <button class="button" @click="$forceUpdate()">刷新整个组件</button>
    <div>
      必须要有分隔符，才能识别字符串时间：{{date1}}
    </div>
    <div>
      数字类的时间戳： {{date2}}
    </div>
    <div>
      字符串类的时间戳： {{date3}}
    </div>
    <div>
      数字类的时间戳(字符串转型)： {{date4}}
    </div>
    <div>
      2019-2-28指定日期加1天（闰月）： {{date5}}
    </div>
    <div>
      明天是： {{date6}}
    </div>
    <div>
      日期差： {{date7}}
    </div>
    <div>
      日期格式为yyyy-MM-dd的日期格式化：
      {{ new Date(new Date().format('yyyy-MM-dd')).format('yyyy-MM-dd HH:mm:ss')}} ---Date---
      {{ new Date(new Date().format('yyyy-MM-dd')) }}
    </div>
    <div>
      日期格式为yyyy/MM/dd的日期格式化：
      {{ new Date(new Date().format('yyyy/MM/dd')).format('yyyy-MM-dd HH:mm:ss')}} ---Date---
      {{ new Date(new Date().format('yyyy/MM/dd')) }}
    </div>
    <div>
      日期格式为yyyy-MM-dd的日期格式化：
      {{new Date('2021-12-12').format('yyyy-MM-dd HH:mm:ss')}} ---toLocaleTimeString---
      {{ new Date('2021-12-12') }}
    </div>
    <div>
      日期格式为yyyy/MM/dd的日期格式化：
      {{new Date('2021/12/12').format('yyyy-MM-dd HH:mm:ss')}} ---toLocaleTimeString---
      {{ new Date('2021/12/12') }}
    </div>
    <div>
      日期格式为yyyy-MM-dd HH:mm:ss的日期格式化：
      {{new Date('2021-12-12 09:00:00').format('yyyy-MM-dd HH:mm:ss')}} ---toLocaleTimeString---
      {{new Date('2021-12-12 09:00:00').toLocaleTimeString() }}
    </div>
    <div>
      日期格式为yyyy/MM/dd HH:mm:ss的日期格式化：
      {{ new Date('2021/12/12 09:00:00').format('yyyy-MM-dd HH:mm:ss') }} ---toLocaleTimeString---
      {{ new Date('2021/12/12 09:00:00').toLocaleTimeString() }}
    </div>
    <div>
      时间加一年： {{ timeOffset('year', 1, new Date()).format('yyyy-MM-dd HH:mm:ss') }}
    </div>
    <div>
      时间减二年： {{ timeOffset('year', -2, new Date()).format('yyyy-MM-dd HH:mm:ss') }}
    </div>
    <div>
      时间加二月： {{ timeOffset('month', 2, new Date()).format('yyyy-MM-dd HH:mm:ss') }}
    </div>
    <div>
      时间减一月： {{ timeOffset('month', -1, new Date()).format('yyyy-MM-dd HH:mm:ss') }}
    </div>
    <div>
      时间减8天： {{ timeOffset('day', -8, new Date('2024/06/08 13:49:00')).format('yyyy-MM-dd HH:mm:ss') }}
    </div>
    <div>
      2023/07/11加100天： {{ timeOffset('day', 100, new Date('2023/07/11')).format('yyyy-MM-dd HH:mm:ss')}}
    </div>
    <div>
      2023-07-11加100天： {{ timeOffset('day', 100, new Date('2023-07-11')).format('yyyy-MM-dd HH:mm:ss')}}
    </div>
    <div>
      明天是： {{ timeOffset('day', 1, new Date()).nowFewWeeks()}}
    </div>
    <div>
      时间加4天： {{ timeOffset('month', 4, new Date()).format('yyyy-MM-dd HH:mm:ss') + timeOffset('day', 4, new Date()).nowFewWeeks() }}
    </div>
  </div>
</template>

<script>
  // 3种方式导入js代码
  import dateFormat from '../../utils/DateFormat'
  // require('../../utils/DateExtend')
  import '../../utils/DateExtend'
  export default {
    computed: {
      date7() {
        // 结束时间
        const date3 = 1 * 24 * 3600000
        // 时间差的毫秒数
        // 计算出相差天数
        const days = Math.floor(date3 / (24 * 3600 * 1000))
        // 计算出小时数
        const leave1 = date3 % (24 * 3600 * 1000)
        // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000))
        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000)
        // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000))
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000)
        // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000)
        return ' 相差 ' + days + '天 ' + (hours + 24 * days) + '小时 ' + minutes + ' 分钟' + seconds + ' 秒'
      },
      date6() {
        const today = new Date()
        today.setDate(today.getDate() + 1)
        return today.format('yyyy-MM-dd') + today.nowFewWeeks()
      },
      date5() {
        const date = new Date('2019-2-28')
        date.setDate(date.getDate() + 1)
        return date.format('yyyy-MM-dd') + date.nowFewWeeks()
      },
      date4() {
        const date = new Date(parseInt('1534262400000'))
        return dateFormat.format(date, 'yyyy-MM-dd HH:mm:ss')
      },
      date3() {
        const date = new Date('1534262400000')
        return dateFormat.format(date, 'yyyy-MM-dd HH:mm:ss')
      },
      date2() {
        const date = new Date(1553875200000)
        return dateFormat.format(date, 'yyyy-MM-dd HH:mm:ss')
      },
      date1() {
        // 必须要有分隔符，才能识别字符串时间
        const date = new Date('2017-10-20')
        return date.format('yyyy-MM-dd')
      }
    },
    methods: {
      timeOffset: dateFormat.timeOffset
    }
  }
</script>

<style lang="scss" scoped>
  .date-format {
    font-size: 18px;
    div {
      margin-top: 8px;
    }
  }

</style>
