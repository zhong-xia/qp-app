import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


/**
 * vuex的作用
 * 1.vuex 就是在vue中创建全局变量的一个东西
 * 2.并且我们可以通过一些方法，来改变这些全局变量的值
 */

 /**
  * Store:
  *     就是 new Vuex.Store({}) 里面的对象
  *     用到的vuex所有的核心概念都是在store里面的
  *     在vue的组件中，可以直接通过this.$store = Store对象
  *     this.$store.state = "state:{}",
  * State:
  *     vuex 中的数据源，所有通过vuex 声明的全局变量都会在state里面， this.$store.state = "state:{}",
  * getter:
  *     相当于 vue 中的计算属性，可以用于监听、计算 state 中的数据变化
  * mutations：
  *     vuex中去操作数据的方法(vuex中，不推荐直接去为 state 赋值，this.$store.state.xx = 'xxx')
  *     推荐使用 mutation 来修改 state 的值，因为这样是一个有迹可循的操作方式
  *     mutation只能是同步执行
  * actions：
  *     帮助 mutations 进行异步操作
  * module：
  *     将 store 分为了多个模块，每一个模块都是一个module
  */
export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: [],
    // 当前的设备是否为 IphoneX
    isIPhoneX: false,
    // 登录用户的用户名
    username: undefined
  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     */
    addShoppingData: function (state, goods) {
      state.shoppingDatas.push(goods)
    },
    // 修改isIphoneX
    setIsIphoneX: function (state, isIphoneX) {
      state.isIPhoneX = isIphoneX
    },
    /**
     * 指定username
     */
    setUsername: function (state, username) {
      state.username = username
    },
    /**
     * 退出登录，处理username
     */
    clearUsername: function (state) {
      state.username = undefined
    }
  },
  actions: {
 
  }
})
