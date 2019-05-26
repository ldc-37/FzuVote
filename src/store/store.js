// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

const DEBUG = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // count: 0,
    sessionId: '',
  },
  mutations: {
    // increment: (state) => {
    //   const obj = state
    //   obj.count += 1
    // },
    // decrement: (state) => {
    //   const obj = state
    //   obj.count -= 1
    // },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId
    }
  },
  actions: {

  },
  strict: DEBUG,
  plugins: [
    createLogger(),
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) =>wx.setStorageSync(key, value),
        removeItem: key => wx.clearStorage()
      }
    })
  ]
})

Vue.prototype.$store = store;

export default store
