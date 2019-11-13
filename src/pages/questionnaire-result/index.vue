<template>
  <div class="questionnaire-result">
    <div class="one-part" v-for="(item, index) in data" :key="index">
      <div class="order">{{item.order >= 10 ? item.order : '0' + item.order}}</div>
      <div class="content">
        <div class="title">{{item.title}}</div>
        <div class="options">
          <div class="option-line" v-for="(option, index2) in item.options" :key="index2">
            <span class="option-order">选项{{numCN[index2]}}</span>
            <span class="option-text">{{option}}</span>
            <span class="option-num">{{item.num[index2]}}票</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '我是问卷标题',
      data: [
        // {
        //   order: 1,
        //   title: "去哪里吃饭",
        //   options: ["食堂", "外卖", "不吃"],
        //   num: [1, 2, 5]
        // },
        // {
        //   order: 2,
        //   title: "吃啥",
        //   options: ["1", "2"],
        //   num: [1, 2]
        // }
      ],
      numCN: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
    };
  },

  async mounted() {
    if (this.$mp.query.id) {
      const res = await this.$net.getQuestionnaireResult(this.$mp.query.id)
      // if (typeof res !== 'number') {
        this.title = res.title
        this.data = res.data

        wx.setNavigationBarTitle({
          title: this.title
        })
      // }
    }
    else {
      console.warn('缺失Id')
    }
  },
};
</script>

<style scoped>


.one-part {
  display: flex;

  padding: 20rpx 50rpx;
  border-bottom: 7px solid #EEEEF0;
  font-size: 14px;
  color: #414141;
}

.order {
  margin-right: 20rpx;
  font-weight: bold;
  font-size: 16px;
}

.content {
  width: 85%;
}

.title {
  margin-bottom: 20rpx;
  font-size: 16px;
  font-weight: bold;
}

.option-line {
  margin-bottom: 15rpx;
}

.option-order {
  margin-right: 20rpx;
}

.option-num {
  float: right;
  color: #0086F1;
}


</style>
