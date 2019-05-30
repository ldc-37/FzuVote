<template>
  <div class="vote-card">
    <div class="image-area">
      <img :src="data.image" class="vote-img">
      <div class="vote-id">{{data.id >= 10 ? data.id : '0' + data.id}}</div>
    </div>
    <div class="info-area">
      <span class="name">{{data.name}}</span>
      <span class="num">{{data.vote}}票</span>
    </div>
    <div class="btn-area">
      <button class="vote-btn" hover-class="btn-hover" @click="vote">投票</button>
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
  methods: {
    vote() {
      this.$emit('vote', this.data.id)
    }
  },
}
</script>

<style scoped>
.vote-card {
  width: 280rpx;
  margin: 25rpx 0;
  border-radius: 5px;
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
  padding: 0 30rpx;
  line-height: 70rpx;
}

.name {
  color: #0086F1;
}

.btn-area {
  height: 70rpx;
}

.vote-btn {
  background: #0086F1;
  color: #fff;
  font-size: 16px;
  line-height: 70rpx;
  border-radius: 0;
}

</style>
