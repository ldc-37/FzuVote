<!--
功能：展示图文模式卡片
参数：data: Object  卡片数据
      voting: Boolean  投票状态标志
事件：无
-->
<template>
  <div class="large-vote-card">
    <div class="image-area">
      <img :src="data.image" mode="center" class="vote-img">
      <div class="vote-id">{{data.id >= 10 ? data.id : '0' + data.id}}</div>
    </div>
    <div class="info-area">
      <div>
        <p class="name">{{data.name}}</p>
        <p class="desc font-gray small-text">{{data.desc}}</p>
      </div>
      <radio color="#0086F1" :value="data.id" v-if="voting"></radio>
      <div class="vote-num" v-else>
        <span class="num" :class="{'voted': data.Voted}">{{data.Num}}票</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 若voting为假data中必须有票数Num和已投票该项的标志Voted
  props: {
    data: Object,
    voting: Boolean
  },
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

.vote-num {
  font-size: 14px;
  white-space: nowrap;
  margin-left: 50rpx;
}

.voted {
  color: #0086F1;
}

</style>
