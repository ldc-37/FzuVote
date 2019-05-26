<template>
  <div>
    <!-- <div class="one-part" @click="navTo('../launch-questionnaire/main')"> -->
    <a class="one-part" href='../launch-image-text/main'>
      <div class="part-text">
        <div class="part-title">图文模式</div>
        <div class="part-desc">
          <ul>
            <li>图文并茂，直观明朗</li>
          </ul>
        </div>
      </div>
      <div class="part-icon">
        <img src="/static/images/icon_list.png" class="icon-img">
      </div>
    </a>
    <a class="one-part one-part-center" href='../launch-questionnaire/main'>
      <div class="part-text">
        <div class="part-title">问卷模式</div>
        <div class="part-desc">
          <ul>
            <li>调研神器，效率翻倍</li>
          </ul>
        </div>
      </div>
      <div class="part-icon">
        <img src="/static/images/icon_compile.png" class="icon-img">
      </div>
    </a>
    <a class="one-part" href='../launch-selection/main'>
      <div class="part-text">
        <div class="part-title">评选模式</div>
        <div class="part-desc">
          <ul>
            <li>自主报名</li>
            <li>发起拉票，可以重复的评选</li>
            <li>支持高并发量</li>
            <li>自主审核</li>
            <li>每人多票</li>
          </ul>
        </div>
      </div>
      <div class="part-icon part-icon-last">
        <img src="/static/images/icon_star.png" class="icon-img">
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {


    }
  },
  methods: {
    navTo(url) {
      wx.navigateTo({
        url: url
      })
    }
  },
}
</script>

<style scoped>
  .one-part {
    display: flex;
    align-items: center;
    width: 650rpx;
    margin: 50rpx auto;
    padding: 40rpx 50rpx;
    border-radius: 15px;
    box-shadow: 0 0 72rpx rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .part-title {
    color: #414141;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .part-desc {
    color: #9999A3;
    font-size: 15px;
    line-height: 2;
  }

  .part-text {
    width: 75%;
  }

  .part-icon {
    margin-left: 20rpx;
    width: 100rpx;
    height: 100rpx;
  }

  .part-icon-last {
    align-self: flex-start;
    margin-top: 10rpx;
  }

  .icon-img {
    width: 100%;
    height: 100%;
  }
</style>
