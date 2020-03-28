// 无限滚动 是一个指令
import {throttle} from 'lodash'
const attributes = { // 自定义用户参数 和用户传入的参数合并
  delay: {
    default: 200
  },
  immediate: {
    default: true
  },
  disabled: {
    default: false
  },
  distance: {
    default: 10
  }
}

const getScrollContainer = (el) => {
  // 递归向上找有overflow的父元素
  let parent = el
  while(parent) {
    if(document.documentElement == parent) {
      return null // 找不到
    }
    const overflow = getComputedStyle(parent)['overflow-y'] // overflow是复合属性 计算出来是overflow-y
    if(overflow.match(/scroll|auto/)) {
      return parent
    }
    parent = parent.parentNode
  }
}

const getScrollOptions = (el, vm) => {
  return Object.entries(attributes).reduce((map, [key, options]) => {
    let defaultValue = options.default
    let value = el.getAttribute(`infinite-scroll-${key}`)
    value = vm[value] ? vm[value] : defaultValue
    map[key] = value
    return map
  }, {})
}

// const handleScroll = (el, cb) => {
//   console.log(el, cb)
// }

const handleScroll = function(cb) {
  const {el, container, vm, observer} = this[scope]
  // 用户是否已经加装完毕
  let {disabled, distance} = getScrollOptions(el, vm)
  if(disabled) {
    return 
  }
  let scrollBottom = container.scrollTop + container.clientHeight
  // 可视区域
  if(container.scrollHeight - scrollBottom < distance) {
    cb()
  } else {
    if(observer) {
      observer.disconnect() // 解除监控
      this[scope].observer = null
    }
  }
}

const scope = 'infinite-scroll'
export default {
  name: 'infinite-scroll',
  inserted(el, bindings, vnode) { // 插入 
    const cb = bindings.value
    const vm = vnode.context // vnode虚拟节点可以拿到上下文
    // 1.获取要滚动的是哪个元素 找不到就不做任何操作
    const container = getScrollContainer(el)
    if(container) {
      // 2.获取options 合并属性
      const options = getScrollOptions(el, vm)
      // 3.绑定滚动事件
      const {delay, immediate} = options
      const onScroll = throttle(handleScroll.bind(el, cb), delay)
      el[scope] = {
        onScroll,
        container,
        el,
        vm
      }
      if(immediate) {
        // 借助MutationObserver充满首屏 之前解除到observer的监控
        const observer = el[scope]['observer'] = new MutationObserver(onScroll)
        observer.observe(container, {
          childList: true, // 监控还在列表的变化
          subtree: true, // 子dom发生变化也触发
        })
        onScroll()
      }
      container.addEventListener('scroll', onScroll)
    }
  },
  unbind() { // 解绑
    const {onScroll, container} = el[scope]
    if(container) {
      container.removeEventListener('scroll', onScroll)
      el[scope] = null
    }
  }
}