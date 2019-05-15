<template>
  <div>
    <div class="box">
      <img src="/static/images/testqr.png" class="qr-img">
      <span class="name">公众号名字</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200rpx;
}

.qr-img {
  width: 300rpx;
  height: 300rpx;
}

.name {
  margin-top: 40rpx;
}
</style>
