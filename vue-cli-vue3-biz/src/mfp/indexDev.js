export default async function loadAllComponentsDev() {
  const vue3DemoPlugin = await import('vue3DemoPlugin')
  return vue3DemoPlugin.default.components
}