/* eslint-disable */
import { loadJs } from "./util"
import { remotes, proxy } from "./deployConfig"

function loadPlugin(scope, module) {
  return async () => {
    try {
      console.time(scope)
      await __webpack_init_sharing__('default')
      const plugin = window[scope]
      await plugin.init(__webpack_share_scopes__.default)
      const factory = await plugin.get(module)
      const pluginModule = factory()
      console.timeEnd(scope)
      // return pluginModule
      return pluginModule && pluginModule.default ? pluginModule.default : pluginModule
    } catch (err) {
      return null
    }
  }
}

async function loadAllPlugins() {
  const proxyTable = Object.entries(proxy)

  const fetchTasks = Object.values(remotes).map((item, index) => {
    return loadJs(item.split('@')[1].replace(proxyTable[index][0], proxyTable[index][1]))
  })
  await Promise.allSettled(fetchTasks)

  const pluginLoader = Object.keys(remotes).map(key => {
    const loader = loadPlugin(key, '.')
    return loader()
  })
  return Promise.all(pluginLoader)
}

export default async function loadAllComponentsProd() {
  const plugins = await loadAllPlugins()
  return plugins.flatMap(plugin => plugin?.default?.components ?? [])
}
