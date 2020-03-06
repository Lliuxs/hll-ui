import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'


const install = (Vue) => {
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
  Vue.component(ButtonGroup.name, ButtonGroup)
}

// 通过script标签直接引入
if(typeof window.Vue !== 'undefined') {
  install(Vue)
}

export default {
  install
}

