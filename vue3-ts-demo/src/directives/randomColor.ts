export default {
  mounted(el: any) {
    const random = Math.ceil(Math.random() * 0xffffff)
    el.style.color = `#${random}`
  }
}
