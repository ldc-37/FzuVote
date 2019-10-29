<template>
  <div class="do-questionnaire">
    <div class="top-line">
      <div class="ques-number" :class="{'doing': nowQuestion === i}" v-for="(i, index) in topArr" :key="index">
        第{{i}}题
      </div>
    </div>
    <div class="body">
      <div class="question">
        <p class="question-text huge-text">
          {{list[nowQuestion - 1].question}}
          <span class="question-type small-text" v-if="list[nowQuestion - 1].limit === 1">单选</span>
          <span class="question-type small-text" v-else>最多{{list[nowQuestion - 1].limit}}项</span>
        </p>
      </div>

      <div class="answers">
        <radio-group v-if="list[nowQuestion - 1].limit === 1" @change="doSelect" v-for="(item, qindex) in list" :key="qindex">
          <div class="answer-line" v-if="nowQuestion === qindex + 1" v-for="(option, aindex) in item.options" :key="aindex">
            <span class="option-text">{{aindex + 1}}.  {{option}}</span>
            <radio color="#0086F1" :value="aindex + 1"  />
          </div>
        </radio-group>
        <checkbox-group v-if="list[nowQuestion - 1].limit > 1" @change="doSelect" v-for="(item, qindex2) in list" :key="qindex2">
          <div class="answer-line" v-if="nowQuestion === qindex2 + 1" v-for="(option, aindex) in item.options" :key="aindex">
            <span class="option-text">{{aindex + 1}}.  {{option}}</span>
            <checkbox color="#0086F1" :value="aindex + 1"  />
          </div>
        </checkbox-group>
      </div>
    </div>
    <div class="footer">
      <button class="btn" hover-class="btn-hover" @click="handleClickNext" v-if="nowQuestion !== list.length">下一题</button>
      <button class="btn" hover-class="btn-hover" @click="handleSubmit" v-else :loading="btnLoading">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topArr: [],

      title: '',
      nowQuestion: 1,
      nowChecked: [],
      list: [],
      answers: [],
      btnLoading: false,
    }
  },

  methods: {
    doSelect(e) {
      const val = e.mp.detail.value
      // val多选时为*String*数组，单选时为*String*数字。统一存为*Number*数组
      if (!isNaN(val)) {
        this.nowChecked = [+e.mp.detail.value]
      }
      else {
        this.nowChecked = e.mp.detail.value.map(item => +item)
      }
    },
    handleClickNext() {
      if (!this.nowChecked.length) {
        wx.showToast({
          title: '请选择一个选项',
          icon: 'none'
        })
      }
      else if (this.nowChecked.length > this.list[this.nowQuestion - 1].limit) {
        wx.showToast({
          title: '超出多选限制',
          icon: 'none'
        })
      }
      else {
        this.answers.push(this.nowChecked)
        this.nowChecked = []
        if (this.nowQuestion % 5 === 0) {
          // 第5，10，15...个
          if (this.list.length - this.nowQuestion >= 5) {
            this.topArr =  this.topArr.map(item => item + 5)
          }
          else {
            this.topArr = [...Array(this.list.length - this.nowQuestion).keys()].map(item => item + this.nowQuestion + 1)
          }
        }
        this.nowQuestion++
      }
    },
    async handleSubmit() {
      if (!this.nowChecked.length) {
        wx.showToast({
          title: '请选择一个选项',
          icon: 'none'
        })
      }
      else if (this.nowChecked.length > this.list[this.nowQuestion - 1].limit) {
        wx.showToast({
          title: '超出多选限制',
          icon: 'none'
        })
      }
      else {
        this.answers.push(this.nowChecked)
        this.btnLoading = true

        const Vote = [], Answers = []
        for (let i = 0; i < this.answers.length; i++) {
          // @该写法有误
          // for (let j = 0; j < this.answers[i].length; j++) {
          //   Answers.push(this.list[i].options[j])
          // }
          Vote.push({
            Title: this.list[i].question,
            // Answers
            Answers: this.list[i].options[this.answers[i][0] - 1]
          })
        }
        const data = {
          SessionId: this.$store.state.sessionId,
          Vote,
          Questionnaire_id: this.$mp.query.id
        }
        const res = await this.$net.voteQuestionnaire(data)
        this.btnLoading = false
        wx.showToast({
          title: '提交成功'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/questionnaire-result/main?id=' + this.$mp.query.id
          })
        }, 1000);
      }
    },
    // getChecked(index) {
    //     console.log(index, this.nowChecked.indexOf(index) >= 0);

    //   return this.nowChecked.indexOf(index) >= 0
    // },
    // handleClickRatio(e) {
    //   const index = e.mp.currentTarget.dataset.index
    //   this.nowChecked = [index]
    // },
    // handleChickCheckbox(){},

  },
  async mounted() {
    if (this.$mp.query.id) {
      const data = await this.$net.getQuestionnaire(this.$mp.query.id)
      this.list = data.list
      this.title = data.title

      wx.setNavigationBarTitle({
        title: this.title
      })
      this.topArr = [...Array(Math.min(5, this.list.length)).keys()].map(item => item + 1)
    }
    else {
      console.log('当前为演示页面')
    }
  },
}
</script>

<style scoped>
.do-questionnaire {
  /* height: 100vh; */
}

.top-line {
  display: flex;

  padding: 20rpx 50rpx;
  font-size: 14px;
}

.ques-number {
  width: 16%;
  margin: 0 2%;
  padding: 10rpx 0;
  text-align: center;
}

.doing {
  color: #0086F1;
  border-bottom: 3px solid #0086F1;
}

.body {
  padding: 0 50rpx;
}

.question-text {
  font-weight: bold;
  margin: 50rpx 10rpx;
}

.question-type {
  margin-left: 20rpx;
  padding: 2rpx 18rpx;
  background: #0086F1;
  border-radius: 10px;
  color: #fff;
  font-size: 10px;
}

.answer-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  padding: 0 20rpx;
  margin: 10rpx;
}

.option-text {
  word-break: break-all;
  font-size: 14px;
}

radio, checkbox {
  transform: scale(.7);
}

.footer {
  position: absolute;
  bottom: 100rpx;
  transform: translateX(-50%);
  left: 50%;
}

</style>
