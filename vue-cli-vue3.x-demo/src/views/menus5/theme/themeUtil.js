export const setTheme = (themeData) => {
  localStorage.setItem('theme', JSON.stringify(themeData))
  changeStyle(themeData)
}
function changeStyle(theme) {
  Object.keys(theme).forEach(key => {
    document.documentElement.style.setProperty(`--${key}`, theme[key])
  })
}