<template>
  <div class="ground">
    <div class="l-header">
      <swiper
        autoplay="true"
        indicator-dots="true"
        indicator-color="#FFF"
        indicator-active-color="#0086F1"
        :current="swiperState"
        @change="swiperState = $event.mp.detail.current"
      >
        <swiper-item v-for="(item, index) in swiperImage" :key="index">
          <img :src="item.src" class="swiper-img">
        </swiper-item>
      </swiper>
    </div>
    <div class="l-body">
      <div class="top-bar">
        <div class="top-bar-item"
          :class="{'top-bar-item--act': tabState === 0}" @click="changeTab(0)"
          hover-class="gray-bg"
        >
          <img src="/static/images/icon-new.png" class="top-bar-icon icon-40">
          <span class="top-bar-text">最新投票</span>
        </div>
        <div class="top-bar-item"
          :class="{'top-bar-item--act': tabState === 1}" @click="changeTab(1)"
          hover-class="gray-bg"
        >
          <img src="/static/images/icon-hot.png" class="top-bar-icon icon-30">
          <span class="top-bar-text">热门投票</span>
        </div>
        <img src="/static/images/icon_search.png" class="search-icon" @click="navToSearch">
      </div>
      <div class="card-list">
        <card
          :infoData="vote"
          v-for="(vote, index) in votes"
          :key="index"
        ></card>
      </div>
    </div>
    <div class="auth-tips" @click="switchTab" v-if="!hadAuth">
      未授权个人信息，可能影响部分功能。<br>>>>点此前往授权
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      swiperImage: [
        {
        src: '/static/images/testlove.png',
        target: ''
        },
        {
        src: '/static/images/testsinger.png',
        target: ''
        },
        {
        src: '/static/images/testphone.png',
        target: ''
        },
        {
        src: '/static/images/testkh.png',
        target: ''
        },
        {
        src: '/static/images/testpos.png',
        target: ''
        },
      ],
      swiperState: 0,
      tabState: 0,
      votes: [],
    }
  },

  components: {
    card,
  },

  computed: {
    ...mapState([
      'sessionId',
      'hadAuth'
    ]),
  },

  methods: {
    ...mapMutations([
      'setSessionId',
      'setName',
      'setAvatar',
      'setAuth'
    ]),
    updateUserInfo_() {
      mpvue.getUserInfo({
        success: res => {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
          this.setName(nickName)
          this.setAvatar(avatarUrl)
        }
      })
    },
    navToSearch() {
      mpvue.navigateTo({
        url: '/pages/search/main'
      })
    },
    switchTab() {
      mpvue.switchTab({
        url: '/pages/me/main'
      })
      mpvue.showToast({
        icon: 'none',
        title: '请点击“同步微信资料”'
      })
    },
    async changeTab(state) {
      this.tabState = state
      mpvue.showLoading({
        title: '加载中'
      })
      this.votes = state === 0 ? await this.$net.getLatest() : await this.$net.getHottest()
      mpvue.hideLoading()
    }
  },

  mounted () {
    // if (!this.sessionId)
    if (!this.hadAuth)
      mpvue.login({
        success: (res) => {
          if (res.code) {
            console.log('获取token成功：' + res.code)
            // 仅此处POST使用queryString方式
            this.$fly.post('/user/login?js_code=' + res.code).then(res_2 => {
            /*this.$fly.post('/user/login', {
              js_code: res.code
            }).then(res_2 => {*/
              if (!res_2.ErrorCode) {
                this.setSessionId(res_2.SessionId)

                // 此时还需要getUserInfo，故暂时不弹框
                // mpvue.showToast({
                //   title: '微信登陆成功',
                // })

                // 获取用户信息
                mpvue.getSetting({
                  success: res_3 => {
                    if (res_3.authSetting['scope.userInfo']) {
                      this.setAuth(true)
                      this.updateUserInfo_()
                    }
                    else {
                      //// damn it
                      // mpvue.authorize({
                      //   scope: 'scope.userInfo',
                      //   success: this.updateUserInfo_
                      // })
                      this.setAuth(false)
                    }
                  }
                })
              }
              else {
                console.error(res_2)
                mpvue.showToast({
                  title: '服务端登录失败',
                  image: '/static/images/icon_close.png',
                  duration: 3000
                })
              }
            }).catch(err => {
              console.log(err)
              mpvue.showToast({
                title: '服务端登录失败',
                image: '/static/images/icon_close.png',
                duration: 3000
              })
            })
          }
          else {
            mpvue.showToast({
              title: '微信登录失败',
              image: '/static/images//icon_close.png',
              duration: 3000
            })
          }
        }
      })
    else {
      console.log('登录成功');
      this.setAuth(true)
      this.updateUserInfo_()
    }
    this.changeTab(0)
  },
  onShow() {
    // console.warn(this.hadAuth)
  },
}
</script>

<style scoped>
.l-header {
  margin-bottom: 40rpx;
  padding: 0 50rpx;
}

swiper {
  height: 250rpx;
}

.swiper-img {
  width: 100%;
  height: 100%;
}

.top-bar {
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 50rpx;
}

.top-bar-item {
  display: flex;
  align-items: center;
  padding: 10rpx;
  margin-right: 30rpx;
  border-bottom: 3px solid transparent;
  font-size: 14px;
}
.top-bar-item--act {
  border-bottom: 3px solid #0086F1;
}

.top-bar-icon {
  margin-right: 10rpx;
}

.top-bar-text {
  margin-right: 10rpx;
}

.search-icon {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  right: 0;
}

.auth-tips {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 100rpx;
  line-height: 50rpx;
  background: #FAECD8;
  color: #E6A23C;
  font-size: 14px;
  padding: 10rpx 50rpx;
}


.gray-bg {
  background: #f3f6f9;
}

</style>
