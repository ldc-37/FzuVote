<template>
  <div @click="clickHandle">

        <card :infoData="infoData"></card>
        <card :infoData="infoData"></card>

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      infoData: {
        title: '关于谁应该请吃饭的投票',
        imgSrc: '/static/images/testbg.jpg',
        creator: '西二在线',
        joinNum: '23',
        voteNum: '123',
        endTime: '2.20 22:22',
        userState: 1,
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  mounted () {
    // let app = getApp()
    // wx.navigateTo({
    //   url: '/pages/q-and-a/main'
    // })
  }
}
</script>

<style scoped>



</style>
