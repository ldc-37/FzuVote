<script>


export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.btn {
  width: 380rpx;
  background: #0086F1;
  color: #fff;
  font-size: 16px;
  border-radius: 50px;
  line-height: 2.4;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
}

.huge-text {
  font-size: 18px;
}
.large-text {
  font-size: 16px;
}
.mid-text {
  font-size: 14px;
}
.small-text {
  font-size: 12px;
}

.icon-25 {
  width: 25rpx;
  height: 25rpx;
}
.icon-30 {
  width: 30rpx;
  height: 30rpx;
}
.icon-40 {
  width: 40rpx;
  height: 40rpx;
}
.icon-50 {
  width: 50rpx;
  height: 50rpx;
}

.font-gray {
  color: #9999A3;
}
.font-black {
  color: #414141;
}
</style>
