<template>
  <div class="choose-question">
    <div class="l-header">
      <span class="number">{{order < 10 ? '0' + order : order}}</span>
      <input type="text" class="question" placeholder="请输入题目标题" v-model.lazy="copyData.question" @change="handleChange">
      <button class="upload-btn">上传图片</button>
    </div>
    <div class="l-body">
      <div class="option-line" v-for="(item, index) in copyData.answers" :key="index">
        <img src="/static/images/icon_minus.png" class="minus-option icon-40" @click="minusOption" :data-idx="index">
        <input type="text" class="option-input" placeholder="选项内容" v-model.lazy="copyData.answers[index]" @change="handleChange">
      </div>
    </div>
    <div class="l-footer">
      <div class="add-option" @click="addOption">
        <img src="/static/images/icon_add2.png" class="add-option-icon icon-40">
        <span class="add-span">添加选项</span>
      </div>
      <div class="delete-question" @click="deleteQuestion">
        <img src="/static/images/icon_delete.png" class="icon-40">
        <span class="delete-span">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // @关键在于创建props的双向绑定
  props: ['voteData', 'order'],
  data() {
    return {
      copyData: this.voteData
    }
  },
  watch: {
    voteData(val) {
      this.copyData = val
    }
  },

  methods: {
    handleChange(e) {
      this.$emit('update', this.copyData)
    },
    addOption(e) {
      if (this.copyData.answers.length >= 5) {
        wx.showToast({
          title: '最多有5个选项',
          icon: 'none'
        })
      }
      else {
        this.copyData.answers.push("")
      }
    },
    minusOption(e) {
      if (this.copyData.answers.length > 2) {
        // this.copyData.answers.splice(e.target.dataset.idx, 1)
        this.$emit('minus', {
          order: this.order,
          index: e.target.dataset.idx
        })
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
        confirmColor: '#F56C6C',
        success: result => {
          if (result.confirm) {
            this.$emit('delete', {
              order: this.copyData.order
            })
          }
        }
      })
    }
  },
}
</script>

<style scoped>
.choose-question {
  margin-bottom: 40rpx;
  padding: 0 50rpx;
  font-size: 14px;
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
  padding-left: 10rpx;
  width: 400rpx;
  border-bottom: 1px solid #999;
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
  height: 85rpx;
}

.minus-option {
  margin: 0 30rpx;
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
