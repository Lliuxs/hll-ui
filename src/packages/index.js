import Button from './button'
import Icon from './icon'


const install = (Vue) => {
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
}

// 通过script标签直接引入
if(typeof window.Vue !== 'undefined') {
  install(Vue)
}

export default {
  install
}

