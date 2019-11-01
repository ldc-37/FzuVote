<template>
  <div class="launch-image-text">
    <div class="uploader">
      <uploader :limit="5" @update="imagesId = $event" :initImages="imagesId"></uploader>
    </div>

    <div class="whole-info border-top-gray">
      <description typeNameCN="投票" @update="title = $event.title; desc = $event.desc" :initTitle="title" :initDesc="desc"></description>
    </div>

    <div class="one-part border-top-gray">
      <div class="team-list">
        <div class="one-team" v-for="(item, index) in teams" :key="index">
          <div class="one-line">
            <img src="/static/images/icon_minus.png" class="icon-40" @click="minusOption" :data-idx="index">
            <p class="upload-tip-text" v-if="!item.image" @click="uploadImage(index)">上传图片</p>
            <img :src="item.image" v-else class="team-img" @click="uploadImage(index)">
            <span class="order">{{index + 1}}）</span>
            <input type="text" class="team-name-input" v-model.lazy="item.name" placeholder="队名">
          </div>
          <div class="team-desc">
            <p class="attr-line">队伍简介</p>
            <textarea v-model.lazy="item.desc" placeholder="请输入队伍简介"></textarea>
          </div>
        </div>
      </div>
      <div class="add-option" @click="addOption">
        <img src="/static/images/icon_add2.png" class="add-option-icon icon-40">
        <span class="add-text">添加队伍</span>
      </div>
      <div class="one-line">
        <span class="large-text">最多可投</span>
        <picker mode="selector" :range="maxVoteNumArr" @change="changePicker(maxVoteNumArr, 'maxVoteNum', $event)">
          <span class="font-gray">每天{{maxVoteNum}}次</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
    </div>

    <div class="border-top-gray">
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
      <div class="one-line mb20">
        <span class="large-text">匿名</span>
        <switch :checked="anonymous" color="#0086F1" @change="anonymous = !anonymous"></switch>
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
      title: '',
      desc: '',
      imagesId: [],
      teams: [
        {
          name: '',
          image: '',
          imageId: '',
          desc: ''
        },
      ],
      maxVoteNum: 1,
      setMulti: false,
      minOptionNum: 1,
      maxOptionNum: '不限',
      voteTime: {}, // 此项不保存为草稿
      showInGround: true,
      anonymous: false,

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
    addOption() {
      this.teams.push({
          name: '',
          image: '',
          desc: ''
        })
    },
    minusOption(e) {
      this.teams.splice(e.target.dataset.idx, 1)
    },
    uploadImage(index) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.teams[index].image = res.tempFilePaths[0]
          wx.uploadFile({
            url: this.$fly.config.baseURL + '/common/pic',
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: data => {
              this.teams[index].imageId = JSON.parse(data.data).Pic_id
            }
          })
        }
      })
    },
    async publish() {
      const isEmptyBlank = () => {
        let hasEmpty = false
        this.teams.forEach(item => {
          if (item.name.trim() === '') {
            hasEmpty = true
          }
        })
        if (hasEmpty) {
          return true
        }
        return false
      }
      if (!this.title.trim() || isEmptyBlank()) {
        wx.showToast({
          title: '请先将内容填写完整',
          icon: 'none'
        })
        return false
      }
      this.btnLoading = true
      const Data = []
      for (let item of this.teams) {
        Data.push({
          Pic: item.imageId || undefined,
          Title: item.name,
          Describe: item.desc,
          // Vote: "0"
        })
      }
      const res = await this.$net.createImageText({
        SessionId: this.$store.state.sessionId,
        Title: this.title,
        Describe: this.desc,
        BeginTime: `${this.voteTime.startDate} ${this.voteTime.startTime}:00`,
        EndTime: `${this.voteTime.endDate} ${this.voteTime.endTime}:00`,
        // IsPublic: +this.showInGround.toString(),
        SharePic: this.imagesId,
        MostVoteADay: this.maxVoteNum.toString(),
        // IsMultipleChoice: +this.setMulti.toString(),
        LeastChoice: this.minOptionNum.toString(),
        MostChoice: this.maxVoteNum.toString(),
        // Anonymity: +this.anonymous.toString(),
        Data
      })
      this.btnLoading = false
      wx.showToast({
        title: '创建成功'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/do-image-text/main?id=' + res.Data.PicvoteId
        })
      }, 1000);
    },
    save_() {
      // voteTime不存为草稿
      const draft = this.$data
      delete draft.voteTime
      delete draft.btnLoading
      this.$store.commit('setDraftOfLaunch', {
        type: 'imageText',
        data: draft
      })
    },
    restore_() {
      const hasValidInput = () => {
        // 这里只检查了部分项目
        const data = this.$store.state.draftOfLaunch.imageText
        if (!Object.keys(data).length) {
          return false
        }
        if (data.title || data.desc || this.imagesId.length || this.teams.length > 1) {
          return true
        }
        if (!data.teams) {
          return false
        }
        if (data.teams.length === 0) {
          return false
        }
        let t = false
        Object.values(data.teams[0]).forEach(item => {
          if (!t && (item !== '')) t = true
        })
        return t
      }
      if (hasValidInput()) {
        // // TODO: 询问是否需要恢复草稿
        // mpvue.showModel({
        //   title: '恢复提示',
        //   content: '是否恢复上次未提交的内容？',
        //   success(confirm) {
        //     if (confirm) {
                mpvue.showToast({
                  icon: 'loading',
                  title: '正在恢复内容...'
                })
        //     }
        //   }
        // })

        // Object.assign是浅拷贝，会拷贝可枚举成员及其get/set函数
        Object.assign(this.$data, JSON.parse(JSON.stringify(this.$store.state.draftOfLaunch.imageText)))
        // TODO:  提交成功后清理store
      }
    }
  },

  components: {
    uploader,
    description,
    duration
  },

  destroyed() {
    this.save_()
  },

  created() {
    this.restore_()
  },
}
</script>

<style scoped>
.launch-image-text {
  font-size: 14px;
}

.one-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex: auto; */
  height: 60rpx;
}

.one-part {
  padding: 40rpx 50rpx;
}

.uploader {
  width: 650rpx;
  margin: 0 auto;
  padding: 40rpx 0;
}

/* 标题和说明 */
.whole-info {
  padding: 30rpx 50rpx 50rpx 50rpx;
}

switch {
  transform: scale(.8);
}

/* 第3块 */
.team-list {
  margin-bottom: 30rpx;
}
.one-team {
  margin-top: 30rpx;
}
.upload-tip-text {
  width: 150rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border: 1px solid #0086F1;
  color: #0086F1;
  font-size: 12px;
}
.team-img {
  width: 150rpx;
  height: 60rpx;
}
.team-name-input {
  width: 350rpx;
  border-bottom: 1px solid #999;
}
.add-option {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}
.attr-line {
  margin: 35rpx 0 25rpx 0;
}
.add-text {
  color: #0086F1;
}
.add-option-icon {
  margin-right: 25rpx;
}
.team-desc textarea {
  width: 650rpx;
  height: 150rpx;
  padding: 30rpx 40rpx;
  margin: 0 auto;
  box-sizing: border-box;
  background: #EFEFF0;
  border-radius: 10px;
  font-size: 12px;
}


.icon-down {
  margin-left: 20rpx;
}

.btn-launch {
  margin-bottom: 60rpx;
}


.mb20 {
  margin-bottom: 20rpx;
}

.border-top-gray {
  border-top: 7px solid #EEEEF0;
}
</style>
