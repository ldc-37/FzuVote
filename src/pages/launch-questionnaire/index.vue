<template>
  <div>

    <div class="question-list">
      <question :order="index + 1" @update="handleUpdate" @delete="handleDelete" v-for="(item, index) in qlist" :key="index"></question>
    </div>
    <div class="btn-add">
      <button id="addQuestion" @click="handleAdd">添加题目</button>
    </div>

  </div>
</template>

<script>
import question from '@/components/choose-question'

export default {
  data() {
    return {
      order: 1,
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

    }
  },

  components: {
    question
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
    }
  },
}
</script>

<style scoped>



#addQuestion {
  width: 350rpx;
  margin: 0 auto;
  border-radius: 50px;
  background: #0086F1;
  color: #fff;
  line-height: 2.6;
  font-size: 14px;
  box-shadow: 0 0 72rpx 5rpx rgba(0, 0, 0, 0.1);
}

</style>
