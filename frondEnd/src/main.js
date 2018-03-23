// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Vue from 'vue'//若解开则引入两次vue
import App from './App'
import router from './router'
// import vueTap from 'v-tap'
// import ElementUI from 'element-ui'

import store from './store/index'
//import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
if (process.env.NODE_ENV === 'development') {
  require('element-ui/lib/theme-chalk/index.css')
  Vue.use(ElementUI)
}

import './assets/css/common.css'
import "./assets/css/fontello.css" //按钮字体

import rule from './assets/js' //注册指令


Vue.config.productionTip = false

rule(Vue);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
