<template>
  <div class="launch-image-text">
    <div class="uploader">
      <uploader limit="5"></uploader>
    </div>

    <div class="whole-info border-top-gray">
      <description typeNameCN="投票"></description>
    </div>

    <div class="one-part border-top-gray">
      <div class="team-list">
        <div class="one-team" v-for="(item, index) in teams" :key="index">
          <div class="one-line">
            <img src="/static/images/icon_minus.png" class="icon-40" @click="minusOption" :data-idx="index">
            <p class="upload-tip-text" v-if="item.image === ''" @click="uploadImage(index)">上传图片</p>
            <img :src="item.image" v-else class="team-img" @click="uploadImage(index)">
            <span class="order">{{index + 1}}）</span>
            <input type="text" class="team-name-input" v-model.lazy="item.name" placeholder="队名">
          </div>
          <div class="team-desc">
            <p class="attr-line">队伍简介</p>
            <textarea v-model.lazy="item.desc" placeholder="请输入队伍简介"></textarea>
          </div>
        </div>
      </div>
      <div class="add-option" @click="addOption">
        <img src="/static/images/icon_add2.png" class="add-option-icon icon-40">
        <span class="add-text">添加队伍</span>
      </div>
      <div class="one-line">
        <span class="large-text">最多可投</span>
        <picker mode="selector" :range="maxVoteNumArr" @change="changePicker(maxVoteNumArr, 'maxVoteNum', $event)">
          <span class="font-gray">每天{{maxVoteNum}}次</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
    </div>

    <div class="border-top-gray">
      <duration @create="voteTime = $event" @update="voteTime[$event.attr] = $event.value">投票时间</duration>
    </div>

    <div class="one-part border-top-gray">
      <div class="one-line mb20">
        <span class="large-text">多选设定</span>
        <switch :checked="setMulti" color="#0086F1" @change="setMulti = !setMulti"></switch>
      </div>
      <div class="one-line">
        <span class="mid-text font-gray">最少选择选项</span>
        <picker mode="selector" :range="[1, 2, 3, 4, 5]" :disabled="!setMulti" @change="changePicker([1, 2, 3, 4, 5], 'minOptionNum', $event)" class="times-picker">
          <span class="font-gray">{{minOptionNum}}个</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
      <div class="one-line">
        <span class="mid-text font-gray">最多选择选项</span>
        <picker mode="selector" :range="[6, 7, 8, 9, '不限']" :disabled="!setMulti" @change="changePicker([6, 7, 8, 9, '不限'], 'maxOptionNum', $event)" class="times-picker">
          <span class="font-gray">{{maxOptionNum}}个</span>
          <img src="/static/images/icon_down.png" class="icon-25 icon-down">
        </picker>
      </div>
    </div>

    <div class="one-part border-top-gray">
      <div class="one-line mb20">
        <span class="large-text">是否展示在广场</span>
        <switch :checked="showInGround" color="#0086F1" @change="showInGround = !showInGround"></switch>
      </div>
      <div class="one-line mb20">
        <span class="large-text">匿名</span>
        <switch :checked="anonymous" color="#0086F1" @change="anonymous = !anonymous"></switch>
      </div>
    </div>

    <div class="btn-launch">
      <button class="btn" hover-class="btn-hover" :loading="btnLoading" @click="publish">发布</button>
    </div>

  </div>
</template>

<script>
import uploader from '@/components/image-uploader'
import description from '@/components/whole-info'
import duration from '@/components/duration-setter'

export default {
  data() {
    return {
      title: '',
      desc: '',
      teams: [
        {
          name: '',
          image: '',
          desc: ''
        },
      ],
      maxVoteNum: 1,
      setMulti: false,
      minOptionNum: 1,
      maxOptionNum: '不限',
      signupTime: {},
      showInGround: true,
      anonymous: false,

      btnLoading: false,
    }
  },

  computed: {
    maxVoteNumArr: () => [...Array(5).keys()].map(item => item + 1),
  },

  methods: {
    changePicker(range, attrName, e) {
      this[attrName] = range[e.mp.detail.value]
    },
    addOption() {
      this.teams.push({
          name: '',
          image: '',
          desc: ''
        })
    },
    minusOption(e) {
      this.teams.splice(e.target.dataset.idx, 1)
    },
    uploadImage(index) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.teams[index].image = res.tempFilePaths
        }
      })
    },
    publish() {
      this.btnLoading = true
      setTimeout(() => {
        this.btnLoading = false
        wx.showToast({
          title: '创建成功'
        })
        // @返回
      }, 1000);
    }
  },

  components: {
    uploader,
    description,
    duration
  },
}
</script>

<style scoped>
.launch-image-text {
  font-size: 14px;
}

.one-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex: auto; */
  height: 60rpx;
}

.one-part {
  padding: 40rpx 50rpx;
}

.uploader {
  width: 650rpx;
  margin: 0 auto;
  padding: 40rpx 0;
}

/* 标题和说明 */
.whole-info {
  padding: 30rpx 50rpx 50rpx 50rpx;
}

switch {
  transform: scale(.8);
}

/* 第3块 */
.team-list {
  margin-bottom: 30rpx;
}
.one-team {
  margin-top: 30rpx;
}
.upload-tip-text {
  width: 150rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border: 1px solid #0086F1;
  color: #0086F1;
  font-size: 12px;
}
.team-img {
  width: 150rpx;
  height: 60rpx;
}
.team-name-input {
  width: 350rpx;
  border-bottom: 1px solid #999;
}
.add-option {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}
.attr-line {
  margin: 35rpx 0 25rpx 0;
}
.add-text {
  color: #0086F1;
}
.add-option-icon {
  margin-right: 25rpx;
}
.team-desc textarea {
  width: 650rpx;
  height: 150rpx;
  padding: 30rpx 40rpx;
  margin: 0 auto;
  box-sizing: border-box;
  background: #EFEFF0;
  border-radius: 10px;
  font-size: 12px;
}


.icon-down {
  margin-left: 20rpx;
}

.btn-launch {
  margin-bottom: 60rpx;
}


.mb20 {
  margin-bottom: 20rpx;
}

.border-top-gray {
  border-top: 7px solid #EEEEF0;
}
</style>
