<template>
  <div>
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
      <img src="/static/images/icon_search2.png" class="icon-40" @click="search">
    </div>

    <radio-group @change="changeRatio">
      <card :data="item" v-for="(item, index) in voteData" :key="index"></card></card>
    </radio-group>

    <div class="btn-area">
      <button class="btn" :disabled="nowSelectId < 0" :loading="btnLoading" @click="vote">投票</button>
    </div>
  </div>
</template>

<script>
import messagebox from '@/components/messagebox'
import statistic from '@/components/statistic'
import card from '@/components/large-vote-card'
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
      nowSelectId: -1,
      voteData: [
        {
        id: 1,
        teamName: '你好啊',
        teamDesc: '说明说明说明说明说明说明说明说明说明',
        },
        {
        id: 2,
        teamName: '你好啊',
        teamDesc: '说明说明说明说明说明说明说明说明说明',
        },
      ],
      btnLoading: false,
    }
  },

  methods: {
    changeRatio(e) {
      this.nowSelectId = +e.mp.detail.value
    },
    search() {
      wx.showLoading({
        title: '搜索中'
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 1000);
    },
    vote() {
      this.btnLoading = true

      setTimeout(() => {
        wx.showToast({
          title: '投票成功'
        })
        this.btnLoading = false
      }, 1000)
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
.do-selection {
  font-size: 16px;
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


.btn-area {
  margin-top: 100rpx;
  margin-bottom: 50rpx;
}

</style>
