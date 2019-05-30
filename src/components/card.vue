<template>
  <div class="card" @click="navToVote">
    <div class="body">
      <img :src="infoData.imgSrc" class="main-pic">
      <img src="/static/images/shape1.png" class="creator-bg">
      <div class="creator">{{infoData.creator}}</div>
    </div>
    <div class="bottom">
      <div class="title">{{infoData.title}}</div>
      <div class="number">
        <span class="data">{{infoData.joinNum}}</span>人参与
        <span v-if="infoData.type !== 'Questionnaire'">，已投<span class="data">{{infoData.voteNum}}</span>票</span>
      </div>
      <div class="end-time">
        {{infoData.endTime}} 结束
      </div>
      <div class="user-state" v-if="infoData.userState === 1">
        <img src="/static/images/icon_task_done.png" class="joined-img">
        <span class="joined-text">已参与</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['infoData'],
  data() {
    return {
      // @切勿使用展开运算符，否则不再{{}}中不再是响应式的属性，无法同步props的变更
      // ...this.infoData,
    }
  },

  methods: {
    navToVote() {
      let url
      switch (this.infoData.type) {
        case 'Election':
          url = '/pages/do-election/main'
          break
        case 'Questionnaire':
          url = '/pages/do-questionnaire/main'
          break
        case 'Picvote':
          url = '/pages/do-image-text/main'
          break
        default:
          throw new Error('ERROR type: ' + this.type)
      }
      url += '?id=' + this.infoData.id
      wx.navigateTo({
        url: url + '?id=' + this.id
      })
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 650rpx;
  margin: 50rpx;
  border-radius: 10px;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
}

.body {
  height: 130px;
  /* overflow: hidden; */
}

.main-pic {
  height: 100%;
  width: 100%;
  border-radius: 10px 10px 0 0;
}


.bottom {
  position: relative;
  padding: 25rpx 40rpx;
  border-top: none;
  font-size: 14px;
  /* border-radius: 0 0 5px 5px; */
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
  /* color: #0086F1; */
  color: #0387F1;
  font-size: 16px;
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
  right: 40rpx;
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
