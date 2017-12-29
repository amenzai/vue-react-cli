// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import {
  sync
} from 'vuex-router-sync'

import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import './common/theme/index.css'
import './common/css/style.css'
import './common/css/icon.css'
import MyFilter from './common/js/filter.js'
// import Components from './components'

import store from './store'
import ajax from './common/js/ajax.js'
import appconfig from './appconfig.js'
import CONSTANT from './common/js/constant.js'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
// import echarts from 'echarts'

Vue.use(Vuex)
// Vue.use(Components)
Vue.use(MyFilter)
Vue.use(ElementUI)

// Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$ajax = ajax
Vue.prototype.$CONSTANT = CONSTANT //  一些全局常量配置
Vue.prototype.$echarts = echarts 

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
