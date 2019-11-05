<template>
  <div>
    <div class="search">
      <input type="text" class="search-input" v-model.lazy="searchWord">
      <img src="/static/images/icon_search2.png" class="icon-40" @click="search">
    </div>
    <div class="empty-result" v-show="!searchWord">请输入搜索关键词</div>
    <div class="result">
      <card :infoData="item" v-for="(item, index) in resultList" :key="index"></card>
      <div class="empty-result" v-show="isResultEmpty">没有搜索到结果</div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      searchWord: '',
      resultList: [],
      isResultEmpty: false
    }
  },

  methods: {
    async search() {
      if (this.resultList) {
        this.resultList = await this.$net.search(this.searchWord)
        this.isResultEmpty = !this.resultList.length
      } else {
        mpvue.showToast({
          icon: 'none',
          title: '请输入搜索内容',
          time: 1000
        })
      }
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

.empty-result {
  margin-top: 100px;
  color: #999;
  text-align: center;
  font-size: 14px;
}

</style>
