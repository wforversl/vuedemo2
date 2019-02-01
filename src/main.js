// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'

/*引入资源请求插件*/
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  axios,
  components: {
    App ,
  },
  template: '<App/>'
})

