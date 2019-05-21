import Vue from 'vue'
import App from './App'
// #一定要引入这句
// #https://juejin.im/post/5c2043efe51d4536475bded4
import store from "@/store/store";

var Fly=require("flyio/dist/npm/wx")

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()


const fly=new Fly
Vue.prototype.$fly = fly
fly.interceptors.request.use(req => {
  console.info(req.body)
})
fly.interceptors.response.use(res => {
  console.info(res)
  return res.data
})
fly.config.baseURL = 'http://119.23.35.17:8080/api'

