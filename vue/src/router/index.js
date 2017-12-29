import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Home from 'pages/home'
import Index from 'pages/index'

const myRouter = new Router({
  mode: 'hash',
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      name: '首页',
      component: Index
    }]
  }]
})

const commit = store.commit
const loginUrl = '/login'
myRouter.beforeEach((to, from, next) => {
  if (to.path === loginUrl) {
    commit('UPDATE_USER', '')
  }
  if (!window.sessionStorage.getItem('user') && to.path !== loginUrl && to.path.indexOf('register') < 0) {
    if (from.path !== loginUrl) {
      commit('UPDATE_URL', from.path)
    }
    next(loginUrl)
  } else {
    commit('UPDATE_LOADING', true)
    if (to.path !== from.path) {
      window.document.title = to.name
    }
    next()
  }
})

myRouter.afterEach(route => {
  commit('UPDATE_LOADING', false)
})

export default myRouter