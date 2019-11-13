<template>
  <div id="qa">
    <div class="box" :class="{'separator': index !== questionList.length - 1}" v-for="(item, index) in questionList">
      <div class="title">{{item.question}}</div>
      <p class="text">{{item.answer}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [
        {
          question: '为什么我无法投票？',
          answer: '请检查是否授权了用户登录及网络状态，如有疑问请联系开发者'
        },
        {
          question: '三种模式的区别是什么？',
          answer: '图文模式侧重于图片+向指定参与者投票；问卷模式适合于收集其他人关于一系列问题的看法；评选模式主要用于可自主报名参与的评选'
        },
        {
          question: '我还遇到了其他问题。',
          answer: '目前FzuVote处于测试期，如果遇到这类问题请点击下方意见反馈告知我们，感谢您的理解，非常抱歉！'
        },
      ]
    }
  }
}
</script>

<style scoped>
#qa {
  padding: 20rpx 50rpx;
}

.title {
  font-size: 16px;
  color: #414141;
  line-height: 3.6;
}

.text {
  color: #9999a3;
  font-size: 14px;
  padding-bottom: 50rpx;
}

.separator {
  border-bottom: 1px solid #ccc;
}
</style>
