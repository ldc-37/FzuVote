<template>
  <div>
    <div class="l-header">
      <div class="top">
        <div class="avatar-div">
          <img :src="avatar" class="avatar-img">
          <!-- <open-data type="userAvatarUrl"></open-data> -->
        </div>
        <div class="name-area">
          <!-- <open-data id="username"><open-data type="userNickName"></open-data></span> -->
          <span id="username">{{ username }}</span>
          <button id="btn-wechat-data" open-type="getUserInfo" @getuserinfo="getUserInfo">同步微信资料</button>
        </div>
      </div>
    </div>
    <div class="l-body">
      <div class="personal-numbers">
        <div @click="navTo('../vote-history/main?from=参与投票')" class="number-group">
          <span class="number">{{ userData.voteNum }}</span>
          <span class="number-desc">参与投票</span>
        </div>
        <div @click="navTo('../vote-history/main?from=发起投票')" class="number-group">
          <span class="number">{{ userData.launchNum }}</span>
          <span class="number-desc">发起投票</span>
        </div>
        <div @click="navTo('../vote-history/main?from=中奖记录')" class="number-group">
          <span class="number">{{ userData.prizeNum }}</span>
          <span class="number-desc">中奖记录</span>
        </div>
      </div>
      <div class="columns">
        <a href="../vote-history/main?from=我的足迹" class="one-column">
          <span class="column-text">我的足迹</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
        <a href="../q-and-a/main" class="one-column">
          <span class="column-text">常见问题</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
        <button plain open-type="feedback" class="one-column feedback">
          <span class="column-text">意见反馈</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </button>
        <a href="../wechat-official-account/main" class="one-column">
          <span class="column-text">关注公众号</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      userData: {
        voteNum: '-',
        launchNum: '-',
        prizeNum: '-',
      }
    }
  },

  computed: {
    username() {
      return this.$store.state.name || 'FzuVote'
    },
    avatar() {
      return this.$store.state.avatarUrl || '/static/images/logo.png'
    }
  },

  methods: {
    ...mapMutations([
      'setName',
      'setAvatar',
    ]),
    navTo(url) {
      wx.navigateTo({
        url
      })
    },
    getUserInfo(e) {
      if (e.mp.detail.userInfo) {
        wx.showToast({
          title: '授权成功'
        })
        this.$store.commit('setAuth', true)
        wx.getUserInfo({
          success: res => {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            this.setName(nickName)
            this.setAvatar(avatarUrl)

            // this.$forceUpdate()
          }
        })
      }
      else {
        wx.showToast({
          icon: 'none',
          title: '授权被取消',
        })
        console.warn(e.mp.detail.errMsg)
      }
    }
  },

  async mounted() {
    const data = await this.$net.getUserStat(this.$store.state.sessionId)
      // 使用Object.assign()将后面对象的属性合并到前面的对象上
    // Object.assign(this.userData, data)
  },
}
</script>

<style scoped>

/* 头部 */
.l-header {
  background: #0086F1;
  /* padding: 20rpx 40rpx 50rpx; */
  padding: 50rpx 40rpx;
}

#text-me {
  display: inline-block;
  margin-bottom: 30rpx;
  color: #fff;
}

.top {
  display: flex;
  width: 500rpx;
  margin-left: 10rpx;
}

.avatar-div {
  width: 180rpx;
  height: 180rpx;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  /* border: 1px solid #fff; */
}

.name-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30rpx;
}

#username {
  color: #fff;
  font-size: 25px;
  text-align: center;
  margin-bottom: 10rpx;
}

#btn-wechat-data {
  width: 210rpx;
  line-height: 54rpx;
  background: #fff;
  color: #0086F1;
  font-size: 12px;
  border-radius: 15px;
}

.l-body {

}
/* 数据 */
.personal-numbers {
  display: flex;
  justify-content: space-between;
  width: 500rpx;
  margin: 50rpx auto;
  padding: 30rpx 50rpx;
  /* border: 1px solid #000; */
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.number-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.number {
  margin-bottom: 10rpx;
  font-size: 22px;
  text-align: center;
}

.number-desc {
  font-size: 12px;
  color: #9999A3;
}

/* 功能栏 */
.columns {
  margin: 0 100rpx;

}

.one-column {
  display: flex;
  align-items: center;
  position: relative;
  line-height: 3;
  font-size: 16px;
}

.column-img {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  transform: scale(1.2);
  right: 5rpx;
}

.feedback {
  border: none;
  padding: 0;
  font-size: 16px;
  color: #000;
}

</style>
