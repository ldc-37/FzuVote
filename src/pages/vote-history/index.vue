<template>
  <div>
      <card :infoData="data" v-for="(data, index) in results" :key="index"></card>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      results: [
        {
          id: 321,
          type: 'Election',
          title: '关于谁应该请吃饭的投票',
          imgSrc: '/static/images/testbg.jpg',
          creator: '评选模式',
          joinNum: '23',
          voteNum: '123',
          endTime: '2019-05-30 22:22',
          userState: 1,
        },
      ]
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

</style>
