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
    sessionId: '',
    name: '',
    avatarUrl: '',
    hadAuth: false,
    draftOfLaunch: {
      election: {},
      imageText: {},
      questionnaire: {}
    }
  },
  mutations: {
    setSessionId(state, sessionId) {
      state.sessionId = sessionId
    },
    setName(state, name) {
      state.name = name
    },
    setAvatar(state, avatarUrl) {
      state.avatarUrl = avatarUrl
    },
    setAuth(state, hadAuth) {
      state.hadAuth = hadAuth
    },
    setDraftOfLaunch(state, payload) {
      // // string不可这样用
      // if (!(payload.type in ['election', 'imageText', 'questionnaire'])) {
      //   console.warn('>>>>>>>>>>>>>setDraftOfLaunch()使用有误：' + payload.type)
      //   return
      // }
      state.draftOfLaunch[payload.type] = payload.data
    }
  },
  actions: {

  },
  strict: DEBUG,
  plugins: [
    createLogger(),
    createPersistedState({
      storage: {
        getItem: key => mpvue.getStorageSync(key),
        setItem: (key, value) => mpvue.setStorageSync(key, value),
        removeItem: key => mpvue.clearStorage()
      }
    })
  ]
})

Vue.prototype.$store = store;

export default store
