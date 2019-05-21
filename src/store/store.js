// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const DEBUG = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    openId: '',
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    setOpenId(state, openId) {
      state.openId = openId
    }
  },
  actions: {
    
  },
  strict: DEBUG,
  plugins: DEBUG ? [createLogger()] : []
})

Vue.prototype.$store = store;

export default store
