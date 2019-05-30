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
        <!-- <div v-for="(vote, index) in votes" :key="id">{{vote.id}}</div> -->
      </div>
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
      votes: [
        {
          id: '123',
          type: 'Election',
          title: '中国大学最具人气歌手评比',
          imgSrc: '/static/images/testsinger.png',
          creator: '评选模式',
          joinNum: '466',
          voteNum: '520',
          endTime: '2019-05-31 22:11',
          userState: 1,
        },
        {
          id: '456',
          type: 'Questionnaire',
          title: '2019国产手机用户体验调查',
          imgSrc: '/static/images/testphone.png',
          creator: '问卷模式',
          joinNum: '85',
          voteNum: '123',
          endTime: '2019-06-30 00:00',
          userState: 0,
        },
        {
          id: '789',
          type: 'Picvote',
          title: '你最喜欢的口红是哪一种？',
          imgSrc: '/static/images/testkh.png',
          creator: '图文模式',
          joinNum: '1123',
          voteNum: '1502',
          endTime: '2019-06-05 12:22',
          userState: 1,
        },

      ],
    }
  },

  components: {
    card,
  },

  computed: {
    ...mapState([
      'sessionId'
    ])
  },

  methods: {
    ...mapMutations([
      'setSessionId',
    ]),
    navToSearch() {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    changeTab(state) {
      this.tabState = state
      wx.showLoading({
        title: '加载中'
      })
      setTimeout(() => {
        this.votes = this.votes.sort(() => Math.random() - 0.5)
        // const newArr = this.votes.sort(() => Math.random() > .5)
        // @model已更改，view未更新？！ ======> wx:key的问题
        // this.$set(this, 'votes', newArr)
        // this.votes = newArr
        this.$forceUpdate()
        wx.hideLoading()
      }, 500);
    }
  },

  mounted () {

    console.log(this);

    if (!this.sessionId)
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('获取token成功：' + res.code)
            // @仅此处POST使用queryString方式
            this.$fly.post('/user/login?js_code=' + res.code).then(res_2 => {
              if (res_2.Status === 200) {
                this.setSessionId(res_2.SessionId)
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
    else {
      console.log('登录成功');

    }
  }
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


.gray-bg {
  background: #f3f6f9;
}

</style>
