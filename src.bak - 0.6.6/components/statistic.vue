<template>
  <div class="statistic">
    <div class="up">
      <span class="mid-text">距离投票结束</span>
      <span class="font-gray small-text">{{leftTimeStr}}</span>
    </div>
    <div class="down">
      <div class="stat-part">
        <span class="stat-num">{{stat.signed}}</span>
        <span class="stat-name">已报名</span>
      </div>
      <div class="stat-part">
        <span class="stat-num">{{stat.voted}}</span>
        <span class="stat-name">累计投票</span>
      </div>
      <div class="stat-part">
        <span class="stat-num">{{stat.visited}}</span>
        <span class="stat-name">访问量</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stat'],
  data() {
    return {

    }
  },
  computed: {
    leftTimeStr() {
      const time = this.stat.leftTime
      const d = time.days,
            h = time.hours,
            m = time.minutes,
            s = time.seconds
      if (s < 0) {
        return '投票已结束'
      }
      else {
        return `${d}天  ${h}时  ${m}分  ${s}秒`
      }
    }
  },


}
</script>

<style scoped>
.statistic {
  box-sizing: border-box;
  width: 650rpx;
  margin: 50rpx;
  padding: 0 30rpx;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}


.up {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #bbb;
}

.down {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.stat-part {
  width: 33%;
  display: flex;
  flex-direction: column;
}

.stat-num {
  margin-bottom: 10rpx;
  font-size: 25px;
  text-align: center;
}

.stat-name {
  color: #9999AE;
  font-size: 12px;
  text-align: center;
}


</style>
