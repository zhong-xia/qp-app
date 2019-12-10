// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SvgIcon from 'vue-svgicon'
import './assets/img/icons'
import './assets/css/reset.css'
import './assets/hotcss.js'
import '../src/assets/js/filters.js'
import './assets/js/IsIphoneX.js'

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



