/** eslint-disabled */
import throttle from 'lodash/throttle'
export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export function isFunction(obj) {
  return obj && typeof obj === 'function'
}

export function isUndefined(val) {
  return val === undefined
}

export function isDefined(val) {
  return val !== undefined && val !== null
}

export const getScrollContainer = (el, vertical) => {
}

const getStyleComputedProperty = (el, property) => {
  if (el === window) {
    el = document.documentElement
  }
  if (el.nodeType !== 1) {
    return []
  }
  const css = window.getComputedStyle(el, null)
  return property ? css[property] : css
}
const entries = (obj) => {
  return Object.keys(obj || {}).map(key => ([key, obj[key]]))
}
const getPositionSize = (el, prop) => {
  return el === window || el === document ? document.documentElement[prop] : el[prop]
}

const getOffsetHeight = el => getPositionSize(el, 'offsetHeight')
const getClientHeight = el => getPositionSize(el, 'clientHeight')

const getElementTop = el => el.getBoundingClientRect().top
const scope = 'TlLoadMore'
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 20
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: false
  }
}

const getScrollOptions = (el, vm) => {
  if (!isHtmlElement(el)) {
    return {}
  }
  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option
    let value = el.getAttribute(`load-more-${key}`)
    value = isUndefined(vm[value]) ? value : vm[value]
    switch (type) {
      case Number:
        value = Number(value)
        value = Number.isNaN(value) ? defaultValue : value
        break
      case Boolean:
        value = isDefined(value) ? value === 'false' ? false : Boolean(value) : defaultValue
        break
      default:
        value = type(value)
    }
    map[key] = value
    return map
  })
}

const handleScroll = function(cb) {
  const { el, vm, container, observer } = this[scope]
  const { distance, disabled } = getScrollOptions(el, vm)

  if (disabled) {
    return
  }
  const containerInfo = container.getBoundingClientRect()
  if (!containerInfo.width && !containerInfo.height) {
    return
  }
  let shouldTrigger = false
  if (container === el) {
    const scrollBottom = container.scrollTop + getClientHeight(container)
    shouldTrigger = container.scrollHeight - scrollBottom <= distance
    // console.log('shouldTrigger', shouldTrigger, container.scrollTop, scrollBottom, container.scrollHeight, distance)
  } else {
    const heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container)
    const offsetHeight = getOffsetHeight(container)
    const borderBottom = Number.parseFloat(getStyleComputedProperty(container, 'borderBottomWodth'))
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance
  }
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm)
  } else if (observer) {
    observer.disconnect()
    this[scope].observer = null
  }
}

export default {
  name: 'TlLoadMore',
  mounted(el, binding, vnode) {
    const cb = binding.value

    const vm = vnode.ctx
    const container = el
    const { delay, immediate } = getScrollOptions(el, vm)
    const onScroll = throttle(handleScroll.bind(el, cb), delay, {
      trailing: false
    })
    console.log('TlLoadMore mounted', el, binding, vnode, immediate)
    el[scope] = { el, vm, container, onScroll }
    if (container) {
      container.addEventListener('scroll', onScroll)

      if (immediate) {
        const observer = el[scope].observer = new MutationObserver(onScroll)
        observer.observe(container, {
          childList: true,
          subtree: true
        })
        onScroll()
      }
    }
  },
  unmounted(el) {
    const { container, onScroll } = el[scope]
    if (container) {
      container.removeEventListener('scroll', onScroll)
    }
  }
}
