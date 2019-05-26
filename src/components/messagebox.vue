<template>
  <div class="messagebox">
    <!-- <div class="shadow"></div> -->
      <div class="content">
        <div class="close-btn" @click="handleClose">×</div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  },
}
</script>

<style scoped>
.content {
  position: relative;
  width: 650rpx;
  min-height: 500rpx;
  max-height: 900rpx;
  box-sizing: border-box;
  padding: 50rpx 60rpx;
  /* margin: 150rpx 50rpx; */
  overflow: auto;
  background: #fff;
  border-radius: 15rpx;
  z-index: 2;
}

.messagebox {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 750rpx;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.close-btn {
  font-size: 25px;
  position: absolute;
  right: 30rpx;
  top: 10rpx;
  color: #9999AE;
}

</style>
