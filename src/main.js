import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入Element UI
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
