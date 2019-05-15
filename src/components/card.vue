<template>
  <div id="card">
    <div class="body">
      <img :src="infoData.imgSrc" class="main-pic">
      <div class="creator">{{infoData.creator}}</div>
    </div>
    <div class="bottom">
      <div class="title">{{infoData.title}}</div>
      <div class="number">
        <!-- <img src=""> -->
        <span class="data">{{infoData.joinNum}}</span>人已参与，
        已投<span class="data">{{infoData.voteNum}}</span>票
      </div>
      <div class="end-time">
        {{infoData.endTimeStr}}2019-05-09 11:11 结束
      </div>
      <div class="user-state" v-show="infoData.userState === 1">
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
      ...infoData,

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
  padding: 7rpx 30rpx 7rpx 40rpx;
  background: #0086F1;
  color: #fff;
  font-size: 12px;
  border-radius: 50px 0 0 50px;
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
