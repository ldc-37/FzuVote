import Vue from 'vue'
import App from './App'
// #一定要引入这句
// #https://juejin.im/post/5c2043efe51d4536475bded4
import store from "@/store/store";
import network from '@/network/network'

var Fly = require("flyio/dist/npm/wx")

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$net = network

const app = new Vue({
  ...App,
  store
})
app.$mount()


const fly = new Fly
Vue.prototype.$fly = fly
fly.interceptors.request.use(req => {
  console.info(req)
})
fly.interceptors.response.use(res => {
  console.info(res)
  return res.data
})
fly.config.baseURL = 'https://sugarchl.top/api'

