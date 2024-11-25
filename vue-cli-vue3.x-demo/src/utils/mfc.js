export function loadMFComponent(scope, module) {
  return async () => {
    try {
      console.time(scope)
      await __webpack_init_sharing__('default')
      const container = window[scope]
      await container.init(__webpack_share_scopes__.default)
      const factory = await window[scope].get(module)
      const Module = factory()
      console.timeEnd(scope)
      return Module
    } catch (err) {
      return null
    }
  }
}

export function loadAllComponent() {

}

export function installAllComponent() {
  
}
