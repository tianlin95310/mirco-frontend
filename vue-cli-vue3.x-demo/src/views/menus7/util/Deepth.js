
/**
 * 计算树形数据的最大深度
 * @param {array} arr 
 * @returns 
 */
export function calculationLevel(arr) {
  let maxLevel = 0
  function recursion(arr, level) {
    ++level
    maxLevel = Math.max(level, maxLevel)
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      item.level = level
      if (item.children && item.children.length > 0) {
        recursion(item.children, level)
      } else {
        delete item.children
      }
    }
  }
  recursion(arr, 0)
  return maxLevel
}
