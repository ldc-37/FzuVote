<template>
  <div class="launch-election">
    <div class="uploader">
      <uploader :limit="5" @update="imagesUrl = $event" :initImages="imagesUrl"></uploader>
    </div>

    <div class="whole-info border-top-gray">
      <description typeNameCN="" @update="title = $event.title; desc = $event.desc" :initTitle="title" :initDesc="desc"></description>
    </div>

    <div class="one-part border-top-gray">
      <div class="one-line mb60">
        <span class="mid-text">主办方信息</span>
        <input type="text" class="host-input" v-model.lazy="hostName" placeholder="活动展示的主办方名称">
      </div>
      <div class="one-line">
        <span class="large-text">最多可投</span>
        <picker mode="selector" :range="maxVoteNumArr" @change="changePicker(maxVoteNumArr, 'maxVoteNum', $event)">
          <span class="font-gray">每天{{maxVoteNum}}次</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
    </div>

    <div class="duration border-top-gray">
      <duration @create="signupTime = $event" @update="signupTime[$event.attr] = $event.value">报名时间</duration>
    </div>

    <div class="duration border-top-gray">
      <duration @create="voteTime = $event" @update="voteTime[$event.attr] = $event.value">投票时间</duration>
    </div>

    <div class="one-part border-top-gray">
      <div class="one-line mb20">
        <span class="large-text">多选设定</span>
        <switch :checked="setMulti" color="#0086F1" @change="setMulti = !setMulti"></switch>
      </div>
      <div class="one-line" v-if="setMulti">
        <span class="mid-text font-gray">最少选择选项</span>
        <picker mode="selector" :range="[1, 2, 3, 4, 5]" @change="changePicker([1, 2, 3, 4, 5], 'minOptionNum', $event)" class="times-picker">
          <span class="font-gray">{{minOptionNum}}个</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
      <div class="one-line" v-if="setMulti">
        <span class="mid-text font-gray">最多选择选项</span>
        <picker mode="selector" :range="[6, 7, 8, 9, '不限']" @change="changePicker([6, 7, 8, 9, '不限'], 'maxOptionNum', $event)" class="times-picker">
          <span class="font-gray">{{maxOptionNum}}个</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
    </div>

    <div class="one-part border-top-gray">
      <div class="one-line mb20">
        <span class="large-text">是否展示在广场</span>
        <switch :checked="showInGround" color="#0086F1" @change="showInGround = !showInGround"></switch>
      </div>
    </div>

    <div class="btn-launch">
      <button class="btn" hover-class="btn-hover" :loading="btnLoading" @click="publish">发布</button>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/image-uploader'
import description from '@/components/whole-info'
import duration from '@/components/duration-setter'

export default {
  data() {
    return {
      imagesUrl: [],
      title: '',
      desc: '',
      hostName: '',
      maxVoteNum: 1,
      setMulti: false,
      minOptionNum: 1,
      maxOptionNum: '不限',
      signupTime: {}, //此项不存为草稿
      voteTime: {}, //此项不存为草稿
      showInGround: true,

      btnLoading: false,
    }
  },

  computed: {
    maxVoteNumArr: () => [...Array(5).keys()].map(item => item + 1),
  },

  methods: {
    changePicker(range, attrName, e) {
      this[attrName] = range[e.mp.detail.value]
    },
    async publish() {
      if (!this.title.trim()) {
        wx.showToast({
          title: '请先将内容填写完整',
          icon: 'none'
        })
        return false
      }
      this.btnLoading = true
      const res = await this.$net.createElection({
        SessionId: this.$store.state.sessionId,
        MasterInfo: this.hostName,
        Title: this.title,
        Describe: this.desc,
        BeginVoteTime: `${this.voteTime.startDate} ${this.voteTime.startTime}:00`,
        EndVoteTime: `${this.voteTime.endDate} ${this.voteTime.endTime}:00`,
        BeginApplyTime: `${this.signupTime.startDate} ${this.signupTime.startTime}:00`,
        EndApplyTime: `${this.signupTime.endDate} ${this.signupTime.endTime}:00`,
        IsPublic: +this.showInGround,
        SharePic: this.imagesUrl,
        MostVoteADay: this.maxVoteNum,
        IsMultipleChoice: +this.setMulti,
        LeastChoice: this.minOptionNum,
        MostChoice: this.maxVoteNum,
      })
      this.btnLoading = false
      // if (res === xxx)
      wx.showToast({
        title: '创建成功'
      })
      this.$store.commit('setDraftOfLaunch', {
        type: 'election',
        data: {}
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/do-election/main?id=' + res.Data.ElectionId
        })
      }, 1000);
    },
    save_() {
      // voteTime, signupTime不存为草稿
      const draft = this.$data
      delete draft.voteTime
      delete draft.signupTime
      const hasValidInput = () => {
        if (draft.title || draft.desc || draft.hostName || draft.imagesUrl.length) {
          return true
        }
        if (draft.maxVoteNum !== 1 || draft.minOptionNum !== 1 || draft.maxOptionNum !== '不限' || !draft.showInGround) {
          return true
        }
        return false
      }
      if (hasValidInput()) {
        this.$store.commit('setDraftOfLaunch', {
          type: 'election',
          data: draft
        })
      } else {
        this.$store.commit('setDraftOfLaunch', {
          type: 'election',
          data: {}
        })
      }
    },
    restore_() {
      if (Object.keys(this.$store.state.draftOfLaunch.election).length) {
        // mpvue.showModel({
        //   title: '恢复提示',
        //   content: '是否恢复上次未提交的内容？',
        //   success(confirm) {
        //     if (confirm) {
                mpvue.showToast({
                  icon: 'loading',
                  title: '正在恢复内容...'
                })
            // } else {
                  // this.$store.commit('setDraftOfLaunch', {
                  //   type: 'election',
                  //   data: {}
                  // })
            // }
          // }
        // })
        // Object.assign是浅拷贝，会拷贝可枚举成员及其get/set函数
        Object.assign(this.$data, JSON.parse(JSON.stringify(this.$store.state.draftOfLaunch.election)))
      }
    }
  },

  components: {
    uploader,
    description,
    duration
  },

  destroyed() {
    // TODO: 仅此处在save时判断有效性，其他在restore时判断
    this.save_()
  },

  created() {
    this.restore_()
  },
}
</script>

<style scoped>
.launch-election {
  font-size: 14px;
}

.one-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60rpx;
}

.uploader {
  width: 650rpx;
  /* height: 150rpx; */
  margin: 0 auto;
  padding: 40rpx 0;
}

.whole-info {
  padding: 30rpx 50rpx 50rpx 50rpx;
}

.host-input {
  width: 460rpx;
  height: 80rpx;
  padding-left: 30rpx;
  border-bottom: 1px solid #999;
}

.times-picker {
  display: flex;
  align-items: center;
}

.icon-down {
  margin-left: 20rpx;
}

.one-part {
  padding: 40rpx 50rpx;
}

switch {
  transform: scale(.8);
}

.btn-launch {
  margin-bottom: 60rpx;
}


.border-top-gray {
  border-top: 10px solid #EEEEF0;
}

.mb20 {
  margin-bottom: 20rpx;
}
.mb60 {
  margin-bottom: 60rpx;
}
</style>
