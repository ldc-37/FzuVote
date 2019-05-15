<template>
  <div>
    <div class="l-header">
      <!-- <div id="text-me">我的 </div> -->
      <div class="top">
        <div class="avatar-div">
          <img src="/static/images/user.png" class="avatar-img">
        </div>
        <div class="name-area">
          <span id="username">{{ userData.username }}</span>
          <button id="btn-wechat-data">同步微信资料</button>
        </div>
      </div>
    </div>
    <div class="l-body">
      <div class="personal-numbers">
        <div class="number-group">
          <span class="number">{{ userData.voteNum }}</span>
          <span class="number-desc">参与投票</span>
        </div>
        <div class="number-group">
          <span class="number">{{ userData.launchNum }}</span>
          <span class="number-desc">发起投票</span>
        </div>
        <div class="number-group">
          <span class="number">{{ userData.prizeNum }}</span>
          <span class="number-desc">中奖记录</span>
        </div>
      </div>
      <div class="columns">
        <a class="one-column">
          <span class="column-text">我的足迹</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
        <a href="../q-and-a/main" class="one-column">
          <span class="column-text">常见问题</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
        <a class="one-column">
          <span class="column-text">联系客服</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
        <a href="../wechat-official-account/main" class="one-column">
          <span class="column-text">关注公众号</span>
          <img class="column-img" src="/static/images/icon_right.png"></img>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: 'BeJame',
        voteNum: 123,
        launchNum: 12,
        prizeNum: 1
      }
    }
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
}

.name-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30rpx;
}

#username {
  color: #fff;
  font-size: 30px;
  text-align: center;
}

#btn-wechat-data {
  width: 220rpx;
  line-height: 58rpx;
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
  color: #9999a3;
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
  font-size: 15px;
}

.column-img {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  transform: scale(1.2);
  right: 5rpx;
}

</style>
