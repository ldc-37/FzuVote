<template>
  <div class="large-vote-card">
    <div class="image-area">
      <img src="/static/images/testbg.jpg" class="vote-img">
      <div class="vote-id">{{data.id >= 10 ? data.id : '0' + data.id}}</div>
    </div>
    <div class="info-area">
      <div>
        <p class="name">{{data.teamName}}</p>
        <p class="desc font-gray small-text">{{data.teamDesc}}</p>
      </div>
      <radio color="#0086F1" :value="data.id"></radio>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.large-vote-card {
  width: 650rpx;
  margin: 50rpx auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 72rpx 0 rgba(0, 0, 0, 0.1);
}

.image-area {
  position: relative;
  width: 100%;
  height: 280rpx;
}

.vote-img {
  width: 100%;
  height: 100%;
}

.vote-id {
  position: absolute;
  left: 30rpx;
  top: 0;
  height: 45rpx;
  line-height: 45rpx;
  width: 90rpx;
  background: #fff;
  color: #0086F1;
  border-radius: 0 0 10px 10px;
  font-size: 14px;
  text-align: center;
}

.info-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 50rpx;
}

.name {
  color: #0086F1;
  font-size: 16px;
  margin-bottom: 15rpx;
}

radio {
  transform: scale(.7);
  margin-left: 30rpx;
  margin-right: -10rpx;
}

</style>
