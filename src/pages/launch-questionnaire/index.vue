<!-- latest -->
<template>
  <div class="launch-questionnaire">
    <div class="uploader">
      <uploader :limit="1" @update="imagesId = $event" :initImages="imagesId"></uploader>
    </div>

    <div class="whole-info border-top-gray">
      <description typeNameCN="问卷" @update="title = $event.title; desc = $event.desc"></description>
    </div>

    <div class="question-list border-top-gray">
      <question :voteData="item" :order="index + 1" @update="handleUpdate" @delete="handleDelete" @minus="handleMinus" v-for="(item, index) in qlist" :key="index"></question>
      <button class="btn btn-simple" @click="handleAdd">添加题目</button>
    </div>

    <div class="duration border-top-gray">
      <duration @create="voteTime = $event" @update="voteTime[$event.attr] = $event.value">投票时间</duration>
    </div>

    <div class="other-settings">
      <div class="setting-line border-top-gray">
        <span class="setting-text">是否展示在广场</span>
        <switch :checked="showInGround" color="#0086F1" class="show-switch" @change="showInGround = $event.mp.detail.value"></switch>
      </div>
    </div>

    <div class="launch">
      <div class="preview">
        <a href="" class="preview-link">问卷预览</a>
      </div>
      <div class="btn-launch">
        <button class="btn" hover-class="btn-hover" @click="launch" :loading="btnLoading">发布</button>
      </div>
    </div>

  </div>
</template>

<script>
import question from '@/components/choose-question'
import uploader from '@/components/image-uploader'
import description from '@/components/whole-info'
import duration from '@/components/duration-setter'

export default {
  data() {
    return {
      title: '',
      desc: '',
      imagesId: [],
      qlist: [
        {
          question: '',
          answers: [
            '',
            '',
            ''
          ],
          imgUrl: '',
        },
        {
          question: '',
          answers: [
            '',
            '',
            ''
          ],
          imgUrl: '',
        },
      ],
      voteTime: {}, // 此项不存为草稿

      showInGround: true,

      btnLoading: false,
    }
  },

  components: {
    question,
    uploader,
    description,
    duration
  },

  methods: {
    handleUpdate(e) {
      this.$set(this.qlist, e.order - 1, {
        order: e.order,
        question: e.question,
        answers: e.answers,
        imgUrl: e.imgUrl
      })
    },
    handleDelete(e) {
      if (this.qlist.length > 1) {
        this.qlist.splice(e.order - 1, 1)
      }
      else {
        wx.showToast({
          title: '不能再删除了',
          icon: 'none'
        })
      }

    },
    handleAdd() {
      this.qlist.push({
          question: '',
          answers: [
            '',
            '',
            ''
          ],
          imgUrl: '',
        })
    },
    handleMinus(e) {
      this.qlist[e.order - 1].answers.splice(e.index, 1)
    },
    async launch() {
      const isEmptyBlank = () => {
        let empty = false
        this.qlist.forEach(item => {
          if (item.question.trim() === '')
            empty = true
          item.answers.forEach(answer => {
            if (answer.trim() === '')
              empty = true
            })
          })
          if (empty) {
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
      this.loading = true
      const Questionnaire = []
      for (let item of this.qlist) {
        Questionnaire.push({
          Title: item.question,
          Answers: item.answers
        })
      }
      const data = {
        SessionId: this.$store.state.sessionId,
        Title: this.title,
        Describe: this.desc,
        SharePic: this.imagesId,
        Begin_time: `${this.voteTime.startDate} ${this.voteTime.startTime}:00`,
        End_time: `${this.voteTime.endDate} ${this.voteTime.endTime}:00`,
        Is_Public: +this.showInGround,
        Questionnaire
      }

      const res = await this.$net.createQuestionnaire(data)
      this.loading = false
      wx.showToast({
        title: '创建成功',
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/do-questionnaire/main?id=' + res.Data.Questionnaire
        })
      }, 1000);
    },
    save_() {
      // voteTime不存为草稿
      const draft = this.$data
      delete draft.voteTime
      delete draft.btnLoading
      this.$store.commit('setDraftOfLaunch', {
        type: 'questionnaire',
        data: draft
      })
    },
    restore_() {
      // if (Object.keys(this.$store.state.draftOfLaunch.questionnaire).length) {
      //   mpvue.showToast({
      //     icon: 'loading',
      //     title: '正在恢复草稿...'
      //   })
      //   // Object.assign是浅拷贝，会拷贝可枚举成员及其get/set函数
      //   Object.assign(this.$data, JSON.parse(JSON.stringify(this.$store.state.draftOfLaunch.questionnaire)))
      // }

      const hasValidInput = () => {
        // 检查保存的内容是否与默认值不同，fxxking wxmp
        const data = this.$store.state.draftOfLaunch.questionnaire
        if (!Object.keys(data).length) {
          return false
        }
        if (data.title || data.desc || this.imagesId.length || this.qlist.length !== 2) {
          return true
        }
        let t = false
        data.qlist.forEach((item) => {
          if (item.question || item.imgUrl || item.answers.length !== 3) {
            t = true
          }
          item.answers.forEach((subItem) => {
            t = t || subItem
          })
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

        //     }
        //   }
        // })
        mpvue.showToast({
          icon: 'loading',
          title: '正在恢复内容...'
        })
        // Object.assign是浅拷贝，会拷贝可枚举成员及其get/set函数
        Object.assign(this.$data, JSON.parse(JSON.stringify(this.$store.state.draftOfLaunch.questionnaire)))
        // TODO:  提交成功后清理store
      }
    }
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
.launch-questionnaire {
  font-size: 14px;
}

.uploader {
  width: 650rpx;
  /* height: 150rpx; */
  margin: 0 auto;
  padding: 40rpx 0;
}

/* 标题和说明 */
.whole-info {
  padding: 30rpx 50rpx 50rpx 50rpx;
}

/* 问题列表 */
.question-list {
  padding: 40rpx 0;
}

.btn-launch {
  margin: 40rpx 0;
}


.setting-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 50rpx;
}

.setting-text {
  font-size: 16px;
}

.show-switch {
  transform: scale(.8);
}

.preview {
  position: relative;
  height: 30rpx;
}

.preview-link {
  position: absolute;
  right: 70rpx;
  font-size: 12px;
  color: #0086F1;
}

.preview-btn {
  margin-top: 70rpx;
}


.border-top-gray {
  border-top: 10px solid #EEEEF0;
}

</style>
