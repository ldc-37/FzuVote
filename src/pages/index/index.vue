<template>
  <div @click="clickHandle">

        <card :infoData="infoData"></card>
        <card :infoData="infoData"></card>
        <!-- <question :order="1"></question> -->

  </div>
</template>

<script>
import card from '@/components/card'
import question from '@/components/choose-question'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      infoData: {
        title: '关于谁应该请吃饭的投票',
        imgSrc: '/static/images/testbg.jpg',
        creator: '西二在线',
        joinNum: '23',
        voteNum: '123',
        endTime: '2.20 22:22',
        userState: 1,
      }
    }
  },

  components: {
    card,
    question
  },

  computed: {
    ...mapState([
      'openId'
    ])
  },

  methods: {
    ...mapMutations([
      'setOpenId',
    ]),
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  mounted () {
    // let app = getApp()
    wx.navigateTo({
      url: '/pages/launch-questionnaire/main'
    })


    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('获取token成功：' + res.code)
          this.$fly.post('/user/login?js_code=' + res.code).then(res_2 => {
            if (res_2.Status === 200) {
              this.setOpenId(res_2.SessionId)
              wx.showToast({
                title: '微信登陆成功',
                image: '/static/images/icon_task_done.png',
                duration: 2000
              })
            }
            else {
              console.error(res_2)
              wx.showToast({
                title: '服务端登录失败',
                image: '/static/images/icon_task_done.png',
                duration: 3000
              })
            }
          }).catch(err => {
            console.log(err)
            // TODO:图标更改
            wx.showToast({
              title: '服务端登录失败',
              image: '/static/images/icon_task_done.png',
              duration: 3000
            })
          })
        }
        else {
          // TODO:图标更改
          wx.showToast({
            title: '微信登录失败',
            image: '/static/images/icon_task_done.png',
            duration: 3000
          })
        }
      }
    })
  }
}
</script>

<style scoped>



</style>
