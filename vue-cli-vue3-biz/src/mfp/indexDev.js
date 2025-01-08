export default async function loadAllComponentsDev() {
  try {
    const vue3DemoPlugin = await import('vue3DemoPlugin')
    return vue3DemoPlugin.default.components
  } catch (e) {
    return []
  }
}