<template>
  <div id="card">
    <div class="body">
      <img :src="imgSrc" class="main-pic">
      <img src="/static/images/shape1.png" class="creator-bg">
      <div class="creator">{{creator}}</div>
    </div>
    <div class="bottom">
      <div class="title">{{title}}</div>
      <div class="number">
        <!-- <img src=""> -->
        <span class="data">{{joinNum}}</span>人已参与，
        已投<span class="data">{{voteNum}}</span>票
      </div>
      <div class="end-time">
        {{endTimeStr}}2019-05-09 11:11 结束
      </div>
      <div class="user-state" v-show="userState === 1">
        <img src="/static/images/icon_task_done.png" class="joined-img">
        <span class="joined-text">已参与</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // title, imgSrc, creator, joinNum, voteNum, endTime, userState,
  props: ['infoData'],
  data() {
    return {
      ...this.infoData,

    }
  },
}
</script>

<style scoped>
#card {
  position: relative;
  width: 650rpx;
  margin: 50rpx;
  border-radius: 15px;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
}

.body {
  height: 130px;
  overflow: hidden;
}

.main-pic {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
}


.bottom {
  position: relative;
  padding: 25rpx 40rpx;
  border-top: none;
  font-size: 14px;
  border-radius: 0 0 5px 5px;
}

.creator {
  position: absolute;
  right: -15rpx;
  top: 40rpx;
  padding: 0 30rpx 0 40rpx;
  line-height: 45rpx;
  color: #fff;
  font-size: 12px;
}

.creator-bg {
  position: absolute;
  right: -15rpx;
  top: 40rpx;
  width: 170rpx;
  height: 45rpx;
}

.title {
  color: #0086F1;
  font-size: 18px;
  margin-bottom: 20rpx;
}

.number {
  font-size: 13px;
  margin-bottom: 13rpx;
}

.end-time {
  font-size: 12px;
  color: #9999A3;
  letter-spacing: 1px;
}

.user-state {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 20rpx;
  right: 50rpx;
  color: #0086F1;
}

.joined-img {
  width: 30rpx;
  height: 30rpx;
  margin-right: 20rpx;
}

.joined-text {
  font-size: 14px;
}


</style>
