/* eslint-disable */
export const generatorToArray = function (generator) {
  const iterator = generator
  let item
  const result = []
  do {
    item = iterator.next()
    item.value && result.push(item.value)
    // console.log('item', item)
  } while (item && !item.done)
  return result
}
// Generator.prototype.toArray = function() {
//   const iterator = this
//   let item
//   const result = []
//   do {
//     item = iterator.next()
//     result.push(item.value)
//     // console.log('item', item)
//   } while (item && !item.done)
//   return result
// }