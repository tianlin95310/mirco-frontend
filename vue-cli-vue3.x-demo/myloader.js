module.exports = function(source) {
  const options = this.getOptions() || {}
  console.log('source', typeof source, options)
  return source
}