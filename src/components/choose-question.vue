<template>
  <div class="choose-question">
    <div class="l-header">
      <span class="number">{{order < 10 ? '0' + order : order}}</span>
      <input type="text" class="question" placeholder="请输入题目标题" v-model="question" @change="handleChange">
      <button class="upload-btn">上传图片</button>
    </div>
    <div class="l-body">
      <div class="option-line" v-for="(item, index) in answers" :key="index">
        <img src="/static/images/icon_minus.png" class="minus-option icon-img" @click="minusOption" :data-idx="index">
        <input type="text" class="option-text" placeholder="选项内容" v-model="answers[index]" @change="handleChange">
      </div>
    </div>
    <div class="l-footer">
      <div class="add-option" @click="addOption">
        <img src="/static/images/icon_add2.png" class="add-option-icon icon-img">
        <span class="add-span">添加选项</span>
      </div>
      <div class="delete-question" @click="deleteQuestion">
        <img src="/static/images/icon_delete.png" class="icon-img">
        <span class="delete-span">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      question: '',
      answers: [
        '',
        '',
        ''
      ],
      imgUrl: '',
    }
  },
  mounted() {
    console.log({
        ...this.$data,
        order: this.order
      })
  },

  methods: {
    handleChange(e) {
      this.$emit('update', {
        ...this.$data,
        order: this.order
      })
    },
    addOption(e) {
      if (this.answers.length >= 5) {
        wx.showToast({
          title: '最多有5个选项',
          icon: 'none'
        })
      }
      else {
        this.answers.push("")
      }
    },
    minusOption(e) {
      console.log(this.answers[e.target.dataset.idx]);
      if (this.answers.length > 2) {
        this.answers.splice(e.target.dataset.idx, 1)
        this.$forceUpdate();
      }
      else {
        wx.showToast({
          title: '不能再减少了',
          icon: 'none'
        })
      }
    },
    deleteQuestion() {
      wx.showModal({
        title: '警告',
        content: '确认删除？',
        confirmText: '删除',
        confirmColor: '#F56C6C'

      })
      this.$emit('delete', {
        order: this.order
      })
    }
  },
}
</script>

<style scoped>
.choose-question {
  margin-bottom: 40rpx;
  padding: 0 50rpx;
  font-size: 16px;
}

.l-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.number {
  font-size: 14px;
}

.question {
  border-bottom: 1px solid #999;
  width: 400rpx;
}

.upload-btn {
  margin: 0;
  padding: 14rpx 18rpx ;
  background: #fff;
  font-size: 12px;
  border: 1px solid #0086F1;
  color: #0086F1;
  border-radius: 0;
  line-height: 1;
}

.option-line {
  display: flex;
  align-items: center;
  height: 80rpx;
}

.minus-option {
  margin: 0 30rpx;
}

.icon-img {
  width: 40rpx;
  height: 40rpx;
}

.l-footer {
  display: flex;
  justify-content: space-between;
  height: 80rpx;
}

.add-option,
.delete-question {
  display: flex;
  align-items: center;
}

.add-option-icon {
  margin: 0 20rpx 0 30rpx;
}

.add-span {
  color: #0086F1;
}

.delete-span {
  color: #9999A3;
  margin-left: 10rpx;
}

</style>
