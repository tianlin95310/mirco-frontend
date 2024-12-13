/**
 * 
 * @param {*} format 
 * @returns 
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    "H+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  }
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""])
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return format
}

/*
 * 方法作用：【获取日期是星期】
 * 使用方法：new Date().nowFewWeeks()
 * @param date{date} 传入日期类型
 * @returns {星期四，...}
 */
Date.prototype.nowFewWeeks = function () {
  var date = this
  if (date instanceof Date) {
    var dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    return dayNames[date.getDay()]
  } else {
    return "Param error,date type!"
  }
}
