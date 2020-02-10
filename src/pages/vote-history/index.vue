<template>
  <div>
      <card :infoData="data" v-for="(data, index) in results" :key="index" @longPress="handleLongPressCard"></card>
      <div class="empty-history" v-if="!results.length">您的记录为空</div>
  </div>
</template>

<script>
import card from '@/components/card'
import net from '@/network/network'

export default {
  data() {
    return {
      results: []
    }
  },

  async mounted() {
    let titleName
    const type = this.$mp.query.from // joined, built, win, history
    switch(type) {
      case 'joined': titleName = '参与投票'; break
      case 'built': titleName = '发起投票'; break
      case 'win': titleName = '中奖记录'; break
      case 'history': titleName = '我的足迹'; break
    }
    wx.setNavigationBarTitle({
      title: titleName
    })
    this.results = await this.$net.getUserActivity(type)
  },

  components: {
    card
  },

  methods: {
    handleLongPressCard(data) {
      if (this.$mp.query.from !== 'built') return
      const self = this
      mpvue.showActionSheet({
        itemList: ['暂停（即将上线）', '删除'],
        success(res) {
          switch(res.tapIndex) {
            case 0:
              mpvue.showToast({
                title: '暂时无法暂停投票，请考虑删除，抱歉！',
                icon: 'none',
                duration: 1500
              })
              break
            case 1:
              mpvue.showModal({
                title: '警告',
                content: '此操作将删除该投票且不可恢复，是否确认？',
                confirmText: '确认删除',
                confirmColor: '#F56C6C',
                success: async (res) => {
                  if (res.confirm) {
                    const code = await self.$net.deleteVote(data.type, data.id)
                    if (code) {
                      mpvue.showModal({
                        title: '删除失败',
                        content: '投票未删除，错误码：' + code,
                        showCancel: false
                      })
                    } else {
                      mpvue.showToast({
                        title: '删除成功',
                        icon: 'none',
                        duration: 2000
                      })
                      self.results = await self.$net.getUserActivity(self.$mp.query.from)
                    }
                  }
                }
              })
              break
          }
        },
        fail(res) {
          console.error(res.errMsg)
        }
      });
    }
  },
}
</script>

<style scoped>
.empty-history {
  margin-top: 200px;
  text-align: center;
}
</style>
