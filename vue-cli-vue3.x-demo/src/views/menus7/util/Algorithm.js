/**
 * 笛卡尔积回溯
 * @param counter
 * @param counterIndex
 * @param xyz
 */
function handle(counter, counterIndex, xyz) {
  counter[counterIndex]++
  if (counter[counterIndex] >= xyz[counterIndex].length) {
    counter[counterIndex] = 0
    counterIndex--
    if (counterIndex >= 0) {
      handle(counter, counterIndex, xyz)
    }
    counterIndex = xyz.length - 1
  }
}

/**
 * 计算笛卡尔积集合
 * @param array
 * @constructor
 */
export function Cartesian(array) {
  let data = []
  if (!array) {
    return data
  }
  let counter = []
  array.forEach(item => {
    counter.push(0)
  })
  let counterIndex = array.length - 1
  let totalSize = 1
  array.forEach(item => {
    let length = item.length
    if (length > 0) {
      totalSize = totalSize * length
    }
  })
  for (let i = 0; i < totalSize; i++) {
    let value = {}
    let valueStr = ''
    for (let j = 0; j < array.length; j++) {
      value[j] = array[j][counter[j]]
      valueStr += array[j][counter[j]]
    }
    value.valueStr = valueStr
    data.push(value)
    handle(counter, counterIndex, array)
  }
  return data
}
