import Button from './button/button';
import Icon from './icon';
import ButtonGroup from './button/button-group';
import Row from './layout/row';
import Col from './layout/col';

import Container from './container/container';
import Footer from './container/footer';
import Header from './container/header';
import Main from './container/main';
import Aside from './container/aside';

import Input from './input/input';
import Upload from './upload/upload'
import Progress from './progress'
import DatePicker from './date-pick/date-picker.vue'
import DateRangePicker from './date-pick/date-range-picker.vue'
const install = Vue => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
  Vue.component(ButtonGroup.name, ButtonGroup);
  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
  Vue.component(Container.name, Container);
  Vue.component(Footer.name, Footer);
  Vue.component(Header.name, Header);
  Vue.component(Main.name, Main);
  Vue.component(Aside.name, Aside);
  Vue.component(Input.name, Input);
  Vue.component(Upload.name, Upload);
  Vue.component(Progress.name, Progress);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(DateRangePicker.name, DateRangePicker);
};

// 通过script标签直接引入
if (typeof window.Vue !== 'undefined') {
  install(Vue);
}

export default {
  install
};
