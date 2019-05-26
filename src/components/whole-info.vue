<template>
  <div class="whole-info">
    <div class="whole-title">
      <input type="text" class="whole-title-input" v-model="title" :placeholder="'填写' + typeNameCN + '标题'" @change="update">
    </div>
    <div class="whole-desc">
      <div class="whole-desc-text">
        <span class="black">{{typeNameCN}}说明</span>
        <span class="gray">（建议300字以内）</span>
      </div>
      <textarea class="whole-desc-textarea" v-model="desc" :placeholder="'请输入' + typeNameCN + '说明的内容描述'" placeholder-style="font-size: 12px;" @change="update"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ['typeNameCN'],
  data() {
    return {
      title: '',
      desc: ''
    }
  },
  methods: {
    update() {
      this.$emit('update', {
        ...this.$data
      })
    }
  },
}
</script>

<style scoped>

.whole-title-input {
  height: 80rpx;
  margin-bottom: 40rpx;
  border-bottom: 1px solid #888;
}

.whole-desc-text {
  margin-bottom: 30rpx;
}

.whole-desc-textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 30rpx 40rpx;
  background: #EFEFF0;
  height: 170rpx;
}

.black {
  color: #414141;
}

.gray {
  color: #9999A4;
}
</style>
