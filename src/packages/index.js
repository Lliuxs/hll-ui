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
};

// 通过script标签直接引入
if (typeof window.Vue !== 'undefined') {
  install(Vue);
}

export default {
  install
};
