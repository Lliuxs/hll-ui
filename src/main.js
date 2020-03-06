import Vue from 'vue'
import App from './App.vue'
import HllUI from './packages/index'
Vue.use(HllUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
