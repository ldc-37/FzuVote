<template>
  <div>
    <div class="search">
      <input type="text" class="search-input">
      <img src="/static/images/icon_search2.png" class="icon-40">
    </div>
    <div class="result">
      <card :infoData="item" v-for="(item, index) in resultList" :key="index"></card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      resultList: [
        {
          title: '关于谁应该请吃饭的投票',
          imgSrc: '/static/images/testbg.jpg',
          creator: '西二在线',
          joinNum: '23',
          voteNum: '123',
          endTime: '2.20 22:22',
          userState: 1,
        },
      ]
    }
  },
  components: {
    card
  }
}
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  margin: 20rpx 0 40rpx 0;
}

.search-input {
  width: 580rpx;
  height: 70rpx;
  padding: 0 40rpx;
  background: #EFEFF1;
  border-radius: 20px;
  font-size: 14px;
  box-sizing: border-box;
}

</style>
