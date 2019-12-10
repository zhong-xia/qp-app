import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Search from '../views/search.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'qp',
      component: Main
    }, {
      path: '/goodsList',
      name: 'goodsList',
      // vue-router提供的懒加载
      component: () => import('../views/GoodsList.vue')
    }, {
        path: '/goodsDetail',
        name: 'goodsDetail',
        component: () => import('../views/GoodsDetail.vue')
    }, {
        path: '/buy',
        name: 'buy',
        component: () => import('../views/Buy.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    }, {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
