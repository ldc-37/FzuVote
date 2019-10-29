<template>
  <div class="do-image-text">
    <messagebox v-if="showBox" @close="showBox = false">
      <h3 class="m-title">{{voteInfo.title}}</h3>
      <div class="m-part">
        <div class="m-name">主办方</div>
        <div class="m-text">{{voteInfo.host}}</div>
      </div>
      <div class="m-part">
        <div class="m-name">活动时间</div>
        <div class="m-text">报名时间 {{voteInfo.signupTimeStart}}-{{voteInfo.signupTimeEnd}}</div>
        <div class="m-text">投票时间 {{voteInfo.voteTimeStart}}-{{voteInfo.voteTimeEnd}}</div>
      </div>
      <div class="m-part">
        <div class="m-name">投票规则</div>
        <div class="m-text">每位用户每天可投{{voteInfo.maxVoteTimes}}次</div>
      </div>
      <div class="m-part">
        <div class="m-name">活动说明</div>
        <div class="m-text">{{voteInfo.desc}}</div>
      </div>
    </messagebox>

    <div class="vote-detail" @click="showBox = true" v-show="!showBox">
      <img src="/static/images/shape2.png" class="fix-float-bg">
      <span class="fix-float-text">活动说明</span>
    </div>

    <div class="l-header">
      <swiper
        autoplay="true"
        indicator-dots="true"
        indicator-color="#FFF"
        indicator-active-color="#0086F1"
        :current="swiperState"
        @change="swiperState = $event.mp.detail.current"
      >
        <swiper-item v-for="(src, index) in swiperImage" :key="index">
          <img :src="src" mode="aspectFit" class="swiper-img" @click="previewImage">
        </swiper-item>
      </swiper>
    </div>

    <statistic :stat="{...statistic}"></statistic>

    <div class="vote-info">
      <p class="large-text">{{voteInfo.title}}</p>
      <p class="vote-desc">{{voteInfo.desc}}</p>
    </div>

    <div class="search" v-if="!showBox">
      <input type="text" class="search-input" v-model.lazy="searchWord" placeholder="搜索编号/名字">
      <img src="/static/images/icon_search2.png" class="icon-40">
    </div>

    <div class="top-bar">
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 0}"
        @click="changeTab(0)"
      >
        <span class="top-bar-text">最新</span>
      </div>
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 1}"
        @click="changeTab(1)"
      >
        <span class="top-bar-text">热门</span>
      </div>
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 2}"
        @click="changeTab(2)"
      >
        <span class="top-bar-text">排行榜</span>
      </div>
    </div>

    <div class="people-list">
      <card :data="data" v-for="(data, index) in voteData" :key="index" @vote="vote"></card>
    </div>


    <div class="fix-footer">
      <div class="footer-box border-r">
        <button plain class="footer-btn" @click="navToSignup">
          <img src="/static/images/icon_add_plain.png" class="icon-40">
          <span class="footer-text">报名参加</span>
        </button>
      </div>
      <div class="footer-box">
        <button plain class="footer-btn" open-type="share">
          <img src="/static/images/icon_share.png" class="icon-40">
          <span class="footer-text">分享活动</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import messagebox from '@/components/messagebox'
import statistic from '@/components/statistic'
import card from '@/components/vote-card'
import util from '@/utils/index.js'

export default {
  data() {
    return {
      showBox: false,
      swiperState: 0,
      swiperImage: [],
      statistic: {
        signed: 0,
        voted: 0,
        visited: 0,
        leftTime: {}
      },
      searchWord: '',
      tabState: 0,
      voteInfo: {
        host: '',
        title: '',
        maxVoteTimes: 1,
        voteTimeStart: '',
        voteTimeEnd: '',
        signupTimeStart: '',
        signupTimeEnd: '',
        desc: ''
      },
      voteData: []

    }
  },
  methods: {
    changeTab(index) {
      this.tabState = index

      if (index === 0) {
        this.voteData.sort((a, b) => b.id - a.id)
      }
      else if (index === 1) {
        this.voteData.sort(() => Math.random() > .5)
      }
      else {
        this.voteData.sort((a, b) => b.vote - a.vote)
      }
    },
    async vote(id) {
      wx.showModal({
        title: '投票确认',
        content: `确认为${id}号[${this.voteData.find(item => item.id === id).name}]投票吗？`,
        success: async res => {
          if (res.confirm) {
            await this.$net.voteElection({
              ElectionId: this.$mp.query.id,
              SessionId: this.$store.state.sessionId,
              Vote: [id]
            })
            wx.showToast({
              title: '投票成功'
            })
            console.log(this.voteData.find(item => item.id === id));
            this.voteData.find(item => item.id === id).vote++
          }
        }
      })
    },
    navToSignup() {
      wx.redirectTo({
        url: '/pages/join-election/main?id=' + this.$mp.query.id
      })
    },
    previewImage(e){
      wx.previewImage({
        current: e.mp.detail.current,
        urls: this.swiperImage
      })
    },
  },

  async mounted() {
    if (this.$mp.query.id) {
      const data = await this.$net.getElection(this.$mp.query.id)
      this.voteInfo = data.voteInfo
      this.voteData = data.voteData

      wx.setNavigationBarTitle({
        title: this.voteInfo.title
      })
      this.statistic.leftTime = util.getRemainTime(new Date(data.voteInfo.voteTimeEnd).valueOf())
      const cycle = setInterval(() => {
        this.statistic.leftTime = util.getRemainTime(new Date(data.voteInfo.voteTimeEnd).valueOf())
      }, 1000)
    }
    else {
      this.statistic.leftTime = util.getRemainTime(new Date(2019, 6-1, 16).valueOf())
      const cycle = setInterval(() => {
        this.statistic.leftTime = util.getRemainTime(new Date(2019, 6-1, 16).valueOf())
      }, 1000)
      console.log('当前为演示页面')
    }
  },

  components: {
    messagebox,
    statistic,
    card
  },

  onShareAppMessage(res) {
    return {
      title: 'FzuVote邀你投票',
      // desc: this.voteInfo.title,
      path: 'pages/do-election/main',
      // imageUrl:'',
      success(shareTickets) {
        console.info(shareTickets + '成功');
        wx.showToast({
          title: '转发成功'
        })
      },
      fail(res) {
        console.log(res + '失败');
      }
    }
  }
}
</script>

<style scoped>
.do-image-text {
  font-size: 16px;
  margin-bottom: 150rpx;
}

.vote-detail {
  position: fixed;
  right: 0;
  top: 100rpx;
  width: 150rpx;
  height: 50rpx;
  line-height: 50rpx;
  z-index: 1;
}

.fix-float-bg {
  width: 100%;
  height: 100%;
}

.fix-float-text {
  position: absolute;
  right: 20rpx;
  color: #fff;
  font-size: 12px;
  z-index: 2;
}

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

.m-title {
  margin-bottom: 40rpx;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.m-part {
  margin-bottom: 40rpx;
}

.m-name {
  margin-bottom: 10rpx;
  font-size: 14px;
}

.m-text {
  margin-bottom: 10rpx;
  font-size: 12px;
  color: #9999AE;
}

.vote-info {
  width: 650rpx;
  margin: 0 auto;
}

.vote-desc {
  margin-top: 20rpx;
  padding-left: 15rpx;
  color: #9999AE;
  font-size: 14px;
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  margin: 60rpx 0 40rpx 0;
}

.search-input {
  width: 580rpx;
  height: 70rpx;
  padding: 0 40rpx;
  background: #EFEFF1;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
}

/* 分类栏 */
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
  margin-right: 40rpx;
  border-bottom: 4px solid transparent;
  font-size: 14px;
  color: #0086F1;
}
.top-bar-item--act {
  border-bottom: 4px solid #0086F1;
}

.top-bar-text {
  margin: 0 20rpx;
}

.people-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 25rpx 0;
}


.fix-footer {
  position: fixed;
  display: flex;
  box-sizing: border-box;
  width: 750rpx;
  height: 110rpx;
  bottom: 0;
  padding: 30rpx 0;
  background: #fff;
  box-shadow: 0 0 72rpx 0 rgba(0, 0, 0, 0.1);
}

.footer-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.footer-text {
  margin-left: 15rpx;
  color: #0086F1;
}

.border-r {
  border-right: 1px solid #0086f2;
}

.footer-btn {
  display: flex;
  align-items: center;
  border: none;
  font-size: 16px;
}

.gray-bg {
  background: #f3f6f9;
}

</style>
