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

  mounted() {
    wx.setNavigationBarTitle({
      title: this.$mp.query.from
    })
  },

  components: {
    card
  }
}
</script>

<style scoped>

</style>
