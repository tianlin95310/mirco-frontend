/**
 * you must provide getEL to get the element
 */

export default {
  data() {
    return {
      scrollTop: 0
    }
  },
  activated() {
    console.log('activated')
    this.getEL().scrollTop = this.scrollTop
  },
  deactivated() {
    console.log('deactivated')
  },
  mounted() {
    this.getEL().addEventListener('scroll', this.onScrollElScroll)
  },
  beforeUnmount() {
    this.getEL().removeEventListener('scroll', this.onScrollElScroll)
  },
  methods: {
    onScrollElScroll(e) {
      this.scrollTop = e.target.scrollTop
    },
    getEL() {
      return document.getElementsByTagName('body')[0]
    }
  }
}
