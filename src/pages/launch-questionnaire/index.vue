<template>
  <div class="launch-questionnaire">
    <div class="uploader">
      <uploader :limit="1"></uploader>
    </div>

    <div class="whole-info border-top-gray">
      <description typeNameCN="问卷" @update="title = $event.title; desc = $event.desc"></description>
    </div>

    <div class="question-list border-top-gray">
      <question :order="index + 1" @update="handleUpdate" @delete="handleDelete" v-for="(item, index) in qlist" :key="index"></question>
      <button class="btn" @click="handleAdd">添加题目</button>
    </div>

    <div class="duration border-top-gray">
      <duration @create="voteTime = $event" @update="voteTime[$event.attr] = $event.value">投票时间</duration>
    </div>

    <div class="other-settings">
      <div class="setting-line border-top-gray">
        <span class="setting-text">是否展示在广场</span>
        <switch :checked="showInGround" color="#0086F1" class="show-switch" @change="handleChangeSetting"></switch>
      </div>
    </div>

    <div class="launch">
      <div class="preview">
        <a href="" class="preview-link">问卷预览</a>
      </div>
      <div class="preview-btn">
        <button class="btn" @click="launch">发布</button>
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
      order: 1,
      title: '',
      desc: '',
      qlist: [
        {
          question: '',
          answers: [
            '',
            '',
            ''
          ],
          imgUrl: ''
        },
      ],
      voteTime: {},

      showInGround: true
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
      console.log(this.qlist);
      this.qlist[e.order - 1] = {
        order: e.order,
        question: e.question,
        answers: e.answers,
        imgUrl: e.imgUrl
      }

    },
    handleDelete(e) {

      if (this.qlist.length > 1) {
        // this.qlist.splice(e.order - 1, 1)
        // this.$forceUpdate()
console.log(e);

  console.log(this.qlist.filter(item => item.order !== e.order));
        this.qlist = this.qlist.filter(item => item.order !== e.order)

      console.log(this.qlist);
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
        imgUrl: ''
      })
    },
    handleChangeSetting(e) {
      this.showInGround = e.mp.detail.value
    },
    launch() {
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
        Begin_time: `${this.voteTime.startDate} ${this.voteTime.startTime}:00`,
        End_time: `${this.voteTime.endDate} ${this.voteTime.endTime}:00`,
        Is_Public: this.showInGround ? '1' : '0',
        Questionnaire
      }
      this.$fly.post('/questionnaire/new', JSON.stringify(data)).then(res => {
        if (res.Status === 200) {
          wx.showToast({
            title: '创建成功',
            image: '/static/images/icon_task_done.png',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      })
    }

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

.btn {
  width: 380rpx;
  margin: 40rpx auto;
  background: #0086F1;
  color: #fff;
  font-size: 16px;
  border-radius: 50px;
  line-height: 2.4;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
}

/*  */
.duration {

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
