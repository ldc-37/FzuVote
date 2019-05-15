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
          question: '为什么我无法投票',
          answer: 'Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.'
        },
        {
          question: '为什么我无法投票',
          answer: 'Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.'
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
