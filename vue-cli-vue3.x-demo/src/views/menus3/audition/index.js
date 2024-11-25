const context = require.context('./', true, /\.vue$/)
const comps = {}

context.keys().forEach(key => {
  const component = context(key).default
  comps[component.name] = component
})

export default comps
