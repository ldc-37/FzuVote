<template>
  <div>
      <card :infoData="data" v-for="(data, index) in results" :key="index"></card>
      <div class="empty-history" v-if="!results.length">您的记录为空</div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      results: []
    }
  },

  async mounted() {
    wx.setNavigationBarTitle({
      title: this.$mp.query.from
    })
    let type
    switch (this.$mp.query.from) {
      case '参与投票': type = 'Built'; break;
      case '发起投票': type = 'Join'; break;
      case '中奖记录': type = 'Win'; break;
      case '我的足迹': type = 'History'; break;
      default: throw new Error('TYPE Error:' + this.$mp.query.from)
    }
    const res = await this.$net.getUserActivity(this.$store.state.sessionId, type)
    this.results = res
  },

  components: {
    card
  }
}
</script>

<style scoped>
.empty-history {
  margin-top: 200px;
  text-align: center;
}
</style>
