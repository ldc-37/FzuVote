<template>
  <div>
    <messagebox v-if="showBox" @close="showBox = false">
      <h3 class="m-title">{{voteInfo.title}}</h3>
      <div class="m-part">
        <div class="m-name">主办方</div>
        <div class="m-text">{{voteInfo.host}}</div>
      </div>
      <div class="m-part">
        <div class="m-name">活动时间</div>
        <!-- <div class="m-text">报名时间 {{voteInfo.signupTimeStart}}-{{voteInfo.signupTimeEnd}}</div> -->
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
      <input type="text" class="search-input" v-model="searchWord" placeholder="搜索编号/名字">
      <img src="/static/images/icon_search2.png" v-if="pastSearchWord !== searchWord" class="icon-40" @click="search">
      <img src="/static/images/icon_close_blue.png" v-else class="icon-40" @click="clearSearch">
    </div>

    <radio-group @change="changeRatio">
      <card :data="item" :voting="isVoting" v-for="(item, index) in showingVoteData" :key="index"></card>
    </radio-group>
    <div class="empty-result" v-if="voteData.length === 0">发起者忘记添加投票对象了Orz</div>
    <div class="empty-result" v-else-if="showingVoteData.length === 0">没有找到结果 T_T</div>

    <div class="btn-area">
      <button class="btn" hover-class="btn-hover" :disabled="nowSelectId < 0 || !isVoting" :loading="btnLoading" @click="vote">投票</button>
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
      // @该属性对应功能需要完善
      isVoting: true,
      swiperState: 0,
      swiperImage: [],
      statistic: {
        signed: 0,
        voted: 0,
        visited: 0,
        // mount时生成
        leftTime: {}
      },
      searchWord: '',
      pastSearchWord: 'a_word_that_impossible_appeared',
      nowSelectId: -1,
      voteInfo: {
        host: '---',
        title: '---',
        maxVoteTimes: '-',
        voteTimeStart: '',
        voteTimeEnd: '',
        // signupTimeStart: '2019-06-22 10:00',
        // signupTimeEnd: '2019-06-26 10:00',
        desc: '------'
      },
      voteData: [],
      showingVoteData: [],
      btnLoading: false,
    }
  },

  methods: {
    changeRatio(e) {
      this.nowSelectId = +e.mp.detail.value
    },
    search() {
      // mpvue.showLoading({
      //   title: '搜索中'
      // })
      if (this.searchWord.trim() === '') {
        mpvue.showToast({
          title: '请输入有效内容',
          icon: 'none',
          time: 1000
        })
        return
      }
      const ret = []
      this.voteData.forEach((item) => {
        if (item.name.indexOf(this.searchWord) !== -1) {
          ret.push(item)
        } else if (item.id.toString() === this.searchWord) {
          // id匹配的放到前面
          ret.unshift(item)
        }
      })
      this.showingVoteData = ret
      this.pastSearchWord = this.searchWord
      // setTimeout(() => {
      //   mpvue.hideLoading()
      // }, 1000);
    },
    clearSearch() {
      this.showingVoteData = this.voteData
      this.searchWord = ''
    },
    async vote() {
      this.btnLoading = true
      this.voteData.find(item => item.id === this.nowSelectId).Voted = true

      const res = await this.$net.voteImageText({
        SessionId: this.$store.state.sessionId,
        PicvoteId: this.$mp.query.id,
        // @临时设置为单选
        Vote: [this.nowSelectId]
      })
      this.btnLoading = false
      if (res.Status === 200) {
        this.isVoting = false
        mpvue.showToast({
          title: '投票成功'
        })
      }
      else {
        throw new Error(res.Status)
      }
    },
    previewImage(e){
      mpvue.previewImage({
        current: e.mp.detail.current,
        urls: this.swiperImage
      })
    },
  },

  async mounted() {
    if (this.$mp.query.id) {
      const data = await this.$net.getImageText(this.$mp.query.id)
      this.swiperImage = data.swiperImage
      this.statistic = data.statistic
      this.voteInfo = data.voteInfo
      this.voteData = data.voteData
      this.showingVoteData = this.voteData
      mpvue.setNavigationBarTitle({
        title: this.voteInfo.title
      })
      this.statistic.leftTime = util.getRemainTime(new Date(data.voteInfo.voteTimeEnd).valueOf())
      const cycle = setInterval(() => {
        this.statistic.leftTime = util.getRemainTime(new Date(data.voteInfo.voteTimeEnd).valueOf())
      }, 1000)
    }
    else {
      throw new Error('页面参数不正确！' + this.$mp.query)
    }
  },

  components: {
    messagebox,
    statistic,
    card
  }
}
</script>

<style scoped>
.do-election {
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
  position: relative;
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

.empty-result {
  margin-top: 50px;
  color: #999;
  text-align: center;
  font-size: 14px;
}

.btn-area {
  margin-top: 100rpx;
  margin-bottom: 50rpx;
}

</style>
