<template>
  <div class="do-image-text">
    <messagebox v-if="showBox" @close="showBox = false">
      <h3 class="m-title">问卷标题</h3>
      <div class="m-part">
        <div class="m-name">主办方</div>
        <div class="m-text">数计学院</div>
      </div>
      <div class="m-part">
        <div class="m-name">主办方</div>
        <div class="m-text">数计1学院</div>
        <div class="m-text">数计学2院</div>
        <div class="m-text">数计3学院</div>
      </div>
      <div class="m-part">
        <div class="m-name">主办方</div>
        <div class="m-text">数计1学院</div>
        <div class="m-text">数计学2院</div>
        <div class="m-text">数计3学院</div>
      </div>
    </messagebox>

    <div class="vote-detail" @click="showBox = true">
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
          <img :src="src" class="swiper-img">
        </swiper-item>
      </swiper>
    </div>

    <statistic :stat="{...statistic}"></statistic>

    <div class="vote-info">
      <p class="large-text">关于什么的活动标题</p>
      <p class="vote-desc">说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字</p>
    </div>

    <div class="search" v-if="!showBox">
      <input type="text" class="search-input" v-model="searchWord" placeholder="搜索编号/名字">
      <img src="/static/images/icon_search2.png" class="icon-40">
    </div>

    <div class="top-bar">
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 0}"
        @click="tabState = 0"
      >
        <span class="top-bar-text">最新</span>
      </div>
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 1}"
        @click="tabState = 1"
      >
        <span class="top-bar-text">热门</span>
      </div>
      <div class="top-bar-item"
        :class="{'top-bar-item--act': tabState === 2}"
        @click="tabState = 2"
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
        <button plain class="footer-btn" @click="share">
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
      swiperImage: [
        '/static/images/testswiper.png',
        '/static/images/testswiper.png',
        '/static/images/testswiper.png',
      ],
      statistic: {
        signed: 29,
        voted: 9989,
        visited: 10101,
        leftTime: {}
      },
      searchWord: '',
      tabState: 0,
      voteData: [
        {
          id: 1,
          name: '姓名',
          vote: 9,
        },
        {
          id: 3,
          name: '姓名',
          vote: 9,
        },
        {
          id: 9,
          name: '姓名',
          vote: 9,
        },
        {
          id: 10,
          name: '姓名',
          vote: 9,
        },
        {
          id: 15,
          name: '姓名',
          vote: 9,
        },
      ]

    }
  },
  methods: {
    vote(id) {
      wx.showModal({
        title: '投票确认',
        content: `确认为${id}号[${this.voteData.filter(item => item.id === id)[0].name}]投票吗？`,
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '投票成功'
            })
          }
        }
      })
    },
    navToSignup() {
      wx.navigateTo({
        url: 'page/'
      })
    },
    share() {

    }
  },
  mounted() {
    this.statistic.leftTime = util.getRemainTime(new Date(2019, 5-1, 27).valueOf())
    const cycle = setInterval(() => {
      this.statistic.leftTime = util.getRemainTime(new Date(2019, 5-1, 27).valueOf())
    }, 1000);
  },

  components: {
    messagebox,
    statistic,
    card
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
